import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { copy, type Copy, type Locale } from "@/lib/i18n";
import { swapLocalePath } from "@/lib/paths.js";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: Copy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (typeof window === "undefined" || next === locale) return;
      const nextPath = swapLocalePath(window.location.pathname, next);
      window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t: copy[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
