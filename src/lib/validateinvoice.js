export function validateInvoice( formData, items ) {
  const errors = {};

  if (!formData.clientName.trim() || formData.clientName.trim().length < 3) {
    errors.clientName =
      "Invalid client name";
  }

  if (!formData.clientEmail.trim()) {
    errors.clientEmail =
      "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.clientEmail
    )
  ) {
    errors.clientEmail =
      "Invalid email format";
  }

  if (!formData.description.trim() || formData.description.trim().length < 5) {
    errors.description =
      "please provide a valid description";
  }

  if (!items.length || items.length === 0) {
    errors.items =
      "At least one item required";
  }

  if(!formData.createdAt.trim()) {
    errors.invoiceDate =
      "Invoice date is required";
  }

  if(!formData.paymentTerms.trim()) {
    errors.paymentTerms =
      "Payment terms are required";
  }

  if (!formData.fromAddress.trim() ||
      formData.fromAddress.trim().length < 8 ) {
        errors.fromAddress =
           "please provide a valid address";
  }

    if (!formData.toAddress.trim() ||
        formData.toAddress.trim().length < 8 ) {
          errors.toAddress =
              "please provide a valid address";
    }

  if (!formData.fromCountry.trim() ||
      formData.fromCountry.trim().length < 3) {
        errors.fromCountry =
            "please provide a valid country";
  }

    if (!formData.toCountry.trim() ||
        formData.toCountry.trim().length < 3) {
            errors.toCountry =
              "please provide a valid country";
    }

  if (!formData.fromCity.trim() ||
      formData.fromCity.trim().length < 3 ) {
        errors.fromCity =
            "please provide a valid city";
    }

    if (!formData.toCity.trim() ||
        formData.toCity.trim().length < 3 ) {
          errors.toCity =
              "please provide a valid city";
    }

    if (!formData.fromPostCode.trim() ||
        formData.fromPostCode.trim().length < 3 ) {
            errors.fromPostCode =
              "please provide a valid post code";
    }

    if (!formData.toPostCode.trim() ||
        formData.toPostCode.trim().length < 3 ) {
            errors.toPostCode =
              "please provide a valid post code";
    }

  const invalidItem = items.some(
    (item) =>
      !item.name.trim() ||
      item.name.trim().length < 3 ||
      item.quantity <= 0 ||
      item.price <= 0
  );

  if (invalidItem) {
    errors.items =
      "All items provided must be valid";
  }

  return errors;
}
