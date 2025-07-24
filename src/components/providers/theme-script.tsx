"use client";

import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      try {
        const theme = localStorage.getItem('portfolioTheme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;
        document.documentElement.classList.add(resolvedTheme);
      } catch (e) {
        document.documentElement.classList.add('dark');
      }
    `;
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}
