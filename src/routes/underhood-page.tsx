import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { useLocale } from "@/lib/locale";

export function UnderhoodPage() {
  const { t } = useLocale();
  return (
    <PageShell>
      <main className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono-meta text-[0.6875rem] text-muted">{t.nav.underHood}</p>
        <h1 className="font-display mt-3 text-4xl">{t.hood.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.hood.lede}</p>

        <article id="single-table" className="mt-16 scroll-mt-24">
          <h2 className="font-display text-2xl">{t.hood.t1}</h2>
          <p className="mt-4 leading-relaxed">{t.hood.t1lede}</p>
          <h3 className="mt-8 text-lg font-semibold">{t.hood.t1a}</h3>
          <p className="mt-2 leading-relaxed text-muted">{t.hood.t1b}</p>
          <h3 className="mt-8 text-lg font-semibold">{t.hood.t1c}</h3>
          <p className="mt-2 leading-relaxed text-muted">{t.hood.t1d}</p>
          <p className="mt-6 text-sm text-muted">{t.hood.t1e}</p>
        </article>

        <article id="agent-skills" className="mt-16 scroll-mt-24">
          <h2 className="font-display text-2xl">{t.hood.t2}</h2>
          <p className="mt-4 leading-relaxed">{t.hood.t2lede}</p>
          <h3 className="mt-8 text-lg font-semibold">{t.hood.t2a}</h3>
          <p className="mt-2 leading-relaxed text-muted">{t.hood.t2b}</p>
          <h3 className="mt-8 text-lg font-semibold">{t.hood.t2c}</h3>
          <p className="mt-2 leading-relaxed text-muted">{t.hood.t2d}</p>
          <h3 className="mt-8 text-lg font-semibold">{t.hood.t2e}</h3>
          <p className="mt-2 leading-relaxed text-muted">{t.hood.t2f}</p>
        </article>

        <article id="publish-here" className="mt-16 scroll-mt-24">
          <h2 className="font-display text-2xl">{t.hood.t3}</h2>
          <p className="mt-4 leading-relaxed">{t.hood.t3lede}</p>
        </article>

        <p className="mt-16">
          <Link to="/" className="text-sm underline decoration-line-strong underline-offset-4">
            {t.hood.back}
          </Link>
        </p>
      </main>
    </PageShell>
  );
}
