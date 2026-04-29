/**
 * Replace all kitten and cat photos in Sanity with watermarked versions.
 *
 * Usage:
 *   node scripts/replace-with-watermarked.mjs
 *   node scripts/replace-with-watermarked.mjs --kittens Morrigan,Tarquin
 *   node scripts/replace-with-watermarked.mjs --cats
 *   node scripts/replace-with-watermarked.mjs --kittens Morrigan,Tarquin --cats
 *
 * Flags:
 *   --kittens NAME,NAME,...   Only process these kittens (comma-separated, no spaces)
 *   --cats [NAME,NAME,...]    Process cats (optionally filtered by name)
 *   --no-kittens              Skip kittens entirely
 *   --no-cats                 Skip cats entirely
 *
 * Requires SANITY_WRITE_TOKEN in .env.
 *
 * Watermarked kittens: public/images/kittens/watermarked/
 *   Hero:    {Name}_HERO_result.jpg
 *   Gallery: {Name}_*_result.jpg (all others)
 *
 * Watermarked cats: public/images/cats/{Name}/watermarked/
 *   Hero:    first file alphabetically (non-_parents)
 *   Gallery: remaining (non-hero, non-_parents)
 *   Parents: _parents_result.jpg → siteSettings.parentsBannerImage
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

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
  } catch { /* .env not found */ }
}

loadEnv(join(projectRoot, ".env"));
loadEnv(join(projectRoot, "../../../.env"));

const projectId = process.env.SANITY_PROJECT_ID || "k6e71wky";
const dataset   = process.env.SANITY_DATASET    || "production";
const token     = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\nError: SANITY_WRITE_TOKEN not found in .env\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

// ── CLI args ────────────────────────────────────────────

const args = process.argv.slice(2);

function parseFlag(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return null;
  const next = args[idx + 1];
  return (next && !next.startsWith("--")) ? next : "";
}

const noKittens   = args.includes("--no-kittens");
const noCats      = args.includes("--no-cats");
const kittenArg   = parseFlag("--kittens"); // null = not specified, "" = flag present but no value, "A,B" = filtered
const catArg      = parseFlag("--cats");

// If --kittens or --cats are specified, the other is skipped by default (unless also specified)
const runKittens = !noKittens && (kittenArg !== null || catArg === null);
const runCats    = !noCats    && (catArg    !== null || kittenArg === null);

const kittenFilter = kittenArg ? kittenArg.split(",").map(s => s.trim().toLowerCase()) : null;
const catFilter    = (catArg && catArg.length) ? catArg.split(",").map(s => s.trim().toLowerCase()) : null;

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png"]);

// ── Helpers ────────────────────────────────────────────

const sleep = ms => new Promise(r => setTimeout(r, ms));

function isImage(filename) {
  return IMAGE_EXTS.has(extname(filename).toLowerCase());
}

/** Read flat list of image files from a directory (non-recursive). */
function listImages(dir) {
  try {
    return readdirSync(dir)
      .filter(f => isImage(f) && statSync(join(dir, f)).isFile())
      .sort();
  } catch {
    return [];
  }
}

async function uploadAsset(fullPath, label, retries = 4) {
  const data     = readFileSync(fullPath);
  const filename = basename(fullPath);
  const ext      = extname(filename).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";
  console.log(`    Uploading ${label || filename}...`);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const asset = await client.assets.upload("image", data, { filename, contentType });
      if (attempt > 1) console.log(`      (succeeded on attempt ${attempt})`);
      return asset._id;
    } catch (err) {
      if (attempt === retries) throw err;
      const delay = attempt * 3000;
      console.warn(`      Upload failed (attempt ${attempt}/${retries}): ${err.message}. Retrying in ${delay/1000}s...`);
      await sleep(delay);
    }
  }
}

function imageRef(assetId, keyHint) {
  return {
    _type:  "image",
    _key:   keyHint || assetId.replace(/[^a-zA-Z0-9_-]/g, "_"),
    asset:  { _type: "reference", _ref: assetId },
    hotspot: { x: 0.5, y: 0.35, height: 0.6, width: 0.8 },
    crop:    { top: 0, bottom: 0, left: 0, right: 0 },
  };
}

/** Collect all old image asset IDs from a document field (image or array). */
function collectAssetIds(field) {
  if (!field) return [];
  if (Array.isArray(field)) {
    return field.flatMap(item => item?.asset?._ref ? [item.asset._ref] : []);
  }
  return field?.asset?._ref ? [field.asset._ref] : [];
}

async function deleteAssets(ids, label) {
  if (!ids.length) return;
  console.log(`    Deleting ${ids.length} old ${label} asset(s)...`);
  for (const id of ids) {
    try {
      await client.delete(id);
      console.log(`      Deleted ${id}`);
    } catch (err) {
      console.warn(`      Could not delete ${id}: ${err.message}`);
    }
  }
}

// ── Kittens ─────────────────────────────────────────────

const KITTEN_NAMES = ["Morrigan", "Tarquin", "Kallias", "Azriel", "Lucien", "Helion", "Amren", "Elain"];

/** Derive kitten name from a watermarked filename like "Helion_HERO_result.jpg". */
function kittenNameFromWatermarked(filename) {
  const base = basename(filename, extname(filename)); // e.g. "Helion_HERO_result"
  const prefix = base.split("_")[0].toLowerCase();
  return KITTEN_NAMES.find(n => n.toLowerCase() === prefix) || null;
}

async function replaceKittens(watermarkedDir) {
  const files = listImages(watermarkedDir);
  if (!files.length) {
    console.log("  No watermarked kitten images found.\n");
    return 0;
  }

  // Group by kitten name
  const byKitten = {};
  for (const f of files) {
    const name = kittenNameFromWatermarked(f);
    if (!name) { console.log(`  Skipping unrecognised file: ${f}`); continue; }
    if (!byKitten[name]) byKitten[name] = { hero: null, gallery: [] };
    if (f.toLowerCase().includes("_hero_")) {
      byKitten[name].hero = join(watermarkedDir, f);
    } else {
      byKitten[name].gallery.push(join(watermarkedDir, f));
    }
  }

  // Apply --kittens filter
  if (kittenFilter) {
    for (const name of Object.keys(byKitten)) {
      if (!kittenFilter.includes(name.toLowerCase())) delete byKitten[name];
    }
  }

  console.log(`\nFound watermarked photos for ${Object.keys(byKitten).length} kitten(s):`);
  for (const [name, { hero, gallery }] of Object.entries(byKitten)) {
    console.log(`  ${name}: ${hero ? "1 hero" : "no hero"} + ${gallery.length} gallery`);
  }

  let kittensUpdated = 0;
  let totalUploaded  = 0;

  for (const [name, { hero, gallery }] of Object.entries(byKitten)) {
    const docId = `kitten-${name.toLowerCase()}`;
    console.log(`\nProcessing ${name} (${docId})...`);

    // Fetch current doc to collect old asset IDs
    let oldHeroId    = null;
    let oldGalleryIds = [];
    try {
      const current = await client.fetch(
        `*[_id == $id][0]{ image, gallery }`,
        { id: docId }
      );
      if (current) {
        oldHeroId     = current.image?.asset?._ref || null;
        oldGalleryIds = collectAssetIds(current.gallery);
      }
    } catch (err) {
      console.warn(`  Could not fetch current doc: ${err.message}`);
    }

    const patch = {};

    // Upload hero
    if (hero) {
      const assetId = await uploadAsset(hero, `${name} hero`);
      patch.image = {
        _type:  "image",
        asset:  { _type: "reference", _ref: assetId },
        hotspot: { x: 0.5, y: 0.35, height: 0.6, width: 0.8 },
        crop:    { top: 0, bottom: 0, left: 0, right: 0 },
      };
      totalUploaded++;
    }

    // Upload gallery
    if (gallery.length) {
      const galleryRefs = [];
      for (const gPath of gallery) {
        const assetId = await uploadAsset(gPath, basename(gPath));
        const key     = basename(gPath, extname(gPath)).replace(/[^a-zA-Z0-9_-]/g, "_");
        galleryRefs.push(imageRef(assetId, key));
        totalUploaded++;
      }
      patch.gallery = galleryRefs;
    }

    if (Object.keys(patch).length) {
      await client.patch(docId).set(patch).commit();
      console.log(`  Patched ${docId}.`);
      kittensUpdated++;
    }

    // Delete old assets
    const toDelete = [
      ...(oldHeroId ? [oldHeroId] : []),
      ...oldGalleryIds,
    ].filter(Boolean);
    await deleteAssets(toDelete, "kitten");
  }

  return { kittensUpdated, totalUploaded };
}

// ── Cats ─────────────────────────────────────────────────

const CAT_NAMES = ["Aedion", "Rowan", "Feyra"];

async function replaceCats(catsBaseDir) {
  let catsUpdated   = 0;
  let totalUploaded = 0;
  let parentsAssetId = null;

  const activeCatNames = catFilter
    ? CAT_NAMES.filter(n => catFilter.includes(n.toLowerCase()))
    : CAT_NAMES;

  for (const catName of activeCatNames) {
    const watermarkedDir = join(catsBaseDir, catName, "watermarked");
    const files = listImages(watermarkedDir);

    if (!files.length) {
      console.log(`\n  No watermarked photos found for ${catName} — skipping.`);
      continue;
    }

    console.log(`\nProcessing ${catName} (${files.length} files)...`);

    const docId = `cat-${catName.toLowerCase()}`;

    // Fetch current doc to collect old asset IDs
    let oldHeroId     = null;
    let oldGalleryIds = [];
    try {
      const current = await client.fetch(
        `*[_id == $id][0]{ image, gallery }`,
        { id: docId }
      );
      if (current) {
        oldHeroId     = current.image?.asset?._ref || null;
        oldGalleryIds = collectAssetIds(current.gallery);
      }
    } catch (err) {
      console.warn(`  Could not fetch current doc: ${err.message}`);
    }

    // Separate parents banner from the rest
    const parentsFile = files.find(f => f.toLowerCase().startsWith("_parents"));
    const contentFiles = files.filter(f => !f.toLowerCase().startsWith("_parents")).sort();

    // First content file = hero; rest = gallery
    const heroFile    = contentFiles[0] || null;
    const galleryFiles = contentFiles.slice(1);

    const patch = {};

    // Upload parents banner (goes to siteSettings, store assetId for later)
    if (parentsFile && catName === "Feyra") { // Only one parents banner needed
      console.log(`  Found parents banner: ${parentsFile}`);
      parentsAssetId = await uploadAsset(join(watermarkedDir, parentsFile), "parents banner");
      totalUploaded++;
    }

    // Upload hero
    if (heroFile) {
      const assetId = await uploadAsset(join(watermarkedDir, heroFile), `${catName} hero`);
      patch.image = {
        _type:  "image",
        asset:  { _type: "reference", _ref: assetId },
        hotspot: { x: 0.5, y: 0.35, height: 0.6, width: 0.8 },
        crop:    { top: 0, bottom: 0, left: 0, right: 0 },
      };
      totalUploaded++;
    }

    // Upload gallery
    if (galleryFiles.length) {
      const galleryRefs = [];
      for (const gFile of galleryFiles) {
        const assetId = await uploadAsset(join(watermarkedDir, gFile), gFile);
        const key     = basename(gFile, extname(gFile)).replace(/[^a-zA-Z0-9_-]/g, "_");
        galleryRefs.push(imageRef(assetId, key));
        totalUploaded++;
      }
      patch.gallery = galleryRefs;
    }

    if (Object.keys(patch).length) {
      await client.patch(docId).set(patch).commit();
      console.log(`  Patched ${docId}.`);
      catsUpdated++;
    }

    // Delete old assets
    const toDelete = [
      ...(oldHeroId ? [oldHeroId] : []),
      ...oldGalleryIds,
    ].filter(Boolean);
    await deleteAssets(toDelete, "cat");
  }

  // Update parents banner in siteSettings
  if (parentsAssetId) {
    console.log("\nUpdating siteSettings.parentsBannerImage...");
    // Ensure the siteSettings document exists before patching
    await client.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
    await client.patch("siteSettings").set({
      parentsBannerImage: {
        _type:  "image",
        asset:  { _type: "reference", _ref: parentsAssetId },
        hotspot: { x: 0.5, y: 0.5, height: 0.8, width: 1.0 },
        crop:    { top: 0, bottom: 0, left: 0, right: 0 },
      },
    }).commit();
    console.log("  Parents banner image updated in siteSettings.");
  }

  return { catsUpdated, totalUploaded };
}

// ── Main ─────────────────────────────────────────────────

async function run() {
  console.log("=== Replace with Watermarked Images ===\n");
  if (kittenFilter) console.log(`  Kitten filter: ${kittenFilter.join(", ")}`);
  if (catFilter)    console.log(`  Cat filter:    ${catFilter.join(", ")}`);
  console.log();

  const kittenWatermarkedDir = join(projectRoot, "public", "images", "kittens", "watermarked");
  const catsBaseDir          = join(projectRoot, "public", "images", "cats");

  let kittenResult = { kittensUpdated: 0, totalUploaded: 0 };
  let catResult    = { catsUpdated: 0, totalUploaded: 0 };

  if (runKittens) {
    console.log("--- Kittens ---");
    kittenResult = await replaceKittens(kittenWatermarkedDir);
  } else {
    console.log("--- Kittens (skipped) ---");
  }

  if (runCats) {
    console.log("\n--- Cats ---");
    catResult = await replaceCats(catsBaseDir);
  } else {
    console.log("\n--- Cats (skipped) ---");
  }

  const totalKittens  = kittenResult.kittensUpdated || 0;
  const totalCats     = catResult.catsUpdated       || 0;
  const totalUploaded = (kittenResult.totalUploaded || 0) + (catResult.totalUploaded || 0);

  console.log("\n=== Summary ===");
  console.log(`  Kittens updated:  ${totalKittens}`);
  console.log(`  Cats updated:     ${totalCats}`);
  console.log(`  Photos uploaded:  ${totalUploaded}`);
  console.log("\nDone. Sanity Studio: https://pampered-feline.sanity.studio/");
}

run().catch((err) => {
  console.error("\nFailed:", err.message);
  process.exit(1);
});
