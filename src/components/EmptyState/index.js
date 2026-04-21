import styles from "./index.module.css";

export default function EmptyState() {
  return (
    <section className={styles.empty}>
      <div className={styles.illustration}></div>

      <h2>There is nothing here</h2>

      <p>
        Create an invoice by clicking the <strong>New Invoice</strong> button
        and get started.
      </p>
    </section>
  );
}