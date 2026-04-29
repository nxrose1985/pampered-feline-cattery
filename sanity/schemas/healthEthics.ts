import { defineType, defineField } from "sanity";

export const healthEthics = defineType({
  name: "healthEthics",
  title: "Health & Ethics",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Health & Ethical Practices",
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 3,
      description: "Opening paragraph for the Health & Ethics section.",
    }),
    defineField({
      name: "geneticTestingSection",
      title: "Genetic Testing",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "content",
          title: "Content",
          type: "text",
          rows: 5,
          description:
            "Main paragraph describing the health testing program. Do not include documentation-at-pickup language here.",
        }),
      ],
    }),
    defineField({
      name: "echocardiogramSection",
      title: "Heart and Joint Health",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "content",
          title: "Content",
          type: "text",
          rows: 5,
          description: "Paragraphs describing cardiac and joint monitoring.",
        }),
      ],
    }),
    defineField({
      name: "retirementPolicy",
      title: "Lifetime Care Statement",
      type: "text",
      rows: 2,
      description: "Statement about breeding cats staying with the cattery for life.",
    }),
    defineField({
      name: "breedingFrequency",
      title: "Breeding Frequency Statement",
      type: "text",
      rows: 2,
      description: "Statement about litter limits per queen.",
    }),
    defineField({
      name: "additionalPractices",
      title: "Additional Ethical Practices",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Practice Title", type: "string" }),
            defineField({ name: "content", title: "Description", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      description: "Optional additional ethical practices to display in the Ethical Practices section.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Health & Ethics" }),
  },
});
