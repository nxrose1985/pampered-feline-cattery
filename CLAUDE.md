# Pampered Feline Maine Coons — Website Project Handoff

## What This Is

This is the full context file for building the Pampered Feline Maine Coons website from scratch. Read this entire file before doing anything. The goal is a luxury, boutique-feel Maine Coon cattery website that looks premium, loads fast, and converts qualified kitten buyers.

---

## Project Owner

- **Cattery name:** Pampered Feline Maine Coons
- **Owner:** Sara Corry
- **Location:** Northern Virginia
- **Domain:** pamperedfelinemainecoons.com — registered at GoDaddy
- **Email:** TBD — professional email recommended (Google Workspace, $6/month)
- **Instagram:** TBD

---

## Related Businesses (Same Owner — Do Not Confuse)

| Business | Platform | Notes |
|---|---|---|
| Pampered Ferret store | Shopify | thepamperedferret.com |
| Pampered Feline cat treats / food | Shopify | Separate Shopify store, separate domain |
| Pampered Feline Maine Coons cattery | To build — Astro + Netlify | pamperedfelinemainecoons.com |

The cattery site is completely separate from the cat treat Shopify store. They share brand language but serve different audiences and live on different platforms.

---

## Core Goal

Build a polished, luxury-positioned website for a small Maine Coon cattery. The site targets prospective kitten buyers first. Secondary audiences include show-home prospects and future breeding program contacts.

The site must:
- Feel exclusive, curated, and calm — not mass-market
- Convert qualified leads through a contact/application form
- Rank for Maine Coon buyer-intent keywords (Northern Virginia + national luxury market)
- Showcase cats and kittens with strong photography
- Signal health-focused, ethical breeding

The guiding brand concept: **small program, high standards.**

---

## Stack Decision — CONFIRMED

**Astro + Tailwind + Sanity CMS + Netlify**

### Why This Stack

**Astro** is the framework. It builds pages into fast static HTML. Almost no JavaScript ships to the browser. Perfect for a content site like this. Better Lighthouse scores than Next.js for mostly-static content.

**Tailwind** handles all styling. Utility classes written directly in components. No separate CSS files to manage.

**Sanity CMS** is Sara's dashboard. She logs in, adds a kitten listing, updates availability, hits publish. No code required. Free tier covers this site (up to 2 users, 10GB storage).

**Netlify** hosts the site. Free tier. Connects to GitHub. Every push triggers an automatic rebuild and deploy. Built-in CDN, contact form handling, and SSL included.

### Domain Connection Plan

1. Build and deploy site on Netlify first
2. Netlify assigns a temporary URL (e.g. pampered-feline.netlify.app)
3. Log into GoDaddy DNS settings for pamperedfelinemainecoons.com
4. Update nameservers or A record to point at Netlify (Netlify provides exact values)
5. SSL certificate activates automatically
6. DNS propagates within an hour

### What Was Ruled Out and Why

| Tool | Verdict | Reason |
|---|---|---|
| GoDaddy hosting | No | Shared hosting, slow, designed for WordPress |
| Squarespace / Wix | No | Limits design control and SEO flexibility |
| Next.js | Fallback only | Better for web apps; overkill for a static cattery site |
| Vercel | Not needed here | Pairs with Next.js; Netlify pairs better with Astro |
| Hugo | No | Harder templating, less CMS-friendly |
| S3 + CloudFront | No | Overkill; Netlify's CDN handles this |
| Bunny CDN | No | Overkill at this traffic level |
| Supabase | Not for this site | Correct tool for the inventory app and TPF tools suite |
| React standalone | No | Astro handles rendering here |

### Note on the Broader Tech Ecosystem

These tools belong to other projects, not this site:

**React + Next.js** — for the inventory app and TPF tools suite. Those apps need real interactivity: forms, state, user sessions, dynamic data.

**Vercel** — hosts Next.js apps. Use it for the inventory app and tools suite.

**Supabase** — database and backend for the inventory app. Handles user login, data storage, and querying. Free tier covers small internal tools.

Full picture across all projects:

| Project | Framework | CMS / Database | Hosting | Domain |
|---|---|---|---|---|
| Cattery website | Astro | Sanity | Netlify | pamperedfelinemainecoons.com |
| Cat treat store | Shopify | Shopify | Shopify | TBD |
| Ferret store | Shopify | Shopify | Shopify | thepamperedferret.com |
| Inventory app / TPF tools | Next.js + React | Supabase | Vercel | TBD |

---

## Git and GitHub — How It Works

Git is version control. It tracks every change to code and lets you roll back to any previous state.

Your code lives in two places:
- **Local:** Your computer (C:\Projects\pampered-feline)
- **Remote:** GitHub (cloud copy, also triggers Netlify deploys)

### The Four Commands You Need Daily

```powershell
git add .
git commit -m "describe what changed"
git push
git pull
```

Push triggers Netlify to rebuild and redeploy automatically. The live site updates in about 60 seconds.

### One-Time Setup

```powershell
winget install Git.Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Create a free account at github.com. Claude Code walks through connecting the repo in the first session.

---

## File Structure

```
C:\Projects\
└── pampered-feline\
    ├── CLAUDE.md
    ├── astro.config.mjs
    ├── tailwind.config.mjs
    ├── tsconfig.json
    ├── package.json
    ├── .gitignore
    ├── public\
    │   └── images\
    │       ├── hero\
    │       ├── cats\
    │       └── kittens\
    └── src\
        ├── layouts\
        │   └── BaseLayout.astro
        ├── pages\
        │   ├── index.astro
        │   ├── our-cats.astro
        │   ├── kittens.astro
        │   ├── health-ethics.astro
        │   ├── faq.astro
        │   └── contact.astro
        ├── components\
        │   ├── Nav.astro
        │   ├── Footer.astro
        │   ├── Hero.astro
        │   ├── CatCard.astro
        │   ├── KittenCard.astro
        │   └── ContactForm.astro
        └── styles\
            └── global.css
```

### Scaffold Commands

```powershell
cd C:\Projects
npm create astro@latest pampered-feline
cd pampered-feline
npx astro add tailwind
```

Copy CLAUDE.md into the root folder before starting the first Claude Code session.

---

## Pages and Site Structure

### 1. Home
- Hero: Full-width image, brand headline, two CTAs (View Kittens, Meet Our Cats)
- Three pillars section
- "Small program, high standards" editorial block
- Health and ethics preview block
- Adoption process preview with CTA

### 2. Our Cats
- Intro paragraph on selection philosophy
- Kings: Rowan (silver shaded tabby), Aedion (black silver shaded)
- Queens: Feyra (black tortie with tabby markings, polydactyl), Lilith (silver shaded)
- Each cat: name, color/type, temperament notes, health/testing blurb
- Photography: portrait-style, close crops, clean backgrounds

### 3. Kittens & Adoption
- Available kittens grid: status tags (Available / Reserved / Under Evaluation)
- Each kitten card: name, sex, color, short personality note, inquiry CTA
- What comes with your kitten
- Pricing section (placeholders — see Open Questions)
- Adoption steps: Application → Conversation → Match & Reserve → Updates & Pickup

### 4. Health & Ethics
- Genetic testing: HCM, SMA, PKDef DNA panels
- Heart and joint health: cardiac ultrasound schedule, hip assessments
- Daily care: indoor-only, balanced diet, limited litters per queen
- Ethical practices: no declawing, retired cats placed in select homes

### 5. FAQ
- Where are you located?
- Do you ship kittens?
- When do kittens go home? (12-16 weeks)
- How are kittens socialized?
- Do you offer breeding rights?
- What payment methods do you accept?

### 6. Contact
- Contact form: Name, Email, City/State, Message
- Handled by Netlify Forms (free, no third-party setup)
- Email and Instagram (TBD)

---

## Design Direction

### Visual Feel
- Luxury, minimal, high-whitespace
- Boutique hotel or high-end lifestyle brand — not pet store
- Calm, elegant, exclusive but not cold
- Reference site for feel (not copying): SlowBlink Maine Coons

### Colors
- Background: soft off-white or warm ivory
- Text: deep charcoal or near-black
- Accent: muted gold, rich forest green, or one jewel tone (plum or deep teal)
- No bright colors, no gradients, no clipart

### Typography
- Headings: Cormorant Garamond, Playfair Display, or DM Serif Display
- Body: Lato, Montserrat, or DM Sans
- Style: elegant serif headlines, clean sans-serif body, letter-spaced small caps for labels

### Photography
- Full-width hero images
- Close-up cat portraits: faces, tufted ears, paws, profiles
- Clean uncluttered backgrounds
- Photography quality is the single highest-risk factor for the luxury feel
- Nick has some photos — more TBD from Sara

### Layout
- Large margins, lots of whitespace
- Sticky navigation
- Centered logo/header
- Long-scroll editorial homepage
- Three-column pillar section
- Card-based kitten and cat listings
- All layouts reviewed on mobile first — most visitors arrive from Instagram on a phone

---

## Draft Copy — Homepage

### Hero
Pampered Feline Maine Coons
European-type Maine Coons with presence, structure, and steady temperaments.

[CTA: View Available Kittens] [CTA: Meet Our Cats]

### Three Pillars
1. Raised in our home with hands-on social time from day one
2. DNA-tested parents for key Maine Coon conditions
3. Temperaments selected for confidence and stability

### Editorial Block
A Small Program With High Standards
Pampered Feline is a home-based Maine Coon cattery in Northern Virginia. We breed selectively, with limited litters, careful pairings, and hands-on care from birth. Every kitten leaves with a health guarantee, a written contract, and a family that knows their name.

### Health Preview Block
Health, Ethics, and Care
We DNA-test our breeding cats for HCM, SMA, and PKDef. Hearts are monitored as cats mature. We follow a transparent, written ethical standard and work with a feline-friendly veterinarian.

---

## Draft Copy — Our Cats Intro

Each breeding cat is selected for temperament, health, and balanced European type. We prefer lines known for bone, structure, strong muzzles, and clean profiles. Color and coat are secondary to what the cat is.

---

## Draft Copy — Adoption Steps

1. Application — Fill out a short form so we can learn about your home and lifestyle.
2. Conversation — We follow up to answer your questions and confirm it is a good fit.
3. Match & Reserve — We match kittens to families. A non-refundable reservation fee holds your spot.
4. Updates & Pickup — We send photos and updates as kittens grow. Kittens go home between 12 and 16 weeks.

---

## What Comes With Your Kitten

- Written contract and health guarantee
- Age-appropriate vaccines
- Health certificate
- Microchip
- Registration papers (after proof of spay/neuter, if applicable)
- Starter food
- Familiar blanket
- Lifetime breeder support

---

## Open Questions — Confirm With Sara Before Finalizing

| Item | Status |
|---|---|
| Domain spelling confirmed | Verify pamperedfelinemainecoons.com in GoDaddy account |
| Cattery email | TBD — recommend Google Workspace |
| Instagram handle | TBD |
| Pet kitten price range | TBD |
| Reservation fee amount | TBD |
| Exact health testing protocol | Draft only — Sara to verify |
| TICA/CFA registration status | Needs confirmation before publishing |
| Polydactyl line — feature prominently? | TBD |
| Breeding rights — mention publicly? | TBD |
| Testimonials section | TBD |
| About/Founder page for Sara | TBD |
| Shipping/transport policy wording | TBD |
| Gallery page | TBD |
| Blog/education content in v1 | TBD |
| Cat treat Shopify domain | TBD — confirm so domains stay distinct |

---

## SEO Starting Point

Target keyword themes:
- Maine Coon kittens Northern Virginia
- Luxury Maine Coon breeder
- European Maine Coon kittens
- Silver shaded Maine Coon kittens
- Polydactyl Maine Coon breeder Virginia

Claude Code generates final title tags and meta descriptions once copy is confirmed.

---

## Pre-Launch Checklist

- [ ] Domain spelling verified in GoDaddy before connecting to Netlify
- [ ] Favicon
- [ ] Page title tags on every page
- [ ] Meta descriptions on every page
- [ ] Open Graph image (preview shown when URL shared on social)
- [ ] Custom 404 page
- [ ] Mobile review on actual phone
- [ ] Contact form tested end-to-end
- [ ] All placeholder text removed
- [ ] Alt text on all images
- [ ] Analytics installed (Plausible recommended)
- [ ] Domain connected and SSL active in Netlify
- [ ] Professional email set up for Sara
- [ ] Google Search Console connected post-launch

---

## Cost Summary

| Item | Cost |
|---|---|
| Domain renewal (GoDaddy) | ~$15-20/year |
| Netlify hosting | Free |
| Sanity CMS | Free (up to 2 users, 10GB) |
| GitHub | Free |
| Astro + Tailwind | Free, open source |
| Google Workspace email | $6/month |
| Plausible analytics | $9/month or self-host free |
| **Total without email/analytics** | **~$15-20/year** |
| **Total with both** | **~$200/year** |

---

## First Session Instructions for Claude Code

1. Read this entire CLAUDE.md file first.
2. Stack is confirmed: Astro + Tailwind + Sanity + Netlify. Do not re-litigate this.
3. Set up the project structure exactly as shown in the File Structure section.
4. Initialize a Git repo and give instructions for connecting to GitHub.
5. Build the Home page first using the draft copy in this file.
6. Flag open questions before making assumptions on health testing, pricing, or associations.
7. Use [PLACEHOLDER] for anything not yet confirmed. Do not invent business details.
8. All components must be mobile-first.

---

## Notes on Tone and Copy

- Short sentences, active voice
- No AI-sounding filler phrases
- No hedging, no over-explanation
- Warm but not chatty
- Refined and confident
- Luxury brand voice, not hobby breeder voice
- No em dashes, no semicolons
- Specific over vague
- Numbers 1-9 written as words, 10+ as numerals

---

## Session: 2026-03-08

### Decisions
- **Stack confirmed and built:** Astro 5.18 + Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + Sanity CMS + Netlify. No deviations from CLAUDE.md spec.
- **Tailwind v4 CSS-based config** instead of `tailwind.config.mjs`. Theme tokens defined in `src/styles/global.css` using `@theme {}` directive.
- **Design tokens chosen:** Background `#FDFBF7` (ivory), text `#1C1917` (charcoal), accent `#C9A96E` / `#B8860B` (gold), green `#2D5016`. Fonts: Cormorant Garamond (headings), DM Sans (body).
- **Sanity client uses lazy initialization** to avoid crashing when `SANITY_PROJECT_ID` env var is not set. Pages fall back to static placeholder content.
- **Sanity Studio uses hosted approach** at manage.sanity.io rather than embedding in the Astro site. Simpler for Sara.
- **FAQ uses native HTML `<details>` accordion** with CSS rotation on the icon. No JavaScript framework needed.
- **Contact form uses Netlify Forms** with honeypot spam protection (`netlify-honeypot="bot-field"`).
- **Sitemap** auto-generated via `@astrojs/sitemap` integration.
- **Project directory** lives at `C:\Users\nxros\pampered-feline-cattery\` (not `C:\Projects\pampered-feline\` as originally noted in the spec).

### Conventions
- **File structure matches CLAUDE.md spec:** `src/layouts/`, `src/pages/`, `src/components/`, `src/styles/`, `src/lib/`, `sanity/schemas/`
- **Component naming:** PascalCase `.astro` files (Nav, Hero, Footer, CatCard, KittenCard, ContactForm)
- **Page naming:** kebab-case `.astro` files matching URL routes (our-cats, health-ethics)
- **Mobile-first Tailwind:** Base styles target small screens, `md:` and `lg:` breakpoints for larger layouts
- **Section pattern:** Alternating `bg-ivory` and `bg-ivory-warm` backgrounds for visual rhythm
- **Label pattern:** Small caps gold label above each section heading (`tracking-[0.3em] uppercase text-gold-dark`)
- **CTA pattern:** Primary = solid charcoal button, Secondary = outlined charcoal button
- **Placeholder convention:** `[PLACEHOLDER]` or `[PLACEHOLDER — description]` for unconfirmed content
- **Sanity schemas** live in `sanity/schemas/` with an `index.ts` barrel export
- **Environment variables:** `SANITY_PROJECT_ID` and `SANITY_DATASET` in `.env` (gitignored), documented in `.env.example`
- **Dev server config:** `.claude/launch.json` uses `node` with `node_modules/astro/astro.js` (full path to avoid Windows PATH issues with `npm`)

### Fixes
- **Astro scaffold directory issue:** `npm create astro@latest .` created a subdirectory (`tested-telescope`) because the directory was not empty. Fixed by moving files to project root.
- **Sanity client crash on build:** `createClient()` threw `Configuration must contain projectId` when env var was empty. Fixed by making client creation lazy (only instantiate when `SANITY_PROJECT_ID` is present).
- **Netlify preview_start npm not found:** The Claude Preview MCP tool could not resolve `npm` on Windows. Fixed by using `node node_modules/astro/astro.js` as the runtime command in `.claude/launch.json`.
- **Google Fonts ERR_ABORTED:** Font request showed as failed in network tab. Confirmed it was a stale error from page navigation, not a real loading failure. Fonts render correctly.

### Deferred
- **Netlify environment variables:** User needs to add `SANITY_PROJECT_ID=k6e71wky` and `SANITY_DATASET=production` in Netlify site settings > Environment variables
- **Sanity Studio schema deployment:** Schemas are defined in code but not yet deployed to Sanity Studio. Sara cannot add content until `npx sanity deploy` is run or schemas are pushed via CLI.
- **Content from Sara:** Cat temperament notes, health testing details, kitten listings, pricing, reservation fee, email, Instagram, shipping policy, breeding rights policy, payment methods
- **Real photography:** All cat/kitten images are placeholder (gray boxes with camera icon)
- **GoDaddy domain connection:** `pamperedfelinemainecoons.com` not yet pointed to Netlify
- **Google Workspace email:** Not yet set up for Sara
- **Plausible analytics:** Not yet installed
- **OG image:** Currently an SVG placeholder. Should be replaced with a proper PNG/JPG (1200x630) for best social media compatibility.
- **Mobile testing on real device:** Responsive breakpoints built but not yet tested on an actual phone

### Accounts and Services
| Service | Account | Key Info |
|---|---|---|
| GitHub | nxrose1985 | Repo: `nxrose1985/pampered-feline-cattery` |
| Netlify | Connected via GitHub | Site: `spiffy-dango-52f71b.netlify.app` |
| Sanity | nxrose1985 (via GitHub) | Project ID: `k6e71wky`, Dataset: `production` |
| Sanity webhook | Configured | Triggers Netlify rebuild on content changes |

### Files Created/Modified This Session
```
CLAUDE.md                        (this file, session log appended)
astro.config.mjs                 (Astro config with Tailwind + sitemap)
package.json                     (dependencies: astro, tailwind, sanity, sitemap)
.env                             (SANITY_PROJECT_ID, SANITY_DATASET — gitignored)
.env.example                     (documents required env vars)
.claude/launch.json              (dev server config for Claude Preview)
src/styles/global.css            (Tailwind v4 theme tokens, font imports)
src/layouts/BaseLayout.astro     (HTML shell, OG tags, fonts, nav + footer)
src/components/Nav.astro         (sticky nav, mobile hamburger menu)
src/components/Hero.astro        (full-width hero with CTAs)
src/components/Footer.astro      (brand, location, placeholder email/instagram)
src/components/CatCard.astro     (reusable cat profile card)
src/components/KittenCard.astro  (reusable kitten card with status tag)
src/components/ContactForm.astro (Netlify-ready form with honeypot)
src/pages/index.astro            (Home: hero, pillars, editorial, health, adoption)
src/pages/our-cats.astro         (Kings + Queens with Sanity fallback)
src/pages/kittens.astro          (Kitten grid + adoption details with Sanity fallback)
src/pages/health-ethics.astro    (Genetic testing, cardiac, daily care, ethics)
src/pages/faq.astro              (Expandable accordion, 6 questions)
src/pages/contact.astro          (Contact form + info)
src/pages/404.astro              (Custom 404 page)
src/lib/sanity.ts                (Sanity client, types, queries, fetchers)
sanity.config.ts                 (Sanity Studio config)
sanity/schemas/cat.ts            (Cat content type schema)
sanity/schemas/kitten.ts         (Kitten content type schema)
sanity/schemas/index.ts          (Schema barrel export)
public/favicon.svg               (PF monogram favicon)
public/images/og-default.svg     (OG social share image placeholder)
```

---

## Session: 2026-03-09

### Decisions
- **Domain confirmed:** `pamperedfelinemainecoons.com` is correct. Previous registration at GoDaddy had a typo (`pamperedfelinemaincoons.com`, missing 'e' in Maine). Domain needs to be re-registered with correct spelling.
- **Sanity Studio deployed** to `pampered-feline.sanity.studio` using hosted approach.
- **OG image converted to PNG** from SVG for social media compatibility. SVG retained as source.
- **CORS origins** are not strictly required for production (Astro fetches at build time, server-side). `localhost:4321` useful for local dev if client-side Sanity features are added later.
- **Sanity Studio requires React** as a build dependency. Added `react`, `react-dom`, `react-is`, `styled-components` as devDependencies.

### Conventions
- **Sanity CLI config** lives in `sanity.cli.ts` (separate from `sanity.config.ts`). Required for CLI commands like `sanity deploy`.
- **Sanity deploy hostname** set in `sanity.cli.ts` via `studioHost` property to avoid interactive prompt bug in CLI v5.
- **Sanity deploy appId** stored in `sanity.cli.ts` under `deployment.appId` to avoid prompting on subsequent deploys.

### Fixes
- **Sanity CLI `deploy` command failed outside project directory.** User ran `npx sanity deploy` from `C:\Users\nxros` instead of project root. Fixed by `cd` to project directory.
- **Sanity CLI missing `sanity.cli.ts`.** The `sanity deploy` command requires a `sanity.cli.ts` (or `.js`) file with `api.projectId`. Created the file.
- **Sanity CLI interactive hostname prompt crashed** with `TypeError: Cannot read properties of undefined`. Known bug in Sanity CLI v5. Fixed by adding `studioHost: "pampered-feline"` to `sanity.cli.ts`.
- **Sanity Studio build failed — missing React.** `Cannot find package 'react'` error. Astro project didn't have React installed. Fixed by adding `react`, `react-dom`, `react-is`, `styled-components` as devDependencies.

### Completed This Session
- Sanity Studio deployed to `https://pampered-feline.sanity.studio/`
- OG image converted from SVG to PNG (1200x630, 12.7 KB)
- BaseLayout updated to reference `og-default.png`
- `robots.txt` created with sitemap reference
- `sanity.cli.ts` created with project ID, dataset, studioHost, and deployment appId
- Build verified — all 7 pages generate cleanly
- Pre-launch checklist audited (see Deferred section for remaining items)

### Completed Mid-Session
- **Domain registered:** `pamperedfelinemainecoons.com` registered at GoDaddy for 3 years.
- **Domain connected to Netlify:** Netlify DNS set up. GoDaddy nameservers changed to `dns1-4.p01.nsone.net`. DNS propagated and SSL provisioned. Site live at `https://pamperedfelinemainecoons.com`.
- **Netlify environment variables:** Added by user (`SANITY_PROJECT_ID=k6e71wky`, `SANITY_DATASET=production`).
- **CORS origins in Sanity:** Added by user for production domain, Netlify subdomain, and localhost.
- **Sanity → Netlify pipeline verified:** Test cat created in Studio, confirmed fetching and rendering in local dev build.

### Deferred
- **21 placeholder content items** still need Sara's input (see pre-launch audit below)
- **Real photography:** All cat/kitten images are placeholder
- **Google Workspace email:** Not yet set up
- **Plausible analytics:** Not yet installed
- **Mobile testing on real device:** Not yet done

### Pre-Launch Content Audit (21 items needed from Sara)
| Category | Count | Details |
|---|---|---|
| Cat profiles | 8 | Temperament notes + health testing for Rowan, Aedion, Feyra, Lilith |
| Kitten listings | 6 | Names, sexes, colors, personalities (or manage via Sanity Studio) |
| Pricing | 3 | Pet kitten price, reservation fee, payment methods |
| FAQ policies | 3 | Shipping, breeding rights, payment methods |
| Health protocol | 1 | Exact testing protocol verification |
| Contact info | 2 | Professional email + Instagram handle (appears in contact page + footer) |

### Accounts and Services
| Service | Account | Key Info |
|---|---|---|
| GitHub | nxrose1985 | Repo: `nxrose1985/pampered-feline-cattery` |
| Netlify | Connected via GitHub | Site: `spiffy-dango-52f71b.netlify.app`, Custom domain: `pamperedfelinemainecoons.com` |
| Netlify DNS | Nameservers configured | `dns1-4.p01.nsone.net` (set in GoDaddy) |
| GoDaddy | Domain registrar | `pamperedfelinemainecoons.com`, 3-year registration |
| Sanity | nxrose1985 (via GitHub, login via Google) | Project ID: `k6e71wky`, Dataset: `production` |
| Sanity Studio | Deployed | URL: `https://pampered-feline.sanity.studio/` |
| Sanity webhook | Configured | Triggers Netlify rebuild on content changes |
| Sanity deploy appId | `zh31ua465lxrktnjzmutijhs` | Stored in `sanity.cli.ts` |

### Files Created/Modified This Session
```
CLAUDE.md                        (session log appended)
sanity.cli.ts                    (NEW — Sanity CLI config with projectId, studioHost, appId)
src/layouts/BaseLayout.astro     (OG image reference changed from .svg to .png)
public/images/og-default.png     (NEW — PNG version of OG image, 1200x630)
public/robots.txt                (NEW — robots.txt with sitemap reference)
package.json                     (added react, react-dom, react-is, styled-components as devDeps)
```

---

## Session: 2026-04-21

### Decisions
- **Email confirmed:** `pamperedfelinemainecoons@gmail.com` is Sara's contact email. Updated everywhere the placeholder appeared.
- **Instagram deferred:** Sara has not confirmed a handle. All Instagram fields remain `[PLACEHOLDER — instagram]`.
- **Payment methods confirmed:** Zelle and bank wire transfer. $400 non-refundable deposit due on signing the purchase agreement. Balance due one week before pickup.
- **Shipping policy confirmed:** No air cargo. Flight nanny in-cabin only, or in-person pickup in Northern Virginia. Flight nanny fees are the buyer's responsibility. Nationwide service.
- **Breeding rights policy confirmed:** All kittens sold on spay/neuter contract as default. Breeding rights available case-by-case to approved CFA or TICA registered catteries with documented health testing programs. Priced separately.
- **Health testing protocol confirmed:** Echo by board-certified cardiologist — annually for males, biennially for females. Full Wisdom Panel covering 50 conditions. Both parents' results documented and provided at pickup. Old placeholder paragraph replaced with approved copy.
- **Cat profiles confirmed:** Temperament and health text filled in for Aedion, Rowan, and Feyra. Lilith removed from the fallback array — she is spayed and no longer in the breeding program.
- **Cat schema verified complete:** `name`, `role`, `color`, `traits` (temperament), `health`, `image` (hotspot enabled), `order`. No schema changes needed.
- **Sanity Studio entry deferred to Sara:** Step-by-step paste-ready instructions provided for entering the three cats with real photos. Sara must do this manually.
- **Webhook confirmed active:** Sanity → Netlify webhook was configured in the March 2026 session. Verification steps provided (manage.sanity.io → project k6e71wky → API → Webhooks).

### Conventions
- **Fallback data is now real copy, not placeholders.** The fallback arrays in `sanity.ts` and `our-cats.astro` now contain approved content and serve as an accurate backstop if Sanity is unreachable. Future content changes should go through Sanity Studio first; update fallbacks only if the content is finalized and permanent.
- **Sanity Studio display order:** Aedion = 1, Rowan = 2, Feyra = 3. Set the Display Order field when entering each cat in Studio so ordering is deterministic.

### Deferred
- **Sanity Studio cat entry:** Sara needs to log into pampered-feline.sanity.studio, create three Cat documents (Aedion, Rowan, Feyra), upload real photos, and publish. Once published, the Our Cats page pulls live data and fallback becomes unreachable backstop only.
- **Instagram handle:** Still TBD. Update `fallbackSettings.instagramHandle` in `src/lib/sanity.ts` and the Sanity siteSettings document once confirmed.
- **Google Workspace email:** Not yet set up for Sara.
- **Plausible analytics:** Not yet installed.
- **Mobile testing on real device:** Not yet done.
- **Real photography:** Cat and kitten images are still placeholder (gray boxes). All three cat entries in Studio require real photos before the Our Cats page looks production-ready.

### Pre-Launch Content Audit (updated)
Items resolved this session are marked done. Remaining items still need Sara's input.

| Category | Status | Details |
|---|---|---|
| Cat profiles — Aedion, Rowan, Feyra | Done (fallback filled, Studio entry pending) | Temperament + health copy finalized |
| Cat profiles — Lilith | Done | Removed from program; removed from codebase |
| Payment methods | Done | Zelle + wire, $400 deposit, balance 1 week before pickup |
| Shipping policy | Done | Flight nanny in-cabin, no air cargo, nationwide |
| Breeding rights | Done | Spay/neuter default; breeding rights case-by-case |
| Health testing protocol | Done | Echo cadence + Wisdom Panel paragraph finalized |
| Contact email | Done | pamperedfelinemainecoons@gmail.com |
| Kitten listings | Pending | Names, sexes, colors, personalities (manage via Sanity Studio) |
| Instagram handle | Pending | Sara to confirm; update sanity.ts fallback + Studio siteSettings |
| Google Workspace email | Pending | Separate from Gmail; $6/month via Google Workspace |
| Plausible analytics | Pending | Not yet installed |
| Real photography | Pending | Needed for all cat and kitten cards |
| Mobile testing on real device | Pending | Responsive breakpoints built but not tested on phone |

### Files Changed This Session (PR #3 — merged)
```
src/lib/sanity.ts                (fallbackSettings: email + paymentMethods; FAQ q2, q5, q7 answers)
src/pages/health-ethics.astro   (health protocol placeholder replaced with approved paragraph)
src/pages/kittens.astro         (step 5 shipping text updated)
src/pages/our-cats.astro        (Aedion, Rowan, Feyra fallback filled in; Lilith removed)
CLAUDE.md                       (session log appended)
```

---

## Session: 2026-04-22 (hotfix — Sanity Studio schema missing)

### Root Cause
The `personalityAssessment` field did not appear in Sanity Studio after the April 22 session because the Studio was deployed **before** `git pull` was run on the local main branch. The PR #4 squash-merge landed on `origin/main` but the local working copy was still at `c210078` (the pre-PR commit). Running `npx sanity deploy` in the previous session pushed the old schema, not the new one.

### Fix
1. `git pull origin main` — fast-forwarded local main to `4f5b477` (PR #4 squash merge)
2. `npx sanity build` — Studio compiled cleanly in ~30s with the `personalityAssessment` object present
3. `npx sanity deploy` — deployed to `https://pampered-feline.sanity.studio/`

No code was changed. The schema was already correct on `origin/main`.

### Conventions (updated)
- **Always `git pull` before `npx sanity deploy`.** The local repo may lag behind `origin/main` if work was done in a worktree and merged via PR. The worktree is cleaned up after merge; the origin repo is the source of truth for deploys.

### Deferred
- Same as previous session: Instagram handle, Google Workspace email, Plausible analytics, real photography, mobile testing on device, entering kitten records in Studio.

### Files Changed This Session
None. Fix was `git pull` + `npx sanity deploy` only.

---

## Session: 2026-04-22 (PR #5 — SEO optimization, kittens hero redesign, content fixes)

### Decisions
- **Kittens hero redesigned:** Replaced light `bg-ivory-warm` hero + separate dark charcoal banner with a single dark obsidian hero section matching the homepage style. Includes film grain texture, gradient bridge to ivory below, integrated "Reservations are now open" line, and "Reserve Your Kitten" CTA.
- **Litter size copy removed:** "Nine born, eight available" removed from kittens page hero. New subtitle: "Seven kittens available. CFA registered, European lines, HCM echo-negative parents. Ready to go home June through July."
- **Kitten card prices added:** All seven fallback kitten cards now show prices ($4,000 standard silver, $4,500 rare color polydactyl, $4,200 polydactyl, $3,600 standard). Price prop passed to KittenCard component.
- **Microchip updated:** "Microchip" changed to "Microchip (if applicable)" in the What Comes With Your Kitten list.
- **Instagram placeholder removed:** Footer and contact page no longer show Instagram line when handle is unconfirmed. The `instagram` variable removed from Footer.astro and contact.astro. Only email and location shown.
- **Page titles updated:** All 7 pages now have keyword-rich SEO titles targeting Maine Coon + Northern Virginia + CFA registered buyer-intent queries.
- **Meta descriptions updated:** All 7 pages have new targeted meta descriptions aligned with SEO title themes.
- **og:site_name added:** BaseLayout now includes `<meta property="og:site_name" content="Pampered Feline Maine Coons" />`.
- **LocalBusiness JSON-LD:** Added to BaseLayout — appears on every page. Includes name, description, URL, email, address (VA, US), price range ($3,600–$4,500).
- **FAQPage JSON-LD:** Added to faq.astro. Serialized dynamically from the Sanity/fallback FAQ array using `set:html`. All 10 questions and answers included.
- **Sitemap and canonical URLs confirmed already present:** `@astrojs/sitemap` configured in astro.config.mjs with site URL; canonical link in BaseLayout; robots.txt in public/. No changes needed.
- **Navigation confirmed complete:** All 7 nav items including Contract already present in Nav.astro. No changes needed.
- **Our Cats page confirmed correct:** Aedion, Rowan, Feyra fallback data already filled from the April 21 session. Lilith already removed. No changes needed.
- **Build verification:** `astro build` passes cleanly in worktree after `npm install`. All 8 pages generated. Sitemap generated at dist/sitemap-index.xml.

### Deferred
- **Instagram handle:** Still TBD. When confirmed, add `instagramHandle` to Sanity siteSettings document AND update footer/contact to render it again (or add conditionally).
- **Sanity Studio kitten entry:** Sara still needs to enter kitten records in Studio. Fallback cards show correct data and prices.
- **Real photography:** Cat and kitten images still placeholder.
- **Google Workspace email:** Not yet set up.
- **Plausible analytics:** Not yet installed.
- **Mobile testing on real device:** Not yet done.

### Files Changed This Session (PR #5 — merged)
```
src/layouts/BaseLayout.astro     (og:site_name added; LocalBusiness JSON-LD added)
src/components/Footer.astro      (instagram variable and line removed)
src/pages/index.astro            (title + description updated for SEO)
src/pages/our-cats.astro         (title + description updated for SEO)
src/pages/kittens.astro          (hero redesigned dark; prices on fallback kittens; price prop passed to KittenCard; Microchip -> Microchip (if applicable); title + description updated)
src/pages/health-ethics.astro    (title + description updated for SEO)
src/pages/faq.astro              (title + description updated; FAQPage JSON-LD added)
src/pages/contract.astro         (title + description updated for SEO)
src/pages/contact.astro          (instagram variable and line removed; title + description updated)
```

---

## Session: 2026-04-26 (PR #7 — kitten names finalized)

### Decisions
- **Kitten names confirmed:** Spring 2026 litter slate finalized. Seven kittens: Helion, Tarquin, Kallias (poly cream), Azriel (poly blue silver tabby), Lucien (poly red tabby), Morrigan (blue tortie), Amren (blue tortie).
- **Name/color split fixed:** Previous fallback pattern stored color in the `name` field and left `color` empty. Corrected so `name` is the kitten's given name and `color` is the actual color description. KittenCard renders name as heading and color in gold beneath it.
- **Homepage Current Litter preview updated:** Three featured preview cards now show Kallias, Azriel, and Morrigan — chosen for color variety (cream silver, blue silver tabby, tortie female) and visual contrast.
- **Prices unchanged:** All prices carry forward from the PR #5 tier structure. Kallias $4,500 (rare color poly), Azriel $4,200 (poly), Lucien $4,200 (poly), Helion/Tarquin $4,000 (rare color), Morrigan/Amren $3,600 (standard).

### Conventions
- **Sanity data wins over fallback:** When Sara enters kitten records in Sanity Studio, they override the fallback array. Fallback serves as accurate backstop for name/color/price reference, not a display placeholder.

### Deferred
- Same as previous session: Instagram handle, Google Workspace email, Plausible analytics, real photography, mobile testing on device, entering kitten records in Studio.

### Files Changed This Session (PR #7 — merged)
```
src/pages/kittens.astro          (fallbackKittens: names added, colors corrected, 7 kittens finalized)
src/components/CurrentLitter.astro (fallbackKittens: updated to Kallias / Azriel / Morrigan with real data)
CLAUDE.md                        (session log appended)
```

---

## Session: 2026-04-26 (PR #8 — Sanity kitten upload, live data wiring, OG image)

### Decisions
- **All 8 kitten photos uploaded to Sanity:** Hero photos for Helion, Tarquin, Kallias, Azriel, Lucien, Morrigan, Amren, and Elain uploaded as Sanity image assets. Eight published kitten documents created with correct field mapping.
- **Elain added as 8th kitten:** Blue Shaded Silver female, status Reserved, no price/reservationFee. Order 8. Not previously in the fallback array.
- **Litter ID corrected to `march-2026`:** Previous fallback used `spring-2026`. Correct identifier is `march-2026` matching the `CurrentLitter` component default and the upload script.
- **Kittens page wired to Sanity:** `kittens.astro` already imported `getKittens()` — the fallback was updated to the full 8-kitten slate with real names, colors, `reservationFee`, `availableDate`, and `order` fields. Sanity data takes precedence when available.
- **CurrentLitter updated to filter Available + show first 3:** Component now filters kittens by `status === "Available"` and slices to 3 before rendering. Fallback updated to Helion, Tarquin, Kallias (first 3 available by display order).
- **OG image replaced:** Created `public/images/og-image.jpg` (1200x630 JPEG, 90% quality) by center-cropping `Kallias_HERO.jpg` (2048x2048 source) with `sharp`. `BaseLayout.astro` default `ogImage` prop updated from `/images/og-default.png` to `/images/og-image.jpg`.
- **Upload script written:** `scripts/upload-kittens.mjs` handles future re-uploads. Searches for hero images in the worktree and the main project root (3 levels up). Requires `SANITY_WRITE_TOKEN` env var. Falls back to Sanity CLI auth token stored at `~/.config/sanity/config.json`.
- **Sanity auth token location confirmed:** `C:\Users\nxros\.config\sanity\config.json` contains the `authToken` used by the Sanity CLI. No separate write token needed as long as the CLI session is active.
- **Dev server required `npm install` in worktree:** Worktrees have independent `node_modules`. Must run `npm install` in each new worktree before preview_start works.

### Conventions
- **Upload script path fallback:** `scripts/upload-kittens.mjs` searches `public/images/kittens` in both the worktree root and the main project root (`../../../` from worktree = `pampered-feline-cattery/`). Set `IMAGES_DIR` env var to override.
- **Sanity document IDs for kittens:** Follows pattern `kitten-{name.toLowerCase()}` (e.g. `kitten-helion`). Used for `createOrReplace` to allow safe re-runs.
- **CurrentLitter always shows Available kittens only:** The `filter(status === "Available").slice(0, 3)` pattern ensures reserved kittens never appear in the homepage preview regardless of order.

### Deferred
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos entered in Studio. Our Cats page falls back to hardcoded copy.
- **Instagram handle:** Still TBD. Update `fallbackSettings.instagramHandle` in `src/lib/sanity.ts` and the Sanity siteSettings document once confirmed.
- **Google Workspace email:** Not yet set up.
- **Plausible analytics:** Not yet installed.
- **Mobile testing on real device:** Not yet done.

### Files Changed This Session (PR #8 — merged)
```
scripts/upload-kittens.mjs       (NEW — uploads hero photos + creates kitten documents in Sanity)
public/images/og-image.jpg       (NEW — 1200x630 crop of Kallias_HERO.jpg for social OG image)
src/layouts/BaseLayout.astro     (default ogImage changed from og-default.png to og-image.jpg)
src/pages/kittens.astro          (fallbackKittens: full 8-kitten slate with Elain, march-2026 litter ID)
src/components/CurrentLitter.astro (fallbackKittens: Helion/Tarquin/Kallias; filters Available + slices to 3)
CLAUDE.md                        (session log appended)
```

---

## Session: 2026-04-26 (PR #10 — polydactyl color descriptions and Elain flag fix)

### Decisions
- **Polydactyl color descriptions updated:** All four polydactyl kittens now have color strings that prepend "Poly" and append toe counts in parentheses. This surfaces the poly trait and toe count directly in the color field visible on each kitten card, without requiring a separate field.
  - Kallias: "Poly Cream Shaded Silver (6/6/6/6)"
  - Azriel: "Poly Blue Silver Tabby (6/6/6/6)"
  - Lucien: "Poly Red Tabby (7/7/6/6)"
  - Elain: "Poly Blue Shaded Silver (6/6/6/6)"
- **Elain `isPolydactyl` corrected to true:** Was incorrectly set to false in both the PR #8 Sanity upload and the fallback array. Patched in Sanity and updated in both fallback files.
- **Sanity patched directly via script:** Used inline Node.js script with `@sanity/client` and the CLI auth token at `~/.config/sanity/config.json`. No new script file committed — patch was a one-off operation.
- **Worktree approach used:** `.worktrees/` directory added to `.gitignore` and worktree created at `.worktrees/poly-kitten-update`. This is the first use of project-local `.worktrees/` convention.

### Conventions
- **Toe counts in color field:** The pattern `Poly [Color] (FR/FL/RR/RL)` encodes front-right, front-left, rear-right, rear-left toe counts directly in the color string. This is display-only data that belongs with the color description rather than a dedicated schema field.
- **Worktree directory:** `.worktrees/` (project-local, gitignored) is the established convention for this project going forward.

### Deferred
- Same as previous session: Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries in Studio, mobile testing on real device.

### Files Changed This Session (PR #10 — merged)
```
.gitignore                         (added .worktrees/ entry)
src/pages/kittens.astro            (color updated for Kallias, Azriel, Lucien, Elain; Elain isPolydactyl → true)
src/components/CurrentLitter.astro (color updated for Kallias fallback)
CLAUDE.md                          (session log appended)
```

### Sanity Documents Patched This Session
```
kitten-kallias   color → "Poly Cream Shaded Silver (6/6/6/6)"
kitten-azriel    color → "Poly Blue Silver Tabby (6/6/6/6)"
kitten-lucien    color → "Poly Red Tabby (7/7/6/6)"
kitten-elain     color → "Poly Blue Shaded Silver (6/6/6/6)", isPolydactyl → true
```

---

## Session: 2026-04-26 (PR #11 — photo gallery field and lightbox)

### Decisions
- **Gallery field added to Sanity kitten schema:** New `gallery` field (array of hotspot-enabled images) added to the `kitten` document type in `sanity/schemas/kitten.ts`, after the existing `image` (hero) field.
- **TypeScript type and GROQ projection updated:** `Kitten` interface in `src/lib/sanity.ts` gains `gallery?: Array<{ asset: { url: string } }>`. The `kittenProjection` query uses `"gallery": gallery[] { asset-> { url } }` — same nested dereference pattern as the existing `image` field.
- **Upload script written:** `scripts/upload-gallery.mjs` handles all non-HERO photos. Groups files by kitten name using prefix-before-underscore matching with case-insensitive `startsWith` fallback (handles files like `Helion2.jpg`). Searches both worktree and main project root. Deduplicates by filename. Patches each Sanity document with `client.patch(docId).set({ gallery }).commit()`.
- **Lightbox is a single global element:** One `<div id="kitten-lightbox">` added to `kittens.astro`, not per-card. Each kitten card's hero image gets `data-lightbox-trigger` with a JSON array of all image URLs (hero first, then gallery).
- **Lightbox toggled with `hidden`/`flex` class pair:** Tailwind v4 requires both — `hidden` sets `display: none`, adding `flex` overrides it. Removing `hidden` alone does not make the flex layout work.
- **Accessibility handled:** Image container div gets `role="button"`, `tabindex="0"`, and `aria-label`. Keydown handler (Enter/Space) fires the lightbox. Focus moves to close button on open and returns to the trigger on close.
- **Swipe guard on single image:** Touchend handler has `&& images.length > 1` guard to avoid re-rendering the same image on swipe when no navigation is needed.
- **Mobile button sizing:** Prev/next buttons use `text-3xl md:text-5xl` to avoid overlapping the image on small screens.

### Conventions
- **Gallery GROQ pattern:** `"gallery": gallery[] { asset-> { url } }` — array map with nested asset dereference. Consistent with the `image` field pattern.
- **Kitten document IDs:** `kitten-{name.toLowerCase()}` — same as upload-kittens.mjs. Gallery script uses the same ID to patch.
- **Upload script auth:** Same `SANITY_WRITE_TOKEN` env var + same `createClient` pattern as `upload-kittens.mjs`. No CLI auth fallback in code.

### Deferred
- **Run `node scripts/upload-gallery.mjs`:** Must be run from project root after Netlify deploys to populate gallery images in Sanity. Requires `SANITY_WRITE_TOKEN` in `.env`.
- **Run `npx sanity deploy`:** Must be run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (after `git pull`) to push the updated Studio schema with the gallery field. Sara will not see the gallery upload UI in Studio until this is done.
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward from previous sessions.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos entered in Studio.
- **Mobile testing on real device:** Not yet done.

### Files Changed This Session (PR #11 — merged)
```
sanity/schemas/kitten.ts         (gallery field added after image field)
src/lib/sanity.ts                (Kitten type + kittenProjection updated with gallery)
scripts/upload-gallery.mjs       (NEW — uploads non-HERO photos and patches gallery array in Sanity)
src/components/KittenCard.astro  (gallery prop added; hero div gets lightbox trigger attributes + a11y)
src/pages/kittens.astro          (gallery prop passed to KittenCard; lightbox HTML + JS added)
CLAUDE.md                        (session log appended)
```

---

## Session: 2026-04-26 (PR #13 — auto-scrolling carousel on kitten cards)

### Decisions
- **Crossfade (opacity) transition chosen over slide:** All images are absolutely stacked within the card's `aspect-[4/5]` container. Only `opacity-100`/`opacity-0` swaps via `transition-opacity duration-700`. No layout shift, smooth luxury feel, simpler than a sliding approach.
- **Carousel only when `allImages.length > 1`:** When a kitten has no gallery (only hero or no image at all), the static image path is preserved unchanged. No dots, no timer, no JS overhead for those cards.
- **Single global `initCarousels()` script:** The carousel `<script>` in `KittenCard.astro` is Astro-deduplicated. One script initializes all `[data-carousel]` elements on the page via `querySelectorAll`. No per-card scripts.
- **`data-lightbox-index` attribute for lightbox sync:** The carousel container holds `data-lightbox-index="0"` at render time. Each `goTo()` call updates it to the current slide index. The lightbox click/keydown handlers in `kittens.astro` read this attribute to open the lightbox at the visible slide.
- **Swipe-vs-tap discrimination:** A `touchmove` listener tracks horizontal delta. If movement > 10px, `data-swiped-last` is set to `'1'` on `touchend`. The lightbox click handler in `kittens.astro` checks this flag and suppresses lightbox open on swipes. Flag is reset to `'0'` on the next `touchstart` (not in the click handler, to avoid race conditions).
- **Timer cleanup for Astro View Transitions:** An `astro:before-swap` listener (once) clears the interval on each card when the page navigates. Not needed today (no View Transitions), but added preemptively to avoid stacking intervals if View Transitions is enabled later.
- **"View N photos" button removed:** The carousel makes it redundant. Clicking the card image opens the lightbox at the current slide.
- **Touch pause duration:** `touchend` schedules a 1-second delay before `paused = false`. Prevents the carousel from advancing immediately after a tap/swipe.

### Conventions
- **Carousel HTML pattern:** `data-carousel` (holds JSON image array), `data-carousel-name`, `data-lightbox-trigger`, `data-lightbox-images`, `data-lightbox-index` all on the same container div.
- **Slide elements:** `[data-carousel-slide="N"]` on each `<img>`. Dot elements: `[data-carousel-dot="N"]`.
- **Pause flag:** `paused` boolean checked inside `setInterval`. Timer always runs; pause skips `goTo()`. Calling `startTimer()` always clears the existing interval first to prevent stacking.

### Deferred
- **Sanity Studio deploy:** Still needs `npx sanity deploy` from project root to expose the gallery field in Studio UI (carry-forward from PR #11 session).
- **Gallery upload:** Still needs `node scripts/upload-gallery.mjs` to populate gallery arrays in Sanity (carry-forward from PR #11 session).
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward from previous sessions.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carousel and lightbox should be tested on an actual phone.

### Files Changed This Session (PR #13 — merged)
```
src/components/KittenCard.astro  (carousel replaces static image; "View N photos" button removed; carousel <script> added)
src/pages/kittens.astro          (lightbox handlers read data-lightbox-index; swipe guard added)
CLAUDE.md                        (session log appended)
```

---

## Session: 2026-04-26 (PR #15 — all kittens on homepage, smoother carousel)

### Decisions
- **CurrentLitter shows all available kittens:** Removed `.slice(0, 3)` cap. Homepage now shows all available kittens (7 with current litter: Helion, Tarquin, Kallias, Azriel, Lucien, Morrigan, Amren). Elain is Reserved and correctly excluded by the `status === "Available"` filter.
- **Fallback expanded to full 8-kitten slate:** CurrentLitter fallback previously only had 3 kittens. Expanded to all 8 with correct names, colors, sexes, prices, `isPolydactyl`, and `availableDate` values matching the kittens.astro fallback.
- **CTA text updated:** "VIEW FULL DETAILS" changed to "MEET THE FULL LITTER". Link to `/kittens` unchanged.
- **Carousel crossfade smoother:** `transition-opacity duration-700` changed to `duration-[1200ms] ease-in-out`. Both images animate simultaneously (true crossfade). Auto-advance interval remains 4 seconds.

### Deferred
- Same as previous session: Sanity Studio deploy for gallery field, gallery upload script run, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries, mobile testing.

### Files Changed This Session (PR #15 — merged)
```
src/components/CurrentLitter.astro  (removed slice(0,3); expanded fallback to 8 kittens; CTA text updated)
src/components/KittenCard.astro     (carousel transition: duration-700 → duration-[1200ms] ease-in-out)
CLAUDE.md                           (session log appended)
```

---

## Session: 2026-04-26 (PR #16 — homepage cards clickable, smoother carousel dissolve)

### Decisions
- **Homepage kitten cards now clickable:** Added `linkTo?: string` prop to `KittenCard`. When set, the root div gets `onclick="window.location='/kittens'"` and `cursor-pointer`. `CurrentLitter` passes `linkTo="/kittens"` to every card, so clicking anywhere on a homepage kitten card navigates to the kittens page.
- **Inquire button hidden when `linkTo` is set:** The Inquire button renders only when `status === "Available" && !linkTo`. On the homepage the card itself is the CTA; on the kittens page `linkTo` is not passed so the Inquire button is unchanged.
- **Carousel crossfade extended and linearized:** `duration-[1200ms] ease-in-out` changed to `duration-[2000ms] ease-linear`. Linear timing dissolves both images at a constant rate — no acceleration peak — which reads as more subtle and professional. The simultaneous crossfade architecture is unchanged.

### Conventions
- **`linkTo` suppresses Inquire:** Any context that passes `linkTo` to `KittenCard` should not expect an Inquire button. The two behaviors are mutually exclusive by design.

### Deferred
- Same carry-forward: Sanity Studio deploy, gallery upload, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries, mobile testing.

### Files Changed This Session (PR #16 — merged)
```
src/components/KittenCard.astro     (linkTo prop: onclick + cursor-pointer on root; Inquire hidden when linkTo set; carousel 2000ms ease-linear)
src/components/CurrentLitter.astro  (linkTo="/kittens" passed to KittenCard)
CLAUDE.md                           (session log appended)
```

---

## Session: 2026-04-26 (PR #17 — consolidate kittens onto homepage, remove /kittens page)

### Decisions
- **`/kittens` page deleted:** All kitten content consolidated onto the homepage. `src/pages/kittens.astro` removed. Sitemap automatically drops the route since `@astrojs/sitemap` reflects the live page files.
- **All 8 kittens now shown in `CurrentLitter`:** Removed the `.filter(k.status === "Available")` guard. Elain (Reserved) is sorted first as a social proof / demand signal; the 7 available kittens follow in their existing display order.
- **Sort logic added:** `sortKittens()` helper in `CurrentLitter.astro` puts Reserved kittens first, then sorts Available by `order` ascending. Works for both Sanity data and fallback.
- **Lightbox ported to `CurrentLitter.astro`:** Full lightbox HTML (`#kitten-lightbox`) and JS (open/close/nav/swipe/keyboard) moved from `kittens.astro` into the component. Gallery carousel in `KittenCard` already emits `data-lightbox-trigger` attributes; the lightbox script in `CurrentLitter` registers listeners on those elements.
- **`linkTo` prop removed from homepage cards:** Cards no longer navigate to `/kittens`. `linkTo` is not passed from `CurrentLitter`, so `KittenCard` renders the Inquire button for Available kittens as expected.
- **Gallery prop now passed:** `CurrentLitter` passes `gallery={kitten.gallery}` to `KittenCard` — this was previously only in `kittens.astro`. Carousel and lightbox now work on the homepage for kittens with gallery photos.
- **4-column grid on xl screens:** Grid updated to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` to match the former kittens page layout for 8 cards.
- **Nav `KITTENS` link changed to `/#kittens`:** From any page, clicking KITTENS navigates to the homepage and scrolls to the `id="kittens"` section on `CurrentLitter`.
- **`AdoptionSteps` CTA default updated to `/#kittens`:** Was `/kittens`. Existing callers that override `ctaHref` are unaffected.
- **Homepage meta description updated:** Now includes kitten availability language and prices to target buyer-intent queries directly from the homepage.
- **`public/_redirects` created:** `/kittens` and `/kittens/` both 301 to `/#kittens`. Netlify processes this file automatically; no `netlify.toml` changes needed.
- **Build verified:** 7 pages generated cleanly. Sitemap generated. No TypeScript errors.

### Conventions
- **`id="kittens"` on `CurrentLitter` section:** The anchor target. Nav and any internal links use `/#kittens` to reach it.
- **`sortKittens()` pattern:** Sort Reserved first, then by `order`. Add other statuses before "Available" if new statuses emerge.
- **Lightbox lives in `CurrentLitter.astro`:** Co-located with the kitten grid. If `KittenCard` is ever used outside `CurrentLitter`, the calling context needs to provide its own lightbox.

### Deferred
- **Sanity Studio deploy:** Still needs `npx sanity deploy` from project root (carry-forward from PR #11). Sara cannot see the gallery upload field in Studio until this is done.
- **Gallery upload:** Still needs `node scripts/upload-gallery.mjs` to populate gallery arrays in Sanity (carry-forward from PR #11).
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward from previous sessions.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carousel, lightbox, and 8-card grid should be tested on an actual phone.

### Files Changed This Session (PR #17 — merged)
```
src/components/CurrentLitter.astro  (rewritten: all 8 kittens, Elain first, sortKittens(), lightbox HTML+JS, gallery prop, 4-col grid, id="kittens", no linkTo)
src/components/Nav.astro            (/kittens → /#kittens)
src/components/AdoptionSteps.astro  (ctaHref default: /kittens → /#kittens)
src/pages/index.astro               (meta description updated with kitten availability language)
src/pages/kittens.astro             (DELETED)
public/_redirects                   (NEW — /kittens and /kittens/ → /#kittens 301)
CLAUDE.md                           (session log appended)
```

---

## Session: 2026-04-27 (PR #19 — dark theme unification, European bloodlines, mobile optimization)

### Decisions
- **Full dark theme applied to all sections:** Every homepage section now uses bg-obsidian (#0A0A0A) or bg-[#0f0e0d] (alternating) instead of bg-ivory / bg-ivory-warm. The site is now a single cohesive dark design end-to-end.
- **Text color convention unified:** text-charcoal → text-bone (#E8E4DC), text-charcoal-light → text-bone/70, text-gold-dark labels → text-gold/70 throughout index.astro.
- **Gradient bridge removed:** The `h-16 md:h-20 bg-gradient-to-b from-obsidian to-ivory-warm` div between the kittens section and Meet the Parents was removed. No longer needed since all sections are dark.
- **CatCard dark variant added:** `variant="light"|"dark"` prop added. Dark: bone text, gold/70 accents, bg-bone/[0.04] card background, bone/10 border. Light: original ivory-warm styling preserved.
- **ContactForm dark variant added:** `variant="light"|"dark"` prop added. Dark: obsidian inputs with bone/15 borders, bone text, bone button. `text-base` added to all inputs to prevent iOS auto-zoom (prevents browser zoom on input focus on iPhone).
- **Hero subtitle updated:** "Thoughtfully raised to be your best friend for life." → "European-line Maine Coons, raised in our home."
- **European bloodlines messaging added in three locations:**
  1. CurrentLitter: "European Championship Bloodlines · HCM Echo-Negative Parents" below "Born March 12, 2026" line
  2. Meet the Parents h2: "European Championship Bloodlines · CFA Registered" subtitle line
  3. Hero subtitle already includes "European-line"
- **Accordion touch targets:** `min-h-[44px]` added to all `<summary>` elements in FAQ and Contract accordions.
- **Nav mobile menu auto-close:** Added event listener on each mobile nav link to close the menu and reset aria-expanded on click.
- **KittenCard lazy loading:** Non-first carousel images now use `loading="lazy"`. First image uses `loading="eager"` for performance.
- **Footer background:** bg-charcoal → bg-obsidian for dark theme consistency.
- **Contact email made tappable:** Email in the "Other Ways to Connect" section is now an `<a href="mailto:...">` link, not plain text.
- **FAQ content verified:** All 10 FAQ answers confirmed accurate against current pricing and policies:
  - Standard pets $3,600, rare color $4,000, polydactyl $4,200, rare color polydactyl $4,500 ✓
  - Deposit $400 non-refundable ✓
  - Payment: Zelle and bank wire only ✓
  - Balance one week before pickup ✓
  - Kittens go home at 12 weeks ✓
  - Spay/neuter by 10 months ✓
  - CFA papers withheld until proof of alteration ✓
  - No air cargo, flight nanny in-cabin only ✓
  - HCM echocardiogram by board-certified cardiologist + Wisdom Panel ✓

### Conventions
- **Dark alternating pattern:** Primary sections use `bg-obsidian`, alternating sections use `bg-[#0f0e0d]`. Applies to all sections below the hero.
- **`text-gold/70` for labels:** All small-caps section labels use `text-gold/70` in dark mode (replaces `text-gold-dark`).
- **`text-bone/[0.08]` divider pattern:** `divide-bone/[0.08]` for accordion dividers in dark context.
- **`min-h-[44px]` on summary:** All accordion `<summary>` elements carry this class for mobile tap target compliance.
- **`text-base` on inputs:** ContactForm always uses `text-base` to prevent iOS auto-zoom, regardless of variant.

### Deferred
- **Sanity Studio deploy:** Still needs `npx sanity deploy` from project root (carry-forward). Sara cannot see gallery upload field until deployed.
- **Gallery upload:** Still needs `node scripts/upload-gallery.mjs` (carry-forward).
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** All new dark theme and touch target changes should be verified on an actual phone.

### Files Changed This Session (PR #19 — merged)
```
src/components/Footer.astro       (bg-charcoal → bg-obsidian)
src/components/Hero.astro         (subtitle: European-line Maine Coons, raised in our home)
src/components/CurrentLitter.astro (European Championship Bloodlines tagline added)
src/components/CatCard.astro      (variant="dark" prop added with full dark styling)
src/components/ContactForm.astro  (variant="dark" prop added; text-base on all inputs)
src/components/Nav.astro          (mobile menu auto-closes on link tap)
src/components/KittenCard.astro   (loading="lazy" on non-first carousel images)
src/pages/index.astro             (full dark theme; European bloodlines in Meet the Parents; gradient bridge removed; variant="dark" passed to CatCard and ContactForm; email mailto link; accordion min-h-[44px])
CLAUDE.md                         (session log appended)
```
```

---

## Session: 2026-04-27 (PR #22 — contact form feedback + favicon)

### Decisions
- **Contact form feedback added:** Form submit is intercepted with `fetch` (AJAX). On success (HTTP 2xx from Netlify), all input fields and the submit button are hidden and a green success message is shown ("Message sent. We'll be in touch within 24 hours."). On error (network failure or non-2xx), the button is re-enabled and a red error message with a `mailto:` fallback link is shown. The user can retry without losing their input.
- **Success/error colors use inline style rather than Tailwind utilities:** `#86efac` (light green) and `#fca5a5` (light salmon-red) are used with `style="color: ..."` because these exact values are not in the Tailwind token set. Both read legibly on the dark obsidian background.
- **Form fields grouped in `#contact-fields` div:** Allows hiding all fields with a single `style.display = "none"` on success, rather than hiding each field individually.
- **Favicon link tags completed:** `BaseLayout.astro` previously only had the SVG favicon link. Added `favicon.ico` (32×32 fallback for legacy browsers) and `apple-touch-icon.png` (iOS Safari home screen icon) link tags alongside the SVG reference.
- **`apple-touch-icon.png` generated with sharp:** 180×180 PNG created from the existing PF monogram SVG (dark `#1C1917` background, gold `#C9A96E` text, 16px corner radius). Sharp renders the SVG to PNG at build time; the output was committed as a static asset.
- **`favicon.ico` retained as-is:** The existing 655-byte file is actually a PNG with a `.ico` extension (PNG magic bytes confirmed). Most browsers accept this. Regenerating a proper ICO is deferred — the SVG link tag covers all modern browsers.

### Conventions
- **Netlify Forms AJAX pattern:** POST to `"/"` with `Content-Type: application/x-www-form-urlencoded` and `form-name` field included. `URLSearchParams` built by iterating `FormData` entries (avoids TypeScript overload ambiguity).
- **Favicon link order:** ICO first (sizes="32x32"), SVG second (type override for modern browsers), apple-touch-icon third. This matches the 2024 favicon best-practice recommended by Andrey Sitnik.

### Deferred
- **`favicon.ico` replacement:** Current ICO is a PNG with wrong extension. Should be regenerated as a proper multi-size ICO (16×16, 32×32) using a tool like `png-to-ico` or `sharp`+custom ICO encoder. Low priority — SVG covers Chrome, Firefox, Edge; Safari uses apple-touch-icon.
- **Contact form success/error states tested live:** Netlify Forms processing must be verified on the deployed site. The fetch target is `"/"` which is the standard Netlify Forms endpoint.
- **All prior deferred items carry forward:** Sanity Studio deploy, gallery upload, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries, mobile device testing.

### Files Changed This Session (PR #22 — merged)
```
src/components/ContactForm.astro   (fetch-based submit; #contact-fields wrapper; success/error message divs; inline JS)
src/layouts/BaseLayout.astro       (favicon link tags: added ICO fallback + apple-touch-icon; SVG tag retained)
public/apple-touch-icon.png        (NEW — 180×180 PF monogram PNG for iOS Safari)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-27 (PR #23 — fix contact form always showing error state)

### Root Cause
The contact form submit handler checked `response.ok` after the `fetch` call and threw `new Error()` when the check failed, which was caught by the outer `catch {}` block and displayed the error state. Netlify Forms returns a 302 redirect on successful submission; `fetch` follows the redirect but the resulting response can have a non-2xx status in CDN edge cases, causing `response.ok` to be `false` on every valid submission.

### Fix
- **Removed `response.ok` check:** Any resolved `fetch` promise is now treated as success, matching Netlify's official AJAX form pattern. Only network-level exceptions (thrown errors) trigger the error state.
- **Added `action="/"` to the `<form>` tag:** Explicit submit URL for clarity and parity with the `fetch` target.

### Conventions
- **Netlify Forms AJAX success criterion:** A resolved `fetch` = success. Do not inspect `response.ok` or `response.status` for Netlify Forms submissions. The documented pattern is `.then(() => /* success */).catch((error) => /* error */)`.

### Deferred
- **Contact form verified live on deployed site:** Submission flow (fields hide, success message appears, notification email arrives at pamperedfelinemainecoons@gmail.com) should be confirmed in the Netlify production environment.
- **Netlify Forms dashboard:** After deploy, verify the "contact" form appears registered under the Netlify site's Forms tab.
- **All prior deferred items carry forward:** Sanity Studio deploy, gallery upload, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries, mobile device testing.

### Files Changed This Session (PR #23 — merged)
```
src/components/ContactForm.astro   (removed response.ok check; added action="/" to form tag)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-28 (PR #24 — breeding cats migrated to Sanity with gallery, PDF reports, and parents banner)

### Decisions
- **Cat Sanity schema extended:** `gallery` (array of hotspot images) and `wisdomPanelPdf` (file asset) fields added to the `cat` document type. `parentsBannerImage` (hotspot image) added to the `siteSettings` document type.
- **GROQ projections updated:** `catQuery` now projects `gallery[] { asset-> { url } }` and `wisdomPanelPdf { asset-> { url } }`. `siteSettingsQuery` projects `parentsBannerImage { asset-> { url } }`.
- **TypeScript types updated:** `Cat` interface gains `gallery?` and `wisdomPanelPdf?`. `SiteSettings` gains `parentsBannerImage?`.
- **CatCard rewritten with gallery carousel:** Multi-image crossfade carousel (1.2s, `ease-in-out`, 4s advance) matching KittenCard pattern. Pause on mouseenter/touchstart, resume on mouseleave (1s touch delay). Dot indicators. Lightbox trigger attributes (`data-lightbox-trigger`, `data-lightbox-images`, `data-lightbox-index`) match the kitten lightbox contract. Single-image case uses `loading="eager"`. Placeholder preserved for no-image state. Aspect ratio: `aspect-square`.
- **"View Genetic Report" PDF link:** Renders below health text in CatCard when `wisdomPanelPdf` URL is present. Opens in new tab with `rel="noopener noreferrer"`. Dark/light variant styling.
- **Cat lightbox added to index.astro:** `<div id="cat-lightbox">` with full keyboard/swipe/click-outside handling. Scoped to `#our-cats` section via `el.closest('#our-cats')` guard to avoid conflicting with kitten lightbox.
- **Kitten lightbox scoped to `#kittens`:** `CurrentLitter.astro` lightbox registration now has `if (!el.closest('#kittens')) return;` guard. Without this, cat card clicks would open the kitten lightbox with cat photos (bug fixed).
- **Parents banner added:** Optional full-width banner above cat cards, conditionally rendered when `settings.parentsBannerImage?.asset?.url` is set. Caption: "Aedion × Feyra — Spring 2026". Uses `?w=1200&q=85&auto=format` CDN params.
- **upload-cats.mjs created and run:** Uploads hero photo, gallery array, and Wisdom Panel PDF for each cat. Three documents created/replaced in Sanity: `cat-aedion`, `cat-rowan`, `cat-feyra`. Script searches `public/images/cats/{CatName}/` in both worktree and main project root. Hero = first non-`_parents` image (alphabetical). Gallery = remaining images. PDF match is case-insensitive.
- **All three cat documents live in Sanity:** Aedion (1 hero + 9 gallery + PDF), Rowan (1 hero, no gallery, no PDF), Feyra (1 hero + 3 gallery + PDF).
- **No `_parents` banner image found:** None of the cat image files have `_parents` in the filename. The banner section will not render until a `parentsBannerImage` is uploaded via Sanity Studio or the script.
- **`@astrojs/check` and `typescript` added as devDependencies:** Installed during TypeScript validation in development.

### Conventions
- **Cat document IDs:** `cat-{name.toLowerCase()}` — e.g. `cat-aedion`, `cat-rowan`, `cat-feyra`.
- **Cat lightbox vs kitten lightbox:** Cat triggers scoped via `el.closest('#our-cats')`; kitten triggers scoped via `el.closest('#kittens')`. Both use `data-lightbox-trigger` — scope guard prevents interference.
- **Gallery `_key` pattern:** `{basename_without_ext}_{index}` — index suffix guarantees uniqueness even if filenames normalize identically after sanitization.
- **parentsBannerImage upload path:** Upload via Sanity Studio (siteSettings → Parents Together Banner Image) or add a `_parents`-named file to a cat folder and re-run `node scripts/upload-cats.mjs`.

### Deferred
- **`npx sanity deploy` required after PR #24:** Run from project root to push gallery + wisdomPanelPdf + parentsBannerImage fields to Studio UI. *(Now resolved — see hotfix session below.)*
- **Parents banner image:** No `_parents` photo exists yet. Upload via Sanity Studio → Site Settings → Parents Together Banner Image.
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Mobile testing on real device:** Carousel, lightbox, and cat gallery should be tested on an actual phone.

### Files Changed This Session (PR #24 — merged)
```
sanity/schemas/cat.ts              (gallery + wisdomPanelPdf fields added)
sanity/schemas/siteSettings.ts     (parentsBannerImage field added)
src/lib/sanity.ts                  (Cat type + catQuery + SiteSettings type + siteSettingsQuery updated)
src/components/CatCard.astro       (rewritten: gallery carousel, lightbox trigger, wisdomPanelPdf link)
src/components/CurrentLitter.astro (kitten lightbox scoped to #kittens)
src/pages/index.astro              (gallery/wisdomPanelPdf props wired; parents banner; cat lightbox HTML+JS)
scripts/upload-cats.mjs            (NEW — uploads hero/gallery/PDF for Aedion, Rowan, Feyra)
package.json                       (@astrojs/check + typescript added as devDependencies)
package-lock.json                  (updated)
```

### Sanity Documents Created This Session
```
cat-aedion   hero: IMG_6495.jpeg, gallery: 9 photos, wisdomPanelPdf: Aedion_WisdomPanelProfile_FormerName-Eyktan Navarro.pdf
cat-rowan    hero: PIX_0946-Enhanced-NR.png, gallery: none, wisdomPanelPdf: none
cat-feyra    hero: IMG_6482.jpeg, gallery: 3 photos, wisdomPanelPdf: Feyra_WisdomPanelProfile_FormerName-Ulya.pdf
```

---

## Session: 2026-04-28 (hotfix — Sanity Studio crash on siteSettings discardChanges action)

### Root Cause
`sanity/schemas/siteSettings.ts` had `__experimental_actions: ["update", "publish", "discardChanges"]`. The value `"discardChanges"` is not a valid Sanity action. Valid actions are `create`, `update`, `delete`, `publish`. Sanity Studio crashed on load with: *"Invalid action configured for schema type siteSettings: discardChanges. Valid actions are: create, update, delete, publish"*.

### Fix
- Removed `"discardChanges"` from the `__experimental_actions` array. Final value: `["update", "publish"]` — correct singleton pattern (no create, no delete).
- Committed directly to `main` (single-line hotfix, no CI checks on this repo).
- Ran `npx sanity deploy` — Studio deployed successfully to `https://pampered-feline.sanity.studio/`.

### Conventions
- **Sanity singleton actions:** For singleton documents (one document, no create/delete), use `__experimental_actions: ["update", "publish"]`. Do not include `"discardChanges"` — it is not a valid action value.

### Deferred
- **Parents banner image:** Still no `_parents` photo. Upload via Sanity Studio → Site Settings → Parents Together Banner Image.
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session (committed directly to main)
```
sanity/schemas/siteSettings.ts     (removed "discardChanges" from __experimental_actions)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-28 (PR #25 — fix white background flash on scroll)

### Root Cause
`body` in `src/styles/global.css` had `background-color: var(--color-ivory)` and `html` had no background set. All page sections use `bg-obsidian` or `bg-[#0f0e0d]` Tailwind classes, but the underlying document background was ivory. During scroll, the gaps between painted sections showed through as a white/ivory flash.

### Fix
- Added `background-color: var(--color-obsidian)` to `html` in `global.css`.
- Changed `background-color` on `body` from `var(--color-ivory)` to `var(--color-obsidian)`.
- Verified computed `background-color` is `rgb(10, 10, 10)` in dev preview before committing.

### Conventions
- **Page background rule:** Both `html` and `body` must match the site's primary background color. For dark-theme sites, this prevents flash-of-white during scroll, overscroll bounce on iOS, and any gaps between sections.

### Deferred
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics, mobile testing:** Carry forward.

### Files Changed This Session (PR #25 — merged)
```
src/styles/global.css              (html + body background-color set to var(--color-obsidian))
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-28 (PR #26 — individual kitten detail pages)

### Decisions
- **Individual kitten pages added:** Dynamic route `src/pages/kittens/[slug].astro` generates one SEO page per kitten. All 8 kittens (Helion, Tarquin, Kallias, Azriel, Lucien, Morrigan, Amren, Elain) have pages at `/kittens/{slug}`.
- **`slug` field added to Sanity kitten schema:** Type `slug`, source `name`, auto-generated. All 8 kitten documents patched with `slug.current` values (lowercase first names).
- **`about` field added to Sanity kitten schema:** Type `text`, 6 rows, with description. All 8 kitten documents patched with the approved about copy provided in the session prompt.
- **`getKittenBySlug()` added to sanity.ts:** Fetches a single kitten by `slug.current`. Returns `null` if not found (triggers redirect to homepage). Falls back to hardcoded fallback array when Sanity is unreachable.
- **GROQ projection updated:** `kittenProjection` now includes `"slug": slug.current` and `about` fields. All existing queries automatically pick these up.
- **Kitten detail page design:** Dark obsidian theme. Two-column layout on desktop (image left, details right). Hero image with thumbnail strip below (first 8 gallery images). "Back to the Litter" nav at top. Price/deposit/ready date in a bordered dl. About copy. Full gallery grid. Personality assessment section (if data present). Bottom CTA section. Lightbox for all images.
- **"Meet [Name]" button added to KittenCard:** Secondary button below the primary Inquire button. Rendered when `slug` prop is set. Inquire remains primary (solid fill); Meet is secondary (outlined). Both visible simultaneously for Available kittens. Reserved kittens show only the Meet button (no Inquire).
- **CurrentLitter fallback updated with slugs:** All 8 entries in the fallback array now include a `slug` field. `slug` passed as prop to `KittenCard` from the map.
- **Sitemap filter fixed:** Was `filter: (page) => page === homepage` (homepage only). Changed to `filter: (page) => !page.includes('/404')` — all pages included except the 404. Sitemap now includes homepage + 8 kitten detail pages.
- **`_redirects` unchanged:** `/kittens` and `/kittens/` still 301 to `/#kittens`. These exact-path redirects do not intercept `/kittens/{slug}/` subpaths. Verified Netlify does not wildcard-match these.
- **Build passes cleanly:** 10 pages generated (1 homepage, 8 kitten pages, 1 404). Sitemap confirmed correct.
- **Patch script committed:** `scripts/patch-kitten-about.mjs` handles the Sanity document patching. Can be re-run safely (idempotent patch). Reads write token from `.env` or `../../../.env` (main project root from worktree).

### Conventions
- **Kitten slug pattern:** Lowercase first name, no hyphens (e.g. `helion`, `morrigan`). Matches Sanity document ID suffix (`kitten-helion`).
- **Kitten page URL pattern:** `/kittens/{slug}` (e.g. `/kittens/helion`).
- **Kitten detail page fallback:** `fallbackKittens` array in `[slug].astro` mirrors the one in `CurrentLitter.astro` but includes `about` copy. If Sanity is unreachable, detail pages still render with correct copy.
- **Thumbnail strip behavior:** First 8 images shown. Clicking a thumbnail updates the hero image via `selectThumb()` exposed on `window`. Active thumb has `border-gold/60`. Lightbox opens at the currently selected thumbnail index.
- **Meet button visibility:** Rendered whenever `slug` prop is present (both Available and Reserved kittens). Inquire button rendered only for Available kittens without `linkTo`.

### Deferred
- **`npx sanity deploy` required:** Run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (after `git pull`) to push the updated schema (slug + about fields) to Sanity Studio UI. Sara cannot see or edit these fields in Studio until deployed.
- **Parents banner image:** Still no `_parents` photo. Upload via Sanity Studio → Site Settings → Parents Together Banner Image.
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos entered in Studio.
- **Mobile testing on real device:** Kitten detail page layout (two-column, thumbnail strip, gallery grid) should be verified on an actual phone.

### Files Changed This Session (PR #26 — merged)
```
sanity/schemas/kitten.ts           (slug field added before personality; about field added after personality)
src/lib/sanity.ts                  (Kitten type: slug? + about? added; kittenProjection: slug.current + about; kittenBySlugQuery added; getKittenBySlug() added)
src/components/KittenCard.astro    (slug prop added; meetHref computed; Inquire changed to primary solid; Meet [Name] secondary button added)
src/components/CurrentLitter.astro (fallback array: slug field added to all 8 entries; slug prop passed to KittenCard)
src/pages/kittens/[slug].astro     (NEW — dynamic route for individual kitten pages)
scripts/patch-kitten-about.mjs     (NEW — patches all 8 kitten documents with about copy and slug.current)
astro.config.mjs                   (sitemap filter: homepage-only → all pages except /404)
CLAUDE.md                          (session log appended)
```

### Sanity Documents Patched This Session
```
kitten-helion    slug: helion,   about: "Helion carries himself like he knows exactly..."
kitten-tarquin   slug: tarquin,  about: "Tarquin is the easygoing one..."
kitten-kallias   slug: kallias,  about: "Kallias is the one who stops people mid-scroll..."
kitten-azriel    slug: azriel,   about: "Azriel is cool-toned and watchful..."
kitten-lucien    slug: lucien,   about: "Lucien is the warm one..."
kitten-morrigan  slug: morrigan, about: "Morrigan's coat is a study in contrasts..."
kitten-amren     slug: amren,    about: "Amren is compact, watchful, and quietly intense..."
kitten-elain     slug: elain,    about: "Elain is reserved — both in temperament and status..."
```

---

## Session: 2026-04-28 (PR #28 — contract PDF download button)

### Decisions
- **"Download Contract (PDF)" button added** to the contract accordion section on the homepage, below the last accordion item ("What Comes With Your Kitten").
- **PDF path:** `/contracts/PamperedFeline-KittenPurchaseAgreement.pdf` — the file was already present in `public/contracts/` from PR #26 (kitten purchase agreement PDF commit).
- **Opens in new tab** with `target="_blank" rel="noopener noreferrer"`.
- **Styled as secondary outlined button:** `border-bone/20 text-bone/60` base, `hover:border-bone/50 hover:text-bone/90` hover — matches the dark obsidian theme convention for secondary CTAs used throughout the site (e.g., "Back to the Litter" on kitten detail pages).
- **Download icon included:** SVG document-download icon inline with the label text, `flex-shrink-0` to prevent collapse on small viewports.
- **Placement:** Centered (`text-center`), `mt-10` below the last `</ScrollReveal>`, inside the existing accordion container div.
- **No new files created.** Single edit to `src/pages/index.astro`.

### Deferred
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics, mobile testing:** Carry forward from previous sessions.
- **`npx sanity deploy`:** Still needed from project root to push kitten slug + about schema fields to Studio UI (carry-forward from PR #26).
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.

### Files Changed This Session (PR #28 — merged)
```
src/pages/index.astro              (Download Contract (PDF) button added below last contract accordion item)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-29 (PR #29 — healthEthics Sanity schema and Health & Ethics section wiring)

### Decisions
- **Two new content statements added to Health & Ethics section:**
  1. "Our Cats Stay With Us for Life" — uses `healthEthics.retirementPolicy` from Sanity: "Our breeding cats stay with us for life. We do not retire or rehome our kings and queens. They are family."
  2. "Queen Rest Between Litters" — uses `healthEthics.breedingFrequency` from Sanity: "Each queen is limited to two litters per year maximum, with appropriate rest between litters."
- **Placement:** Both new sections inserted between the "Genetic Testing" block and the "Heart & Joint Health" block, maintaining the alternating `bg-obsidian` / `bg-[#0f0e0d]` dark background pattern.
- **`healthEthics` Sanity singleton schema created:** Fields: `title`, `introduction`, `echocardiogramSection` (object: title+content), `geneticTestingSection` (object: title+content), `retirementPolicy` (text), `breedingFrequency` (text), `additionalPractices` (array of objects with title+content). Uses `__experimental_actions: ["update", "publish"]` — same singleton pattern as `siteSettings`.
- **Intro paragraph wired to Sanity:** The Health & Ethics section opening paragraph ("We hold ourselves to a transparent standard...") now pulls from `healthEthics.introduction` with hardcoded fallback.
- **`getHealthEthics()` fetcher added to `sanity.ts`:** Follows the same fallback-constant pattern as `getSettings()` and `getFaqs()`. Returns `fallbackHealthEthics` when Sanity is unreachable.
- **Sanity document seeded:** `scripts/create-health-ethics.mjs` created and run. Default `healthEthics` document is live in Sanity (project `k6e71wky`, dataset `production`).
- **`echocardiogramSection` and `geneticTestingSection` schema fields exist but are not wired to the page HTML** — those sections remain hardcoded for now. Sara can populate them in Studio; the content won't render on the page until explicitly wired in a future session.

### Conventions
- **`additionalPractices` array object type** has `title: "Practice"` so Sanity Studio labels each item correctly in the list UI.
- **Singleton healthEthics document ID:** `healthEthics` (no prefix). Matches the siteSettings pattern.
- **Seed script is idempotent:** `createOrReplace` — safe to re-run if content needs resetting.

### Deferred
- **`npx sanity deploy` required:** Run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (after `git pull`) to push the `healthEthics` schema to Sanity Studio UI. Sara cannot see or edit the Health & Ethics fields in Studio until this is deployed.
- **`echocardiogramSection` and `geneticTestingSection` wiring:** Fields exist in schema and TypeScript type but are not yet rendered on the page. Future session can wire these if Sara wants to manage that content from Studio.
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.
- **Kitten slug + about schema fields in Studio:** `npx sanity deploy` also needed to expose those fields (carry-forward from PR #26).

### Files Changed This Session (PR #29 — merged)
```
sanity/schemas/healthEthics.ts     (NEW — singleton document type with 7 fields)
sanity/schemas/index.ts            (healthEthics imported and added to schemaTypes)
src/lib/sanity.ts                  (HealthEthics interface, healthEthicsQuery, fallbackHealthEthics, getHealthEthics() fetcher)
src/pages/index.astro              (getHealthEthics imported; added to Promise.all; intro wired; two new ScrollReveal sections added)
scripts/create-health-ethics.mjs   (NEW — seeds default healthEthics document in Sanity)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-29 (PR #31 — Health & Ethics content edits and contract accordion fixes)

### Context
PR #29 (previous session) already created the `healthEthics` Sanity schema, wired the Health & Ethics section to Sanity, and added the two new statements (retirement policy + breeding frequency). This session applies the remaining content corrections and contract accordion fixes that were specified in the session brief.

### Decisions
- **Genetic Testing paragraph — sentence removed:** "Every kitten leaves with documentation of both parents' test results." removed from the end of the long echocardiography/genetic testing paragraph. This information is already covered under "What Comes With Your Kitten" in the contract accordion; duplicating it in the Health & Ethics section was redundant.
- **Contract — Deposit & Payment — payment methods updated:** "We accept Zelle and bank wire transfer only." changed to "We accept Zelle, bank transfers, and cash."
- **Contract — No Declawing — sentence removed:** "Any buyer who declaw their kitten is required to return the cat to us immediately." removed. The paragraph now ends at "...long-term physical and behavioral consequences." before moving to the scratching post alternative.
- **Contract — Breeding Restriction — legal consequence added:** "Unauthorized breeding is a breach of contract" now ends with "and will be prosecuted to the fullest extent of the law."
- **Contract — Rehoming — already correct:** Current code already reads "Transfers to another household require our written approval." No change needed.
- **Sanity seed script updated:** `scripts/create-health-ethics.mjs` updated to remove the documentation sentence from `geneticTestingSection.content`. Script re-run — Sanity document updated.
- **Two new Health & Ethics statements confirmed present:** "Our Cats Stay With Us for Life" (retirement policy) and "Queen Rest Between Litters" (breeding frequency) were added in PR #29 and remain unchanged.

### Conventions
- **Sanity seed script is idempotent:** `createOrReplace` — safe to re-run whenever content needs resetting.

### Deferred
- **`npx sanity deploy` required:** Run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` to push the `healthEthics` schema to Sanity Studio UI (carry-forward from PR #29). Also pushes kitten slug + about fields (carry-forward from PR #26).
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.
- **`echocardiogramSection` and `geneticTestingSection` wiring:** These Sanity fields exist but the page HTML still uses hardcoded text for those sections. Future session can wire if Sara wants Studio control over them.

### Files Changed This Session (PR #31 — merged)
```
src/pages/index.astro              (4 targeted edits: genetic testing sentence removed; payment methods updated; declawing sentence removed; breeding restriction legal language added)
scripts/create-health-ethics.mjs   (geneticTestingSection.content updated to match page — documentation sentence removed)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-28 (PR #30 — Health & Ethics Sanity integration)

### Decisions
- **`healthEthics` Sanity singleton created:** New `healthEthics` document type added as a singleton (`__experimental_actions: ["update", "publish"]`). Sara can edit all Health & Ethics content in Studio once `npx sanity deploy` is run.
- **Sentence removed:** "Both parents' health test documentation (echocardiogram results and genetic panel reports) is provided at pickup." was removed from the Genetic Testing paragraph. The equivalent sentence "Every kitten leaves with documentation of both parents' test results." was the live form in the codebase; removed from the fallback content and from the Sanity seed data.
- **Two new statements added as a combined section:** A new ScrollReveal section "Our Commitment to Our Cats" was inserted after the Heart and Joint Health section with two `<p>` tags:
  1. "Our breeding cats stay with us for life. We do not retire or rehome our kings and queens. They are family."
  2. "Each queen is limited to 2 litters per year maximum, with appropriate rest between litters."
- **"Retired breeding cats rehomed" bullet removed:** The Ethical Practices section previously included "Retired breeding cats are placed in carefully selected pet homes where they can live out their years in comfort." Removed — superseded by the new lifetime care statement.
- **Alternating backgrounds corrected:** Inserting a new section shifted the `bg-obsidian` / `bg-[#0f0e0d]` alternating pattern. Ethical Practices background changed from `bg-obsidian` to `bg-[#0f0e0d]` to maintain alternation.
- **Health section fully wired to Sanity:** `introduction`, `geneticTestingSection.content`, `echocardiogramSection.title`, `echocardiogramSection.content`, `retirementPolicy`, `breedingFrequency`, and `additionalPractices` all use `healthEthicsData.field ?? fallbackString` pattern. Fallback content mirrors the approved copy.
- **`additionalPractices` wired to Ethical Practices list:** Any additional practices Sara adds in Studio will render as `<li>` items in the Ethical Practices section.
- **Duplicate code conflict resolved:** When rebasing, the previous session's partial healthEthics integration (separate "Retirement Policy" and "Breeding Frequency" sections using an undefined `healthEthics` variable) was removed in favor of the new combined section using `healthEthicsData`.

### Conventions
- **`healthEthicsData` variable name:** The fetched HealthEthics document is destructured as `healthEthicsData` to avoid naming collision with the `HealthEthics` TypeScript interface.
- **Sanity document `_id: "healthEthics"`:** Fixed `_id` used by `create-health-ethics.mjs` so the script is safely re-runnable (idempotent via `createOrReplace`).
- **`echocardiogramSection.content` split on `\n\n`:** The Astro template splits the content string on double newlines to render multiple `<p>` tags. This allows Sara to separate paragraphs in Studio using blank lines.

### Deferred
- **Run `node scripts/create-health-ethics.mjs`:** Must be run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (or worktree) to seed the Sanity `healthEthics` document with approved content. Requires `SANITY_WRITE_TOKEN` in `.env` or active Sanity CLI session.
- **Run `npx sanity deploy`:** Must be run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (after `git pull`) to push the `healthEthics` schema to Studio. Sara cannot see or edit Health & Ethics content in Studio until this is deployed.
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session (PR #30 — merged)
```
sanity/schemas/healthEthics.ts     (NEW — healthEthics singleton schema with 7 fields)
sanity/schemas/index.ts            (healthEthics added to schemaTypes array)
src/lib/sanity.ts                  (HealthEthicsSection, HealthEthicsPractice, HealthEthics interfaces; healthEthicsQuery; fallbackHealthEthics; getHealthEthics() fetcher)
src/pages/index.astro              (getHealthEthics() added to Promise.all; health section wired to healthEthicsData; new "Our Commitment to Our Cats" section; Ethical Practices background corrected; retirement bullet removed)
scripts/create-health-ethics.mjs   (NEW — seeds healthEthics Sanity document with approved content)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-29 (PR #33 — Add Pampered Feline LLC to contract section)

### Decisions
- **Contract heading updated:** "Our Purchase Agreement" changed to "Kitten Purchase Agreement - Pampered Feline LLC". Hyphen used per spec (not em dash, consistent with CLAUDE.md copy conventions: no em dashes).
- **Contract intro paragraph updated:** "Every Pampered Feline kitten is sold with a written purchase agreement." replaced with "This agreement is between [Buyer Name] and Pampered Feline LLC, operating as The Pampered Feline Maine Coons." The rest of the paragraph ("The contract protects the kitten first. Here is a summary of our terms.") is retained.
- **"[Buyer Name]" placeholder retained as-is:** This is a literal placeholder in the web summary — the actual buyer name is filled in on the signed PDF contract, not on the website.
- **Signature block does not exist in the web code:** The contract accordion is a summary of terms, not a fillable contract form. The spec's third item (add "Pampered Feline LLC" above Sara's signature line) applies only to the PDF — no web code change was made for this.
- **PDF path unchanged:** `/contracts/PamperedFeline-KittenPurchaseAgreement.pdf` is the existing PDF. Web code does not need to change; the PDF itself requires a manual update by Nick.
- **"The Pampered Feline Maine Coons" DBA name used as specified.** Differs from site-wide usage ("Pampered Feline Maine Coons" without "The") — may be the formal legal DBA form.

### Deferred
- **PDF contract manual update:** Nick needs to update the PDF to include "Pampered Feline LLC" in the title, party line, and above Sara's signature. Replace the file at `public/contracts/PamperedFeline-KittenPurchaseAgreement.pdf` and push.
- **`npx sanity deploy` from project root:** Still needed to push healthEthics + kitten schema fields to Studio (carry-forward from PR #29 / PR #26).
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session (PR #33 — merged)
```
src/pages/index.astro              (contract h2 and intro paragraph updated with Pampered Feline LLC)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-04-29 (watermarked photo replacement — all kittens and cats)

### Decisions
- **All 8 kitten photos replaced with watermarked versions:** Hero and gallery images for Helion, Tarquin, Kallias, Azriel, Lucien, Morrigan, Amren, and Elain replaced in Sanity. Old (non-watermarked) assets deleted.
- **All 3 cat photos replaced with watermarked versions:** Hero and gallery images for Aedion, Rowan, and Feyra replaced in Sanity. Old assets deleted where possible.
- **`siteSettings.parentsBannerImage` updated:** Feyra's `_parents_result.jpg` (watermarked) uploaded and set on the `siteSettings` document. `createIfNotExists` used to handle the case where `siteSettings` had not yet been created as a Sanity document.
- **`replace-with-watermarked.mjs` script created and committed:** Handles full replacement flow: reads watermarked files from `public/images/kittens/watermarked/` and `public/images/cats/{Name}/watermarked/`, uploads assets, patches Sanity documents, deletes old assets. Supports `--kittens Name,Name` and `--cats [Name,Name]` flags to target specific animals. Retry logic: 4 attempts with 3s/6s/9s backoff for transient network errors.

### Issues Encountered
- **Persistent network error on Morrigan during initial runs:** `"An invalid response was received from the upstream server"` at `Morrigan_1799_result.jpg` on both first and second attempts. Fixed by adding retry logic with exponential backoff. Third attempt (run with `--kittens Morrigan,Tarquin`) succeeded on the first try — the error was transient Sanity API instability, not a file-specific issue.
- **Feyra old-asset deletion blocked by draft references:** Three Feyra assets could not be deleted because `drafts.cat-feyra` still references them. Logged as warnings. The published `cat-feyra` document is fully updated with watermarked photos. Draft references will resolve when Sara publishes or discards the draft in Studio.
- **`siteSettings` document did not exist:** The `client.patch("siteSettings")` call failed with "document not found". Fixed by calling `createIfNotExists` before patching.
- **Orphaned assets from failed retry runs:** The first two failed runs uploaded watermarked assets for Amren, Azriel, Elain, Helion, Kallias, Lucien before failing. The subsequent successful run uploaded a second set, making the first set orphaned. These can be cleaned up via Sanity Studio → Media Library → filter "Unused assets". The cat (Feyra) re-run similarly left orphaned watermarked assets. No functional impact — published documents point to the correct watermarked assets.

### Kitten counts uploaded
- Amren: 1 hero + 11 gallery = 12
- Azriel: 1 hero + 9 gallery = 10
- Elain: 1 hero + 11 gallery = 12
- Helion: 1 hero + 5 gallery = 6
- Kallias: 1 hero + 9 gallery = 10
- Lucien: 1 hero + 14 gallery = 15
- Morrigan: 1 hero + 13 gallery = 14
- Tarquin: 1 hero + 9 gallery = 10

### Cat counts uploaded (final successful run)
- Aedion: 1 hero + 9 gallery = 10
- Rowan: 1 hero = 1
- Feyra: 1 hero + 2 gallery + 1 parents banner = 4

### Conventions
- **`--kittens` flag:** Comma-separated kitten names (case-insensitive prefix matching). Skips cats unless `--cats` also present.
- **`--cats` flag:** Optionally filtered by comma-separated names. Skips kittens unless `--kittens` also present.
- **No flags = full run:** Both kittens and cats processed.
- **Retry behavior:** 4 attempts, delay = `attempt * 3000ms`. Failure on all 4 attempts is fatal.
- **`createIfNotExists` for siteSettings:** Ensures the singleton document exists before patching. Safe to run repeatedly.

### Deferred
- **Orphaned asset cleanup:** Use Sanity Studio → Media Library → "Unused assets" filter to find and delete the duplicate watermarked uploads from failed retry runs. This is cosmetic only — no functional impact.
- **Feyra draft cleanup:** Sara can discard or publish the `drafts.cat-feyra` draft in Studio to release the blocked old asset references, then the old assets can be deleted manually or via script.
- **`npx sanity deploy` from project root:** Still needed to push healthEthics + kitten slug/about schema fields to Studio UI (carry-forward from PR #29 / PR #26).
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session
```
scripts/replace-with-watermarked.mjs   (NEW — committed to main; full replacement script with retry + filters)
CLAUDE.md                              (session log appended)
```

### Sanity Documents Updated This Session
```
kitten-helion    image + gallery → watermarked versions; old assets deleted
kitten-tarquin   image + gallery → watermarked versions; old assets deleted
kitten-kallias   image + gallery → watermarked versions; old assets deleted
kitten-azriel    image + gallery → watermarked versions; old assets deleted
kitten-lucien    image + gallery → watermarked versions; old assets deleted
kitten-morrigan  image + gallery → watermarked versions; old assets deleted
kitten-amren     image + gallery → watermarked versions; old assets deleted
kitten-elain     image + gallery → watermarked versions; old assets deleted
cat-aedion       image + gallery → watermarked versions; old assets deleted
cat-rowan        image → watermarked version; old asset deleted
cat-feyra        image + gallery → watermarked versions; old assets blocked by draft
siteSettings     parentsBannerImage → watermarked _parents_result.jpg (document created then patched)
```

---

## Session: 2026-05-03 (PR #35 — kitten socialization section in Health & Ethics)

### Decisions
- **New "Kitten Socialization & Preparation" subsection added** to the Health & Ethics block on the homepage. Appears between "Our Commitment to Our Cats" (lifetime care + breeding frequency) and "Daily Care", maintaining the alternating `bg-obsidian` / `bg-[#0f0e0d]` background pattern.
- **Sanity `healthEthics` schema extended:** New `socializationSection` object field added with three sub-fields: `title` (string), `intro` (text — opening paragraph), `items` (array of strings — rendered as bullet points). Pattern matches the project convention of storing structured content in named objects rather than free-form text blocks.
- **Daily Care background corrected:** Changed from `bg-obsidian` to `bg-[#0f0e0d]` to maintain the alternating dark background pattern after inserting the new section.
- **Ethical Practices background corrected:** Changed from `bg-[#0f0e0d]` to `bg-obsidian` for the same reason.
- **TypeScript type updated:** `HealthEthicsSocialization` interface added to `src/lib/sanity.ts`. `HealthEthics` interface extended with `socializationSection?: HealthEthicsSocialization`.
- **GROQ query updated:** `socializationSection { title, intro, items }` added to `healthEthicsQuery`.
- **Fallback constant updated:** Full approved content added to `fallbackHealthEthics.socializationSection` in `sanity.ts`. Identical content seeded in `create-health-ethics.mjs`.
- **Seed script re-run:** `node scripts/create-health-ethics.mjs` executed successfully — Sanity `healthEthics` document updated with `socializationSection` content.
- **Build verified:** 10 pages generated cleanly, no TypeScript errors.

### Socialization items (approved content)
1. Daily nail trimming from birth
2. Extensive paw handling and toe bean play to ensure comfort with grooming
3. Cat carrier acclimation for stress-free vet visits
4. Bite inhibition training and litter box training
5. Socialization with children and exposure to household noises
6. Daily human interaction — our kittens thrive on affection and will not do well without it
7. Kitten face massage techniques to build trust and bonding

### Deferred
- **`npx sanity deploy` required after merge:** Run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (after `git pull`) to push the updated `healthEthics` schema (new `socializationSection` field) to Sanity Studio UI. Sara cannot see or edit these fields in Studio until deployed.
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward from previous sessions.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.
- **Kitten slug + about schema fields in Studio:** `npx sanity deploy` also needed to expose those fields (carry-forward from PR #26).

### Files Changed This Session (PR #35 — pending review)
```
sanity/schemas/healthEthics.ts     (socializationSection object field added)
src/lib/sanity.ts                  (HealthEthicsSocialization interface; socializationSection in query + fallback)
scripts/create-health-ethics.mjs   (socializationSection content added; re-run to update Sanity)
src/pages/index.astro              (new Kitten Socialization section added; Daily Care + Ethical Practices backgrounds corrected)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-05-07 (PR #38 — show results section with championship certificates)

### Decisions
- **`championshipCertificate` field added to Cat schema:** Same `type: "file"` pattern as `wisdomPanelPdf`. Enables uploading CFA/TICA championship certificate PDFs per cat in Sanity Studio.
- **`showResult` Sanity document type created:** New document type with fields: `catName` (string, required), `organization` (CFA/TICA dropdown, required), `titleEarned` (string, required), `showDate` (date), `location` (string), `certificatePDF` (file), `displayOrder` (number). Ordered by `displayOrder asc` in GROQ.
- **`ShowResult` TypeScript interface added to `sanity.ts`:** Follows same pattern as `Cat`, `Kitten`, etc. Query uses `certificatePDF { asset-> { url } }` nested dereference.
- **Fallback seeded with first show result:** Aedion, CFA Champion, Greater Baltimore Cat Club, Baltimore MD, 2025-12-06, displayOrder 1.
- **`ShowResults.astro` component created:** Dark `bg-[#0f0e0d]` section. Results listed as a divided list with org badge (gold-bordered pill), cat name + title heading, location and formatted date, and optional "Certificate" download link (outlined bone button with document icon).
- **Section inserted on homepage** between `</section>` (end of `#our-cats`) and `<!-- HEALTH & ETHICS -->` comment. Uses `<ShowResults results={showResults} />`.
- **`getShowResults()` added to `Promise.all`** in `index.astro` frontmatter alongside existing fetchers.

### Conventions
- **Show result document IDs:** Auto-generated by Sanity (no custom `_id` pattern needed — these are non-singleton documents).
- **Certificate download link** renders only when `result.certificatePDF?.asset?.url` is present. No link shown for results without a PDF.
- **Date formatting:** `showDate` stored as `YYYY-MM-DD` string in Sanity. Parsed manually (split on `-`) to avoid timezone offset shifting the displayed date. Formatted as "December 6, 2025" style.

### Deferred
- **`npx sanity deploy` required after merge:** Run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (after `git pull`) to push the `showResult` schema and the updated `cat` schema (`championshipCertificate` field) to Sanity Studio. Sara cannot create show results or upload championship certificates in Studio until deployed.
- **Additional show results:** Enter future CFA/TICA results directly in Sanity Studio after deploy. The fallback (Aedion CFA Champion) will be superseded once Sanity has live data.
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward from previous sessions.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session (PR #38 — targeting staging)
```
sanity/schemas/cat.ts              (championshipCertificate file field added after wisdomPanelPdf)
sanity/schemas/showResult.ts       (NEW — showResult document type)
sanity/schemas/index.ts            (showResult imported and added to schemaTypes)
src/lib/sanity.ts                  (ShowResult interface; showResultQuery; fallbackShowResults; getShowResults() fetcher; Cat interface + catQuery updated with championshipCertificate)
src/components/ShowResults.astro   (NEW — Championship Results section component)
src/pages/index.astro              (ShowResults imported; getShowResults() in Promise.all; section inserted between #our-cats and #health)
CLAUDE.md                          (session log appended)
## Session: 2026-05-07 (bringing-home-your-kitten page)

### Decisions
- **New page created:** `src/pages/bringing-home-your-kitten.astro` at URL `/bringing-home-your-kitten`. Provides complete new owner care instructions in 11 sections.
- **Dark obsidian theme matches site:** Hero, section backgrounds, and typography all follow existing site conventions (`bg-obsidian`, `bg-[#0f0e0d]` alternating, `text-bone`, `font-heading`, gold labels).
- **SEO:** Title "Bringing Home Your Kitten | Pampered Feline Maine Coons", targeted meta description for new kitten owner queries.
- **PDF download button in hero:** Links to `/bringing-home-guide.pdf`. File not yet created — placeholder link only.
- **Section structure:** 11 content sections with `h2` section titles, `h3` subsections, gold bullet markers, and `border-l-2 border-gold/30` sidebar callouts for key rules (quarantine room, litter rule of thumb, companionship, etc.).
- **Bottom CTA:** "Contact Us" primary button + "Back to Home" secondary button.
- **No nav or footer changes:** Footer has no navigation section, so no link was added there. Nav already has 7 links; adding an 8th for a care guide would clutter it.
- **FAQ order 9 fallback updated:** Appended "For detailed care instructions, see our Bringing Home Your Kitten guide at /bringing-home-your-kitten." to the "What is included with my kitten?" answer. FAQ answers render as plain text so no link markup is possible. Sara should also update the Sanity Studio entry directly.
- **Build verified:** 11 pages generated cleanly. Route returns HTTP 200.

### Conventions
- **Bringing home guide PDF path:** `/bringing-home-guide.pdf` (file not yet created — add to `public/` when ready).
- **Section number labels:** Each section has a `text-xs tracking-[0.3em] uppercase text-gold/70` label ("Section 1", "Section 2", etc.) above the `h2`.
- **Bullet marker pattern:** `<span class="mt-1.5 w-1 h-1 rounded-full bg-gold/60 flex-shrink-0">` inside `<li class="flex items-start gap-3">` — gold dot bullets without `list-disc`.
- **Numbered list pattern:** Flex layout with `text-gold font-heading` number span and `strong class="text-bone font-medium"` for ordered rules.

### Deferred
- **`/bringing-home-guide.pdf` file:** Must be created and placed in `public/` for the PDF download button to work.
- **Sara to update Sanity FAQ entry (order 9):** "What is included with my kitten?" should include the bringing-home guide link in Studio.
- **`npx sanity deploy` from project root:** Still needed (carry-forward from PR #35 / PR #26 / PR #29).
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session
```
src/pages/bringing-home-your-kitten.astro   (NEW — 11-section new owner care guide page)
src/lib/sanity.ts                           (FAQ order 9 fallback: bringing-home guide reference appended)
## Session: 2026-05-07 (PR #36 — Bringing Home Your Kitten page — pending merge)

See the session log entry that will land with PR #36. That PR adds `src/pages/bringing-home-your-kitten.astro` and updates the FAQ order-9 fallback.

---

## Session: 2026-05-07 (bringing-home PDF generation)

### Decisions
- **`public/bringing-home-guide.pdf` created:** 19KB PDF generated with ReportLab using `scripts/generate-bringing-home-pdf.py`. Fulfills the download link on `/bringing-home-your-kitten`.
- **Design:** Dark charcoal (`#1C1917`) cover block with gold accent bar at bottom, ivory (`#F5F1EB`) page background. Times Roman for body and headings (closest professional serif available in ReportLab's built-in fonts), Helvetica for labels and footer. Gold (`#C9A96E`) bullets and section label text.
- **All 11 sections included:** Before Pickup Supplies, Food & Feeding, Litter Box, First Few Days, Introducing to Other Pets, Health & Vet Care, Important Care Requirements, Toys & Enrichment, Grooming, Lifetime Support, Resources.
- **Page template:** Slim obsidian header banner on pages 2+ with cattery name in gold. Footer on every page: domain left, page number right, separated by a hairline rule.
- **Callout style:** Italic text for key rules (quarantine room, litter rule of thumb, microchip note, companionship note) — visually distinct without a border box.
- **Script is re-runnable:** `python scripts/generate-bringing-home-pdf.py` from project root regenerates the PDF. Run again if content is updated.
- **No schema changes:** This PR contains no Sanity schema changes. `npx sanity deploy` is not required for this PR.
- **Separate PR from page:** PDF is in `feat/bringing-home-pdf` (branches from staging). Page is in `claude/wonderful-blackburn-218713` (also targets staging). Both PRs can merge independently — the download link on the page works as soon as the PDF PR is deployed.

### Conventions
- **PDF generation script path:** `scripts/generate-bringing-home-pdf.py` — run from project root.
- **PDF output path:** `public/bringing-home-guide.pdf` — must match the href in `bringing-home-your-kitten.astro`.
- **ReportLab font strategy:** Use `Times-Roman` / `Times-Bold` / `Times-Italic` for body/headings (professional serif, built-in), `Helvetica` for labels and footer (clean sans). Avoids custom font embedding complexity.

### Deferred
- **Merge order:** Merge PR #36 (page) and this PR in either order — they are independent. Recommend merging page first so the download button is live before the PDF link resolves.
- **Content updates to PDF:** If care guide content changes in the future, update `scripts/generate-bringing-home-pdf.py` and re-run to regenerate `public/bringing-home-guide.pdf`, then push.
- **`npx sanity deploy` carry-forward:** Still needed from project root to push healthEthics + kitten slug/about schema fields (carry-forward from PR #35 / #26 / #29). Not required for this PR.
- **Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Carry forward.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session (feat/bringing-home-pdf)
```
public/bringing-home-guide.pdf              (NEW — 19KB PDF, all 11 sections)
scripts/generate-bringing-home-pdf.py       (NEW — ReportLab generation script)
CLAUDE.md                                   (session log appended)
```

---

## Session: 2026-05-07 (kitten application form — committed directly to main)

### Decisions
- **`/kitten-application` page created:** 20-field adoption application form at `src/pages/kitten-application.astro`. Committed directly to `main` (staging was already merged to main).
- **Netlify Forms integration:** `data-netlify="true"`, `name="kitten-application"`, `netlify-honeypot="bot-field"` honeypot, hidden `form-name` input. Netlify will auto-register the form on first deploy and route submissions to the dashboard.
- **AJAX submission:** Same `fetch("/")`+`URLSearchParams` pattern as the contact form. On success: form fields hidden, success message shown (green). On error: submit re-enabled, error message with mailto fallback shown (red).
- **Dark obsidian theme:** Matches site conventions — `bg-obsidian` hero, `bg-[#0f0e0d]` form section, `text-bone`, `text-gold/70` labels, `font-heading` section headings.
- **5 sections, 22 fields:**
  - Section 1 (About You): full name, email, phone, city/state, referral source
  - Section 2 (Your Household): home type, own/rent, pet permission if renting, adults in household, children in household
  - Section 3 (Experience): current pets, cat ownership experience, Maine Coon experience, hours home per day, why a Maine Coon
  - Section 4 (Kitten Preferences): sex preference, color preference, polydactyl interest, preferred timing
  - Section 5 (References): vet name and clinic, personal reference, additional notes
- **No nav change:** The nav already has 7 items. The page is reachable at `/kitten-application` and can be linked from kitten CTAs or the footer in a future session if desired.
- **Build verified:** 12 pages generated cleanly, `data-netlify` and all field `name` attributes confirmed present in the built HTML output.

### Conventions
- **Netlify Forms name:** `kitten-application` — distinct from the existing `contact` form. Both will appear separately in the Netlify Forms dashboard.
- **Select dropdowns:** Custom chevron SVG positioned absolutely inside `relative` wrapper. `appearance-none` on the `<select>` to remove browser default arrow. Chevron offset calculated with `top-[calc(50%+10px)]` to account for the label height above.
- **Required fields:** Full name, email, city/state, and "why a Maine Coon" are marked required. Most other fields are optional to reduce friction.

### Deferred
- **Nav or CTA link to /kitten-application:** Not added this session. Consider linking from the kittens section or adding an "Apply" nav item in a future session.
- **Netlify Forms confirmation email:** Can configure in Netlify dashboard (Forms → kitten-application → notifications) to auto-reply to applicants and notify Sara.
- **All prior deferred items carry forward:** `npx sanity deploy` for show results schema, parents banner image, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries, mobile testing.

### Files Changed This Session
```
src/pages/kitten-application.astro   (NEW — 22-field adoption application form)
CLAUDE.md                            (session log appended)
```

---

## Session: 2026-05-07 (nav Info dropdown — committed directly to main)

### Decisions
- **Contract nav link replaced with Info dropdown:** "Contract" removed from the flat nav. A new "Info" item replaces it with a dropdown containing three links.
- **Desktop dropdown:** CSS `group` + `group-hover:block` on an `absolute` panel — no JS required. Chevron rotates 180° on hover via `group-hover:rotate-180`. Panel styled `bg-ivory border border-gold/15 shadow-lg` to match the nav header. Links use the same `text-charcoal-light hover:text-gold-dark` classes as all other nav links. `min-w-[240px]` fits the longest label.
- **Mobile accordion:** JS toggle on `#info-accordion-toggle` button. Chevron rotates on expand. Sub-list indented with `pl-4 border-l border-gold/20`. Clicking any sub-link closes the entire mobile menu and resets accordion state.
- **Three Info items:**
  1. "Bringing Home Your Kitten" → `/bringing-home-your-kitten`
  2. "Kitten Purchase Agreement" → `/contracts/PamperedFeline-KittenPurchaseAgreement.pdf` with `download` attribute and `target="_blank"`
  3. "FAQ" → `/#faq`
- **`autoPort: true` added to `.claude/launch.json`** for the `astro-dev` server config to avoid port-conflict errors when port 4321 is already in use.
- **Build verified:** 12 pages generated cleanly. Built HTML confirmed: `group-hover:block` present, `info-accordion-toggle` present, `download` attribute on PDF link, `/#contract` link absent, all 3 info hrefs present in both desktop and mobile markup.

### Conventions
- **Dropdown pattern (desktop):** `<li class="relative group">` wrapper, `group-hover:block` on the panel `<div>`. No JS needed for desktop reveal.
- **Accordion pattern (mobile):** `aria-expanded` toggled by JS, `hidden`/`flex` class swap on the sub-list, chevron `rotate-180` class toggled. Reset to closed state whenever the main mobile menu closes.
- **PDF download link:** `download` attribute + `target="_blank"` + `rel="noopener noreferrer"` on the PDF `<a>` tag.

### Deferred
- All prior deferred items carry forward: `npx sanity deploy` for show results schema, parents banner image, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries, mobile testing.

### Files Changed This Session
```
src/components/Nav.astro     (Contract link removed; Info dropdown + mobile accordion added)
.claude/launch.json          (autoPort: true added to astro-dev config)
CLAUDE.md                    (session log appended)
```

---

## Session: 2026-05-07 (Apply for a Kitten CTAs — committed directly to main)

### Decisions
- **Hero CTA buttons added:** Two CTA buttons added below the hero subtitle: gold primary "Apply for a Kitten" → `/kitten-application`; outlined secondary "View Available Kittens" → `/#kittens`. Uses `flex flex-col sm:flex-row items-center justify-center gap-4` layout — stacked on mobile, side-by-side on small+ screens.
- **KittenCard "Inquire" button renamed:** "Inquire About This Kitten" changed to "Apply for This Kitten". `href` changed from `/#contact` to `/kitten-application`. All styling classes and conditional logic unchanged.
- **Nav Info dropdown updated:** "Apply for a Kitten" → `/kitten-application` added as the first item in `infoLinks`. Dropdown now has 4 items: Apply for a Kitten, Bringing Home Your Kitten, Kitten Purchase Agreement (PDF download), FAQ.
- **Nav dropdown hover gap bug fixed:** The previous CSS `group`/`group-hover:block` approach caused the dropdown to close when the cursor passed through the 8px `mt-2` gap between the trigger button and the panel. Fixed by replacing CSS hover with JS `mouseenter`/`mouseleave` on both `#info-li` (the `<li>` wrapper) and `#info-panel`. A 220ms `scheduleHideInfo` timeout is started on mouseleave; it is cancelled if mouseenter fires on either element before it fires. This gives the cursor enough time to bridge the gap without the panel closing.
- **Chevron and aria-expanded toggled in JS:** `rotate-180` class and `aria-expanded` attribute managed by the same `showInfo()`/`scheduleHideInfo()` functions rather than by CSS alone.
- **Escape key closes dropdown:** `keydown` listener on `document` closes the panel and returns focus to `#info-trigger` when Escape is pressed while the panel is open.
- **Build verified:** 12 pages generated cleanly.

### Conventions
- **Dropdown pattern (desktop — updated):** JS mouseenter/mouseleave + 220ms timeout, not CSS `group-hover`. Both `#info-li` and `#info-panel` register listeners so the delay covers the gap between them.
- **`hideTimer` pattern:** Single `ReturnType<typeof setTimeout> | null` variable; always cleared before setting a new one; always set to `null` after clearing.

### Deferred
- **`npx sanity deploy` required:** Run from `C:\Users\nxros\PROJECTS\pampered-feline-cattery` (after `git pull`) to push the showResult schema, cat `championshipCertificate` field, and kitten slug/about fields to Sanity Studio UI.
- **Parents banner image, Instagram handle, Google Workspace email, Plausible analytics:** Carry forward.
- **Sara's cat entries in Sanity Studio:** Aedion, Rowan, Feyra still need real photos.
- **Mobile testing on real device:** Carry forward.

### Files Changed This Session
```
src/components/Hero.astro        (CTA buttons added below subtitle)
src/components/KittenCard.astro  (Inquire → Apply for This Kitten; href /#contact → /kitten-application)
src/components/Nav.astro         (Apply for a Kitten added as first Info item; CSS group-hover replaced with JS hover delay)
CLAUDE.md                        (session log appended)
```

---

## Session: 2026-05-07 (remove honeypot from kitten application form)

### Decisions
- **Honeypot removed from kitten-application form:** `netlify-honeypot="bot-field"` attribute removed from the `<form>` tag. Hidden `<div aria-hidden="true">` containing `<input name="bot-field">` removed. Netlify's native spam filter remains active and is sufficient.

### Root Cause
The honeypot was causing false positives — legitimate submissions were being blocked because some browsers or password managers were auto-filling the hidden field.

### Files Changed This Session
```
src/pages/kitten-application.astro   (netlify-honeypot attr + hidden bot-field input removed)
CLAUDE.md                            (session log appended)
```

---

## Session: 2026-05-07 (clear Instagram placeholder from fallback settings)

### Decisions
- **`instagramHandle` fallback cleared:** `fallbackSettings.instagramHandle` changed from `"[PLACEHOLDER — instagram]"` to `undefined` in `src/lib/sanity.ts`. The `instagramHandle` field remains in the `SiteSettings` interface, the GROQ `siteSettingsQuery`, and the Sanity `siteSettings` schema — nothing is rendered on the frontend until Sara adds a real handle via Sanity Studio.
- **No frontend changes needed:** Footer and contact page had Instagram rendering removed in PR #5 (April 2026 session). No `.astro` file references `instagramHandle` today.
- **`kitten-application.astro` "Instagram" option untouched:** The dropdown option for "How did you find us? → Instagram" is a referral source field, not a placeholder link. Kept as-is.

### Deferred
- **All prior deferred items carry forward:** `npx sanity deploy` for show results schema, parents banner image, Google Workspace email, Plausible analytics, Sara's cat entries, mobile testing.

### Files Changed This Session
```
src/lib/sanity.ts   (instagramHandle fallback: "[PLACEHOLDER — instagram]" → undefined)
CLAUDE.md           (session log appended)

---

## Session: 2026-05-07 (Health & Ethics copy edits)

### Decisions
- **Nail trimming item updated:** "Daily nail trimming from birth" changed to "Bi-weekly nail trimming starting at 4 weeks of age" in the Kitten Socialization & Preparation section.
- **Ethical Practices item updated:** "Every kitten is sold with a written contract that protects the cat first." changed to "Every kitten is placed with a written contract outlining our commitment to their lifelong care."
- **Three files updated:** Both changes applied consistently across `index.astro` (rendered page), `src/lib/sanity.ts` (fallback constant), and `scripts/create-health-ethics.mjs` (seed script) to keep all three in sync.

### Deferred
- **All prior deferred items carry forward:** `npx sanity deploy` for show results + kitten slug/about schema fields, parents banner image, Google Workspace email, Plausible analytics, Sara's cat entries in Studio, mobile testing.

### Files Changed This Session
```
src/pages/index.astro              (both copy edits applied)
src/lib/sanity.ts                  (nail trimming fallback updated)
scripts/create-health-ethics.mjs   (nail trimming seed content updated)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-05-13 (PR #41 — Google Ads conversion tracking)

### Decisions
- **Google Ads global site tag added:** The `AW-326548451` tag pasted into `BaseLayout.astro` `<head>`, appearing on every page of the site.
- **Conversion event fires on kitten application success:** In `kitten-application.astro`, the form submit success handler calls `gtag('event', 'conversion', { send_to: 'AW-326548451' })` after the success message is shown. Only fires on a resolved fetch — not on errors or incomplete submissions.
- **Conversion label not yet configured:** The tag was provided with the account ID only. To attribute conversions to a specific Google Ads conversion action (required for reporting in the Google Ads dashboard), a conversion label must be added. Get it from Google Ads → Tools → Conversions → select action → Tag setup → copy the label. Update `send_to` in `kitten-application.astro` from `"AW-326548451"` to `"AW-326548451/YOUR_LABEL"`.
- **Build verified:** Tag loaded (`gtag/js?id=AW-326548451` → 200), Google Ads pings confirmed in network tab, no console errors.

### Conventions
- **gtag guard pattern:** `if (typeof (window as any).gtag === "function")` — fires only when the tag has loaded. Prevents runtime errors if the tag is blocked by an ad blocker.

### Deferred
- **Add conversion label:** Nick to get the conversion label from Google Ads dashboard and update the `send_to` value in `src/pages/kitten-application.astro`.
- **All prior deferred items carry forward:** `npx sanity deploy` for show results + kitten slug/about schema fields, parents banner image, Google Workspace email, Plausible analytics, Sara's cat entries in Studio, mobile testing.

### Files Changed This Session (PR #41 — targeting staging)
```
src/layouts/BaseLayout.astro       (Google Ads global site tag added to <head>)
src/pages/kitten-application.astro (gtag conversion event fired on successful form submission)
CLAUDE.md                          (session log appended)
```

---

## Session: 2026-05-16 (PR #42 — Google-compliant favicon set for search results)

### Decisions
- **Full favicon set wired:** Replaced the two existing favicon `<link>` tags in `BaseLayout.astro` with the five-tag set recommended for Google Search favicon eligibility: ICO (legacy), SVG (modern browsers), 96×96 PNG (Google Search), apple-touch-icon (iOS), and `<link rel="manifest">` (PWA / Android).
- **`site.webmanifest` corrected:** The file committed to staging had realfavicongenerator's default placeholder values (`"MyWebSite"`, `"MySite"`, `theme_color: "#ffffff"`). Updated to `"Pampered Feline Maine Coons"` / `"Pampered Feline"` / `theme_color: "#0A0A0A"` / `background_color: "#0A0A0A"` to match the site's dark theme.
- **`robots.txt` confirmed clean:** `User-agent: * / Allow: /` — no rules that could block Googlebot or Googlebot-Image from fetching favicon files.
- **No Sanity changes:** Frontend only.

### Post-deploy steps (Nick)
1. Verify `https://pamperedfelinemainecoons.com/favicon-96x96.png` loads after Netlify deploys.
2. In Google Search Console, request indexing of the homepage.
3. Allow several days to several weeks for Google to display the favicon in search results.

### Files Changed This Session (PR #42 — targeting staging)
```
src/layouts/BaseLayout.astro   (favicon <link> tags replaced with 5-tag Google-compliant set; <link rel="manifest"> added)
public/site.webmanifest        (name, short_name, theme_color, background_color corrected from placeholder defaults)
CLAUDE.md                      (session log appended)
```

---

## Session: 2026-05-18 (PR #43 — add cat/kitten photos, logos, and Aedion certificate; exclude private buyer contracts)

### Decisions
- **`/contracts/` added to `.gitignore`:** Root-level `contracts/` folder contains private buyer documents (`PamperedFeline-KittenPurchaseAgreement-Mawyer_Lucien_5.7.2026-signed.pdf` and an unsigned copy with the buyer's name). These must never be committed. Distinct from `public/contracts/` which holds the public template PDF (already tracked and deployed).
- **Aedion's CFA Championship Certificate moved:** `Aedion_CFA_Champion-Certificate.jpeg` was at the repo root (untracked). Moved to `public/images/certificates/` — a new folder created for this purpose.
- **All cat photos committed:** `public/images/cats/Aedion/`, `public/images/cats/Feyra/`, `public/images/cats/Rowan/` including originals, watermarked versions, Wisdom Panel PDFs, and the Feyra parents photo.
- **All kitten photos committed:** `public/images/kittens/2026 kitten photos/` (originals) and `public/images/kittens/watermarked/` (watermarked versions) for all 8 kittens. These are the source files used by `scripts/upload-kittens.mjs` and `scripts/replace-with-watermarked.mjs`.
- **Logo files committed:** `public/images/logos/CFA-Stacked-Logo-Tag_White-1024x925.png` and `public/images/logos/White-Globe-Name-Cat-Website.png`.
- **No code changes.** This PR is assets and `.gitignore` only.

### Conventions
- **`/contracts/` (root) vs `public/contracts/` (public template):** Root contracts are private buyer documents — gitignored. `public/contracts/` holds the generic purchase agreement PDF served on the site — tracked and deployed.
- **`public/images/certificates/`:** New folder for championship certificates and similar award documents.

### Deferred
- **All prior deferred items carry forward:** Add conversion label in Google Ads for `kitten-application.astro`, `npx sanity deploy` for show results + kitten slug/about schema fields, parents banner image, Google Workspace email, Plausible analytics, Sara's cat entries in Studio, mobile testing.

### Files Changed This Session (PR #43 — targeting staging)
```
.gitignore                                    (/contracts/ entry added)
public/images/certificates/                   (NEW folder — Aedion_CFA_Champion-Certificate.jpeg)
public/images/cats/Aedion/                    (11 originals + 10 watermarked + Wisdom Panel PDF)
public/images/cats/Feyra/                     (4 originals + 4 watermarked + Wisdom Panel PDF)
public/images/cats/Rowan/                     (1 original + 1 watermarked)
public/images/kittens/2026 kitten photos/     (originals for all 8 kittens)
public/images/kittens/watermarked/            (watermarked versions for all 8 kittens)
public/images/logos/CFA-Stacked-Logo-Tag_White-1024x925.png
public/images/logos/White-Globe-Name-Cat-Website.png
CLAUDE.md                                     (session log appended)
```

---

## Session: 2026-05-25 (bringing-home guide content updates — PDF and web page)

### Decisions
- **Food references updated:** All references to "Royal Canin" removed from the bringing-home guide. Replaced with "Purina ONE +Plus Healthy Kitten formula" (dry) and "High-quality wet kitten food" throughout.
- **Litter Robot 4 added:** Litter section in supplies list now reads "Extra-large litter box or Litter Robot 4" — giving buyers two options.
- **Feeding schedule simplified:** Removed the optional third wet meal. Schedule is now: Morning wet food, Evening wet food, Kibble or air-dried diet out 24/7. "2-3 times daily" language removed throughout.
- **Vaccine schedule corrected:** Previous copy listed 3 doses given before pickup (FVRCP ×2 + Rabies). Updated to reflect actual protocol: one FVRCP dose and one Rabies dose given before going home. "Next vaccines due" now instructs buyer's vet to complete the FVRCP kitten series.
- **Both PDF and web page updated:** Changes applied consistently to `scripts/generate-bringing-home-pdf.py` (PDF regenerated) and `src/pages/bringing-home-your-kitten.astro`.
- **Committed directly to main:** No staging PR needed for content-only updates.

### Files Changed This Session
```
scripts/generate-bringing-home-pdf.py          (food, litter, feeding schedule, vaccine section updated)
public/bringing-home-guide.pdf                 (regenerated from updated script)
src/pages/bringing-home-your-kitten.astro      (same content changes applied to web page)
CLAUDE.md                                      (session log appended)
```

---

## Session: 2026-05-28 (PR #51 — fix kitten display order not updating after Sanity publish)

### Root Cause
`getClient()` in `src/lib/sanity.ts` was initialized with `useCdn: true`. Sanity's CDN caches GROQ query responses for up to 2 minutes. When Sara publishes a Display Order change in Sanity Studio, the Sanity → Netlify webhook triggers a rebuild immediately — but the rebuild's GROQ queries hit the CDN, which may still be serving the pre-publish cached response. The rebuild completes with stale `order` values baked into the static HTML.

### Diagnosis Summary
- **GROQ query** — `kittensByLitterQuery` correctly sorts by `| order(order asc)`. No bug here.
- **Field name consistency** — schema: `name: "order"`, title: "Display Order". GROQ: `order(order asc)`. Frontend: `a.order`. All match.
- **Elain pinning** — `sortKittens()` correctly puts Reserved kittens first, then sorts Available by `a.order`. No issue.
- **Root cause** — `useCdn: true` causes the Netlify build to read stale CDN data instead of the live Sanity dataset.

### Fix
Changed `useCdn: true` → `useCdn: false` in the `createClient()` call. Static Astro fetches at build time on Netlify servers — the CDN provides no benefit and actively causes stale reads during rebuilds.

### Conventions (updated)
- **Sanity client always uses `useCdn: false`:** Static Astro + Netlify = build-time fetches only. The CDN is never beneficial and can cause stale builds.

---

## Session: 2026-05-28 (hotfix — cherry-pick useCdn fix directly to main)

### Decisions
- **Skipped staging merge.** PR #51 targeted staging, but the fix is a single verified line needing immediate production deployment. Cherry-picked commit `bad9039` (the `useCdn: false` change only) directly onto main.
- **CLAUDE.md session log commit excluded.** The second commit on the fix branch (`2f7dacf` — CLAUDE.md only) was intentionally not cherry-picked. Only `src/lib/sanity.ts` hit main.
- **Diff verified clean before push.** Confirmed the cherry-pick touched exactly one file, one line.

### Result
- **Commit on main:** `423fea8`
- **Netlify build:** auto-triggered on push to main

### Webhook Note
If Display Order changes still don't appear after this fix, verify the Sanity → Netlify webhook is active: manage.sanity.io → project k6e71wky → API → Webhooks. A rebuild must fire on every Sanity publish for order changes to take effect.

### Files Changed This Session
```
src/lib/sanity.ts   (cherry-picked useCdn: true → useCdn: false onto main)
CLAUDE.md           (session log appended)
```

---

## Session: 2026-05-28 (staging — flip kitten sort to Available-first)

### Decisions
- **Sort order flipped:** Available kittens now appear before Reserved kittens. Within each group, Display Order ascending (lower number first) breaks ties. Elain (the keeper, status Reserved) falls into the Reserved group naturally — no separate pinning logic.

### Before / After

**Before:**
```ts
// Sort: Reserved first (credibility/demand signal), then Available by display order
function sortKittens(list: any[]) {
  return [...list].sort((a, b) => {
    if (a.status === "Reserved" && b.status !== "Reserved") return -1;
    if (a.status !== "Reserved" && b.status === "Reserved") return 1;
    return (a.order ?? 99) - (b.order ?? 99);
  });
}
```

**After:**
```ts
// Sort: Available first, then Reserved. Within each group, sort by display order ascending.
function sortKittens(list: any[]) {
  return [...list].sort((a, b) => {
    if (a.status === "Available" && b.status !== "Available") return -1;
    if (a.status !== "Available" && b.status === "Available") return 1;
    return (a.order ?? 99) - (b.order ?? 99);
  });
}
```

### Verification
Dev server confirmed correct output against live Sanity data: 4 Available kittens (Tarquin, Helion, Kallias, Amren) appeared first, followed by 4 Reserved kittens (Azriel, Elain, Lucien, Morrigan). Each group sorted by Sara's Display Order values from Sanity Studio.

### Files Changed This Session (committed to staging, `eb59524`)
```
src/components/CurrentLitter.astro   (sortKittens: Reserved-first → Available-first)
CLAUDE.md                            (session log appended)
```

---

## Session: 2026-05-28 (merge staging → main — kitten sort fix to production)

### What landed on main
Two commits from staging, both expected:
- `eb59524` — `sortKittens()` flip in `src/components/CurrentLitter.astro`
- `959d8c2` — CLAUDE.md session log

No other staging content. Confirmed before merging.

### Merge conflict
CLAUDE.md conflicted because main had three session logs (2026-05-25 bringing-home, 2026-05-28 PR #51, 2026-05-28 hotfix) that staging didn't, and staging had the sort-flip log that main didn't. Resolved by keeping all entries from both sides in chronological order.

### Result
- **Merge commit on main:** `953e660`
- **Netlify build:** auto-triggered on push to main

### Files Changed This Session
```
CLAUDE.md   (conflict resolved, session log appended)
```

---

## Session: 2026-06-13 (fix/faq-list-rendering — FAQ answer list rendering)

### Problem
FAQ answers stored in Sanity with leading-hyphen list items rendered as run-on paragraphs. The previous renderer (`<p>{faq.answer}</p>`) had no line or list parsing at all. This caused entries like:
```
- Standard pet kittens: $3,600
- Rare color: $4,000
```
to display as "- Standard pet kittens: $3,600 - Rare color: $4,000", where the list-item hyphens read visually as price-range separators.

### Root Cause
No parser existed. The `<p>` element concatenated all newlines into a single text node.

### Fix
Added `parseFaqAnswer(text: string): FaqBlock[]` to the frontmatter of `src/pages/index.astro`. Replaced `<p>{faq.answer}</p>` with a mapped block renderer that emits `<p>`, `<ul>`, or `<ol>` elements based on the parsed structure.

### Parsing Convention (for content editors and future contributors)
FAQ answers stored in Sanity follow these rules for list rendering:

| Marker | Example | Renders as |
|---|---|---|
| `- ` at start of line | `- Standard pet kittens: $3,600` | `<ul>` item with gold dot bullet |
| `* ` at start of line | `* First item` | `<ul>` item with gold dot bullet |
| `• ` at start of line | `• First item` | `<ul>` item with gold dot bullet |
| `N. ` at start of line | `1. Submit application` | `<ol>` item with decimal number |
| Blank line | (empty) | Closes current list or paragraph; starts new block |
| Any other line | Normal prose | `<p>` element |

**Bare inline hyphens are never treated as list markers.** Only a hyphen (or `*` or `•`) at the very beginning of a line, followed by a space, is a marker. This protects hyphenated words (`free-fed`, `age-appropriate`, `blue-grey`) and inline price ranges (`$3,600 - Rare color`) from being split.

Consecutive items of the same marker type group into a single `<ul>` or `<ol>`. A non-list line closes the current list and begins a new paragraph block.

### Styling
- `<ul>` items: gold dot bullet (`<span class="mt-1.5 w-1 h-1 rounded-full bg-gold/60 flex-shrink-0">`) with flex layout, matching the bringing-home page convention
- `<ol>` items: `list-decimal list-inside` Tailwind utilities
- Both: `space-y-2` spacing, `text-bone/70 leading-relaxed` typography
- Wrapper: `<div class="mt-4 pr-10 space-y-3">` (preserves prior container spacing)

### Verified
- Ordered list (application process) renders as numbered steps
- Pricing FAQ: intro `<p>` + `<ul>` with four gold-dot bullet tiers — `$3,600` inline hyphen NOT split
- "free-fed" in food FAQ preserved intact inside a `<li>` — not parsed as a marker
- Prose-only answers (no newlines) render as a single `<p>` unchanged

### Files Changed This Session (branch fix/faq-list-rendering, targeting staging)
```
src/pages/index.astro   (parseFaqAnswer function added to frontmatter; <p>{faq.answer}</p> replaced with block renderer)
CLAUDE.md               (session log appended)
```

---

## Session: 2026-07-18 (PR #55 — inline photo carousel on homepage kitten cards)

### Decisions
- **KittenCard hero image replaced with a CSS scroll-snap carousel:** The static `<img src={displayImages[0]}>` + photo-count badge is replaced with a horizontally scrolling track (`overflow-x-auto snap-x snap-mandatory`) holding one `<div data-carousel-slide>` per image. No carousel library, no framework island — still static HTML with a small amount of vanilla JS.
- **Swipe handled natively:** No custom touch/gesture JS. CSS scroll-snap plus the browser's native touch scrolling handles swipe; the browser's native click-vs-drag distinction means a tap opens the lightbox but a swipe does not, with zero extra code (unlike the old PR #13 crossfade carousel, which needed manual swipe-vs-tap detection because it wasn't using native scroll).
- **`touch-action: pan-y` on the track** (via Tailwind arbitrary property `[touch-action:pan-y]`) so vertical page scroll passes through during a horizontal swipe on mobile.
- **Arrows hidden below `sm` breakpoint:** `hidden sm:flex` on the prev/next buttons — touch users swipe, desktop/tablet users get click targets. Confirmed via computed `display` at 375px viewport.
- **Dots and arrow-button clicks scroll via `track.scrollTo({ left: idx * clientWidth, behavior: 'smooth' })`,** wrapping with modulo for circular navigation. A debounced `scroll` listener on the track (100ms) recomputes the active index from `scrollLeft / clientWidth` and updates dot opacity — this is purely visual sync, not required for lightbox correctness.
- **Lightbox reuses the existing per-trigger click/keydown pattern unchanged:** Each slide `<div>` carries its own static `data-lightbox-trigger`, `data-lightbox-images` (full array), `data-lightbox-name`, and `data-lightbox-index={i}` (that slide's own index, not a dynamically-synced value). Since slides have no `tabindex`, they're mouse/touch-clickable but never keyboard-focusable individually — this let the existing generic `[data-lightbox-trigger]` listener registration in `CurrentLitter.astro` work with zero changes.
- **Carousel keyboard navigation is a separate concern from the lightbox:** Only the track itself is a tab stop (`tabindex="0"`, inset `focus-visible:outline` so the ring isn't clipped by the card's `overflow-hidden`). `ArrowLeft`/`ArrowRight` move the visible slide; `Enter`/`Space` opens the lightbox at the currently active slide (tracked via a `current` variable maintained by the same scroll listener). This avoids stacking every photo into the card's tab order.
- **Carousel init JS lives in `CurrentLitter.astro`'s existing inline `<script>`,** extending the same block that already handles the kitten lightbox, rather than adding a new `<script>` in `KittenCard.astro` (the pattern `CatCard.astro` uses for its own separate crossfade carousel). Deliberate choice per the session brief — keeps carousel and lightbox coordination logic in one place.
- **Resize handling:** a `window resize` listener re-snaps the track to the current index instantly (`goTo(current, false)`) so the scroll position stays aligned to a slide boundary across breakpoint changes (card width changes at `sm`/`lg`/`xl`).
- **Single-image kittens get no carousel controls:** `slides.length < 2` bails out of `initKittenCarousels` before attaching arrow/dot/keydown listeners — matches the existing `allImages.length > 1` guard in the markup that skips rendering arrows/dots at all.
- **Homepage blurb source changed:** `personality` swapped for `shortStory ?? personality` (`const blurb = shortStory || personality`). This was the home-page half of the `shortStory`/`about` field split from PR #26/#28 — `about` powers the kitten detail page, `shortStory` now powers the homepage card teaser.
- **Bow tie color chip added:** Renders inline with the sex line (`Male · ● Teal Bow Tie`) when `bowTieColor` is set. Combined onto one line with the sex text (rather than its own line) to avoid a spacing bug where a conditionally-rendered element left inconsistent margin above the price/date block.
- **"Read {name}'s full story" link added** below the blurb, linking to the same `/kittens/{slug}` URL as the existing "Meet {name}" button in the CTA stack. Deliberately kept both — the new link is an editorial teaser positioned with the story text; "Meet {name}" remains the explicit CTA button at the bottom of the card.
- **No overflow-clipping issue found:** Checked both statically (no `overflow` rule anywhere in `ScrollReveal.astro` or `global.css`) and empirically via computed styles in a live dev server — `.scroll-reveal` and every ancestor up to `#kittens` compute `overflow: visible`. The only `overflow: hidden` in the card is the card's own outer wrapper (for rounded corners), which is expected and unrelated to `ScrollReveal`. `once: true` with no scrub means the GSAP transform also isn't active during user interaction. No fix needed.
- **Verification performed against live Sanity data** in an isolated worktree (`.worktrees/kitten-carousel-pr3`) with the dev server run manually (`node node_modules/astro/astro.js dev --port 4325`) rather than via `preview_start {name}`, because `preview_start` resolves `.claude/launch.json` relative to the main checkout, not the worktree — it was serving the pre-edit `KittenCard.astro` from the main checkout until this was caught and worked around.

### Conventions
- **Native scroll-snap + native click, not custom gesture code:** When a carousel can be built on `overflow-x: auto` + `scroll-snap-type`, prefer it over manual touchstart/touchmove/touchend tracking — the browser already distinguishes tap from drag for `click` events, eliminating an entire class of swipe-vs-tap bugs the old crossfade carousels needed to work around.
- **`preview_start {name}` runs from the main checkout, not a worktree:** When verifying changes in a `.worktrees/` branch, start the dev server manually from within the worktree directory (`node node_modules/astro/astro.js dev --port <alternate>`) and point `preview_start {url}` at that port. Confirmed by observing stale (pre-edit) markup served on the default flow.
- **Worktrees need their own `.env` copy:** `.env` is gitignored, so a freshly created worktree has no Sanity credentials until copied from the main checkout (`cp ../../.env .env`).

### Deferred
- **Bow tie chip not visually confirmed against live data:** No kitten in the current Sanity dataset has `bowTieColor` set (it's an optional field). Code path verified structurally; renders nothing when unset, will render correctly once Sara sets it in Studio.
- All prior deferred items carry forward: `npx sanity deploy` for show results + kitten slug/about schema fields, parents banner image, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries in Studio, mobile testing on a real device.

### Files Changed This Session (PR #55 — targeting staging)
```
src/components/KittenCard.astro     (hero image + count badge replaced with scroll-snap carousel; bowTieColor chip; shortStory/personality blurb fallback; "Read {name}'s full story" link)
src/components/CurrentLitter.astro  (bowTieColor + shortStory props passed to KittenCard; carousel init JS added to existing inline script)
CLAUDE.md                           (session log appended)
```

---

## Session: 2026-07-18 (PR #56 — request-to-reserve flow)

### Decisions
- **`ReserveRequest.astro` component created:** Copies the `ContactForm.astro` / `QuickInquiry.astro` pattern exactly — Netlify Forms (`data-netlify="true"`), AJAX `fetch("/")` submit with `URLSearchParams`, honeypot (`netlify-honeypot="bot-field"` + hidden field), light/dark `variant` prop, same success/error message styling (`#86efac` / `#fca5a5`). Form name is `reserve-request`.
- **No payment integration:** No Stripe, no webhook, nothing that touches money. Sara screens every buyer manually before any payment is requested. This form only collects a request; it changes no state anywhere.
- **Fields:** Name (required), Email (required), Phone (required, `tel`), Kitten, Tell Us About Your Home (required textarea — placeholder prompts household, other pets, indoor-only plans, breed experience).
- **Kitten field is context-aware:** `kittenName` prop, when passed (the normal case — kitten detail pages always know which kitten), renders a hidden `<input name="kitten">` plus a non-editable display box showing the name, so the visitor sees exactly what they're requesting without a redundant dropdown. When `kittenName` is omitted, falls back to a `<select>` populated from a `kittenOptions` prop (mirrors `QuickInquiry`'s pattern) for potential standalone use — not used anywhere yet, but the brief asked for both paths.
- **Expectation-setting copy is required, not optional, so it's structural, not decorative:** A "Before You Submit" block renders above the form fields (not just in a success message) stating plainly that a request is not a reservation, that Sara reviews every request personally, that an approved buyer receives a Stripe payment link by email for a **$500 non-refundable deposit** applying toward the total, and that the kitten is reserved only once that deposit clears. The success message repeats the same facts after submission, so the expectation is set both before and after the ask.
- **Kitten detail page (`[slug].astro`) wiring:**
  - `QuickInquiry` import replaced with `ReserveRequest`.
  - Hero CTA button (Available kittens only, unchanged conditional): text changed from "Inquire About {name}" to "Request to Reserve {name}"; `href` changed from `#quick-inquiry` to `#reserve-request`; the `data-quick-inquiry-trigger`/`data-quick-inquiry-kitten` attributes were dropped since this button no longer targets the homepage's shared quick-inquiry widget.
  - Bottom CTA section: `id="quick-inquiry"` renamed to `id="reserve-request"`. For `status === "Available"`, renders `<ReserveRequest variant="dark" kittenName={kitten.name} />` with a short "Sara reviews every request personally" lead-in and the existing "prefer to call?" phone line. For `status === "Reserved"` or `"Placed"`, the form is not rendered at all — instead a heading ("{name} Is Reserved" / "{name} Has Found a Home") and a "Join the Waitlist" button linking to `/#waitlist` (the homepage's existing `Waitlist.astro` section id).
- **Homepage `QuickInquiry` widget is untouched:** `KittenCard`'s "Text Me About This Kitten" button and the homepage's own `<section id="quick-inquiry">` still work exactly as before — this PR only changes the *kitten detail page's* primary conversion path, not the lighter-weight homepage quick-question flow.
- **"Static-HTML detection" satisfied by construction:** Like every other form on this site, `ReserveRequest` renders as real static HTML in the Astro build output (not injected client-side), so Netlify's build-time form parser detects `<form data-netlify="true" name="reserve-request">` the same way it already detects `contact`, `quick-inquiry`, `waitlist`, and `kitten-application`. No hidden duplicate form was needed.
- **Netlify wildcard notification — confirmed to cover `reserve-request` automatically, with reasoning documented for future reference:** There is no `netlify.toml` in this repo and no per-form notification code anywhere — every existing form (`contact`, `quick-inquiry`, `waitlist`, `kitten-application`) already delivers email notifications to Sara without any per-form dashboard setup having been recorded in this file. That is only possible if the Netlify site has a **site-wide "Form notifications" rule scoped to "All form submissions"** (the wildcard option in Netlify's Forms settings), rather than rules scoped to individual form names. A wildcard rule fires for any `data-netlify="true"` form Netlify detects at build time, regardless of form name — so `reserve-request` is covered the moment it's deployed, with zero additional dashboard configuration. This is inferred from the absence of any recorded per-form setup step, not from direct access to the Netlify dashboard (no Netlify MCP/tool is connected to this session). **Nick should do one visual confirmation in Netlify → Site settings → Forms → Form notifications** that the existing rule says "All form submissions" and not a named list — takes under a minute, and closes the loop with certainty instead of inference.
- **`Sara flips status to Reserved by hand` — no code changes needed for this:** The `kitten.status` field already exists in the Sanity schema and already drives the Available/Reserved/Placed branching on this page (and on `CurrentLitter.astro`'s homepage cards). Once Sara changes a kitten's Display Status to "Reserved" in Studio and publishes, the kitten detail page automatically stops showing the reserve-request form and starts showing the waitlist link — this was true before this PR for the general contact copy, and remains true now for the reserve-request form specifically. No automation, no webhook, nothing new to wire.

### Conventions
- **`kittenName` prop pattern for context-aware forms:** When a form component is used from a page that already knows a single relevant entity (a kitten, in this case), prefer a hidden input + read-only display over a pre-selected `<select>` — it's clearer to the visitor and removes an unnecessary interactive control. Fall back to a `<select>` only when the calling context is genuinely ambiguous.
- **New form components always mirror `ContactForm.astro`'s AJAX/honeypot/success-error skeleton exactly** (id naming per-instance, `#86efac`/`#fca5a5` inline colors, `fields.style.display = "none"` + `submitBtn.style.display = "none"` on success). This is now the fourth form built this way (`contact`, `quick-inquiry`, `waitlist`, `reserve-request`); deviating would only create inconsistency for no benefit.

### Verified
- `astro build`: 12 pages generated cleanly (all 8 kitten detail pages + homepage + application + bringing-home + 404).
- `astro check`: same 8 pre-existing, unrelated errors as baseline (Sanity schema `__experimental_actions` typing, Google Ads `dataLayer` typing) — none touch the changed files.
- Live dev server (worktree, real Sanity data): `/kittens/helion` (Available) — hero CTA reads "Request to Reserve Helion" and links to `#reserve-request`; form renders with the disclaimer block, all 5 fields, hidden `kitten` input set to "Helion"; `FormData` confirmed all field names/values correct including `form-name: reserve-request`; submitting the form (AJAX) hid the fields and submit button and showed the success message with the correct kitten-name-substituted copy.
- `/kittens/elain` (Reserved) — confirmed via computed DOM inspection: no `<form>` in the `#reserve-request` section, heading reads "Elain Is Reserved", and a "Join the Waitlist" link to `/#waitlist` renders instead; the hero "Request to Reserve" link is correctly absent (matches the pre-existing `status === "Available"` guard on that button, unchanged).

### Deferred
- **Netlify dashboard visual confirmation of the wildcard notification rule** (see Decisions above) — inferred with high confidence from the absence of any recorded per-form setup, not directly observed.
- All prior deferred items carry forward: `npx sanity deploy` for show results + kitten slug/about schema fields, parents banner image, Instagram handle, Google Workspace email, Plausible analytics, Sara's cat entries in Studio, mobile testing on a real device, bow tie chip visual confirmation against live data.

### Files Changed This Session (PR #56 — targeting staging)
```
src/components/ReserveRequest.astro   (NEW — request-to-reserve form: name/email/phone/kitten/about-your-home, expectation-setting disclaimer, Netlify Forms + AJAX + honeypot pattern)
src/pages/kittens/[slug].astro        (QuickInquiry → ReserveRequest; hero CTA text/href updated; bottom section id="quick-inquiry" → id="reserve-request"; Available shows ReserveRequest, Reserved/Placed shows "Join the Waitlist" link to /#waitlist)
CLAUDE.md                             (session log appended)
```
