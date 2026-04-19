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
  litter: string;
  price?: number;
  isPolydactyl?: boolean;
  reservationFee?: number;
  availableDate?: string;
  breed?: string;
}

export interface SiteSettings {
  petKittenPriceMin?: number;
  petKittenPriceMax?: number;
  reservationFee?: number;
  paymentMethods?: string;
  contactEmail?: string;
  instagramHandle?: string;
  availabilityStatus?: "Kittens Available" | "Waitlist Open" | "No Kittens Available";
}

export interface Faq {
  question: string;
  answer: string;
  order?: number;
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

const kittenProjection = `{
  name,
  sex,
  color,
  personality,
  status,
  "image": image { asset-> { url } },
  order,
  litter,
  price,
  isPolydactyl,
  reservationFee,
  availableDate,
  breed
}`;

const kittenQuery = `*[_type == "kitten"] | order(order asc) ${kittenProjection}`;

const kittensByLitterQuery = `*[_type == "kitten" && litter == $litter] | order(order asc) ${kittenProjection}`;

const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  petKittenPriceMin,
  petKittenPriceMax,
  reservationFee,
  paymentMethods,
  contactEmail,
  instagramHandle,
  availabilityStatus
}`;

const faqQuery = `*[_type == "faq"] | order(order asc) {
  question,
  answer,
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

export async function getKittensByLitter(litterId: string): Promise<Kitten[]> {
  const client = getClient();
  if (!client) return [];

  try {
    return await client.fetch<Kitten[]>(kittensByLitterQuery, { litter: litterId });
  } catch (error) {
    console.error("Failed to fetch kittens by litter from Sanity:", error);
    return [];
  }
}

const fallbackSettings: SiteSettings = {
  petKittenPriceMin: undefined,
  petKittenPriceMax: undefined,
  reservationFee: 500,
  paymentMethods: "[PLACEHOLDER — payment methods]",
  contactEmail: "[PLACEHOLDER — email]",
  instagramHandle: "[PLACEHOLDER — instagram]",
  availabilityStatus: "Waitlist Open",
};

export async function getSettings(): Promise<SiteSettings> {
  const client = getClient();
  if (!client) return fallbackSettings;

  try {
    const result = await client.fetch<SiteSettings | null>(siteSettingsQuery);
    return result ?? fallbackSettings;
  } catch (error) {
    console.error("Failed to fetch site settings from Sanity:", error);
    return fallbackSettings;
  }
}

const fallbackFaqs: Faq[] = [
  { question: "Where are you located?", answer: "We are located in Northern Virginia.", order: 1 },
  { question: "Do you ship kittens?", answer: "[PLACEHOLDER — shipping/transport policy wording to be confirmed by Sara]", order: 2 },
  { question: "When do kittens go home?", answer: "Kittens go home between 12 and 16 weeks of age. This allows time for proper socialization, vaccines, and development.", order: 3 },
  { question: "How are kittens socialized?", answer: "Kittens are raised in our home with daily hands-on interaction from birth. They are exposed to household sounds, people, and gentle handling throughout their first weeks.", order: 4 },
  { question: "Do you offer breeding rights?", answer: "[PLACEHOLDER — breeding rights policy to be confirmed by Sara]", order: 5 },
  { question: "What payment methods do you accept?", answer: "[PLACEHOLDER — payment methods to be confirmed by Sara]", order: 6 },
];

export async function getFaqs(): Promise<Faq[]> {
  const client = getClient();
  if (!client) return fallbackFaqs;

  try {
    const result = await client.fetch<Faq[]>(faqQuery);
    return result.length > 0 ? result : fallbackFaqs;
  } catch (error) {
    console.error("Failed to fetch FAQs from Sanity:", error);
    return fallbackFaqs;
  }
}
