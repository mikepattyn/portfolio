# SEO-overdracht — Mike Pattyn

Datum: 2026-09-19
Canonieke host: https://mikepattyn.nl
Pakket: seo-by-design (platformgolf, geen shop-SKU)

Dit rapport beschrijft wat er is geïmplementeerd en wat er is gemeten. Het voorspelt geen posities, verkeer of rankings.

## Wat er is gedaan

| Spoor | Klaar | Toelichting |
|-------|-------|-------------|
| A — Signalen in de HTML die de server teruggeeft | ja (5 pagina's × EN/NL) | Locale-voorvoegsels `/en/…` en `/nl/…`. Titel, beschrijving, self-canonical, wederkerige hreflang, Organization- of Article-JSON-LD waar van toepassing, koppen. Signalen staan in de gebouwde HTML vóór JavaScript. |
| B — `robots.txt` en gegenereerde `sitemap.xml` | ja | Sitemap is gelijk aan de tien indexeerbare URL's. Alleen `loc` + waarheidsgetrouwe `lastmod`. |
| C — Aflevering (statuscodes, canonieke host, cache, compressie) | pending platform hosting wave | De parent-CDK 301't `www` → apex in config; deze tree wijzigt geen infra. De live origin geeft nog een 200-app-shell voor onbekende paden en voor `www`. |
| D — Bewijs (checker, CONTEXT.md Search, dit rapport) | ja | |

## URL-inventaris

| URL | Type | Staat | Toelichting |
|-----|------|-------|-------------|
| https://mikepattyn.nl/en/ | home | indexeerbaar | EN-home |
| https://mikepattyn.nl/nl/ | home | indexeerbaar | NL-home |
| https://mikepattyn.nl/en/cv | article | indexeerbaar | CV |
| https://mikepattyn.nl/nl/cv | article | indexeerbaar | CV |
| https://mikepattyn.nl/en/thanks | article | indexeerbaar | Dank |
| https://mikepattyn.nl/nl/thanks | article | indexeerbaar | Dank |
| https://mikepattyn.nl/en/underhood | article | indexeerbaar | Onder de motorkap |
| https://mikepattyn.nl/nl/underhood | article | indexeerbaar | Onder de motorkap |
| https://mikepattyn.nl/en/workflows | article | indexeerbaar | Orchestrators |
| https://mikepattyn.nl/nl/workflows | article | indexeerbaar | Orchestrators |
| https://mikepattyn.nl/ | kiezer | bewust uitgesloten | `noindex` taalkiezer |
| https://mikepattyn.nl/en/rabbithole | article | bewust uitgesloten | Deze run incompleet |
| https://mikepattyn.nl/nl/rabbithole | article | bewust uitgesloten | Deze run incompleet |
| https://www.mikepattyn.nl/* | — | geen pagina | Platform-301 nog pending |
| onbekende paden | — | geen pagina | Echte 404 naar `/404.html` nog pending |
| `/cv.html`, `/thanks.html`, `/underhood.html`, `/workflows.html`, `/rabbithole.html` | — | geen pagina | Oude paden zonder voorvoegsel worden niet meer gebouwd |

## Wat er is gemeten

Core Web Vitals zijn veldmetrieken, beoordeeld op het 75e percentiel van pageviews. Een labrun kan INP niet meten (geen gebruikersinvoer); Total Blocking Time is de gedocumenteerde lab-proxy. Velddata komt uit het Chrome User Experience Report. Een nieuwe of rustige site toont vaak **onvoldoende velddata** — dat is gedocumenteerd gedrag, geen fout.

| Bron | LCP | INP / TBT | CLS | Toelichting |
|------|-----|-----------|-----|-------------|
| Lab (Lighthouse) | niet gedraaid | TBT niet gedraaid (INP-proxy) | niet gedraaid | Lokale checker heeft geen Lighthouse-poort |
| Veld p75 (CrUX) | onvoldoende velddata | onvoldoende velddata | onvoldoende velddata | Eerlijk leeg CrUX-record |

Drempels (goed / slecht): LCP ≤ 2500 ms / > 4000 ms; INP ≤ 200 ms / > 500 ms; CLS ≤ 0,1 / > 0,25.

`seo-audit` structureel: ok
`seo-audit` live: status 200 op de huidige origin voor de genoemde paden. Die origin levert nog de vorige homepage zonder locale-voorvoegsel (1760-byte `index.html`) voor `/en/`, onbekende paden en `www`. De live-pass bewijst niet dat de nieuwe locale-bestanden gedeployed zijn.

## Wat bij jou blijft

Dit kan niet uit code worden geleverd. Het staat hier zodat het pakket niet te veel belooft.

- **Google Bedrijfsprofiel** — claimen, verifiëren, uren en categorieën waarheidsgetrouw houden.
- **NAP-consistentie** — naam, adres en telefoon hetzelfde op de site, GBP en gidsen. Geen adres verzinnen.
- **Beoordelingen** — echte klantervaringen op GBP of een andere derde partij. Deze site markeert geen eigen sterren; Google maakt dat ongeldig.
- **Inhoud** — de tekst op de pagina, nieuwe dienst- of locatiepagina's, foto's die van jou zijn.
- **Links** — andere sites die je noemen. Wij kopen of ruilen geen links.
- **Search Console** — eigendom verifiëren, sitemap indienen, indexering en Core Web Vitals. De door Google gekozen canonical en een eventuele soft-404-uitspraak staan daar, niet in onze checker.

## Inhoudslacunes die we van de site zelf kunnen aantonen

- Er staat geen openbaar straatadres op de site, dus home gebruikt `Organization`-JSON-LD (naam + e-mail die al op de pagina staan), geen `LocalBusiness`.
- Het konijnenhol-essay heeft locale-URL's maar is deze run nog niet indexeerbaar (plafond van vijf pagina's).
- Oude URL's zonder voorvoegsel worden niet gebouwd; 301's vanaf die paden horen bij de hostinggolf.

## Wat we niet doen

- Een positie of verkeerscijfer beloven.
- Titels volproppen, tekst verbergen of deurpaginia's bouwen.
- `FAQPage`- of `HowTo`-markup verkopen als rich result (die features staan uit).
- `llms.txt` leveren als zoekmachinecontrole (het is een informeel voorstel, geen standaard).
- `Google-Extended` blokkeren als manier om uit AI-overzichten te blijven (dat token doet dat niet).
