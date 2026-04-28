import { defineType, defineField } from "sanity";

export const cat = defineType({
  name: "cat",
  title: "Cat",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "King (Stud)", value: "king" },
          { title: "Queen", value: "queen" },
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
      name: "traits",
      title: "Temperament Notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "health",
      title: "Health Testing Details",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional photos shown in the gallery carousel.",
    }),
    defineField({
      name: "wisdomPanelPdf",
      title: "Wisdom Panel PDF Report",
      type: "file",
      description: "Upload the Wisdom Panel genetic health report PDF.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
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
      subtitle: "role",
      media: "image",
    },
  },
});
