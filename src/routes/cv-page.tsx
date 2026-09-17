import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { useLocale } from "@/lib/locale";
import { cvPdfFilename, cvPdfUrl } from "@/lib/links";

export function CVPage() {
  const { t, locale } = useLocale();
  const roles = [
    {
      name: "Methylium",
      href: "https://methylium.com",
      role: t.cv.methyliumRole,
      dates: t.cv.methyliumDates,
      body: t.cv.methylium,
    },
    {
      name: "Givt",
      href: "https://givtapp.net",
      role: t.cv.givtRole,
      dates: t.cv.givtDates,
      body: t.cv.givt,
    },
    {
      name: "Flyingdarts",
      href: "https://flyingdarts.mikepattyn.nl",
      role: t.cv.flyingRole,
      dates: t.cv.flyingDates,
      body: t.cv.flying,
    },
  ];

  return (
    <PageShell>
      <main className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono-meta text-[0.6875rem] text-muted">V03</p>
        <h1 className="font-display mt-3 text-4xl">{t.cv.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.cv.lede}</p>
        <p className="mt-6">
          <a
            href={cvPdfUrl(locale)}
            download={cvPdfFilename(locale)}
            className="text-sm underline decoration-line-strong underline-offset-4"
          >
            {t.footer.cv} PDF
          </a>
        </p>

        <section className="mt-14" aria-labelledby="cv-exp">
          <h2 id="cv-exp" className="font-display text-2xl">
            {t.cv.experience}
          </h2>
          <ol className="mt-8 grid gap-10">
            {roles.map((role) => (
              <li key={role.name}>
                <h3 className="text-xl font-semibold">
                  <a href={role.href} target="_blank" rel="noopener noreferrer">
                    {role.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {role.role} · {role.dates}
                </p>
                <p className="mt-3 leading-relaxed text-muted">{role.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="cv-edu">
          <h2 id="cv-edu" className="font-display text-2xl">
            {t.cv.education}
          </h2>
          <ul className="mt-6 grid gap-2 text-muted">
            <li>{t.cv.edu1}</li>
            <li>{t.cv.edu2}</li>
            <li>{t.cv.edu3}</li>
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="cv-det">
          <h2 id="cv-det" className="font-display text-2xl">
            {t.cv.details}
          </h2>
          <ul className="mt-6 grid gap-2 text-muted">
            <li>{t.cv.location}</li>
            <li>
              <a href="mailto:info@mikepattyn.nl">info@mikepattyn.nl</a>
            </li>
            <li>{t.cv.languages}</li>
          </ul>
        </section>

        <p className="mt-16">
          <Link to="/" className="text-sm underline decoration-line-strong underline-offset-4">
            {t.cv.back}
          </Link>
        </p>
      </main>
    </PageShell>
  );
}
