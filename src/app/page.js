import Header from "@/components/Header/index";
import InvoiceList from "@/components/InvoiceList/index";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.app}>

      <section className={styles.content}>
        <Header />
        <InvoiceList />
      </section>
    </main>
  );
}
