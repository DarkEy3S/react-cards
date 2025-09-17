import { createContext, useState, type Dispatch, type SetStateAction } from "react";
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

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
