# mikepattyn portfolio

Tiny personal portfolio for Mike Pattyn — apps and packages on the mikepattyn platform. Live at [mikepattyn.nl](https://mikepattyn.nl); Development preview at [dev.mikepattyn.nl](https://dev.mikepattyn.nl) (static only — no contact API).

V03 is the site on this branch: React (TanStack Router) for home, CV, and under the hood. Rabbit hole, workflows, and thanks stay as Vite HTML pages. The contact form still posts to **`POST /api/contact`** with Cloudflare Turnstile and the `_honey` field — same Lambda as production.

This remote is the public Application gitlink at `apps/portfolio` on the [mikepattyn](https://github.com/mikepattyn/mikepattyn) umbrella. The umbrella is the workspace: CDK, content/backend deploy, and the [Mikepattyn.Email](https://github.com/mikepattyn/Mikepattyn.Email) package gitlink live there. A standalone clone can run the Vite site. The Contact Lambda builds only from the umbrella.

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
