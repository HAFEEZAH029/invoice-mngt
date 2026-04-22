'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loaded, setLoaded] = useState(false);


 // Load on mount
  useEffect(() => {
    const stored =
      localStorage.getItem(
        "invoices"
      );

    if (stored) {
      setInvoices(
        JSON.parse(stored)
      );
    } else {
      setInvoices([]);
    }

    setLoaded(true);
  }, []);

  // Save on change
  useEffect(() => {
    if (!loaded) return;

    if (loaded) {
      localStorage.setItem(
        "invoices",
        JSON.stringify(invoices)
      );
    }
  }, [invoices, loaded]);


  function addInvoice(newInvoice) {
    setInvoices((prev) => [
     newInvoice,
      ...prev,
    ]);
  }

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, ...updatedInvoice } : inv));
  };

  function deleteInvoice(id) {
  setInvoices((prev) =>
    prev.filter(
      (invoice) =>
        invoice.id !== id
    )
  );
}

  const filteredInvoices =
    filter === "all"
      ? invoices
      : invoices.filter(
          (invoice) => invoice.status === filter
  );

  function editInvoice(updatedInvoice) {
    setInvoices((prev) =>
      prev.map((item) =>
        item.id === updatedInvoice.id
          ? updatedInvoice
          : item
      )
    );
  }

  function markAsPaid(id) {
  setInvoices((prev) =>
    prev.map((invoice) =>
      invoice.id === id
        ? {
            ...invoice,
            status: "paid",
          }
        : invoice
    )
  );
}

  return (
    <InvoiceContext.Provider value={{
                             invoices,
                             loaded,
                             setInvoices,
                             addInvoice,
                             updateInvoice,
                             deleteInvoice,
                             filter,
                             setFilter,
                             filteredInvoices,
                             editInvoice,
                             markAsPaid }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  return useContext(InvoiceContext);
}
