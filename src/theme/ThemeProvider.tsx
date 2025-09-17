import { createContext, useState, type Dispatch, type SetStateAction, useLayoutEffect } from "react";
import { THEME_STORAGE } from "../constants";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = localStorage.getItem(THEME_STORAGE);

  const savedTheme: Theme = stored === "dark" ? "dark" : "light";

  const [theme, setTheme] = useState<Theme>(savedTheme);
  useLayoutEffect(() => {
    const detectTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        setTheme("dark");
        document.body.classList.add("darkLayout");
      } else {
        setTheme("light");
        document.body.classList.remove("darkLayout");
      }
    };

    detectTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", detectTheme);

    return () => {
      mediaQuery.removeEventListener("change", detectTheme);
    };
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
