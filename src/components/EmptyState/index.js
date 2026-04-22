import styles from "./index.module.css";
import Image from "next/image";
import emptyStateImg from "../../../public/empty-state.png";


export default function EmptyState() {
  return (
    <section className={styles.empty}>
      <div className={styles.illustration}>
        <Image
          src={emptyStateImg}
          alt="Empty state illustration"
          width={200}
          height={200}
        />
      </div>

      <h2>There is nothing here</h2>

      <p>
        Create an invoice by clicking the <strong>New Invoice</strong> button
        and get started.
      </p>
    </section>
  );
}
