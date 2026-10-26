"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PortfolioTheme = "dark" | "light";

type ThemeContextValue = {
  theme: PortfolioTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "lenj-portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<PortfolioTheme>("dark");

  useLayoutEffect(() => {
    const initialTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: light)");
    const handleSystemPreference = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch (error) {
        console.error("Could not read the saved portfolio theme preference.", error);
      }
      const nextTheme = event.matches ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      setTheme(nextTheme);
      window.dispatchEvent(
        new CustomEvent("portfolio:theme-change", {
          detail: { theme: nextTheme },
        }),
      );
    };
    systemPreference.addEventListener("change", handleSystemPreference);
    return () =>
      systemPreference.removeEventListener("change", handleSystemPreference);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.dataset.themeTransition = "true";
    setTheme(nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error("Could not save the portfolio theme preference.", error);
    }

    window.dispatchEvent(
      new CustomEvent("portfolio:theme-change", {
        detail: { theme: nextTheme },
      }),
    );

    window.setTimeout(() => {
      delete document.documentElement.dataset.themeTransition;
    }, 650);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function usePortfolioTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("usePortfolioTheme must be used within ThemeProvider.");
  }
  return context;
}
