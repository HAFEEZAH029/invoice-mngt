"use client";

import styles from "./invoiceitem.module.css";
import { FaTrash } from "react-icons/fa";

export default function InvoiceItems({ items, setItems, errors }) {


  function updateItem( index, field, value ) {
    const updated = [...items];

    updated[index][field] =
      field === "name"
        ? value
        : Number(value);

    updated[index].total =
      updated[index].quantity *
      updated[index].price;

    setItems(updated);
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  }

  function removeItem(index) {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  return (
    <section className={styles.wrap}>
      <h3>Item List</h3>

      {items.map((item, index) => (
        <div
          key={index}
          className={styles.row}
        >
          <label className={styles.name} htmlFor={`item-name-${index}`}>
            Item Name
            <input
              className={styles.input}
              id={`item-name-${index}`}
              type="text"
              value={item.name}
              onChange={(e) =>
                updateItem(
                  index,
                  "name",
                  e.target.value
                )
              }
            />
          </label>

          <label className={styles.label} htmlFor={`item-quantity-${index}`}>
            Qty.
            <input
              className={styles.input}
              id={`item-quantity-${index}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateItem(
                  index,
                  "quantity",
                  e.target.value
                )
              }
            />
          </label>

          <label className={styles.label} htmlFor={`item-price-${index}`}>
            Price
            <input
              className={styles.input}
              id={`item-price-${index}`}
              type="number"
              min="0"
              value={item.price}
              onChange={(e) =>
                updateItem(
                  index,
                  "price",
                  e.target.value
                )
              }
            />
          </label>

          <div className={styles.total}>
            <span>Total</span>
            <strong>
              £{" "}
              {item.total.toFixed(2)}
            </strong>
          </div>

          <button
            type="button"
            className={styles.delete}
            onClick={() =>
              removeItem(index)
            }
            aria-label="Remove item"
          >
            <FaTrash />
          </button>
        </div>
      ))}

      <button
        type="button"
        className={styles.addBtn}
        onClick={addItem}
      >
        + Add New Item
      </button>

      {errors.items && (
        <p className={styles.error}>
          {errors.items}
        </p>
      )}
    </section>
  );
}