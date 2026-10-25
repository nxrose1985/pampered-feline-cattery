// One-off content update for the winter litter arrival (2026-10-25).
//
// Follows the standing write-safety rule in scripts/README.md:
//   1. Dumps every target document (and any draft of it) to a timestamped
//      JSON file before writing anything.
//   2. --dry-run prints every intended change and writes nothing.
//   3. Targets documents by explicit _id only, guarded by _rev so a document
//      edited in Studio since the dump is not overwritten.
//
// All patches go out in one transaction. Note that the Sanity -> Netlify
// webhook fires once per changed document, so this still sends one build
// ping per document below.
//
// Usage (from the project root):
//   node scripts/update-winter-litter-content.mjs --dry-run
//   node scripts/update-winter-litter-content.mjs

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "node:fs";

const DRY_RUN = process.argv.includes("--dry-run");

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()]),
);

const client = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  token: env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const PAIR_FAQ_ID = "6ebe5d2e-fceb-4e8b-ac99-4b044fe70d42";

const changes = [
  {
    id: "siteSettings",
    set: {
      "announcement.eyebrow": "Winter Litter",
      "announcement.headline": "Our winter litter is here. Eight kittens, born October 11.",
      "announcement.ctaLabel": "Meet the Litter",
      "announcement.ctaHref": "/#winter-litter",
      "winterLitter.birthDate": "2026-10-11",
      "winterLitter.eyebrow": "Winter 2026 Litter",
      "winterLitter.heading": "Our Winter Litter Has Arrived",
      "winterLitter.body":
        "Eight kittens from Aedion and Feyre, the same pairing as our spring litter. They were born in our home and are handled every day, raised underfoot until they go home in January.",
      "winterLitter.subCta":
        "Joining the waitlist is free. Waitlist families hear first about every new litter. Text or call us at (949) 606-5919 with any questions.",
      "winterLitter.updates": [],
    },
    unset: ["announcement.body", "winterLitter.goHomeWindow"],
  },
  {
    id: "faq-6",
    expectQuestion: "When can my kitten come home?",
    set: {
      answer:
        "Kittens go home at 12 weeks of age. Our winter litter was born October 11, 2026 and goes home in January 2027. Our next litter is planned for spring or summer 2027. Kittens may be held longer if a health concern arises.",
    },
  },
  {
    id: "faq-15",
    expectQuestion: "Do you have a waiting list?",
    set: {
      answer:
        "Yes. Our winter litter was born October 11, 2026, and our next litter is planned for spring or summer 2027. Kittens go home at 12 weeks after their vaccinations and vet clearance. Joining the waiting list is free. Reach us at 949-606-5919 or pamperedfelinemainecoons@gmail.com with any questions.",
    },
  },
  {
    id: PAIR_FAQ_ID,
    expectQuestion: "Do you offer a discount for multiple kittens?",
    set: {
      answer:
        "Yes. Maine Coons are deeply social and bond closely with their companions. Many of our families choose two so the kittens always have each other, especially when the house is empty during the day. We take $1,000 off the total when you welcome a pair.",
    },
  },
];

const ids = changes.map((c) => c.id);
const allIds = [...ids, ...ids.map((id) => `drafts.${id}`)];

const docs = await client.fetch(`*[_id in $ids]`, { ids: allIds });
const byId = Object.fromEntries(docs.map((d) => [d._id, d]));

// 1. Dump first, always, including on a dry run.
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupPath = `winter-litter-backup-${stamp}.json`;
writeFileSync(backupPath, JSON.stringify(docs, null, 2));
console.log(`Backed up ${docs.length} document(s) to ${backupPath}`);

// 2. Guards: every target exists, is the document we think it is, and has
// no unpublished draft that would hide or later overwrite this change.
for (const c of changes) {
  const doc = byId[c.id];
  if (!doc) throw new Error(`Missing document ${c.id}. Aborting, nothing written.`);
  if (c.expectQuestion && doc.question !== c.expectQuestion) {
    throw new Error(`${c.id} question is "${doc.question}", expected "${c.expectQuestion}". Aborting.`);
  }
  if (byId[`drafts.${c.id}`]) {
    throw new Error(`${c.id} has an unpublished draft in Studio. Publish or discard it first. Aborting.`);
  }
}

function get(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

for (const c of changes) {
  const doc = byId[c.id];
  console.log(`\n${c.id} (rev ${doc._rev})`);
  for (const [path, value] of Object.entries(c.set)) {
    console.log(`  set   ${path}`);
    console.log(`        was: ${JSON.stringify(get(doc, path))}`);
    console.log(`        now: ${JSON.stringify(value)}`);
  }
  for (const path of c.unset ?? []) {
    console.log(`  unset ${path} (was: ${JSON.stringify(get(doc, path))})`);
  }
}

if (DRY_RUN) {
  console.log("\nDry run. Nothing written.");
  process.exit(0);
}

const tx = client.transaction();
for (const c of changes) {
  tx.patch(c.id, (p) => {
    let patch = p.ifRevisionId(byId[c.id]._rev).set(c.set);
    if (c.unset?.length) patch = patch.unset(c.unset);
    return patch;
  });
}
const result = await tx.commit();
console.log(`\nCommitted transaction ${result.transactionId} (${result.results.length} document(s)).`);
