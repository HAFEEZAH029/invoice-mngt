export function validateDraft(
  formData
) {
  const errors = {};

  const hasAnyValue =
    formData.clientName.trim() ||
    formData.clientEmail.trim() ||
    formData.description.trim();

  if (!hasAnyValue) {
    errors.draft =
      "Enter at least one client detail before saving draft.";
  }

  if (
    formData.clientEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.clientEmail
    )
  ) {
    errors.clientEmail =
      "Invalid email format";
  }

  return errors;
}