import { defineType, defineField } from "sanity";

export const kitten = defineType({
  name: "kitten",
  title: "Kitten",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sex",
      title: "Sex",
      type: "string",
      options: {
        list: [
          { title: "Male", value: "Male" },
          { title: "Female", value: "Female" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color / Pattern",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "personality",
      title: "Personality Note",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "Available" },
          { title: "Reserved", value: "Reserved" },
          { title: "Under Evaluation", value: "Under Evaluation" },
        ],
      },
      validation: (rule) => rule.required(),
      initialValue: "Available",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
    defineField({
      name: "litter",
      title: "Litter",
      type: "string",
      description: 'Identifier for the litter, e.g. "march-2026".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      description: "Kitten price in dollars.",
    }),
    defineField({
      name: "isPolydactyl",
      title: "Polydactyl",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "reservationFee",
      title: "Reservation Fee (USD)",
      type: "number",
      initialValue: 500,
    }),
    defineField({
      name: "availableDate",
      title: "Earliest Go-Home Date",
      type: "date",
    }),
    defineField({
      name: "breed",
      title: "Breed",
      type: "string",
      description: 'e.g. "Maine Coon".',
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "status",
      media: "image",
    },
  },
});
