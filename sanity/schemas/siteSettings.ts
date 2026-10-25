import { defineType, defineField, defineArrayMember } from "sanity";

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
      name: "announcement",
      title: "Site-Wide Announcement Bar",
      type: "object",
      description:
        "The slim bar that sits directly under the navigation on every page of the site. Use it for one short, timely message — a litter update, a waitlist opening, a holiday note. Leave it switched off when there is nothing worth saying.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "enabled",
          title: "Show the announcement bar",
          type: "boolean",
          description:
            "Turn this on to show the bar, off to hide it completely. If you have never touched this switch, the bar follows your Availability Status above: it shows whenever that is set to Waitlist Open or No Kittens Available, and hides when it is set to Kittens Available.",
          initialValue: true,
        }),
        defineField({
          name: "eyebrow",
          title: "Small label",
          type: "string",
          description:
            'The tiny gold text at the start of the bar, in capitals. Two or three words. Example: "Waitlist Open".',
          initialValue: "Winter Litter",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description:
            "The main sentence, and the only part people are guaranteed to read. Keep it under about 70 characters so it stays on one line on a phone. If you leave this empty the whole bar disappears, even if the switch above is on.",
          initialValue: "Our winter litter is here. Eight kittens, born October 11.",
        }),
        defineField({
          name: "body",
          title: "Supporting line",
          type: "string",
          description:
            "One short follow-up sentence, shown in lighter text after the headline. Optional — leave it blank if the headline says enough.",
        }),
        defineField({
          name: "ctaLabel",
          title: "Button text",
          type: "string",
          description:
            'The words on the button at the end of the bar. Two or three words. Example: "Meet the Litter". Leave blank to show no button.',
          initialValue: "Meet the Litter",
        }),
        defineField({
          name: "ctaHref",
          title: "Button link",
          type: "string",
          description:
            'Where the button goes. Use /#winter-litter for the litter section, /#waitlist for the waitlist form, or a full address like https://example.com for somewhere off the site.',
          initialValue: "/#winter-litter",
        }),
      ],
    }),
    defineField({
      name: "winterLitter",
      title: "Litter Section",
      type: "object",
      description:
        "The large section near the top of the home page for the litter we are raising now. It shows the kittens' age, a timeline of what happens as they grow, your photo updates, and the parents (pulled automatically from their profiles under Cat).",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "enabled",
          title: "Show the litter section",
          type: "boolean",
          description:
            "Turn this on to show the section on the home page, off to hide it. Leave it on while the kittens are growing.",
          initialValue: true,
        }),
        defineField({
          name: "eyebrow",
          title: "Small label",
          type: "string",
          description:
            'The tiny gold text above the heading, in capitals. Example: "Winter 2026 Litter".',
          initialValue: "Winter 2026 Litter",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description:
            "The large heading for the section. If you leave this empty the whole section disappears, even if the switch above is on.",
          initialValue: "Our Winter Litter Has Arrived",
        }),
        defineField({
          name: "body",
          title: "Paragraph",
          type: "text",
          rows: 4,
          description:
            "The main paragraph under the heading. Two or three sentences is about right. Press Enter twice to start a new paragraph.",
          initialValue:
            "Eight kittens from Aedion and Feyre, the same pairing as our spring litter. They were born in our home and are handled every day, raised underfoot until they go home in January.",
        }),
        defineField({
          name: "birthDate",
          title: "Birth date",
          type: "date",
          description:
            "The day the litter was born. The site uses it to show the kittens' age and to light up the timeline, and it updates by itself every day. Leave it empty to hide the age and the timeline.",
        }),
        defineField({
          name: "goHomeWindow",
          title: "When kittens go home (optional)",
          type: "string",
          description:
            'Only shown when there is no birth date above. Leave it blank while the age is showing. Example: "Going home in January".',
        }),
        defineField({
          name: "sire",
          title: "Father of this litter",
          type: "reference",
          to: [{ type: "cat" }],
          options: { filter: 'role == "king"' },
          description:
            "Pick the father from your cats. His photo, name, and colour come straight from his profile under Cat, so updating him there updates this section too. Leave either parent empty and the pair of photos is hidden, while the rest of the section still shows.",
        }),
        defineField({
          name: "dam",
          title: "Mother of this litter",
          type: "reference",
          to: [{ type: "cat" }],
          options: { filter: 'role == "queen"' },
          description:
            "Pick the mother from your cats. Her photo, name, and colour come from her profile in the same way.",
        }),
        defineField({
          name: "ctaLabel",
          title: "Button text",
          type: "string",
          description:
            'The words on the button at the bottom of the section. Leave blank to show no button.',
          initialValue: "Join the Waitlist",
        }),
        defineField({
          name: "ctaHref",
          title: "Button link",
          type: "string",
          description:
            "Where the button goes. Use /#waitlist to send people to the waitlist form further down the same page.",
          initialValue: "/#waitlist",
        }),
        defineField({
          name: "subCta",
          title: "Small print under the button",
          type: "text",
          rows: 3,
          description:
            "The short note directly beneath the button. Use it to say plainly what joining the waitlist does and does not commit someone to, so nobody is surprised later. Leave blank to show nothing.",
          initialValue:
            "Joining the waitlist is free. Waitlist families hear first about every new litter. Text or call us at (949) 606-5919 with any questions.",
        }),
        defineField({
          name: "updates",
          title: "Photo updates",
          type: "array",
          description:
            "One entry per batch of photos. Add a new entry at the top each time, pick the date, add a short caption if you like, upload the photos, then Publish once. The newest entry shows first on the site and older ones fold away underneath it.",
          of: [
            defineArrayMember({
              type: "object",
              name: "litterUpdate",
              title: "Photo update",
              fields: [
                defineField({
                  name: "date",
                  title: "Date",
                  type: "date",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  description:
                    "One short line. Do not mention buyers, reservations, picks, or where a kitten is going.",
                  validation: (rule) => rule.max(140),
                }),
                defineField({
                  name: "photos",
                  title: "Photos",
                  type: "array",
                  of: [{ type: "image", options: { hotspot: true } }],
                  options: { layout: "grid" },
                  validation: (rule) => rule.required().min(1),
                }),
              ],
              preview: {
                select: { date: "date", caption: "caption", media: "photos.0" },
                prepare({ date, caption, media }) {
                  return { title: date ?? "No date", subtitle: caption, media };
                },
              },
            }),
          ],
        }),
      ],
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
