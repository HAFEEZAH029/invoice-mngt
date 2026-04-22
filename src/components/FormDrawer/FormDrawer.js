"use client";

import { useEffect } from "react";
import styles from "./formdrawer.module.css";



export default function FormDrawer({
  open,
  onClose,
  children,
}) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener(
        "keydown",
        handleEsc
      );
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEsc
      );
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.overlay}
        onClick={onClose}
        aria-label="Close form"
      />

      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </aside>
    </div>
  );
}
