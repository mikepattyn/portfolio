# SEO handover — Mike Pattyn

Date: 2026-09-19
Canonical host: https://mikepattyn.nl
Package: seo-by-design (platform wave, not a shop SKU)

This report states what was implemented and what was measured. It does not predict rankings, traffic, or positions.

## What was implemented

| Track | Done | Notes |
|-------|------|-------|
| A — Signals in the HTML the server returns | yes (5 pages × EN/NL) | Locale-prefixed `/en/…` and `/nl/…`. Title, description, self-canonical, reciprocal hreflang, Organization or Article JSON-LD where applicable, headings. Signals are in the built HTML before JavaScript. |
| B — `robots.txt` and generated `sitemap.xml` | yes | Sitemap equals the ten indexable URLs. `loc` + truthful `lastmod` only. |
| C — Delivery (status codes, canonical host, cache, compression) | pending platform hosting wave | Parent CDK already 301s `www` → apex in config; this tree does not edit infra. Live origin still serves a 200 app shell for unknown paths and for `www`. |
| D — Evidence (checker, CONTEXT.md Search, this report) | yes | |

## URL inventory

| URL | Type | State | Notes |
|-----|------|-------|-------|
| https://mikepattyn.nl/en/ | home | indexable | EN home |
| https://mikepattyn.nl/nl/ | home | indexable | NL home |
| https://mikepattyn.nl/en/cv | article | indexable | CV |
| https://mikepattyn.nl/nl/cv | article | indexable | CV |
| https://mikepattyn.nl/en/thanks | article | indexable | Thanks |
| https://mikepattyn.nl/nl/thanks | article | indexable | Thanks |
| https://mikepattyn.nl/en/underhood | article | indexable | Under the hood |
| https://mikepattyn.nl/nl/underhood | article | indexable | Onder de motorkap |
| https://mikepattyn.nl/en/workflows | article | indexable | Orchestrators |
| https://mikepattyn.nl/nl/workflows | article | indexable | Orchestrators |
| https://mikepattyn.nl/ | selector | deliberately excluded | `noindex` language chooser |
| https://mikepattyn.nl/en/rabbithole | article | deliberately excluded | Incomplete this run |
| https://mikepattyn.nl/nl/rabbithole | article | deliberately excluded | Incomplete this run |
| https://www.mikepattyn.nl/* | — | not a page | Pending platform 301 |
| unknown paths | — | not a page | Pending real 404 mapping to `/404.html` |
| `/cv.html`, `/thanks.html`, `/underhood.html`, `/workflows.html`, `/rabbithole.html` | — | not a page | Old unprefixed files are not emitted |

## What was measured

Core Web Vitals are field-first and evaluated at the 75th percentile of page views. A lab run cannot measure INP (no user input); Total Blocking Time is the documented lab proxy. Field data comes from the Chrome User Experience Report. A new or low-traffic site will often show **insufficient field data** — that is documented behaviour, not a failure.

| Source | LCP | INP / TBT | CLS | Notes |
|--------|-----|-----------|-----|-------|
| Lab (Lighthouse) | not run | TBT not run (INP proxy) | not run | Local checker has no Lighthouse gate |
| Field p75 (CrUX) | insufficient field data | insufficient field data | insufficient field data | Honest empty CrUX record |

Thresholds (good / poor): LCP ≤ 2500 ms / > 4000 ms; INP ≤ 200 ms / > 500 ms; CLS ≤ 0.1 / > 0.25.

`seo-audit` structural result: ok
`seo-audit` live result: status 200 on the current origin for the listed paths. That origin still ships the previous unprefixed homepage (1760-byte `index.html`) for `/en/`, unknown paths, and `www`. The live pass is not proof the new locale files are deployed.

## What stays your job

These cannot be delivered from code. They are listed so the package does not overpromise.

- **Google Business Profile** — claim, verify, keep hours and categories truthful.
- **NAP consistency** — name, address, and phone the same on the site, GBP, and directories. Do not invent a missing address.
- **Reviews** — real customer reviews on GBP or another third-party host. This site will not mark up self-hosted stars; Google makes that ineligible.
- **Content** — the words on the page, new service or location pages, photos you own.
- **Links** — other sites mentioning you. We do not buy or trade links.
- **Search Console** — ownership verification, sitemap submission, and the indexing / Core Web Vitals reports. Google's selected canonical and any soft-404 verdict live there, not in our checker.

## Content gaps we can prove from the site

- No public street address is published, so home uses `Organization` JSON-LD (name + email that already appear on the page), not `LocalBusiness`.
- The rabbit-hole essay is locale-prefixed but not indexable yet (this run capped at five pages).
- Old unprefixed URLs are not emitted; 301s from those paths need the hosting wave.

## What we will not do

- Promise a position or a traffic number.
- Write keyword-stuffed titles, hidden text, or doorway pages.
- Emit `FAQPage` or `HowTo` markup as a rich result (those features are off).
- Ship `llms.txt` as a search-engine control (it is an informal proposal, not a standard).
- Block `Google-Extended` as a way to leave AI Overviews (that token does not do that).
