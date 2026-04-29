/**
 * Seeds the healthEthics singleton document in Sanity with the approved content.
 * Run from the project root: node scripts/create-health-ethics.mjs
 *
 * Requires SANITY_WRITE_TOKEN in .env, or falls back to the Sanity CLI auth token.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";
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
  } catch {
    // .env not found — use existing process.env
  }
}

loadEnv(join(projectRoot, ".env"));
loadEnv(join(projectRoot, "../../../.env"));

function getToken() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN;
  // Fall back to Sanity CLI auth token
  const configPath = join(process.env.HOME || process.env.USERPROFILE || "", ".config/sanity/config.json");
  try {
    const cfg = JSON.parse(readFileSync(configPath, "utf8"));
    if (cfg.authToken) return cfg.authToken;
  } catch {}
  throw new Error(
    "No write token found. Set SANITY_WRITE_TOKEN in .env or log in with `npx sanity login`."
  );
}

const projectId = process.env.SANITY_PROJECT_ID || "k6e71wky";
const dataset = process.env.SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: getToken(),
});

const doc = {
  _id: "healthEthics",
  _type: "healthEthics",
  title: "Health & Ethical Practices",
  introduction:
    "We hold ourselves to a transparent standard. Every decision in our program starts with the health and welfare of our cats.",
  geneticTestingSection: {
    title: "Genetic Testing",
    content:
      "Our health testing program goes beyond the industry standard. Both parents in every litter receive echocardiographic screening by a board-certified veterinary cardiologist, repeated annually for males and biennially for females. This cardiac ultrasound detects structural heart changes that DNA tests cannot, since HCM in Maine Coons involves over 100 genetic variants, only one of which has an available DNA test. In addition to cardiac screening, all breeding cats receive a full Wisdom Panel genetic health screen covering 50 heritable conditions.",
  },
  echocardiogramSection: {
    title: "Heart and Joint Health",
    content:
      "DNA testing catches genetic markers. Ongoing monitoring catches what genetics alone cannot.\n\nHearts are monitored by cardiac ultrasound as cats mature. We track results over time and adjust breeding decisions based on findings.\n\nHip assessments are part of our evaluation process. Maine Coons are a large breed, and joint health matters for long-term quality of life.",
  },
  retirementPolicy:
    "Our breeding cats stay with us for life. We do not retire or rehome our kings and queens. They are family.",
  breedingFrequency:
    "Each queen is limited to 2 litters per year maximum, with appropriate rest between litters.",
  additionalPractices: [],
};

try {
  await client.createOrReplace(doc);
  console.log("✓ healthEthics document created/updated in Sanity.");
  console.log("Sara can now edit this content in Sanity Studio under Health & Ethics.");
} catch (err) {
  console.error("Failed to create healthEthics document:", err.message);
  process.exit(1);
}
