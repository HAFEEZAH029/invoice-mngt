"use client";

import { useFormDrawer } from "@/context/FormContext";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge/index";
import styles from "./detail.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { useInvoices } from "@/context/InvoiceContext";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmModal/ConfirmModal";
import { useRouter } from "next/navigation";



export default function DetailsPage ({invoice}) {
    const { openEdit } = useFormDrawer();
    const { markAsPaid, deleteInvoice } = useInvoices();
    const [openDelete, setOpenDelete] = useState(false);
    const router = useRouter();


  function formatCurrency(amount) {
    return `£ ${amount.toFixed(2)}`;
  }

return (
    <div className={styles.shell}>
    <main className={styles.page}>
        <Link href="/" className={styles.back}>
           <span><FaChevronLeft /></span> Go Back
        </Link>

        <section className={styles.actionsBar}>
            <div className={styles.actionsBar__status}>
               <span className={styles.actionsBar__statusLabel}>Status</span>
               <StatusBadge status={invoice.status} />
            </div>
                     {/* Desktop actions */}
            <div className={styles.actionsBar__buttons}>
                <button 
                className={styles.btn__edit} 
                onClick={() => openEdit(invoice)}
                disabled={invoice.status === "paid"}
                >
                    Edit
                </button>
                <button className={styles.btn__delete} onClick={() => setOpenDelete(true)}>
                    Delete
                </button>
                <button
                 className={styles.btn__markPaid}
                 onClick={() => markAsPaid(invoice.id)}
                 disabled={invoice.status === "paid" || invoice.status === "draft"}
                >
                    {invoice.status === "paid"
                        ? "Paid"
                        : "Mark as Paid"}
                </button>
            </div>
        </section>

        <section className={styles.card}>
            <div className={styles.card__header}>
                <div className={styles.card__headerLeft}>
                    <p className={styles.card__id}>
                       <span className={styles.card__idHash}>#</span>{invoice.id}
                    </p>
                     <p className={styles.card__description}>{invoice.description}</p>
                </div>
                <address className={styles.card__senderAddress}>
                    <span>{invoice.senderAddress.street}</span>
                    <span>{invoice.senderAddress.city}</span>
                    <span>{invoice.senderAddress.postCode}</span>
                    <span>{invoice.senderAddress.country}</span>
                </address>
            </div>

            <section className={styles.card__meta}>

                            {/* Dates column */}
                <div className={styles.card__metaGroup}>
                    <div className={styles.card__metaItem}>
                        <p className={styles.card__metaLabel}>Invoice Date</p>
                        <p className={styles.card__metaValue}>{invoice.createdAt}</p>
                    </div>
                    <div className={styles.card__metaItem}>
                        <p className={styles.card__metaLabel}>Payment Due</p>
                        <p className={styles.card__metaValue}>{invoice.dueDate}</p>
                    </div>
                </div>

                             {/* Bill To column */}
                <div className={styles.card__metaGroup}>
                    <div className={styles.card__metaItem}>
                       <p className={styles.card__metaLabel}>Bill To</p>
                       <p className={styles.card__metaValue}>{invoice.clientName}</p>
                       <address className={styles.card__clientAddress}>
                            <span>{invoice.clientAddress.street}</span>
                            <span>{invoice.clientAddress.city}</span>
                            <span>{invoice.clientAddress.postCode}</span>
                            <span>{invoice.clientAddress.country}</span>
                        </address>
                    </div>
                </div>

                            {/* Sent To column */}
                <div className={styles.card__metaGroup}>
                    <div className={styles.card__metaItem}>
                        <p className={styles.card__metaLabel}>Sent to</p>
                        <p className={styles.card__metaValue}>{invoice.clientEmail}</p>
                    </div>
                </div>

            </section>

            <section className={styles.card__items}>
                    {/* Desktop column */}
                <div className={`${styles.card__itemsRow} ${styles.card__itemsRow__header}`}>
                    <span>Item Name</span>
                    <span className={styles.card__itemsRow__qty}>QTY.</span>
                    <span className={styles.card__itemsRow__price}>Price</span>
                    <span className={styles.card__itemsRow__total}>Total</span>
                </div>

                {invoice.items.map((item) => (
                <div key={item.name} className={styles.card__itemsRow}>
                       {/* Desktop row */}
                    <span className={styles.card__itemName}>{item.name}</span>
                    <span className={styles.card__itemsRow__qty}>
                        <span className={styles.card__itemsRow__mobileLabel}>
                            {item.quantity} x {formatCurrency(item.price)}
                        </span>
                        <span className={styles.card__itemsRow__desktopOnly}>{item.quantity}</span>
                    </span>
                    <span className={`${styles.card__itemsRow__price} ${styles.card__itemsRow__desktopOnly}`}>
                        {formatCurrency(item.price)}
                    </span>
                    <span className={styles.card__itemsRow__total}>{formatCurrency(item.total)}</span>
                </div>
                ))}

                           {/* Grand total */}
                <div className={styles.card__total}>
                    <span className={styles.card__totalLabel}>Amount Due</span>
                    <span className={styles.card__totalAmount}>{formatCurrency(invoice.amount)}</span>
                </div>
            </section>
        </section>

                {/* Mobile bottom actions */}
        <div className={styles.mobileActions}>
            <button className={styles.btn__edit} onClick={() => openEdit(invoice)}>
                Edit
            </button>
            <button className={styles.btn__delete}>Delete</button>
            <button className={styles.btn__markPaid}>Mark as Paid</button>
        </div>

    </main>
    <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
            deleteInvoice(invoice.id);
            setOpenDelete(false);
            router.push("/");
        }}
        invoiceId={invoice.id}
     />
    </div>
)}
