'use client';

import { createContext, useContext, useState } from 'react';
import { mockInvoices } from '@/lib/data';

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(mockInvoices);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, { ...invoice, id: Date.now() }]);
  };

  const updateInvoice = (id, updatedInvoice) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, ...updatedInvoice } : inv));
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  return useContext(InvoiceContext);
}