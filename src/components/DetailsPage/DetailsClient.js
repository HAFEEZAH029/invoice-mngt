"use client";

import { useInvoices } from "@/context/InvoiceContext";
import DetailsPage from "./DetailsPage";

export default function DetailsClient({
  id,
}) {
  const { invoices, loaded } = useInvoices();

  if (!loaded) return null;

  const invoice = invoices.find(
    (item) => item.id === id
  );

  if (!invoice) return <p>Not found</p>;

  return (
    <DetailsPage invoice={invoice} />
  );
}