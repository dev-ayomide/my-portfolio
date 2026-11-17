# Portfolio redesign notes

Running record of the 2026 redesign: what was decided, where things live, and what's left.

## Current decision (17 Nov 2026)

Chosen in the design lab: **`h6-a1-w2-e1-c1-dark-serif`**

| Section | Variant |
|---|---|
| Hero | 6 · Photo → globe: sharp, feathered photo that dissolves into particles on scroll and forms a dotted globe with Lagos marked and live WAT time |
| About | 1 · Bio + photo, Short / Long toggle, facts list |
| Work | 2 · Index rows with cursor preview, expand in place, full case-study page |
| Experience | 1 · Timeline rail + awards grid |
| Contact | 1 · Big close with copy-email |
| Look | Dark, Gambetta + General Sans (Fontshare), Geist Mono for small labels |
| Nav | Centered floating pill with sliding active highlight, ⌘K, "Hire me" |
| Layout | Every section on one centered column, equal left/right margins |

Positioning: **AI-native software engineer** (retrieval, LLM assistants, AI agents, guardrails). Backend and payments are supporting facts, not the headline.

## Where things are

- `prototypes/lab/` — the design lab (`index.html`, `lab.css`, `lab.js`). Open `/prototypes/lab/` on the dev server; the dock at the bottom switches every section. The URL hash stores the pick.
- `prototypes/projects-data.js` — enriched project data used by the lab (from Supabase + each repo's README).
- `src/site/` — the current React build of the *previous* direction (dark v2 with "Ask my work" globe). To be rebuilt from the lab pick.
- `src/site/data/projectDetails.js` — the same enrichment, merged with live Supabase rows at runtime.
- `public/llms.txt` — plain-text profile for AI agents (AI-first).
- `reports/Premium engineer portfolio design patterns.md` — the research behind the lab.
- Older prototypes (`a-plain`, `b-danfo`, `c-statement`, `d-feature`, `e-global`, `f-global-v2`, `g-human`, `h-showcase`) are superseded.

## Rejected along the way (and why)

- Warm-paper "ledger" look with serif italic accent, mono labels, № numbering: read as AI-made.
- Four static concepts (plain, danfo, statement, magazine): not premium enough.
- Plain text-first page: "too plain, lost the wow".
- Centered SaaS hero, chat-style search box, logo marquee, count-up stats, glows, bento cards, overlay case studies: AI-ish or clunky.
- Spotlighting NairaLedger over everything else.
- Particle-only portrait where the face wasn't clear (fixed by starting from the real photo).

## Built (17 Nov 2026)

- Real site rebuilt from the lab pick: `src/site/engine.js` (ported lab code), `src/site/site.css`, `src/site/Site.jsx` (React shell: layout, home, case pages).
- Case studies are real pages at `/work/:slug` (e.g. `/work/seeforme`), with an architecture flow for the AI projects.
- AI projects lead the Work list (Fusion, SeeForMe, Recipe Recommender). Heirs has a retrieval-system flow in Experience.
- Routes are lazy-loaded: main JS bundle went from ~584 KB to ~224 KB; admin code is only fetched on `/admin`. GSAP and Lenis removed; map data is bundled, not fetched from a CDN.

## Still to do

1. **campor.live and chartandcapstone.com do not resolve (DNS NXDOMAIN on 17 Nov 2026).** Renew the domains or update the links in /admin.
2. Replace screenshots that are marketing banners with real product shots or short clips (needs the user's own captures).
3. Add real numbers to AI case studies (accuracy, latency, before/after) once the user provides them.
4. Optional: WebGL version of the hero for sharper particles; self-host Fontshare/Google fonts.
5. Optionally store the enriched project fields in Supabase (needs new columns; confirm first).
6. Commit. Keep `prototypes/`, `research_notes/`, `reports/` and the duplicate résumé PDF out of production.
