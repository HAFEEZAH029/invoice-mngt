"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { InvoiceProvider } from "@/context/InvoiceContext";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        {children}
      </InvoiceProvider>
    </ThemeProvider>
  );
}