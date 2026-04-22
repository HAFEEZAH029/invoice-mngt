"use client";

import FormDrawer from "@/components/FormDrawer/FormDrawer";
import InvoiceForm from "@/components/InvoiceForm/index";
import { useFormDrawer } from "@/context/FormContext";

export default function DrawerMount() {
  const {
    open,
    closeDrawer,
    mode,
    invoice,
  } = useFormDrawer();

  return (
    <FormDrawer
      open={open}
      onClose={closeDrawer}
    >
      <InvoiceForm
        key={
          mode === "edit"
            ? `edit-${invoice?.id ?? "unknown"}`
            : "create"
        }
        mode={mode}
        invoice={invoice}
      />
    </FormDrawer>
  );
}
