"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

export function ThemeSwitcher() {
  const theme = useSyncExternalStore(
    (notify) => {
      window.addEventListener("themechange", notify);
      return () => window.removeEventListener("themechange", notify);
    },
    () => document.documentElement.classList.contains("dark") ? "dark" : "light",
    () => "light",
  ) as Theme;

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring rounded-full p-2 text-[var(--muted)] transition-all hover:opacity-70"
      aria-label={theme === "dark" ? "切换为浅色模式" : "切换为深色模式"}
    >
      {theme === "dark" ? (
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          />
        </svg>
      ) : (
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 1 0 20.354 15.354Z"
          />
        </svg>
      )}
    </button>
  );
}
