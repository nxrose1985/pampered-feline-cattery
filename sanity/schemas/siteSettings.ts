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
          initialValue: "Waitlist Open",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description:
            "The main sentence, and the only part people are guaranteed to read. Keep it under about 70 characters so it stays on one line on a phone. If you leave this empty the whole bar disappears, even if the switch above is on.",
          initialValue: "Our spring kittens have all found their homes.",
        }),
        defineField({
          name: "body",
          title: "Supporting line",
          type: "string",
          description:
            "One short follow-up sentence, shown in lighter text after the headline. Optional — leave it blank if the headline says enough.",
          initialValue: "Our winter litter will be ready for their furever homes December 2026/January 2027.",
        }),
        defineField({
          name: "ctaLabel",
          title: "Button text",
          type: "string",
          description:
            'The words on the button at the end of the bar. Two or three words. Example: "Join the Waitlist". Leave blank to show no button.',
          initialValue: "Join the Waitlist",
        }),
        defineField({
          name: "ctaHref",
          title: "Button link",
          type: "string",
          description:
            'Where the button goes. Use /#waitlist for the waitlist form, /#kittens for the kitten section, or a full address like https://example.com for somewhere off the site.',
          initialValue: "/#waitlist",
        }),
      ],
    }),
    defineField({
      name: "winterLitter",
      title: "Next Litter Section",
      type: "object",
      description:
        "The large section on the home page that introduces the litter that has not arrived yet. It shows photos of the parents automatically, pulled from their profiles under Cat, so there is nothing to upload here.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "enabled",
          title: "Show the next litter section",
          type: "boolean",
          description:
            "Turn this on to show the section on the home page, off to hide it. Switch it off once the litter has arrived and the kittens are listed as Available.",
          initialValue: true,
        }),
        defineField({
          name: "eyebrow",
          title: "Small label",
          type: "string",
          description:
            'The tiny gold text above the heading, in capitals. Example: "Next Litter".',
          initialValue: "Next Litter",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description:
            "The large heading for the section. If you leave this empty the whole section disappears, even if the switch above is on.",
          initialValue: "Our Winter Litter",
        }),
        defineField({
          name: "body",
          title: "Paragraph",
          type: "text",
          rows: 4,
          description:
            "The main paragraph under the heading. Two or three sentences is about right. Press Enter twice to start a new paragraph.",
          initialValue:
            "Aedion and Feyra are expecting again. It's the pairing that gave us our spring litter — European championship lines, health-tested on both sides, raised underfoot in our home.",
        }),
        defineField({
          name: "goHomeWindow",
          title: "When kittens go home",
          type: "string",
          description:
            'Shown on its own line, under the paragraph. Always describe when kittens go home, never when they are born. Narrow it here once the litter is confirmed. Example: "Ready for their forever homes December 2026 through January 2027".',
          initialValue: "Ready for their forever homes December 2026 through January 2027",
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
