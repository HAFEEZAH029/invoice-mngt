"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { InvoiceProvider } from "@/context/InvoiceContext";
import { FormProvider } from "@/context/FormContext";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <FormProvider>
          {children}
        </FormProvider>
      </InvoiceProvider>
    </ThemeProvider>
  );
}