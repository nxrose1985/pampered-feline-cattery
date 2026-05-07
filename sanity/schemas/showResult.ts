import { defineType, defineField } from "sanity";

export const showResult = defineType({
  name: "showResult",
  title: "Show Result",
  type: "document",
  fields: [
    defineField({
      name: "catName",
      title: "Cat Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      options: {
        list: [
          { title: "CFA", value: "CFA" },
          { title: "TICA", value: "TICA" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleEarned",
      title: "Title Earned",
      type: "string",
      description: "e.g. Champion, Grand Champion, Regional Winner",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showDate",
      title: "Show Date",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Show Location",
      type: "string",
      description: "e.g. Greater Baltimore Cat Club, Baltimore, MD",
    }),
    defineField({
      name: "certificatePDF",
      title: "Championship Certificate PDF",
      type: "file",
      description: "Upload the championship certificate PDF.",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "catName",
      subtitle: "titleEarned",
    },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
