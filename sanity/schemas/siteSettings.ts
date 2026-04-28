import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish", "discardChanges"],
  fields: [
    defineField({
      name: "petKittenPriceMin",
      title: "Pet Kitten Price — Starting (USD)",
      type: "number",
    }),
    defineField({
      name: "petKittenPriceMax",
      title: "Pet Kitten Price — Top (USD)",
      type: "number",
    }),
    defineField({
      name: "reservationFee",
      title: "Reservation Fee (USD)",
      type: "number",
      initialValue: 500,
    }),
    defineField({
      name: "paymentMethods",
      title: "Payment Methods",
      type: "string",
      description: 'e.g. "Zelle, Venmo, cash"',
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
      description: "Without the @ symbol.",
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status",
      type: "string",
      options: {
        list: [
          { title: "Kittens Available", value: "Kittens Available" },
          { title: "Waitlist Open", value: "Waitlist Open" },
          { title: "No Kittens Available", value: "No Kittens Available" },
        ],
      },
      initialValue: "Waitlist Open",
    }),
    defineField({
      name: "parentsBannerImage",
      title: "Parents Together Banner Image",
      type: "image",
      options: { hotspot: true },
      description: "Full-width banner image showing the sire and dam together (used above Meet the Parents section).",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
