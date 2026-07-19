import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],
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
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: 'e.g. "(703) 555-0123". Displayed as a tappable call/text link across the site.',
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
    defineField({
      name: "heroImages",
      title: "Homepage Hero Background Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the photo for screen readers (optional).",
            }),
          ],
        },
      ],
      description: "4 to 6 photos that slowly crossfade behind the homepage headline. Upload here and publish, no code changes needed.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
