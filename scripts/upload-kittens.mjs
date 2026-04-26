/**
 * Upload kitten hero photos to Sanity and create/replace kitten documents.
 *
 * Usage:
 *   node scripts/upload-kittens.mjs
 *
 * Requires SANITY_WRITE_TOKEN in .env (or environment).
 * Get a token: manage.sanity.io → project k6e71wky → API → Tokens → Add API token (Editor)
 *
 * Images are read from public/images/kittens/ (searches subdirectories).
 * Only *_HERO.jpg files are used as the primary photo for each kitten.
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, basename } from "path";
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

// Kitten data — matches Sanity schema field names exactly
const kittens = [
  { name: "Helion",   color: "Cream Shaded Silver", sex: "Male",   isPolydactyl: false, price: 4000,  status: "Available", breed: "Maine Coon", litter: "march-2026", reservationFee: 400, availableDate: "2026-06-04", order: 1 },
  { name: "Tarquin",  color: "Cream Shaded Silver", sex: "Male",   isPolydactyl: false, price: 4000,  status: "Available", breed: "Maine Coon", litter: "march-2026", reservationFee: 400, availableDate: "2026-06-04", order: 2 },
  { name: "Kallias",  color: "Cream Shaded Silver", sex: "Male",   isPolydactyl: true,  price: 4500,  status: "Available", breed: "Maine Coon", litter: "march-2026", reservationFee: 400, availableDate: "2026-06-04", order: 3 },
  { name: "Azriel",   color: "Blue Silver Tabby",   sex: "Male",   isPolydactyl: true,  price: 4200,  status: "Available", breed: "Maine Coon", litter: "march-2026", reservationFee: 400, availableDate: "2026-06-04", order: 4 },
  { name: "Lucien",   color: "Red Tabby",           sex: "Male",   isPolydactyl: true,  price: 4200,  status: "Available", breed: "Maine Coon", litter: "march-2026", reservationFee: 400, availableDate: "2026-06-04", order: 5 },
  { name: "Morrigan", color: "Blue Tortie",         sex: "Female", isPolydactyl: false, price: 3600,  status: "Available", breed: "Maine Coon", litter: "march-2026", reservationFee: 400, availableDate: "2026-06-04", order: 6 },
  { name: "Amren",    color: "Blue Tortie",         sex: "Female", isPolydactyl: false, price: 3600,  status: "Available", breed: "Maine Coon", litter: "march-2026", reservationFee: 400, availableDate: "2026-06-04", order: 7 },
  { name: "Elain",    color: "Blue Shaded Silver",  sex: "Female", isPolydactyl: false, price: null,  status: "Reserved",  breed: "Maine Coon", litter: "march-2026", reservationFee: null, availableDate: "2026-06-04", order: 8 },
];

// Find all HERO images recursively under a directory
function findHeroImages(dir) {
  const results = {};
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        Object.assign(results, findHeroImages(full));
      } else if (entry.endsWith("_HERO.jpg")) {
        const name = basename(entry, "_HERO.jpg");
        results[name] = full;
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
  console.log(`  Uploading ${filename}...`);
  const asset = await client.assets.upload("image", data, {
    filename,
    contentType: "image/jpeg",
  });
  return asset._id;
}

async function run() {
  // Search this project's public/images/kittens, then the main project root if we're in a worktree
  const imageDirs = [
    process.env.IMAGES_DIR,
    join(projectRoot, "public", "images", "kittens"),
    join(projectRoot, "..", "..", "..", "public", "images", "kittens"),
  ].filter(Boolean);

  const heroImages = {};
  for (const dir of imageDirs) {
    Object.assign(heroImages, findHeroImages(dir));
  }

  console.log(`Found ${Object.keys(heroImages).length} hero images:`, Object.keys(heroImages));
  console.log();

  const transaction = client.transaction();

  for (const kitten of kittens) {
    console.log(`Processing ${kitten.name}...`);

    const docId = `kitten-${kitten.name.toLowerCase()}`;

    // Build document (omit null fields)
    const doc = {
      _id: docId,
      _type: "kitten",
      name: kitten.name,
      color: kitten.color,
      sex: kitten.sex,
      isPolydactyl: kitten.isPolydactyl,
      status: kitten.status,
      breed: kitten.breed,
      litter: kitten.litter,
      order: kitten.order,
      availableDate: kitten.availableDate,
    };

    if (kitten.price !== null) doc.price = kitten.price;
    if (kitten.reservationFee !== null) doc.reservationFee = kitten.reservationFee;

    // Upload hero image if available
    const heroPath = heroImages[kitten.name];
    if (heroPath) {
      const assetId = await uploadImage(heroPath);
      doc.image = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        hotspot: { x: 0.5, y: 0.35, height: 0.6, width: 0.8 },
        crop: { top: 0, bottom: 0, left: 0, right: 0 },
      };
      console.log(`  Image asset: ${assetId}`);
    } else {
      console.log(`  No hero image found for ${kitten.name}`);
    }

    transaction.createOrReplace(doc);
    console.log(`  Queued document: ${docId}`);
  }

  console.log("\nCommitting transaction...");
  await transaction.commit();
  console.log(`\nDone. Created/replaced ${kittens.length} kitten documents in Sanity.`);
  console.log("Sanity Studio: https://pampered-feline.sanity.studio/");
}

run().catch((err) => {
  console.error("Upload failed:", err.message);
  process.exit(1);
});
