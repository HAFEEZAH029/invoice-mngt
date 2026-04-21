import styles from "./index.module.css";
import StatusBadge from "../StatusBadge/index";
import { FaChevronRight } from "react-icons/fa";

export default function InvoiceCard({ invoice }) {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <h3>
          <span>#</span>
          {invoice.id}
        </h3>

        <p className={styles.client}>{invoice.clientName}</p>
      </div>

      <p className={styles.dueextra}>Due {invoice.dueDate}</p>

      <p className={styles.clientextra}> {invoice.clientName}</p>

      <div className={styles.bottomRow}>
        <div className={styles.left}>
          <p className={styles.due}>
            Due {invoice.dueDate}
          </p>

          <h2 className={styles.total}>
            £ {invoice.amount.toFixed(2)}
          </h2>
        </div>

        <div className={styles.right}>
          <StatusBadge status={invoice.status} />
          <FaChevronRight className={styles.arrow} />
        </div>
      </div>
    </article>
  );
}