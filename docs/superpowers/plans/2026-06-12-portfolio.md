# ancitik.work Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a one-page black/white portfolio for Alexandre Laurans (senior platform engineer) at ancitik.work, optimized for recruiter visibility.

**Architecture:** Astro 5 fully-static one-pager. No JS framework — section components are pure Astro/CSS ("dark canvas" design: black body with thin grid texture, split hero, white accent cards). Deployed to Cloudflare Workers static assets via wrangler.

**Tech Stack:** Astro 5, @astrojs/sitemap, @fontsource-variable/space-grotesk, wrangler (CF Workers static assets), Chrome DevTools MCP for Lighthouse/OG screenshot.

**Spec:** `docs/superpowers/specs/2026-06-12-portfolio-design.md` — content rules there are binding (no salary, no job-search signals, employers named, English).

**Verification model:** static site — no unit tests. Each task verifies via `astro build` + `astro dev` rendering checks; final tasks run Lighthouse + link checks via Chrome MCP.

---

## File structure

```
/
├── astro.config.mjs          # site URL, sitemap integration
├── wrangler.jsonc            # CF Workers static assets
├── package.json
├── public/
│   ├── robots.txt
│   ├── favicon.svg           # "AL" monogram, black/white
│   └── og.png                # generated in Task 9
└── src/
    ├── styles/global.css     # tokens, grid texture, resets
    ├── data/profile.ts       # ALL content data (single source)
    ├── layouts/Base.astro    # head: SEO, OG, JSON-LD, font
    ├── components/
    │   ├── Hero.astro
    │   ├── ImpactBand.astro
    │   ├── Experience.astro
    │   ├── Stack.astro
    │   └── Contact.astro
    └── pages/
        ├── index.astro
        └── og.astro          # 1200×630 OG art page (screenshot source, noindex)
```

---

### Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `wrangler.jsonc`

- [ ] **Step 1: Scaffold into existing dir**

```bash
cd /Users/alaurans/Code/ancitik.work
npm create astro@latest . -- --template minimal --no-install --no-git --yes
npm install
npx astro add sitemap --yes
npm install @fontsource-variable/space-grotesk
```

Note: dir already has `docs/`, `.git`, `.gitignore`, `.superpowers/` — scaffold must not overwrite them. If `npm create astro` refuses non-empty dir, scaffold to `/tmp/scaffold` and move files in (everything except `.git`, README).

- [ ] **Step 2: Configure `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ancitik.work',
  integrations: [sitemap()],
});
```

- [ ] **Step 3: Create `wrangler.jsonc`**

```jsonc
{
  "name": "ancitik-work",
  "compatibility_date": "2026-06-12",
  "assets": {
    "directory": "./dist"
  }
}
```

- [ ] **Step 4: Append to `.gitignore`**

```
node_modules/
dist/
.astro/
```

- [ ] **Step 5: Verify build**

Run: `npx astro build`
Expected: exits 0, `dist/index.html` exists.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: scaffold astro 5 project with sitemap + wrangler config"
```

---

### Task 2: Content data module

**Files:**
- Create: `src/data/profile.ts`

Single source of truth — components never hardcode content.

- [ ] **Step 1: Write `src/data/profile.ts`**

```ts
export const profile = {
  name: 'Alexandre Laurans',
  title: 'Senior Platform Engineer · SRE',
  tagline:
    'I build internal platforms developers actually want to use. 10 years shipping cloud infrastructure — Kubernetes, AWS, Azure — currently at Kiln.',
  location: 'Pau, France · Remote',
  email: 'alexandre.laurans14@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexandre-laurans/',
  github: 'https://github.com/ancitik',
  site: 'https://ancitik.work',
};

export const impact = [
  { value: '10+', label: 'years in production' },
  { value: '47', label: 'K8s clusters operated' },
  { value: '22', label: 'cloud regions' },
  { value: '3', label: 'clouds — AWS · Azure · GCP' },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  highlight: boolean; // white card vs outlined card
  points: string[];
};

export const jobs: Job[] = [
  {
    company: 'Kiln',
    role: 'Senior Platform Engineer',
    period: '2026 — now',
    highlight: true,
    points: [
      'Platform engineering & SRE for enterprise-grade digital-asset infrastructure.',
      'Building AI-assisted tooling and agentic workflows for the platform team.',
    ],
  },
  {
    company: 'Hublo',
    role: 'Tech Lead SRE · Senior SRE Platform',
    period: '2024 — 2026',
    highlight: true,
    points: [
      'Owned the SRE roadmap with the CTO; led a team of 3 senior engineers.',
      'Completed the ECS→EKS migration, then rebuilt the AWS network foundation (VPC & IP addressing design) to unblock multi-region growth.',
      'Drove adoption of AI tooling and agentic platforms across engineering.',
    ],
  },
  {
    company: 'SOPHiA GENETICS',
    role: 'Cloud Architect (Azure) · Senior Software Engineer',
    period: '2022 — 2024',
    highlight: false,
    points: [
      'Operated 47 Kubernetes clusters across 22 Azure regions for a global genomics SaaS.',
      'Migrated 15 TB of on-prem data to Azure with Data Factory.',
      'Coordinated distributed engineering teams across Europe.',
    ],
  },
  {
    company: 'Ippon Technologies',
    role: 'Cloud & DevOps Consultant',
    period: '2020 — 2022',
    highlight: false,
    points: [
      'Actia Automotive — software forge modernization, Azure landing zones, Kubernetes execution platform.',
      'Berger-Levrault — monolith→microservices replatforming: Istio, Tekton, ArgoCD, security-by-design; developer platform on Swarm & K8s.',
      'Twelv — sovereign-cloud SaaS architecture on Scaleway Kubernetes.',
    ],
  },
];

export const earlier =
  'Earlier: DevOps Engineer @ SKALE-5 (2021–22) · DevOps Architect @ RGPD Web (2019) · DevOps Architect & IT Manager @ Genesis Groupe (2018–19)';

export const stacks: { group: string; items: string[] }[] = [
  { group: 'Orchestration', items: ['Kubernetes', 'Docker', 'Helm', 'Kustomize'] },
  { group: 'Clouds', items: ['AWS', 'Azure', 'GCP', 'Scaleway'] },
  { group: 'IaC', items: ['Terraform', 'Pulumi', 'Ansible'] },
  { group: 'GitOps & CI/CD', items: ['ArgoCD', 'Flux', 'GitLab CI', 'GitHub Actions', 'Tekton'] },
  { group: 'Observability', items: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry'] },
  { group: 'AI platforms', items: ['Agentic workflows', 'LLM infrastructure', 'MCP'] },
];
```

- [ ] **Step 2: Typecheck**

Run: `npx astro check 2>/dev/null || npx tsc --noEmit -p .`
Expected: no errors (astro check may need `npm i -D @astrojs/check typescript`; skip if minimal template lacks it and tsc passes).

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts && git commit -m "feat: profile content data module"
```

---

### Task 3: Global styles + tokens

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write `src/styles/global.css`**

```css
@import '@fontsource-variable/space-grotesk';

:root {
  --bg: #0a0a0a;
  --bg-grid-line: #1b1b1b;
  --grid-size: 28px;
  --surface: #fafafa;
  --ink: #f5f5f5;
  --ink-muted: #9a9a9a;
  --ink-faint: #6b6b6b;
  --on-surface: #111111;
  --on-surface-muted: #555555;
  --border-dark: #2a2a2a;
  --font-display: 'Space Grotesk Variable', system-ui, sans-serif;
  --font-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* thin grid texture for dark surfaces */
.grid-bg {
  background-image:
    linear-gradient(var(--bg-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--bg-grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
}

h1, h2, h3, .display { font-family: var(--font-display); }

.micro-label {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-faint);
  font-family: var(--font-display);
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid currentColor;
  transition: opacity 0.15s ease;
}
.btn:hover { opacity: 0.75; }
.btn--solid-dark { background: var(--on-surface); color: var(--surface); border-color: var(--on-surface); }
.btn--solid-light { background: var(--surface); color: var(--on-surface); border-color: var(--surface); }
.btn--outline-dark { color: var(--on-surface); }
.btn--outline-light { color: var(--ink); border-color: var(--ink-faint); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css && git commit -m "feat: global styles, design tokens, grid texture"
```

---

### Task 4: Base layout with SEO head

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Write `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
import { profile } from '../data/profile';

interface Props {
  title?: string;
  description?: string;
  noindex?: boolean;
}

const {
  title = 'Alexandre Laurans — Senior Platform Engineer (Kubernetes, AWS, Azure)',
  description = 'Senior platform engineer & SRE with 10 years in production. Kubernetes, AWS, Azure, IaC, GitOps. Building internal platforms developers actually want to use. Based in France, working remotely.',
  noindex = false,
} = Astro.props;

const ogImage = new URL('/og.png', Astro.site);
const canonical = new URL(Astro.url.pathname, Astro.site);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Senior Platform Engineer',
  worksFor: { '@type': 'Organization', name: 'Kiln' },
  url: profile.site,
  sameAs: [profile.linkedin, profile.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Pau', addressCountry: 'FR' },
  knowsAbout: ['Kubernetes', 'AWS', 'Azure', 'Platform Engineering', 'SRE', 'Terraform', 'GitOps'],
};
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    {noindex && <meta name="robots" content="noindex" />}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Wire into `src/pages/index.astro`** (placeholder body for now)

```astro
---
import Base from '../layouts/Base.astro';
---

<Base>
  <main>
    <h1>placeholder</h1>
  </main>
</Base>
```

- [ ] **Step 3: Verify**

Run: `npx astro build && grep -c 'application/ld+json' dist/index.html`
Expected: build OK, grep prints `1`.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro src/pages/index.astro
git commit -m "feat: base layout with SEO, OpenGraph, JSON-LD"
```

---

### Task 5: Hero + ImpactBand components

**Files:**
- Create: `src/components/Hero.astro`, `src/components/ImpactBand.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
---
import { profile } from '../data/profile';
---

<header class="hero">
  <div class="hero__dark grid-bg">
    <p class="micro-label">ancitik.work</p>
    <h1 class="hero__name">Alexandre<br />Laurans</h1>
    <p class="hero__title">{profile.title}</p>
  </div>
  <div class="hero__light">
    <p class="hero__tagline">{profile.tagline}</p>
    <nav class="hero__actions" aria-label="Primary">
      <a class="btn btn--solid-dark" href={`mailto:${profile.email}`}>Get in touch</a>
      <a class="btn btn--outline-dark" href={profile.linkedin} rel="me noopener">LinkedIn ↗</a>
    </nav>
  </div>
</header>

<style>
  .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 72vh; }
  .hero__dark {
    display: flex; flex-direction: column; justify-content: center;
    padding: 64px; gap: 16px;
  }
  .hero__name {
    font-size: clamp(2.6rem, 6vw, 4.5rem);
    font-weight: 700; letter-spacing: -0.03em; line-height: 1.04;
  }
  .hero__title { color: var(--ink-muted); letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.85rem; font-family: var(--font-display); }
  .hero__light {
    background: var(--surface); color: var(--on-surface);
    display: flex; flex-direction: column; justify-content: center;
    padding: 64px; gap: 32px;
  }
  .hero__tagline { font-size: 1.15rem; line-height: 1.8; color: var(--on-surface-muted); max-width: 38ch; }
  .hero__tagline :global(b) { color: var(--on-surface); }
  .hero__actions { display: flex; gap: 12px; flex-wrap: wrap; }
  @media (max-width: 760px) {
    .hero { grid-template-columns: 1fr; min-height: unset; }
    .hero__dark, .hero__light { padding: 48px 24px; }
  }
</style>
```

- [ ] **Step 2: Write `src/components/ImpactBand.astro`**

```astro
---
import { impact } from '../data/profile';
---

<section class="impact grid-bg" aria-label="Career highlights">
  <div class="container impact__row">
    {impact.map((i) => (
      <div class="impact__item">
        <span class="impact__value display">{i.value}</span>
        <span class="impact__label">{i.label}</span>
      </div>
    ))}
  </div>
</section>

<style>
  .impact { border-top: 1px solid var(--border-dark); border-bottom: 1px solid var(--border-dark); padding: 40px 0; }
  .impact__row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .impact__item { display: flex; flex-direction: column; gap: 4px; }
  .impact__value { font-size: 2.2rem; font-weight: 700; letter-spacing: -0.02em; }
  .impact__label { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-faint); }
  @media (max-width: 760px) { .impact__row { grid-template-columns: repeat(2, 1fr); } }
</style>
```

- [ ] **Step 3: Verify in dev** — add both to index (temporary), `npx astro build`, exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/components/ImpactBand.astro src/pages/index.astro
git commit -m "feat: hero and impact band sections"
```

---

### Task 6: Experience + Stack + Contact components

**Files:**
- Create: `src/components/Experience.astro`, `src/components/Stack.astro`, `src/components/Contact.astro`

- [ ] **Step 1: Write `src/components/Experience.astro`**

```astro
---
import { jobs, earlier } from '../data/profile';
---

<section id="experience" class="xp container">
  <p class="micro-label">01 — Experience</p>
  <ol class="xp__list">
    {jobs.map((job) => (
      <li class={`xp__card ${job.highlight ? 'xp__card--highlight' : ''}`}>
        <div class="xp__head">
          <h2 class="xp__company">{job.company}</h2>
          <p class="xp__meta">{job.role} · {job.period}</p>
        </div>
        <ul class="xp__points">
          {job.points.map((p) => <li>{p}</li>)}
        </ul>
      </li>
    ))}
  </ol>
  <p class="xp__earlier">{earlier}</p>
</section>

<style>
  .xp { padding: 96px 24px; display: flex; flex-direction: column; gap: 28px; }
  .xp__list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
  .xp__card { border: 1px solid var(--border-dark); padding: 28px 32px; color: var(--ink); }
  .xp__card--highlight { background: var(--surface); color: var(--on-surface); border-color: var(--surface); }
  .xp__head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
  .xp__company { font-size: 1.3rem; font-weight: 700; letter-spacing: -0.01em; }
  .xp__meta { font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; font-family: var(--font-display); }
  .xp__points { list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.95rem; }
  .xp__card .xp__points li { opacity: 0.85; }
  .xp__points li::before { content: '— '; opacity: 0.45; }
  .xp__earlier { font-size: 0.8rem; color: var(--ink-faint); }
</style>
```

- [ ] **Step 2: Write `src/components/Stack.astro`**

```astro
---
import { stacks } from '../data/profile';
---

<section id="stack" class="stack container">
  <p class="micro-label">02 — Stack</p>
  <div class="stack__groups">
    {stacks.map((g) => (
      <div class="stack__group">
        <h2 class="stack__name">{g.group}</h2>
        <ul class="stack__chips">
          {g.items.map((item) => <li class="stack__chip">{item}</li>)}
        </ul>
      </div>
    ))}
  </div>
</section>

<style>
  .stack { padding: 0 24px 96px; display: flex; flex-direction: column; gap: 28px; }
  .stack__groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; }
  .stack__group { display: flex; flex-direction: column; gap: 12px; }
  .stack__name { font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); font-weight: 500; }
  .stack__chips { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
  .stack__chip { border: 1px solid var(--border-dark); padding: 6px 14px; font-size: 0.8rem; font-family: var(--font-display); }
</style>
```

- [ ] **Step 3: Write `src/components/Contact.astro`**

```astro
---
import { profile } from '../data/profile';
---

<footer id="contact" class="contact">
  <div class="container contact__inner">
    <h2 class="contact__heading">Let's talk platforms.</h2>
    <div class="contact__actions">
      <a class="btn btn--solid-light" href={`mailto:${profile.email}`}>Email me</a>
      <a class="btn btn--outline-light" href={profile.linkedin} rel="me noopener">LinkedIn ↗</a>
      <a class="btn btn--outline-light" href={profile.github} rel="me noopener">GitHub ↗</a>
    </div>
    <p class="contact__location">{profile.location}</p>
  </div>
</footer>

<style>
  .contact { border-top: 1px solid var(--border-dark); padding: 96px 0; }
  .contact__inner { display: flex; flex-direction: column; align-items: center; gap: 28px; text-align: center; }
  .contact__heading { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700; letter-spacing: -0.02em; }
  .contact__actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .contact__location { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-faint); }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "feat: experience, stack, contact sections"
```

---

### Task 7: Assemble index page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Final `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import ImpactBand from '../components/ImpactBand.astro';
import Experience from '../components/Experience.astro';
import Stack from '../components/Stack.astro';
import Contact from '../components/Contact.astro';
---

<Base>
  <Hero />
  <main class="grid-bg">
    <ImpactBand />
    <Experience />
    <Stack />
  </main>
  <Contact />
</Base>
```

Note: `<main>` carries continuous `grid-bg`; ImpactBand keeps its own borders; Contact sits on plain `--bg` (subtle calm ending) — if it looks detached, move Contact inside `<main>`.

- [ ] **Step 2: Verify full render**

Run: `npx astro build && grep -o 'Kiln\|Hublo\|SOPHiA\|Ippon' dist/index.html | sort -u`
Expected: all four names printed.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro && git commit -m "feat: assemble one-page portfolio"
```

---

### Task 8: Favicon + robots.txt

**Files:**
- Create: `public/favicon.svg`, `public/robots.txt`

- [ ] **Step 1: `public/favicon.svg`** — monogram, black square, white "AL"

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0a0a0a"/>
  <path d="M16 16h32M16 16v32" stroke="#1b1b1b" stroke-width="1"/>
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="26" font-weight="700" fill="#fafafa" text-anchor="middle">AL</text>
</svg>
```

- [ ] **Step 2: `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://ancitik.work/sitemap-index.xml
```

- [ ] **Step 3: Commit**

```bash
git add public/ && git commit -m "feat: favicon and robots.txt"
```

---

### Task 9: OG image

**Files:**
- Create: `src/pages/og.astro`, `public/og.png`

- [ ] **Step 1: Write `src/pages/og.astro`** — 1200×630 art page, hero style, `noindex`

```astro
---
import Base from '../layouts/Base.astro';
---

<Base title="OG" noindex>
  <div class="og grid-bg">
    <div>
      <p class="micro-label" style="margin-bottom: 16px;">ancitik.work</p>
      <h1 class="og__name">Alexandre Laurans</h1>
      <p class="og__title">Senior Platform Engineer · SRE</p>
    </div>
    <p class="og__foot">Kubernetes · AWS · Azure · IaC · GitOps</p>
  </div>
</Base>

<style>
  .og {
    width: 1200px; height: 630px;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 80px;
  }
  .og__name { font-size: 5rem; font-weight: 700; letter-spacing: -0.03em; }
  .og__title { color: var(--ink-muted); letter-spacing: 0.12em; text-transform: uppercase; font-size: 1.3rem; font-family: var(--font-display); margin-top: 12px; }
  .og__foot { color: var(--ink-faint); font-size: 1.1rem; font-family: var(--font-display); }
</style>
```

- [ ] **Step 2: Screenshot via Chrome DevTools MCP**

Start `npx astro dev`, then: `new_page` → `http://localhost:4321/og`, `resize_page` 1200×630, `take_screenshot` (png, fullPage false), save to `public/og.png`. If MCP screenshot can't write directly to the path, save to temp and `cp`.

- [ ] **Step 3: Exclude /og from sitemap** — in `astro.config.mjs`:

```js
integrations: [sitemap({ filter: (page) => !page.includes('/og') })],
```

- [ ] **Step 4: Verify**

Run: `npx astro build && test -f public/og.png && echo OK`
Expected: `OK`; `dist/sitemap-0.xml` does not contain `/og`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/og.astro public/og.png astro.config.mjs
git commit -m "feat: OG image and og art page"
```

---

### Task 10: Quality pass — responsive, a11y, Lighthouse

**Files:**
- Modify: whatever the audit flags

- [ ] **Step 1: Visual check via Chrome MCP** — `astro dev` running; screenshot at 375, 768, 1440 widths. Verify: hero stacks on mobile, impact grid 2-col on mobile, no horizontal scroll, grid texture visible.

- [ ] **Step 2: Lighthouse audit** — Chrome MCP `lighthouse_audit` on `http://localhost:4321/` (mobile + desktop).
Expected: ≥ 95 all categories, target 100. Fix flagged issues (font-display, contrast, tap targets, meta) and re-run.

- [ ] **Step 3: Link check**

Run: `grep -oE 'href="[^"]+"' dist/index.html | sort -u`
Expected: mailto, LinkedIn, GitHub, favicon, canonical — no dead anchors (no `href="#..."` pointing to missing ids).

- [ ] **Step 4: Commit fixes**

```bash
git add -A && git commit -m "fix: quality pass — responsive, a11y, lighthouse"
```

---

### Task 11: Deploy to Cloudflare + GitHub

- [ ] **Step 1: Check wrangler auth**

Run: `npx wrangler whoami`
Expected: logged-in account. If not: user runs `! npx wrangler login` interactively.

- [ ] **Step 2: Deploy**

```bash
npx astro build && npx wrangler deploy
```

Expected: deployed to `ancitik-work.<account>.workers.dev`.

- [ ] **Step 3: Custom domain** — check domain: `npx wrangler` has no domain-list cmd; use CF API/dashboard. If `ancitik.work` zone exists in account, add custom domain to worker (dashboard: Worker → Settings → Domains & Routes → Add → Custom domain, or `wrangler.jsonc`):

```jsonc
{
  "name": "ancitik-work",
  "compatibility_date": "2026-06-12",
  "assets": { "directory": "./dist" },
  "routes": [{ "pattern": "ancitik.work", "custom_domain": true }]
}
```

Then redeploy. If zone missing → report to user: register/transfer `ancitik.work` into Cloudflare first; site stays live on workers.dev meanwhile.

- [ ] **Step 4: Smoke test** — `curl -sI https://ancitik.work | head -5` (or workers.dev URL). Expected: `200`, `content-type: text/html`.

- [ ] **Step 5: GitHub repo + push**

```bash
gh repo create ancitik/ancitik.work --public --source . --push
```

- [ ] **Step 6: Final commit if wrangler.jsonc changed**

```bash
git add wrangler.jsonc && git commit -m "chore: custom domain route" && git push
```

---

## Self-review notes

- Spec coverage: tech ✓ (T1), design tokens/grid ✓ (T3), hero/impact/xp/stack/contact ✓ (T5–7), content rules ✓ (T2 — data module matches spec wording), SEO/JSON-LD/sitemap/robots ✓ (T4, T8, T9), perf/Lighthouse ✓ (T10), deploy+domain ✓ (T11). Blog out of scope ✓ (one-pager, /blog addable later).
- No placeholders; all code complete.
- Names consistent: `profile`, `impact`, `jobs`, `earlier`, `stacks` defined T2, consumed T5–6 with matching imports.
