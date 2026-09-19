# Mikepattyn portfolio

Personal static site for Mike Pattyn: who I am, the applications under the mikepattyn platform, and shared open-source packages.

## Language

**Portfolio**:
This Vite static site under `apps/portfolio`, a public Application gitlink ([mikepattyn/portfolio](https://github.com/mikepattyn/portfolio)). Still a platform Application: CDK and deploy stay on the umbrella; a pointer bump ships the site.
_Avoid_: treating the path as an owned umbrella tree; nesting Email or Contact.Api inside this remote; adding GitHub chrome on the public site

**CV**:
First-party curriculum vitae at `/en/cv` and `/nl/cv` (Vite multi-page entry next to thanks). Linked from contact alt and **SiteFooter**, not the hero and not the primary nav. Copy under `cv.*` in `src/i18n/{en,nl}.js` and `src/lib/i18n.ts`.
_Avoid_: hosting the CV on Framer; putting the CV in the primary nav or the hero; GitHub links; date of birth

**ContactApi**:
Production `POST /api/contact` on `mikepattyn.nl` (same-origin via CloudFront → API Gateway → `Mikepattyn-Contact-Api-Production` Lambda). The Development preview at `dev.mikepattyn.nl` has no `/api/*` origin.
_Avoid_: FormSubmit or other third-party form backends; expecting the contact form to work on the preview hostname

**TeamsSection**:
Home-page section at `/#teams` (Methylium, Givt — companies Mike worked at as a developer), a top-level band between `#other` and **ToolkitBanner**. Copy under `teams.*` in `src/i18n/{en,nl}.js`.
_Avoid_: a separate `/teams.html` page; putting Teams in the primary nav; nesting Teams under a fundraising `#back` section; putting SETTL. / Financieel Fit thanks here (that lives on **ThanksPage**); listing Authress or The Coding Base as an employer

**ToolkitBanner**:
Home-page band at `/#toolkit` between **TeamsSection** and **SpecialistsSection**. A rotating strip of tool logos (AWS, Authress, Discord, Slack, Cursor). Pointer over the band pauses the rotation on the nearest icon. Copy under `toolkit.*` in `src/i18n/{en,nl}.js`.
_Avoid_: putting it in the primary nav; treating these logos as employers or as **SpecialistsSection**; putting Cursor / Fork / Grok Bot thanks prose here (that lives on **ThanksPage**)

**SpecialistsSection**:
Home-page section at `/#specialists` for people Mike learned from who were not employers: Warren Parad (Authress — teaching plus the Authress service) and Anthony Bouton (The Coding Base — AWS in code, APIs, single-table design, and running a low-cost scalable system on AWS during the Givt years). A top-level band between **ToolkitBanner** and `#contact`. Copy under `specialists.*` in `src/i18n/{en,nl}.js`. Warren's card keeps `id="authress"` so `/#authress` still lands there.
_Avoid_: treating Authress or The Coding Base as companies Mike worked at; putting these thanks back inside **TeamsSection**; listing Maarten Vergouwe here; a separate specialists page; putting Specialists in the primary nav

**SiteFooter**:
Shared footer on every Portfolio page (home, **UnderTheHoodPage**, rabbit hole, workflows, thanks, **CV**). Brand, mail / LinkedIn / **CV** / **Thanks**, plus the skin switch between classic and **ElectricEmerald**. Copy under `footer.*` plus `nav.thanks`.
_Avoid_: GitHub links; SETTL. / Financieel Fit thanks; Cursor / Fork / Grok Bot credits; a platform sentence; putting that thanks back in **TeamsSection**; putting the skin switch in the nav or on a query param

**ThanksPage**:
Standalone page at `/en/thanks` and `/nl/thanks` (Vite multi-page entry next to rabbithole and workflows). Two sections: **This house** (SETTL. / Financieel Fit story and logos) and **These tools** (Cursor, Fork, Grok Bot). Linked from the primary nav (Thanks / Dank, before Contact) and **SiteFooter**. Copy under `thanks.*` in `src/i18n/{en,nl}.js`.
_Avoid_: treating it as an **UnderTheHoodTopic**; treating it as the rabbit-hole mentorship thank-you; putting the house story or tool credits back in **SiteFooter** or **TeamsSection**

**UnderTheHoodPage**:
Standalone teaching page at `/en/underhood` and `/nl/underhood` (Vite multi-page entry next to rabbithole). Linked from the primary nav (Under the hood, after Work). Home `#under-the-hood`, `#single-table`, `#agent-skills`, and `#publish-here` hashes redirect here. Copy under `underhood.*` in `src/i18n/{en,nl}.js` and `src/lib/i18n.ts`.
_Avoid_: putting the articles back on the home page; duplicating the full explanation inline in each app card

**UnderTheHoodTopic**:
One teaching article inside **UnderTheHoodPage**. Current topics: `#single-table` (DynamoDB single-table design), `#agent-skills` (why the Agent Skill shelf is a deliberate pick), and `#publish-here` (Package gitlinks keep their remotes; the umbrella is the release console). Stack chips on Barbershop, Gofish, and Lumen link to `/en/underhood#single-table` via `.app-item__stack-link`. The work open-source note links to `/en/underhood#publish-here` (and `/nl/…`). New public topics from a workshop chat are added with **UmbrellaTeach**.
_Avoid_: treating the page heading as if it were still only the DynamoDB topic

**UmbrellaTeach**:
The `umbrella-teach` skill: one summarized workshop chat becomes one public **UnderTheHoodTopic**, written so a learning programmer can follow it. Copy is revised for clarity, then explained; it is not a resonate pass and not the private `teach` workspace.
_Avoid_: MISSION.md / lessons HTML; dumping a chat transcript; revise-and-resonate punch copy; putting transcript ids on the site

**WorkflowsPage**:
Standalone teaching page at `/en/workflows` and `/nl/workflows` (Vite multi-page entry next to rabbithole). It explains the quality orchestrators: one parent skill plans per tree, then launches one worktree agent per dirty app, all on the model the user invoked. Linked from the **Quality orchestrators** group on `/en/underhood#agent-skills` (a Workflows link, not a skill-name grid). Copy under `workflows.*` in `src/i18n/{en,nl}.js`.
_Avoid_: treating it as an **UnderTheHoodTopic**; adding it to the primary nav; putting chat ids or last-run internals on the page

**ElectricEmerald**:
Opt-in stitch look for the Portfolio (not the first-visit default): pitch-black ground, neon lime (`#CCFF00`) and electric purple accents, glass panels, HUD chrome (`SYS.*` labels, `>` lede prefixes), JetBrains Mono, the Built with Cursor chip as viewport chrome, and the WebGL rain/scan shader (`src/shader.js`). Only **SiteFooter** can turn it on; the choice persists in `localStorage.skin` after a manual toggle. Classic (paper/moss, Newsreader + Bricolage) is the default when that key is missing. Both skin stylesheets start `disabled` in HTML so the Vite production build keeps them as separate assets; the head boot then enables classic or stitch.
_Avoid_: Tailwind CDN; making stitch the first-visit default; a nav or URL skin control; GitHub in the footer; hotlinked stitch images

**AgentSkill**:
A versioned instruction pack (`SKILL.md` plus optional scripts/references) the coding agent loads when the work matches. The platform shelf lives at repo-root `.cursor/skills/`; the public teach is `/en/underhood#agent-skills`.
_Avoid_: calling them rules, slash commands, or prompts; treating a popular public catalog as the default shelf; using the private `teach` workspace when the job is **UmbrellaTeach**

## Boundaries

- Owns marketing copy and static frontend only.
- Contact delivery via the `packages/Mikepattyn.Contact.Api` gitlink + shared `packages/Mikepattyn.Email` gitlink (not inline in the static site). The Lambda ProjectReferences Email and builds only from the umbrella workspace.
- CDK: `Mikepattyn-Backend-Stack-Production` (API + Lambda), `Mikepattyn-BrandFrontend-Stack-Production` (S3 + CloudFront + `/api/*` origin), and `Mikepattyn-BrandFrontend-Stack-Development` (`dev.mikepattyn.nl`, static only — no `/api/*`).

## Stack

Vite · plain HTML/CSS/JS · Google Fonts (Newsreader, Bricolage Grotesque, JetBrains Mono) · Material Symbols · WebGL shader (ElectricEmerald only)

## Contact

General contact copy points to `info@mikepattyn.nl` (footer + contact section), plus LinkedIn and the **CV**. The public site does not link to GitHub in the footer, nav, or contact copy. The footer and primary nav also link to **ThanksPage**. The `/en/underhood#publish-here` table may link the Package gitlink remotes (`authress-angular`, `authress-flutter`) plus their npm / pub.dev package pages.

The contact form posts JSON to **`POST /api/contact`** on the same origin. The Lambda sends via Zoho SMTP from `info@mikepattyn.nl` to `info@mikepattyn.nl` with the visitor's address as `Reply-To`.

Spam protection: honeypot field (`_honey`), Cloudflare Turnstile (site key in `index.html` meta tag; secret in Secrets Manager), and API Gateway throttling.

## Locale

EN/NL, locale-prefixed paths (`/en/…`, `/nl/…`). The prefix is the
source of truth — not `localStorage` and not `navigator.language`.
The language control is a link to the other locale of the same page.
Copy lives in `src/i18n/{en,nl}.js` (vanilla pages) and `src/lib/i18n.ts`
(React pages). `src/locale.js` still paints `data-i18n` keys after load;
the built HTML already contains the right language.

## Search

Canonical host: `https://mikepattyn.nl`. `www` → apex is a 301 on the
platform hosting stack (pending deploy of that wave). Preview
`dev.mikepattyn.nl` is a different host and stays out of this sitemap.

| URL | Type | State | Notes |
|-----|------|-------|-------|
| `https://mikepattyn.nl/en/` | home | indexable | EN home; Organization JSON-LD; reciprocal hreflang with `/nl/` |
| `https://mikepattyn.nl/nl/` | home | indexable | NL home; in-language self-canonical |
| `https://mikepattyn.nl/en/cv` | article | indexable | CV |
| `https://mikepattyn.nl/nl/cv` | article | indexable | CV |
| `https://mikepattyn.nl/en/thanks` | article | indexable | Thanks |
| `https://mikepattyn.nl/nl/thanks` | article | indexable | Thanks |
| `https://mikepattyn.nl/en/underhood` | article | indexable | Under the hood; Article JSON-LD |
| `https://mikepattyn.nl/nl/underhood` | article | indexable | Onder de motorkap |
| `https://mikepattyn.nl/en/workflows` | article | indexable | Quality orchestrators; Article JSON-LD |
| `https://mikepattyn.nl/nl/workflows` | article | indexable | Orchestrators |
| `https://mikepattyn.nl/` | selector | deliberately excluded | `noindex` language chooser; x-default on the `/en/…` URLs |
| `https://mikepattyn.nl/en/rabbithole` | article | deliberately excluded | Incomplete this run: locale URL exists, full indexability deferred |
| `https://mikepattyn.nl/nl/rabbithole` | article | deliberately excluded | Same |
| `https://www.mikepattyn.nl/*` | — | not a page | Pending platform 301 to apex |
| unknown paths | — | not a page | Origin 404 body is `/404.html` (pending platform error mapping) |
| `/cv.html`, `/thanks.html`, `/underhood.html`, `/workflows.html`, `/rabbithole.html` | — | not a page | Old unprefixed files are not emitted; pending 301s in the hosting wave |
