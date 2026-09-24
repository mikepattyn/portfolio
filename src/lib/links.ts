import type { Locale } from "@/lib/i18n";

export const links = {
  email: "mailto:info@mikepattyn.nl",
  linkedin: "https://www.linkedin.com/in/mike-pattyn-033681103/",
  facebook: "https://www.facebook.com/mike.pattyn.963",
  instagram: "https://www.instagram.com/officialmikepattyn/",
  threads: "https://www.threads.com/@officialmikepattyn",
  tiktok: "https://www.tiktok.com/@officialmikepattyn",
  github: "https://github.com/mikepattyn",
  alien: "https://alienbutnice.nl/",
  framer: "https://mikepattyn.framer.website/",
} as const;

export function cvPdfUrl(locale: Locale) {
  return locale === "nl"
    ? "https://cdn.pattynologies.com/cv/Mike-Pattyn-CV-NL.pdf"
    : "https://cdn.pattynologies.com/cv/Mike-Pattyn-CV.pdf";
}

export function cvPdfFilename(locale: Locale) {
  return locale === "nl" ? "Mike-Pattyn-CV-NL.pdf" : "Mike-Pattyn-CV.pdf";
}
