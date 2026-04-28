/**
 * Patch kitten documents in Sanity with about text and slug fields.
 *
 * Usage:
 *   node scripts/patch-kitten-about.mjs
 *
 * Requires SANITY_WRITE_TOKEN in .env (or environment).
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
// Also try main project root (3 levels up from worktree)
loadEnv(join(projectRoot, "../../../.env"));

const projectId = process.env.SANITY_PROJECT_ID || "k6e71wky";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\nError: SANITY_WRITE_TOKEN not found.\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

const kittens = [
  {
    id: "kitten-helion",
    slug: "helion",
    about: `Helion carries himself like he knows exactly how good-looking he is. His cream shaded silver coat shifts from pale champagne at the tips to a bright silver undercoat — in the right light he almost glows. He is steady and confident without being pushy, the kind of cat who settles into a new home on his own terms and then decides he owns it. He will do well in an active household and is likely to become his person's shadow. Named for the High Lord of the Day Court — radiant, unhurried, and completely sure of himself.`,
  },
  {
    id: "kitten-tarquin",
    slug: "tarquin",
    about: `Tarquin is the easygoing one. Where his cream shaded silver littermates are bold, Tarquin is warm — quick to purr, slow to startle, and genuinely happy in anyone's lap. His coat has the same luminous silver-cream shimmer as Helion's but his personality is softer, more collaborative. He would thrive as a companion for another cat or as the gentle anchor of a busy family home. Named for the High Lord of the Summer Court — generous, open, and deeply kind.`,
  },
  {
    id: "kitten-kallias",
    slug: "kallias",
    about: `Kallias is the one who stops people mid-scroll. The cream shaded silver coat is already striking, but add six toes on each front paw and he becomes something genuinely rare. He is curious and physical — the kitten who investigates everything, climbs everything, and figures things out faster than you expect. His extra toes give him remarkable dexterity; don't be surprised if he learns to open things. He needs a home that will keep up with him. Named for the High Lord of the Winter Court — precise, capable, and quietly extraordinary.`,
  },
  {
    id: "kitten-azriel",
    slug: "azriel",
    about: `Azriel is cool-toned and watchful, with a blue silver tabby coat that photographs like smoke and steel. His tabby stripes are crisp, his silver undercoat deep, and his six-toed front paws give him a presence that is hard to ignore. He takes his time warming up to new people but once he decides you're his, he is loyal and close. He will likely bond deeply with one or two people in the household. Named for the shadowsinger — quiet, observant, and fiercely devoted to those he loves.`,
  },
  {
    id: "kitten-lucien",
    slug: "lucien",
    about: `Lucien is the warm one. His red tabby coat is rich and saturated — copper and amber in sunlight, deep auburn in shadow — and his seven-toed front paws make him look like he was built for adventure. He is outgoing and social, the first to greet a stranger and the last to stop playing. Red tabbies have a reputation for personality and Lucien earns it. He would do well in a home with kids, dogs, or other cats. Named for Elain's mate — resilient, vivid, and impossible not to love.`,
  },
  {
    id: "kitten-morrigan",
    slug: "morrigan",
    about: `Morrigan's coat is a study in contrasts — soft blue-grey patches against warm cream, scattered in the random, unrepeatable pattern that makes every tortie one of a kind. She is sharp and spirited, with the classic tortitude that tortie owners know well: she has opinions, she will share them, and she will make you laugh doing it. She is also deeply affectionate with the people she chooses. Named for the most powerful High Fae in the Night Court — fierce, funny, and completely herself.`,
  },
  {
    id: "kitten-amren",
    slug: "amren",
    about: `Amren is compact, watchful, and quietly intense. Her blue tortie coat is softer in tone than Morrigan's — more muted blue, less contrast — which gives her a silvery, ethereal quality that suits her personality. She observes before she engages, sizes up a room before she enters it, and reserves her affection for people who have earned it. When she decides you're worth her time, you'll know. Named for the ancient, unknowable second-in-command of the Night Court — small, still, and not to be underestimated.`,
  },
  {
    id: "kitten-elain",
    slug: "elain",
    about: `Elain is reserved — both in temperament and status. Her blue shaded silver polydactyl coat is soft and cool-toned, and her six-toed paws give her a quiet elegance that matches her personality. She warms slowly, prefers gentle handling, and rewards patience with deep loyalty. She is the kind of cat who will choose you, not the other way around.`,
  },
];

async function run() {
  for (const k of kittens) {
    try {
      await client
        .patch(k.id)
        .set({ about: k.about, slug: { _type: "slug", current: k.slug } })
        .commit();
      console.log(`✓ Patched ${k.id} (slug: ${k.slug})`);
    } catch (err) {
      console.error(`✗ Failed to patch ${k.id}:`, err.message);
    }
  }
  console.log("\nDone.");
}

run();
