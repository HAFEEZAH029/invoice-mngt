"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [invoice, setInvoice] = useState(null);

  function openCreate() {
    setMode("create");
    setInvoice(null);
    setOpen(true);
  }

  function openEdit(data) {
    setMode("edit");
    setInvoice(data);
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <FormContext.Provider
      value={{
        open,
        mode,
        invoice,
        openCreate,
        openEdit,
        closeDrawer,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormDrawer() {
  return useContext(FormContext);
}