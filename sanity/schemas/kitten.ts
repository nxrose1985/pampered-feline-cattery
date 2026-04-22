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
    defineField({
      name: "personalityAssessment",
      title: "Personality Assessment",
      type: "object",
      fields: [
        defineField({
          name: "assessmentDate",
          title: "Assessment Date",
          type: "date",
        }),
        defineField({
          name: "confidenceLevel",
          title: "Confidence Level (1-10)",
          type: "number",
          description: "1 = hides under furniture, 10 = owns every room",
          validation: (rule) => rule.min(1).max(10),
        }),
        defineField({
          name: "energyLevel",
          title: "Energy Level",
          type: "string",
          options: {
            list: ["Low", "Medium", "High"],
          },
        }),
        defineField({
          name: "approachesHumans",
          title: "Approaches Humans",
          type: "string",
          options: {
            list: [
              "Yes, immediately",
              "Yes, after a moment",
              "Cautiously",
              "Prefers to observe",
            ],
          },
        }),
        defineField({
          name: "lapCat",
          title: "Lap Cat",
          type: "string",
          options: {
            list: [
              "Yes, settles right in",
              "Sometimes, on their terms",
              "Prefers to be nearby but not held",
            ],
          },
        }),
        defineField({
          name: "toyDrive",
          title: "Toy Drive",
          type: "string",
          description: "What kinds of play does this kitten enjoy? Max 200 characters.",
          validation: (rule) => rule.max(200),
        }),
        defineField({
          name: "hotDogTest",
          title: "Hot Dog Test",
          type: "string",
          description: "Food motivation assessment",
          options: {
            list: ["Passed", "Interested but polite", "Not food motivated"],
          },
        }),
        defineField({
          name: "goodWithKids",
          title: "Good With Kids",
          type: "string",
          options: {
            list: ["Yes, loves them", "Yes, tolerant", "Not yet tested"],
          },
        }),
        defineField({
          name: "goodWithDogs",
          title: "Good With Dogs",
          type: "string",
          options: {
            list: ["Yes, confident", "Curious but cautious", "Not yet tested"],
          },
        }),
        defineField({
          name: "personalitySummary",
          title: "Personality Summary",
          type: "text",
          description:
            "Buyer-facing paragraph. Same voice as breeding cat profiles. Max 500 characters.",
          validation: (rule) => rule.max(500),
        }),
      ],
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
