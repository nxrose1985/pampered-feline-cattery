import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

// Document types that should only ever have one document. Pinned to a fixed
// document ID in the structure below and excluded from the generic type list,
// so Studio never offers "+ Create new" for them. (This is how the three
// duplicate siteSettings documents happened — the generic list let someone
// create additional documents of a type meant to be a singleton.)
const SINGLETON_TYPES = new Set(["siteSettings"]);

export default defineConfig({
  name: "pampered-feline",
  title: "The Pampered Feline Cattery",
  projectId: "k6e71wky",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !SINGLETON_TYPES.has(listItem.getId() ?? "")
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
