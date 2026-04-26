/**
 * Upload kitten gallery photos to Sanity and patch each kitten document's gallery array.
 *
 * Usage:
 *   node scripts/upload-gallery.mjs
 *
 * Requires SANITY_WRITE_TOKEN in .env (or environment).
 * Get a token: manage.sanity.io → project k6e71wky → API → Tokens → Add API token (Editor)
 *
 * Images are read from public/images/kittens/ (searches subdirectories recursively).
 * Files ending in _HERO.jpg are excluded — those are handled by upload-kittens.mjs.
 * All remaining .jpg/.jpeg/.png files are grouped by kitten name and uploaded as gallery assets.
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

// Load .env manually (no dotenv dependency required)
function loadEnv(envPath) {
  try {
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env not found — use existing process.env
  }
}

loadEnv(join(projectRoot, ".env"));

const projectId = process.env.SANITY_PROJECT_ID || "k6e71wky";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\nError: SANITY_WRITE_TOKEN not found.\n" +
    "Get a token at: https://manage.sanity.io → project k6e71wky → API → Tokens → Add API token (Editor)\n" +
    "Then add it to your .env file:\n  SANITY_WRITE_TOKEN=sk...\n"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// Known kitten names — order matters for startsWith matching (longer names first to avoid prefix collisions)
const KITTEN_NAMES = ["Morrigan", "Tarquin", "Kallias", "Azriel", "Lucien", "Helion", "Amren", "Elain"];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/**
 * Derive the kitten name from a filename.
 * - Strip extension
 * - If contains underscore, take the part before the first underscore
 * - Match case-insensitively against known kitten names by startsWith
 * Returns the canonical kitten name (original casing from KITTEN_NAMES) or null.
 */
function kittenNameFromFile(filename) {
  const ext = extname(filename);
  if (!IMAGE_EXTENSIONS.has(ext.toLowerCase())) return null;

  const base = basename(filename, ext);

  // Exclude hero images
  if (base.endsWith("_HERO")) return null;

  // Prefix: part before first underscore (if any)
  const prefix = base.includes("_") ? base.slice(0, base.indexOf("_")) : base;
  const prefixLower = prefix.toLowerCase();

  for (const name of KITTEN_NAMES) {
    if (prefixLower === name.toLowerCase() || prefixLower.startsWith(name.toLowerCase())) {
      return name;
    }
  }

  return null;
}

/**
 * Recursively find all gallery images under a directory.
 * Returns a map of kittenName → [{ filename, fullPath }]
 */
function findGalleryImages(dir, results = {}) {
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        findGalleryImages(full, results);
      } else {
        const kittenName = kittenNameFromFile(entry);
        if (kittenName) {
          if (!results[kittenName]) results[kittenName] = [];
          results[kittenName].push({ filename: entry, fullPath: full });
        }
      }
    }
  } catch {
    // directory not found — skip
  }
  return results;
}

async function uploadImage(imagePath) {
  const data = readFileSync(imagePath);
  const filename = basename(imagePath);
  const ext = extname(filename).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";
  console.log(`    Uploading ${filename}...`);
  const asset = await client.assets.upload("image", data, { filename, contentType });
  return asset._id;
}

async function run() {
  // Search this project's public/images/kittens, then the main project root if we're in a worktree
  const imageDirs = [
    process.env.IMAGES_DIR,
    join(projectRoot, "public", "images", "kittens"),
    join(projectRoot, "..", "..", "..", "public", "images", "kittens"),
  ].filter(Boolean);

  const galleryImages = {};
  for (const dir of imageDirs) {
    const found = findGalleryImages(dir);
    for (const [name, files] of Object.entries(found)) {
      if (!galleryImages[name]) galleryImages[name] = [];
      // Deduplicate by filename to avoid double-adding from overlapping dirs
      const existingFilenames = new Set(galleryImages[name].map((f) => f.filename));
      for (const file of files) {
        if (!existingFilenames.has(file.filename)) {
          galleryImages[name].push(file);
          existingFilenames.add(file.filename);
        }
      }
    }
  }

  const totalFiles = Object.values(galleryImages).reduce((sum, files) => sum + files.length, 0);
  console.log(`Found gallery images for ${Object.keys(galleryImages).length} kittens (${totalFiles} files total):`);
  for (const [name, files] of Object.entries(galleryImages)) {
    console.log(`  ${name}: ${files.length} file(s)`);
  }
  console.log();

  if (totalFiles === 0) {
    console.log("No gallery images found. Check your image directories.");
    process.exit(0);
  }

  for (const [kittenName, files] of Object.entries(galleryImages)) {
    const docId = `kitten-${kittenName.toLowerCase()}`;
    console.log(`Processing ${kittenName} (${files.length} gallery photos → ${docId})...`);

    const gallery = [];

    for (const { filename, fullPath } of files) {
      const assetId = await uploadImage(fullPath);
      const key = basename(filename, extname(filename)).replace(/[^a-zA-Z0-9_-]/g, "_");
      gallery.push({
        _type: "image",
        _key: key,
        asset: { _type: "reference", _ref: assetId },
        hotspot: { x: 0.5, y: 0.35, height: 0.6, width: 0.8 },
        crop: { top: 0, bottom: 0, left: 0, right: 0 },
      });
    }

    await client.patch(docId).set({ gallery }).commit();
    console.log(`  Patched ${docId} with ${gallery.length} gallery image(s).\n`);
  }

  console.log("Done. Gallery arrays updated in Sanity.");
  console.log("Sanity Studio: https://pampered-feline.sanity.studio/");
}

run().catch((err) => {
  console.error("Upload failed:", err.message);
  process.exit(1);
});
