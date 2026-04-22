'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Load theme on mount
   useEffect(() => {
    const saved =
      localStorage.getItem(
        "theme"
      );

    if (saved) {
      setTheme(saved);
    }

    setMounted(true);
  }, []);


  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}