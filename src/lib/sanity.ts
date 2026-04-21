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
  petKittenPriceMin: 3600,
  petKittenPriceMax: 4500,
  reservationFee: 400,
  paymentMethods: "We accept Zelle and bank wire transfer. A $400 non-refundable deposit is due upon signing your purchase agreement. The remaining balance is due one week before your kitten goes home.",
  contactEmail: "pamperedfelinemainecoons@gmail.com",
  instagramHandle: "[PLACEHOLDER — instagram]",
  availabilityStatus: "Kittens Available",
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
  { question: "Do you ship kittens?", answer: "We do not ship kittens as air cargo. Kittens travel with a professional flight nanny in-cabin, or can be picked up in person at our Northern Virginia location. Flight nanny fees vary by destination and are the buyer's responsibility. We serve families nationwide. Contact us to discuss transport options for your location.", order: 2 },
  { question: "When do kittens go home?", answer: "Kittens go home at 12 weeks of age. This allows time for proper socialization, vaccines, and development.", order: 3 },
  { question: "How are kittens socialized?", answer: "Kittens are raised in our home with daily hands-on interaction from birth. They are exposed to household sounds, people, and gentle handling throughout their first weeks.", order: 4 },
  { question: "Do you offer breeding rights?", answer: "All kittens are sold on a spay/neuter contract as pet-only companions unless otherwise agreed in writing prior to purchase. Breeding rights are available on a case-by-case basis to approved CFA or TICA registered catteries with documented health testing programs. Breeding rights kittens are priced separately. Contact us to discuss.", order: 5 },
  { question: "What does a kitten cost?", answer: "Pricing is tiered by color rarity and polydactyl status. Standard pet kittens start at $3,600. Rare color kittens (silver, smoke, shaded) are $4,000. Polydactyl kittens are $4,200. Rare color polydactyl kittens are $4,500. A $400 non-refundable deposit secures your reservation and is applied to the purchase price.", order: 6 },
  { question: "What payment methods do you accept?", answer: "We accept Zelle and bank wire transfer. A $400 non-refundable deposit is due upon signing your purchase agreement. The remaining balance is due one week before your kitten goes home.", order: 7 },
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
