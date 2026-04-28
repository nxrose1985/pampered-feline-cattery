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
  gallery?: Array<{ asset: { url: string } }>;
  wisdomPanelPdf?: { asset: { url: string } };
  order: number;
}

export interface PersonalityAssessment {
  assessmentDate?: string;
  confidenceLevel?: number;
  energyLevel?: "Low" | "Medium" | "High";
  approachesHumans?: "Yes, immediately" | "Yes, after a moment" | "Cautiously" | "Prefers to observe";
  lapCat?: "Yes, settles right in" | "Sometimes, on their terms" | "Prefers to be nearby but not held";
  toyDrive?: string;
  hotDogTest?: "Passed" | "Interested but polite" | "Not food motivated";
  goodWithKids?: "Yes, loves them" | "Yes, tolerant" | "Not yet tested";
  goodWithDogs?: "Yes, confident" | "Curious but cautious" | "Not yet tested";
  personalitySummary?: string;
}

export interface Kitten {
  name: string;
  slug?: string;
  sex: string;
  color: string;
  personality: string;
  about?: string;
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
  personalityAssessment?: PersonalityAssessment;
  gallery?: Array<{ asset: { url: string } }>;
}

export interface SiteSettings {
  petKittenPriceMin?: number;
  petKittenPriceMax?: number;
  reservationFee?: number;
  paymentMethods?: string;
  contactEmail?: string;
  instagramHandle?: string;
  availabilityStatus?: "Kittens Available" | "Waitlist Open" | "No Kittens Available";
  parentsBannerImage?: { asset: { url: string } };
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
  "gallery": gallery[] { asset-> { url } },
  "wisdomPanelPdf": wisdomPanelPdf { asset-> { url } },
  order
}`;

const kittenProjection = `{
  name,
  "slug": slug.current,
  sex,
  color,
  personality,
  about,
  status,
  "image": image { asset-> { url } },
  order,
  litter,
  price,
  isPolydactyl,
  reservationFee,
  availableDate,
  breed,
  personalityAssessment,
  "gallery": gallery[] { asset-> { url } }
}`;

const kittenQuery = `*[_type == "kitten"] | order(order asc) ${kittenProjection}`;

const kittensByLitterQuery = `*[_type == "kitten" && litter == $litter] | order(order asc) ${kittenProjection}`;

const kittenBySlugQuery = `*[_type == "kitten" && slug.current == $slug][0] ${kittenProjection}`;

const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  petKittenPriceMin,
  petKittenPriceMax,
  reservationFee,
  paymentMethods,
  contactEmail,
  instagramHandle,
  availabilityStatus,
  "parentsBannerImage": parentsBannerImage { asset-> { url } }
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

export async function getKittenBySlug(slug: string): Promise<Kitten | null> {
  const client = getClient();
  if (!client) return null;

  try {
    return await client.fetch<Kitten | null>(kittenBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch kitten by slug from Sanity:", error);
    return null;
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
  parentsBannerImage: undefined,
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
  { question: "Why do Maine Coon kittens cost $3,600 to $4,500?", answer: "Breeding Maine Coons the right way is expensive. The national average for a well-bred Maine Coon kitten in the U.S. is around $4,000, with most reputable breeders charging $3,500 to $7,500 for pet kittens from European lines.\n\nOur pricing reflects what goes into each kitten before it ever goes home. Both parents receive cardiac ultrasounds by a board-certified veterinary cardiologist, not just a DNA swab. Those echocardiograms cost $300 to $550 per scan and are repeated annually or biennially for every breeding cat. On top of that, every cat in our program receives a Wisdom Panel genetic health screen covering 50+ conditions. We maintain CFA registration, European championship bloodlines, and a small program with limited litters and hands-on care from birth.\n\nKittens priced below $1,000 are almost always scams or backyard operations with no health testing, no pedigree, and no support after sale. If a price looks too good to be true, it is.\n\nWe price by coat rarity and polydactyly, not by sex. Every kitten gets the same health testing, socialization, veterinary care, and contract protections regardless of gender.", order: 8 },
  { question: "What is included with my kitten?", answer: "Every Pampered Feline kitten goes home with a veterinary health certificate, full vaccination records, both parents' health testing documentation (HCM echocardiogram results and Wisdom Panel genetic reports), a signed purchase agreement, a kitten care guide, a sample of their current food, transition litter, a familiar toy or blanket, and a personality assessment card describing your kitten's temperament. CFA pedigree papers are provided after you submit proof of spay or neuter from your veterinarian.", order: 9 },
  { question: "Do you have a contract? What does it cover?", answer: "Yes. Every kitten is sold with a written purchase agreement that protects the kitten first. The contract covers spay/neuter requirements (by 10 months for both sexes), indoor-only housing, no declawing, first right of refusal if you can ever no longer keep your cat, a 72-hour veterinary exam requirement, a one-year genetic health guarantee, and vaccination guidance. CFA registration papers are withheld until we receive proof of alteration from your veterinarian. A summary of our contract terms is available on our contract page. The full contract is signed at the time of deposit.", order: 10 },
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
