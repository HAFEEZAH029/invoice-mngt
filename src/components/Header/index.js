"use client";

import styles from "./index.module.css";
import { FaPlus} from "react-icons/fa";
import FilterDropdown from "../FilterDropdown/index";
import { useInvoices } from "@/context/InvoiceContext";

export default function Header() {
  const { filteredInvoices } = useInvoices();
  const total = filteredInvoices.length;

  return (
    <header className={styles.header}>
      <div>
        <h1>Invoices</h1>
        <p>
          <span className={styles.desktop}>
            {total === 0
              ? "No invoices"
              : `There are ${total} total invoices`}
          </span>

          <span className={styles.mobile}>
            {total === 0
              ? "No invoices"
              : `${total} invoices`}
          </span>
        </p>
      </div>

      <div className={styles.actions}>
        <FilterDropdown />

        <button className={styles.newBtn}>
          <span className={styles.icon}> <FaPlus /> </span>
          <span className={styles.desktext}>New Invoice</span>
          <span className={styles.mobiletext}>New</span>
        </button>
      </div>
    </header>
  );
}