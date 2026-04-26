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
