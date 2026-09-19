# mikepattyn portfolio

Tiny personal portfolio for Mike Pattyn — apps and packages on the mikepattyn platform. Live at [mikepattyn.nl](https://mikepattyn.nl); Development preview at [dev.mikepattyn.nl](https://dev.mikepattyn.nl) (static only — no contact API).

Indexable URLs are locale-prefixed: `/en/…` and `/nl/…` (home, CV, thanks, under the hood, workflows). The unprefixed `/` is a language chooser (`noindex`). The rabbit-hole essay is locale-prefixed this run but not yet in the sitemap.

V03 is the site on this branch: React (TanStack Router) for home, CV, and under the hood. Rabbit hole, workflows, and thanks stay as Vite HTML pages. The contact form still posts to **`POST /api/contact`** with Cloudflare Turnstile and the `_honey` field — same Lambda as production.

This remote is the public Application gitlink at `apps/portfolio` on the [mikepattyn](https://github.com/mikepattyn/mikepattyn) umbrella. The umbrella is the workspace: CDK, content/backend deploy, and the [Mikepattyn.Email](https://github.com/mikepattyn/Mikepattyn.Email) and [Mikepattyn.Contact.Api](https://github.com/mikepattyn/Mikepattyn.Contact.Api) package gitlinks live there. A standalone clone can run the Vite site. The Contact Lambda builds only from the umbrella.

## Quick start

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Output goes to `dist/`. From the umbrella the path is `apps/portfolio`.
