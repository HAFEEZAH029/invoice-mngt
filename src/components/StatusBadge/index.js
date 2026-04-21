import styles from "./index.module.css";

export default function StatusBadge({ status }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.dot}></span>
      {status}
    </span>
  );
}