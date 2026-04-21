"use client";

import { useInvoices } from "@/context/InvoiceContext";
import InvoiceCard from "../InvoiceCard/index";
import EmptyState from "../EmptyState/index";

export default function InvoiceList() {
  const { filteredInvoices } = useInvoices();

  if (filteredInvoices.length === 0) {
    return <EmptyState />;
  }

  return (
    <section>
      {filteredInvoices.map((invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
        />
      ))}
    </section>
  );
}