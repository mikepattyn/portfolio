import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site-chrome";
import { useLocale } from "@/lib/locale";
import { useTheme } from "@/lib/theme";
import { CONTACT_ENDPOINT, TURNSTILE_SITE_KEY, loadTurnstileScript } from "@/lib/turnstile";
import { featuredWork, secondaryWork } from "@/lib/work";
import { cvPdfFilename, cvPdfUrl, links } from "@/lib/links";
import { AlienIcon, GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import type { Copy } from "@/lib/i18n";

export function Home() {
  const { t } = useLocale();
  return (
    <PageShell>
      <main>
        <Hero t={t} />
        <Proof t={t} />
        <Approach t={t} />
        <Work t={t} />
        <Teams t={t} />
        <Specialists t={t} />
        <Contact t={t} />
      </main>
    </PageShell>
  );
}

function LiveDot() {
  return (
    <span
      className="inline-block size-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_2px_rgba(34,197,94,0.55)]"
      aria-hidden
    />
  );
}

function Hero({ t }: { t: Copy }) {
  const { theme } = useTheme();
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {theme === "light" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      ) : null}
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 pt-14 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <p className="font-mono-meta text-[0.6875rem] text-paper/55">
            {t.hero.kicker}
            <span className="mx-3 text-paper/25">/</span>
            {t.hero.available}
          </p>
          <h1
            id="hero-headline"
            tabIndex={-1}
            className="font-display mt-6 max-w-[18ch] text-4xl leading-[1.05] font-medium tracking-[-0.035em]"
          >
            {t.hero.headlineA}{" "}
            <em className="text-paper-2 not-italic">{t.hero.headlineB}</em>
            <br />
            {t.hero.headlineC}
          </h1>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-paper/72">{t.hero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="paper" size="lg">
              <a href="#work">{t.hero.ctaWork}</a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-paper shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-paper)_22%,transparent)] hover:bg-ink-2">
              <a href="#contact">{t.hero.ctaContact}</a>
            </Button>
          </div>
        </div>
        <div className="lg:justify-self-end">
          <figure className="relative w-full max-w-[520px]">
            <div className="overflow-hidden rounded-[28px] bg-ink-2 p-2">
              <img
                src="/images/mike-pattyn.jpg"
                alt={t.hero.photoAlt}
                width={1000}
                height={1000}
                className="photo aspect-square w-full rounded-[20px] object-cover object-center"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono-meta text-[0.6875rem] text-paper/45">
              <span>Mike Pattyn</span>
              <span>{t.hero.city}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Proof({ t }: { t: Copy }) {
  const items = [
    { value: "8+", label: t.proof.years },
    { value: "100k+", label: t.proof.donors },
    { value: "€1M+", label: t.proof.volume },
    { value: "1", label: t.proof.chain },
  ];
  return (
    <section aria-label={t.proof.years} className="border-b border-line bg-paper-2">
      <ul className="mx-auto grid max-w-[1180px] grid-cols-2 sm:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="border-line px-5 py-7 sm:border-r sm:px-8 sm:last:border-r-0">
            <p className="font-display text-3xl tracking-tight tabular-nums">{item.value}</p>
            <p className="mt-1 text-sm text-muted">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Approach({ t }: { t: Copy }) {
  const pillars = [
    { title: t.approach.p1t, body: t.approach.p1 },
    { title: t.approach.p2t, body: t.approach.p2 },
    { title: t.approach.p3t, body: t.approach.p3 },
  ];
  return (
    <section id="approach" className="scroll-mt-20 mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
      <p className="font-mono-meta text-[0.6875rem] text-muted">{t.approach.eyebrow}</p>
      <h2 className="font-display mt-3 max-w-[18ch] text-3xl">{t.approach.title}</h2>
      <p className="mt-4 max-w-[54ch] text-lg text-muted">{t.approach.lede}</p>
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => (
          <li key={p.title} className="rounded-[28px] bg-paper-2 p-2">
            <div className="h-full rounded-[20px] bg-paper px-6 py-7 shadow-[var(--shadow-border)]">
              <p className="font-mono-meta text-[0.6875rem] text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-muted">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Work({ t }: { t: Copy }) {
  return (
    <section id="work" className="scroll-mt-20 bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-mono-meta text-[0.6875rem] text-paper/50">{t.work.eyebrow}</p>
        <h2 className="font-display mt-3 max-w-[16ch] text-3xl">{t.work.title}</h2>
        <p className="mt-4 max-w-[54ch] text-lg text-paper/68">{t.work.lede}</p>

        <ul className="mt-14 grid gap-16">
          {featuredWork.map((item, i) => (
            <li
              id={item.id}
              key={item.id}
              className="grid scroll-mt-20 items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={i % 2 === 1 ? "lg:order-2" : undefined}
              >
                <div className="overflow-hidden rounded-[24px] bg-ink-2 p-2">
                  <img
                    src={item.image}
                    alt=""
                    width={1536}
                    height={1024}
                    className="photo aspect-[3/2] w-full rounded-[16px] object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </a>
              <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-meta text-[0.6875rem] text-paper/45">
                  <span>{item.host}</span>
                  <span className="inline-flex items-center gap-2 text-paper/55">
                    <LiveDot />
                    {t.work.live}
                  </span>
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {item.name}
                  </a>
                </h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-paper/75">{t.work[item.id]}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.stack.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full px-3 py-1 text-xs text-paper/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-paper)_16%,transparent)]"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-paper/80 hover:text-paper"
                >
                  {t.work.visit}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {secondaryWork.map((item) => {
            const body = t.work[item.id];
            return (
              <article key={item.id} className="rounded-[24px] bg-ink-2 p-3">
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={item.image}
                    alt=""
                    width={1536}
                    height={1024}
                    className="photo aspect-[16/9] w-full rounded-[16px] object-cover"
                    loading="lazy"
                  />
                </a>
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-meta text-[0.6875rem] text-paper/45">
                  <span>{item.host}</span>
                  <span className="inline-flex items-center gap-2 text-paper/55">
                    <LiveDot />
                    {t.work.live}
                  </span>
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {item.name}
                  </a>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full px-3 py-1 text-xs text-paper/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-paper)_16%,transparent)]"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-paper/80 hover:text-paper"
                >
                  {t.work.visit}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-12 max-w-[60ch] text-sm leading-relaxed text-paper/55">
          {t.other.canvas} {t.other.memries}
        </p>
      </div>
    </section>
  );
}

function Teams({ t }: { t: Copy }) {
  return (
    <section id="teams" className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
      <p className="font-mono-meta text-[0.6875rem] text-muted">{t.teams.eyebrow}</p>
      <h2 className="font-display mt-3 text-3xl">{t.teams.title}</h2>
      <p className="mt-4 max-w-[54ch] text-lg text-muted">{t.teams.lede}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="rounded-[28px] bg-paper-2 p-2">
          <div className="h-full rounded-[20px] bg-paper px-6 py-7 shadow-[var(--shadow-border)]">
            <img src="/images/logos/methylium.png" alt="" className="h-8 w-auto object-contain" />
            <h3 className="mt-5 text-xl font-semibold">
              <a href="https://methylium.com" target="_blank" rel="noopener noreferrer">
                Methylium
              </a>
            </h3>
            <p className="mt-1 text-sm text-muted">{t.teams.methyliumRole}</p>
            <p className="mt-4 leading-relaxed text-muted">{t.teams.methylium}</p>
          </div>
        </article>
        <article className="rounded-[28px] bg-paper-2 p-2">
          <div className="h-full rounded-[20px] bg-paper px-6 py-7 shadow-[var(--shadow-border)]">
            <img src="/images/logos/givt.png" alt="" className="h-8 w-auto object-contain" />
            <h3 className="mt-5 text-xl font-semibold">
              <a href="https://givtapp.net" target="_blank" rel="noopener noreferrer">
                Givt
              </a>
            </h3>
            <p className="mt-1 text-sm text-muted">{t.teams.givtRole}</p>
            <p className="mt-4 leading-relaxed text-muted">{t.teams.givt}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Specialists({ t }: { t: Copy }) {
  return (
    <section className="border-y border-line bg-paper-2 py-20 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <p className="font-mono-meta text-[0.6875rem] text-muted">{t.specialists.eyebrow}</p>
        <h2 className="font-display mt-3 text-3xl">{t.specialists.title}</h2>
        <p className="mt-4 max-w-[54ch] text-lg text-muted">{t.specialists.lede}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <blockquote className="max-w-[46ch]">
            <p className="leading-relaxed">{t.specialists.warren}</p>
            <footer className="mt-4 text-sm text-muted">
              <a href="https://www.linkedin.com/in/warren-parad" target="_blank" rel="noopener noreferrer">
                Warren Parad
              </a>
              {" · "}
              <a href="https://authress.io" target="_blank" rel="noopener noreferrer">
                Authress
              </a>
            </footer>
          </blockquote>
          <blockquote className="max-w-[46ch]">
            <p className="leading-relaxed">{t.specialists.anthony}</p>
            <footer className="mt-4 text-sm text-muted">
              <a
                href="https://www.linkedin.com/in/anthony-bouton-021868225/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anthony Bouton
              </a>
              {" · The Coding Base"}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Contact({ t }: { t: Copy }) {
  const { locale } = useLocale();
  const { theme } = useTheme();
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;

    loadTurnstileScript()
      .then((api) => {
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = "";
        widgetId.current = api.render(hostRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: theme === "dark" ? "dark" : "light",
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      widgetId.current = null;
    };
  }, [theme]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_honey") || "").trim()) return;

    const turnstileToken =
      form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value?.trim() ?? "";
    if (!turnstileToken) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          message: String(data.get("message") || "").trim(),
          turnstileToken,
          _honey: String(data.get("_honey") || ""),
        }),
      });
      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok || !contentType.includes("application/json")) {
        throw new Error(`Contact API ${response.status}`);
      }
      form.reset();
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sending" ? t.contact.sending : t.contact.send;

  return (
    <section id="contact" className="scroll-mt-20 mx-auto grid max-w-[1180px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
      <div>
        <p className="font-mono-meta text-[0.6875rem] text-muted">{t.contact.eyebrow}</p>
        <h2 className="font-display mt-3 text-3xl">{t.contact.title}</h2>
        <p className="mt-4 max-w-[42ch] text-lg text-muted">{t.contact.lede}</p>
        <p className="mt-4 text-sm text-muted">
          {t.contact.studio}{" "}
          <a
            href="https://pattynologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line-strong underline-offset-4"
          >
            pattynologies.com
          </a>
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <a href="mailto:info@mikepattyn.nl" className="text-sm underline decoration-line-strong underline-offset-4">
            info@mikepattyn.nl
          </a>
          <div className="flex items-center gap-2">
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-10 items-center justify-center rounded-full text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_14%,transparent)] hover:bg-paper-2"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-10 items-center justify-center rounded-full text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_14%,transparent)] hover:bg-paper-2"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href={links.alien}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Alien But Nice"
              className="inline-flex size-10 items-center justify-center rounded-full text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_14%,transparent)] hover:bg-paper-2"
            >
              <AlienIcon className="size-4" />
            </a>
            <a
              href={cvPdfUrl(locale)}
              download={cvPdfFilename(locale)}
              className="ml-2 text-sm underline decoration-line-strong underline-offset-4"
            >
              CV
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rounded-[28px] bg-paper-2 p-2" aria-busy={status === "sending"}>
        <div className="rounded-[20px] bg-paper px-6 py-7 shadow-[var(--shadow-border)]">
          <label className="sr-only" htmlFor="honey">
            Company
          </label>
          <input id="honey" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid gap-4">
            <label className="grid gap-1.5 text-sm">
              {t.contact.name}
              <input
                name="name"
                autoComplete="name"
                className="h-11 rounded-xl bg-paper-2 px-3 text-base outline-none ring-1 ring-line focus:ring-2 focus:ring-moss"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              {t.contact.email}
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-11 rounded-xl bg-paper-2 px-3 text-base outline-none ring-1 ring-line focus:ring-2 focus:ring-moss"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              {t.contact.message}
              <textarea
                name="message"
                required
                rows={5}
                className="resize-y rounded-xl bg-paper-2 px-3 py-2.5 text-base outline-none ring-1 ring-line focus:ring-2 focus:ring-moss"
              />
            </label>
          </div>
          <div
            ref={hostRef}
            className="mt-5 min-h-[65px]"
            aria-label={t.contact.turnstileAria}
          />
          {status === "success" ? (
            <p className="mt-4 text-sm text-moss" role="status">
              {t.contact.success}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="mt-4 text-sm" role="alert">
              {t.contact.error}
            </p>
          ) : null}
          <Button type="submit" variant="ink" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "sending"}>
            {buttonLabel}
          </Button>
        </div>
      </form>
    </section>
  );
}
