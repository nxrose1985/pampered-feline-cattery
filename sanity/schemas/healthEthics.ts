import { defineType, defineField } from "sanity";

export const healthEthics = defineType({
  name: "healthEthics",
  title: "Health & Ethics",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Health & Ethical Practices",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 3,
      description: "Opening paragraph for the Health & Ethics section.",
    }),
    defineField({
      name: "echocardiogramSection",
      title: "Echocardiogram Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "text",
          rows: 5,
        }),
      ],
    }),
    defineField({
      name: "geneticTestingSection",
      title: "Genetic Testing Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "content",
          title: "Content",
          type: "text",
          rows: 5,
        }),
      ],
    }),
    defineField({
      name: "retirementPolicy",
      title: "Retirement Policy",
      type: "text",
      rows: 3,
      description: "Lifetime care statement — breeding cats stay with us for life.",
    }),
    defineField({
      name: "breedingFrequency",
      title: "Breeding Frequency",
      type: "text",
      rows: 3,
      description: "Queen litter frequency limit statement.",
    }),
    defineField({
      name: "additionalPractices",
      title: "Additional Practices",
      type: "array",
      of: [
        {
          name: "practice",
          title: "Practice",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Health & Ethics" };
    },
  },
});
