# ancitik.work — Portfolio Design

**Date:** 2026-06-12
**Owner:** Alexandre Laurans
**Goal:** Boost professional visibility, attract full-time, full-remote senior platform engineering offers (no freelance). Subtle positioning — no explicit "open to work" signal.

## Tech stack

- Astro 5, fully static output (`output: 'static'`), one-pager
- No JS framework. CSS-driven design; small vanilla script only if needed (scroll reveal, smooth anchor nav)
- Deploy: Cloudflare Workers static assets, custom domain `ancitik.work`, deployed with `wrangler`
- Repo: `ancitik/ancitik.work` on GitHub

## Visual design — "Swiss Grid" (v2, supersedes "Dark canvas")

- Strict black & white palette. Base `#0a0a0a`, text `#f5f5f5`/`#fafafa`, muted `#9a9a9a`, faint `#8a8a8a`
- Thin background grid on dark surfaces: 1px lines `#1b1b1b`, ~28px cells, continuous across body
- Asymmetric modular grids per section (e.g. `2fr 1fr`, `1fr 2fr`) — Swiss Modernism 2.0 (ui-ux-pro-max style DB)
- Hero: name large on dark grid (left), white floating tagline block (right, offset) containing CTAs
- Ghost section numerals (`01`, `02`, `03`) — oversized, `#2e2e2e`, decorative (`aria-hidden`)
- Experience: table-style rows with 1px hairline dividers, not cards; white reserved for hero block + primary CTAs
- Typography: self-hosted **Archivo** (variable) for headings/display, **Space Grotesk** (variable) for body/labels; uppercase micro-labels with wide letter-spacing
- Zero border-radius, no shadows; depth via hairlines and inversion only
- Responsive: asymmetric grids stack to single column on mobile; grid texture stays

### v1 history
v1 "Dark canvas" (split hero, white experience cards) shipped through quality gates 2026-06-12, replaced same day by Swiss Grid after ui-ux-pro-max review.

## Page structure (single page, anchor nav)

1. **Hero** — `ancitik.work` micro-label, "Alexandre Laurans", "Senior Platform Engineer · SRE", one-liner: building internal platforms developers actually want to use; 10 years cloud infrastructure; currently at Kiln. CTAs: "Get in touch" (mailto), "LinkedIn ↗"
2. **Impact band** — 10+ years in production · 47 K8s clusters operated · 22 cloud regions · 3 clouds (AWS, Azure, GCP)
3. **Experience** (`01 — Experience`) — timeline, newest first:
   - **Kiln** — Senior Platform Engineer · 2026–now (white card). Platform & SRE for enterprise-grade digital-asset infrastructure. AI/agentic platform tooling.
   - **Hublo** — Tech Lead SRE / Senior SRE Platform · 2024–2026 (white card). ECS→EKS migration completion + full rebuild (VPC/network addressing redesign), SRE roadmap ownership, led team of 3 seniors, drove AI platform adoption.
   - **SOPHiA GENETICS** — Cloud Architect (Azure) / Senior SDE · 2022–2024 (outlined card). 47 Kubernetes clusters across 22 Azure regions, 15TB on-prem→cloud data migration (Azure Data Factory), Romanian contractor team coordination.
   - **Ippon Technologies** — Cloud & DevOps Consultant · 2020–2022 (outlined card). Missions: Actia Automotive (software forge modernization, Azure landing zones, K8s platform), Berger-Levrault (microservices replatforming, Istio, Tekton, ArgoCD; developer platform/forge on Swarm+K8s), Twelv (sovereign-cloud SaaS architecture on Scaleway Kapsule).
   - **Earlier** (collapsed, compact line(s)): SKALE-5 DevOps Engineer (2021–2022) · RGPD Web DevOps Architect (2019) · Genesis Groupe DevOps Architect / IT Manager (2018–2019)
4. **Stack** (`02 — Stack`) — chips grouped: Orchestration (Kubernetes, Docker, Helm, Kustomize) · Clouds (AWS, Azure, GCP, Scaleway) · IaC (Terraform, Pulumi, Ansible) · GitOps & CI/CD (ArgoCD, Flux, GitLab CI, GitHub Actions, Tekton) · Observability (Prometheus, Grafana, Datadog, OpenTelemetry) · AI platforms (agentic tooling, LLM infra)
5. **Contact** — "Let's talk platforms." Buttons: Email (mailto `alexandre.laurans14@gmail.com`), LinkedIn ↗ (`https://www.linkedin.com/in/alexandre-laurans/`), GitHub ↗ (`https://github.com/ancitik`). Footer: "Pau, France · Remote"

## Content rules

- English only
- All employers named (matches LinkedIn — recruiters cross-check)
- Kiln shown as current position
- NEVER include: salary data, job-search intent, current-employer dissatisfaction, recruiting-call details
- Tone: confident, concrete, impact-first. Numbers over adjectives

## SEO & visibility

- `<title>`: "Alexandre Laurans — Senior Platform Engineer (Kubernetes, AWS, Azure)"
- Meta description targeting "senior platform engineer", "SRE", "remote"
- OpenGraph + Twitter card with generated black/white OG image (1200×630, hero style)
- JSON-LD `Person`: name, jobTitle, worksFor Kiln, sameAs [LinkedIn, GitHub], address Pau/France
- `sitemap.xml` (Astro integration) + `robots.txt`
- Semantic HTML (h1/h2, `<main>`, `<section>`, landmark roles), accessible contrast (white-on-black passes AAA)

## Performance targets

- Lighthouse: 100 performance / 100 accessibility / 100 best-practices / 100 SEO
- No render-blocking external requests; fonts self-hosted or system; inline critical CSS (Astro default scoped styles fine)

## Testing & acceptance

1. `astro build` passes clean
2. Lighthouse audit via Chrome DevTools MCP: 4×100 (or documented justification)
3. Visual check at 375px / 768px / 1440px widths
4. All links resolve (mailto, LinkedIn, GitHub, anchors)
5. JSON-LD validates (schema.org)
6. Deployed and reachable at ancitik.work over HTTPS

## Out of scope (later iterations)

- Blog (structure must not block adding `/blog` later)
- Contact form, analytics, dark/light toggle (site is dark by design)
- French translation
