import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Framer } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { useTheme, type Theme } from "@/lib/theme";
import { cvPdfFilename, cvPdfUrl, links } from "@/lib/links";
import { AlienIcon, GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/#approach", hash: true, key: "approach" as const },
  { href: "/#work", hash: true, key: "work" as const },
  { href: "/underhood.html", hash: false, key: "underHood" as const },
  { href: "/#contact", hash: true, key: "contact" as const },
];

export function SiteHeader() {
  const { t, locale, setLocale } = useLocale();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          aria-label={t.nav.brand}
          className="flex items-center gap-3 text-ink no-underline"
        >
          <img
            src="/images/mike-pattyn-avatar.jpg"
            alt=""
            width={36}
            height={36}
            className="photo size-9 rounded-full object-cover object-center"
          />
          <span className="text-sm font-semibold tracking-tight">Mike Pattyn</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label={t.nav.primary}>
          {nav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={cn(
                "text-[0.8125rem] text-muted transition-colors duration-150 hover:text-ink",
                !item.hash && pathname === item.href && "text-ink",
              )}
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex rounded-full bg-paper-2 p-0.5"
            role="group"
            aria-label={t.theme}
          >
            {(["light", "dark"] as const).map((mode: Theme) => (
              <button
                key={mode}
                type="button"
                aria-pressed={theme === mode}
                onClick={() => setTheme(mode)}
                className={cn(
                  "h-8 rounded-full px-2.5 text-xs font-medium transition-colors duration-150",
                  theme === mode ? "bg-ink text-paper" : "text-muted hover:text-ink",
                )}
              >
                {mode === "light" ? t.themeLight : t.themeDark}
              </button>
            ))}
          </div>
          <div
            className="flex rounded-full bg-paper-2 p-0.5"
            role="group"
            aria-label={t.locale}
          >
            {(["en", "nl"] as const).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={locale === code}
                onClick={() => setLocale(code)}
                className={cn(
                  "h-8 min-w-10 rounded-full px-2.5 text-xs font-medium uppercase transition-colors duration-150",
                  locale === code ? "bg-ink text-paper" : "text-muted hover:text-ink",
                )}
              >
                {code}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="relative size-11 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                "absolute top-[18px] left-3 block h-px w-5 bg-ink transition-transform duration-200",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute top-[25px] left-3 block h-px w-5 bg-ink transition-transform duration-200",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-line px-5 py-4 md:hidden"
          aria-label={t.nav.primary}
        >
          {nav.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base text-ink"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function IconLink({
  href,
  label,
  download,
  children,
}: {
  href: string;
  label: string;
  download?: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex size-10 items-center justify-center rounded-full text-paper/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-paper)_18%,transparent)] transition-colors duration-150 hover:bg-ink-2 hover:text-paper"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  const { t, locale } = useLocale();
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-2xl tracking-tight">Mike Pattyn</p>
          <p className="mt-2 font-mono-meta text-[0.6875rem] text-paper/55">{t.footer.copy}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <IconLink href={links.framer} label={t.footer.framer}>
              <Framer className="size-4" />
            </IconLink>
            <IconLink href={links.linkedin} label="LinkedIn">
              <LinkedInIcon className="size-4" />
            </IconLink>
            <IconLink href={links.github} label="GitHub">
              <GitHubIcon className="size-4" />
            </IconLink>
            <IconLink href={links.alien} label="Alien But Nice">
              <AlienIcon className="size-4" />
            </IconLink>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/75" aria-label={t.footer.aria}>
          <a href="mailto:info@mikepattyn.nl" className="hover:text-paper">
            info@mikepattyn.nl
          </a>
          <a href={cvPdfUrl(locale)} download={cvPdfFilename(locale)} className="hover:text-paper">
            {t.footer.cv}
          </a>
          <Link to="/underhood.html" className="hover:text-paper">
            {t.footer.underHood}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        {t.skip}
      </a>
      <SiteHeader />
      <div id="top">{children}</div>
      <SiteFooter />
    </div>
  );
}
