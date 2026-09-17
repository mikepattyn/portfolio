import { TriangleAlert } from "lucide-react";

export function AppErrorComponent() {
  return (
    <main className="mx-auto max-w-[40rem] px-6 py-24 text-center">
      <TriangleAlert className="mx-auto size-8" aria-hidden />
      <h1 className="mt-4 text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm opacity-70">Refresh the page, or come back in a moment.</p>
    </main>
  );
}
