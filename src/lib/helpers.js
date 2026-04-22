// Utility functions for the app

const defaultItem = {
  name: "",
  quantity: 1,
  price: 0,
  total: 0,
};

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getInitialItems(mode, invoice) {
  if (
    mode === "edit" &&
    invoice?.items?.length
  ) {
    return invoice.items;
  }

  return [{ ...defaultItem }];
}

export function getPaymentTermsValue(invoice) {
  if (
    invoice?.paymentTerms &&
    ["1", "7", "14", "30"].includes(
      String(invoice.paymentTerms)
    )
  ) {
    return String(invoice.paymentTerms);
  }

  const createdAt = parseInvoiceDate(
    invoice?.createdAt
  );
  const dueDate = parseInvoiceDate(invoice?.dueDate);

  if (!createdAt || !dueDate) return "1";

  const days = Math.round(
    (dueDate.getTime() - createdAt.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return ["1", "7", "14", "30"].includes(
    String(days)
  )
    ? String(days)
    : "1";
}

export function getInitialFormData(mode, invoice) {
  if (mode !== "edit" || !invoice) {
    return {
      fromAddress: "",
      fromCity: "",
      fromPostCode: "",
      fromCountry: "",
      toAddress: "",
      toCity: "",
      toPostCode: "",
      toCountry: "",
      clientName: "",
      clientEmail: "",
      paymentTerms: "1",
      createdAt: "",
      description: "",
    };
  }

  return {
    fromAddress:
      invoice.senderAddress?.street || "",
    fromCity:
      invoice.senderAddress?.city || "",
    fromPostCode:
      invoice.senderAddress?.postCode || "",
    fromCountry:
      invoice.senderAddress?.country || "",
    toAddress:
      invoice.clientAddress?.street || "",
    toCity:
      invoice.clientAddress?.city || "",
    toPostCode:
      invoice.clientAddress?.postCode || "",
    toCountry:
      invoice.clientAddress?.country || "",
    createdAt: toDateInputValue(
      invoice.createdAt
    ),
    paymentTerms:
      getPaymentTermsValue(invoice),
    clientName:
      invoice.clientName || "",
    clientEmail:
      invoice.clientEmail || "",
    description:
      invoice.description || "",
  };
}

export function parseInvoiceDate(dateValue) {
  if (!dateValue) return null;

  const normalizedDate =
    typeof dateValue === "string"
      ? dateValue.replace(/(\d+)(st|nd|rd|th)/g, "$1")
      : dateValue;

  const parsedDate = new Date(normalizedDate);

  return Number.isNaN(parsedDate.getTime())
    ? null
    : parsedDate;
}

export function toDateInputValue(dateValue) {
  const parsedDate = parseInvoiceDate(dateValue);

  if (!parsedDate) return "";

  const year = parsedDate.getFullYear();
  const month = String(
    parsedDate.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    parsedDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getStatusColor(status) {
  switch (status) {
    case 'paid':
      return 'var(--success)';
    case 'pending':
      return 'var(--warning)';
    case 'draft':
      return 'var(--text-secondary)';
    default:
      return 'var(--text-primary)';
  }
}

export function generateInvoiceId() {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const first =
    letters[
      Math.floor(Math.random() * 26)
    ];

  const second =
    letters[
      Math.floor(Math.random() * 26)
    ];

  const number = Math.floor(
    1000 + Math.random() * 9000
  );

  return `${first}${second}${number}`;
}