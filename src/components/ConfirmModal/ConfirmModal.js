"use client";

import { useEffect } from "react";
import styles from "./index.module.css";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  invoiceId,
}) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener(
        "keydown",
        handleEsc
      );
      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEsc
      );
      document.body.style.overflow =
        "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.overlay}
        onClick={onClose}
        aria-label="Close modal"
      />

      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <h2 id="delete-title">
          Confirm Deletion
        </h2>

        <p>
          Are you sure you want to
          delete invoice #
          {invoiceId}? This action
          cannot be undone.
        </p>

        <div className={styles.actions}>
          <button
            onClick={onClose}
            className={styles.cancel}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={styles.delete}
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}