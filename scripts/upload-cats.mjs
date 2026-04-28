/**
 * Upload cat hero + gallery photos and Wisdom Panel PDFs to Sanity.
 * Creates/replaces cat documents (Aedion, Rowan, Feyra).
 * Also patches siteSettings with a parentsBannerImage if a _parents file is found.
 *
 * Usage:
 *   node scripts/upload-cats.mjs
 *
 * Requires SANITY_WRITE_TOKEN in .env (or environment).
 * Get a token: manage.sanity.io → project k6e71wky → API → Tokens → Add API token (Editor)
 *
 * Images are read from public/images/cats/{CatFolder}/ in the project root or main project root.
 * Set IMAGES_DIR env var to override the search path.
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

// Cat data — matches Sanity schema field names exactly
const cats = [
  {
    name: "Aedion",
    role: "king",
    color: "Black Silver Shaded",
    order: 1,
    traits: "Aedion is our foundation sire and the heart of our program. He is deeply affectionate, endlessly patient, and completely at ease with children, other cats, and household chaos. He follows his people from room to room, greets every visitor like an old friend, and has never met a lap he didn't want to occupy. His temperament sets the tone for every kitten we produce.",
    health: "HCM echocardiogram negative, Wisdom Panel genetic panel clear (50 conditions), CFA registered.",
    folder: "Aedion",
    pdfName: "Aedion_WisdomPanelProfile_FormerName-Eyktan Navarro.pdf",
  },
  {
    name: "Rowan",
    role: "king",
    color: "Silver Shaded Tabby",
    order: 2,
    traits: "Rowan is a gentle giant in every sense. He is calm, affectionate, and wonderfully tolerant, the kind of cat who settles beside you without being asked and stays as long as you'll have him. He is exceptional with children and adapts easily to new people and environments.",
    health: "HCM echocardiogram negative, Wisdom Panel genetic panel clear (50 conditions), CFA registered.",
    folder: "Rowan",
    pdfName: null,
  },
  {
    name: "Feyra",
    role: "queen",
    color: "Black Tortie with Tabby Markings, Polydactyl",
    order: 3,
    traits: "Feyra is everything a Maine Coon queen should be. She is warm, social, and openly affectionate with everyone she meets. She raises her kittens with the same gentle confidence she brings to every interaction, and her kittens are handled daily from birth. Children adore her. She adores them back.",
    health: "HCM echocardiogram negative, Wisdom Panel genetic panel clear (50 conditions), CFA registered.",
    folder: "Feyra",
    pdfName: "Feyra_WisdomPanelProfile_FormerName-Ulya.pdf",
  },
];

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

function isImageFile(filename) {
  return IMAGE_EXTENSIONS.has(extname(filename).toLowerCase());
}

function isParentsFile(filename) {
  return filename.toLowerCase().includes("_parents");
}

/**
 * Find the cats/ base directory (contains per-cat subfolders).
 * Returns the first resolvable path from the search list.
 */
function findCatsDir() {
  const searchPaths = [
    process.env.IMAGES_DIR,
    join(projectRoot, "public", "images", "cats"),
    join(projectRoot, "..", "..", "..", "public", "images", "cats"),
  ].filter(Boolean);

  for (const p of searchPaths) {
    try {
      statSync(p);
      return p;
    } catch {
      // not found — try next
    }
  }
  return null;
}

/**
 * List image and PDF files in a cat's folder.
 * Returns { images: [{filename, fullPath}], pdfs: [{filename, fullPath}] }
 */
function listCatFiles(catsDir, folderName) {
  const images = [];
  const pdfs = [];

  // Case-insensitive folder match
  let resolvedFolder = null;
  try {
    const entries = readdirSync(catsDir);
    resolvedFolder = entries.find((e) => e.toLowerCase() === folderName.toLowerCase()) || null;
  } catch {
    return { images, pdfs };
  }

  if (!resolvedFolder) return { images, pdfs };

  const folderPath = join(catsDir, resolvedFolder);
  try {
    const files = readdirSync(folderPath).sort();
    for (const filename of files) {
      const fullPath = join(folderPath, filename);
      if (statSync(fullPath).isFile()) {
        if (isImageFile(filename)) {
          images.push({ filename, fullPath });
        } else if (extname(filename).toLowerCase() === ".pdf") {
          pdfs.push({ filename, fullPath });
        }
      }
    }
  } catch {
    // folder unreadable — skip
  }

  return { images, pdfs };
}

async function uploadImage(filePath) {
  const data = readFileSync(filePath);
  const filename = basename(filePath);
  const ext = extname(filename).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";
  console.log(`  Uploading ${filename}...`);
  const asset = await client.assets.upload("image", data, { filename, contentType });
  return asset._id;
}

async function uploadPdf(filePath) {
  const data = readFileSync(filePath);
  const filename = basename(filePath);
  console.log(`  Uploading PDF ${filename}...`);
  const asset = await client.assets.upload("file", data, { filename, contentType: "application/pdf" });
  return asset._id;
}

async function run() {
  const catsDir = findCatsDir();
  if (!catsDir) {
    console.error("Could not find public/images/cats/ directory. Set IMAGES_DIR env var to override.");
    process.exit(1);
  }
  console.log(`Using cats directory: ${catsDir}\n`);

  const transaction = client.transaction();
  // Track _parents files found across all folders for the banner image
  const parentsFiles = [];

  for (const cat of cats) {
    console.log(`Processing ${cat.name}...`);

    const docId = `cat-${cat.name.toLowerCase()}`;
    const { images, pdfs } = listCatFiles(catsDir, cat.folder);

    // Collect _parents images for later (don't use as hero or gallery for this cat)
    for (const img of images) {
      if (isParentsFile(img.filename)) {
        // Deduplicate by filename
        if (!parentsFiles.some((p) => p.filename === img.filename)) {
          parentsFiles.push(img);
        }
      }
    }

    // Hero: first non-_parents image (files already sorted alphabetically)
    const nonParentsImages = images.filter((img) => !isParentsFile(img.filename));
    const heroFile = nonParentsImages[0] || null;

    // Gallery: all remaining non-_parents images after the hero
    const galleryFiles = nonParentsImages.slice(1);

    console.log(`  Hero: ${heroFile ? heroFile.filename : "none"}`);
    console.log(`  Gallery: ${galleryFiles.length} photo(s)`);

    const doc = {
      _id: docId,
      _type: "cat",
      name: cat.name,
      role: cat.role,
      color: cat.color,
      traits: cat.traits,
      health: cat.health,
      order: cat.order,
    };

    // Upload hero
    if (heroFile) {
      const assetId = await uploadImage(heroFile.fullPath);
      doc.image = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        hotspot: { x: 0.5, y: 0.5, height: 0.6, width: 0.8 },
        crop: { top: 0, bottom: 0, left: 0, right: 0 },
      };
    }

    // Upload gallery
    if (galleryFiles.length > 0) {
      const gallery = [];
      for (const { filename, fullPath } of galleryFiles) {
        const assetId = await uploadImage(fullPath);
        const key = basename(filename, extname(filename)).replace(/[^a-zA-Z0-9_-]/g, "_");
        gallery.push({
          _type: "image",
          _key: key,
          asset: { _type: "reference", _ref: assetId },
          hotspot: { x: 0.5, y: 0.5, height: 0.6, width: 0.8 },
          crop: { top: 0, bottom: 0, left: 0, right: 0 },
        });
      }
      doc.gallery = gallery;
    }

    // Upload PDF
    if (cat.pdfName) {
      const pdfFile = pdfs.find((p) => p.filename === cat.pdfName);
      if (pdfFile) {
        const assetId = await uploadPdf(pdfFile.fullPath);
        doc.wisdomPanelPdf = {
          _type: "file",
          asset: { _type: "reference", _ref: assetId },
        };
        console.log(`  PDF: uploaded`);
      } else {
        console.warn(`  WARNING: PDF not found: ${cat.pdfName}`);
      }
    } else {
      console.log(`  PDF: skipped (none specified)`);
    }

    transaction.createOrReplace(doc);
    console.log(`  Queued document: ${docId}\n`);
  }

  console.log("Committing transaction...");
  await transaction.commit();
  console.log(`Done. Created/replaced ${cats.length} cat documents in Sanity.\n`);

  // Patch siteSettings with parentsBannerImage if found
  if (parentsFiles.length > 0) {
    const bannerFile = parentsFiles[0];
    console.log(`Found parents banner image: ${bannerFile.filename}`);
    const bannerAssetId = await uploadImage(bannerFile.fullPath);
    await client.patch("siteSettings").set({
      parentsBannerImage: {
        _type: "image",
        asset: { _type: "reference", _ref: bannerAssetId },
        hotspot: { x: 0.5, y: 0.5, height: 0.6, width: 1.0 },
        crop: { top: 0, bottom: 0, left: 0, right: 0 },
      },
    }).commit();
    console.log("Patched siteSettings.parentsBannerImage.\n");
  } else {
    console.log("No _parents banner image found. Skipping parentsBannerImage patch.");
  }

  console.log("Sanity Studio: https://pampered-feline.sanity.studio/");
}

run().catch((err) => {
  console.error("Upload failed:", err.message);
  process.exit(1);
});
