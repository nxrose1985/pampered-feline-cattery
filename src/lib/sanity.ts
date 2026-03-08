import { createClient, type SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

function getClient(): SanityClient | null {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) return null;

  if (!_client) {
    _client = createClient({
      projectId,
      dataset: import.meta.env.SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }
  return _client;
}

// ── Types ──────────────────────────────────────────────

export interface Cat {
  name: string;
  role: "king" | "queen";
  color: string;
  traits: string;
  health: string;
  image?: {
    asset: {
      url: string;
    };
  };
  order: number;
}

export interface Kitten {
  name: string;
  sex: string;
  color: string;
  personality: string;
  status: "Available" | "Reserved" | "Under Evaluation";
  image?: {
    asset: {
      url: string;
    };
  };
  order: number;
}

// ── Queries ────────────────────────────────────────────

const catQuery = `*[_type == "cat"] | order(order asc) {
  name,
  role,
  color,
  traits,
  health,
  "image": image { asset-> { url } },
  order
}`;

const kittenQuery = `*[_type == "kitten"] | order(order asc) {
  name,
  sex,
  color,
  personality,
  status,
  "image": image { asset-> { url } },
  order
}`;

// ── Fetchers with Fallbacks ────────────────────────────

export async function getCats(): Promise<Cat[]> {
  const client = getClient();
  if (!client) return [];

  try {
    return await client.fetch<Cat[]>(catQuery);
  } catch (error) {
    console.error("Failed to fetch cats from Sanity:", error);
    return [];
  }
}

export async function getKittens(): Promise<Kitten[]> {
  const client = getClient();
  if (!client) return [];

  try {
    return await client.fetch<Kitten[]>(kittenQuery);
  } catch (error) {
    console.error("Failed to fetch kittens from Sanity:", error);
    return [];
  }
}
