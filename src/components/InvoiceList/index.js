"use client";

import { useInvoices } from "@/context/InvoiceContext";
import InvoiceCard from "../InvoiceCard/index";
import EmptyState from "../EmptyState/index";
import styles from "./index.module.css";

export default function InvoiceList() {
  const { filteredInvoices, loaded, invoices } = useInvoices();

  if (!loaded) {
    return <p>Loading...</p>;
  }

  if (invoices.length === 0) {
    return <EmptyState />;
  }

 if (filteredInvoices.length === 0) {
    return (
      <p className={styles.noResults}>
        No invoices match the selected filter.
      </p>
    );
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