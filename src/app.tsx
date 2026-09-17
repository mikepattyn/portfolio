import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";
import { LocaleProvider } from "@/lib/locale";
import { Home } from "@/routes/home";
import { CVPage } from "@/routes/cv-page";
import { UnderhoodPage } from "@/routes/underhood-page";
import "./styles.css";

const rootRoute = createRootRoute({
  component: function Root() {
    return (
      <ThemeProvider>
        <LocaleProvider>
          <Outlet />
        </LocaleProvider>
      </ThemeProvider>
    );
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const cvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cv.html",
  component: CVPage,
});

const underhoodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/underhood.html",
  component: UnderhoodPage,
});

const routeTree = rootRoute.addChildren([indexRoute, cvRoute, underhoodRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const el = document.getElementById("root");
if (!el) throw new Error("Missing #root");

createRoot(el).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
