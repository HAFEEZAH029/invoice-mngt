import { formatDate } from "./formatDate";

export function calculateDueDate(
  invoiceDate,
  paymentTerms
) {
  if (!invoiceDate) return "";

  const date = new Date(invoiceDate);

  date.setDate(
    date.getDate() + Number(paymentTerms)
  );

  return formatDate(date);
}