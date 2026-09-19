import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/router";
import "./styles.css";

const router = createRouter({ routeTree, trailingSlash: "never" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const el = document.getElementById("root");
if (!el) throw new Error("Missing #root");

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

if (el.hasChildNodes()) hydrateRoot(el, app);
else createRoot(el).render(app);
