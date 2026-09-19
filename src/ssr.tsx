import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/router";

export async function render(url: string) {
  const history = createMemoryHistory({ initialEntries: [url] });
  const router = createRouter({ routeTree, history, trailingSlash: "never" });
  await router.load();
  return renderToString(<RouterProvider router={router} />);
}
