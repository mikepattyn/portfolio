import { Outlet, createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { LocaleProvider } from "@/lib/locale";
import { Home } from "@/routes/home";
import { CVPage } from "@/routes/cv-page";
import { UnderhoodPage } from "@/routes/underhood-page";
import { isLocale } from "@/lib/paths.js";
import type { Locale } from "@/lib/i18n";

const rootRoute = createRootRoute({
  component: function Root() {
    return (
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    );
  },
});

const localeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$locale",
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw redirect({ to: "/$locale", params: { locale: "en" } });
    }
  },
  component: function LocaleLayout() {
    const { locale } = localeRoute.useParams();
    return (
      <LocaleProvider locale={locale as Locale}>
        <Outlet />
      </LocaleProvider>
    );
  },
});

const homeRoute = createRoute({
  getParentRoute: () => localeRoute,
  path: "/",
  component: Home,
});

const cvRoute = createRoute({
  getParentRoute: () => localeRoute,
  path: "cv",
  component: CVPage,
});

const underhoodRoute = createRoute({
  getParentRoute: () => localeRoute,
  path: "underhood",
  component: UnderhoodPage,
});

const rootRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/$locale", params: { locale: "en" } });
  },
});

const cvRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cv.html",
  beforeLoad: () => {
    throw redirect({ to: "/$locale/cv", params: { locale: "en" } });
  },
});

const underhoodRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/underhood.html",
  beforeLoad: () => {
    throw redirect({ to: "/$locale/underhood", params: { locale: "en" } });
  },
});

export const routeTree = rootRoute.addChildren([
  localeRoute.addChildren([homeRoute, cvRoute, underhoodRoute]),
  rootRedirect,
  cvRedirect,
  underhoodRedirect,
]);
