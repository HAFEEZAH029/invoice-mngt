"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useInvoices } from "@/context/InvoiceContext";
import styles from "./index.module.css";

const options = ["all", "draft", "pending", "paid"];

export default function FilterDropdown() {
  const { filter, setFilter } = useInvoices();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", close);
    return () =>
      document.removeEventListener("click", close);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.desktop}>
          Filter by status
        </span>

        <span className={styles.mobile}>
          Filter
        </span>

        <FaChevronDown
          className={open ? styles.rotate : styles.arrowdown}
        />
      </button>

      {open && (
        <div className={styles.menu}>
          {options.map((item) => (
            <button
              key={item}
              className={styles.option}
              onClick={() => {
                setFilter(item);
                setOpen(false);
              }}
            >
              <input
                type="checkbox"
                readOnly
                checked={filter === item}
              />
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}