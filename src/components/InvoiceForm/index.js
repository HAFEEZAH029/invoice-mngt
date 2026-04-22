"use client";

import styles from "./index.module.css";
import { useState } from "react";
import { useInvoices } from "@/context/InvoiceContext";
import { useFormDrawer } from "@/context/FormContext";
import { generateInvoiceId } from "@/lib/helpers";
import InvoiceItems from "@/components/InvoiceItems/InvoiceItems";
import { validateInvoice } from "@/lib/validateinvoice";
import { formatDate } from "@/lib/formatDate";
import { calculateDueDate } from "@/lib/calculateduedate";
import { validateDraft } from "@/lib/validateDraft";
import { getInitialItems, getInitialFormData } from "@/lib/helpers";




export default function InvoiceForm({ mode, invoice }) {

  const { editInvoice, addInvoice } = useInvoices();
  const { closeDrawer } = useFormDrawer();
  const [formData, setFormData] =
    useState(() =>
      getInitialFormData(mode, invoice)
    );
  const [items, setItems] = useState(() =>
    getInitialItems(mode, invoice)
  );
  const [errors, setErrors] = useState({});



  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function createInvoice(status) {
    const newInvoice = {
      id: generateInvoiceId(),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      description: formData.description,
      paymentTerms: formData.paymentTerms,
      status,
      createdAt:formatDate(formData.createdAt),
      dueDate: calculateDueDate(formData.createdAt, formData.paymentTerms),
      amount: items.reduce(
        (sum, item) => sum + item.total, 0
      ),
      items: items,
      senderAddress: {
        street: formData.fromAddress,
        city: formData.fromCity,
        postCode: formData.fromPostCode,
        country: formData.fromCountry,
      },
      clientAddress: {
        street: formData.toAddress,
        city: formData.toCity,
        postCode: formData.toPostCode,
        country: formData.toCountry,
      },
    };

    addInvoice(newInvoice);
    closeDrawer();
  }


function handleDraftSave() {
  const drafterrors =
    validateDraft(formData);

  if (
    Object.keys(drafterrors).length > 0
  ) {
    setErrors(drafterrors);
    return;
  }

  createInvoice("draft");
}

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors =
    validateInvoice(
      formData,
      items
    );

  if (
    Object.keys(validationErrors)
      .length > 0
  ) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  if (mode === "edit") {
    editInvoice({
      ...invoice,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      description: formData.description,
      paymentTerms: formData.paymentTerms,
      createdAt: formatDate(formData.createdAt),
      dueDate: calculateDueDate(
        formData.createdAt,
        formData.paymentTerms
      ),
      senderAddress: {
        street: formData.fromAddress,
        city: formData.fromCity,
        postCode: formData.fromPostCode,
        country: formData.fromCountry,
      },
      clientAddress: {
        street: formData.toAddress,
        city: formData.toCity,
        postCode: formData.toPostCode,
        country: formData.toCountry,
      },
      items,
      amount:
        items.reduce(
          (sum, item) =>
            sum + item.total,
          0
        ),
    });

    closeDrawer();
    return;
  }

  createInvoice("pending");
}

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>
        {mode === "edit"
          ? `Edit #${invoice.id}`
          : "New Invoice"}
      </h2>

      <h4>Bill From</h4>

      <label className={styles.label}>
        Street Address
        <input className={styles.input} type="text" name="fromAddress" value={formData.fromAddress} onChange={handleChange} required />
        {errors.fromAddress && (
          <p className={styles.error}>
            {errors.fromAddress}
          </p>
        )}
      </label>

      <div className={styles.grid3}>
        <label className={styles.label}>
          City
          <input className={styles.input} type="text" name="fromCity" value={formData.fromCity} onChange={handleChange} required />
          {errors.fromCity && (
            <p className={styles.error}>
              {errors.fromCity}
            </p>
          )}
        </label>

        <label className={styles.label}>
          Post Code
          <input className={styles.input} type="text" name="fromPostCode" value={formData.fromPostCode} onChange={handleChange} required />
          {errors.fromPostCode && (
            <p className={styles.error}>
              {errors.fromPostCode}
            </p>
          )}
        </label>

        <label className={styles.label}>
          Country
          <input className={styles.input} type="text" name="fromCountry" value={formData.fromCountry} onChange={handleChange} required />
          {errors.fromCountry && (
            <p className={styles.error}>
              {errors.fromCountry}
            </p>
          )}
        </label>
      </div>

      <h4>Bill To</h4>

      <label className={styles.label}>
        Client&apos;s Name
        <input className={styles.input} type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
        {errors.clientName && (
          <p className={styles.error}>
            {errors.clientName}
          </p>
        )}
      </label>

      <label className={styles.label}>
        Client&apos;s Email
        <input className={styles.input} type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} required />
        {errors.clientEmail && (
          <p className={styles.error}>
            {errors.clientEmail}
          </p>
        )}
        {errors.clientEmail && (
          <p className={styles.error}>
            {errors.clientEmail}
          </p>
        )}
      </label>

      <label className={styles.label}>
        Street Address
        <input className={styles.input} type="text" name="toAddress" value={formData.toAddress} onChange={handleChange} required />
        {errors.toAddress && (
          <p className={styles.error}>
            {errors.toAddress}
          </p>
        )}
      </label>

      <div className={styles.grid3}>
        <label className={styles.label}>
          City
          <input className={styles.input} type="text" name="toCity" value={formData.toCity} onChange={handleChange} required />
          {errors.toCity && (
            <p className={styles.error}>
              {errors.toCity}
            </p>
          )}
        </label>

        <label className={styles.label}>
          Post Code
          <input className={styles.input} type="text" name="toPostCode" value={formData.toPostCode} onChange={handleChange} required />
          {errors.toPostCode && (
            <p className={styles.error}>
              {errors.toPostCode}
            </p>
          )}
        </label>

        <label className={styles.label}>
          Country
          <input className={styles.input} type="text" name="toCountry" value={formData.toCountry} onChange={handleChange} required />
          {errors.toCountry && (
            <p className={styles.error}>
              {errors.toCountry}
            </p>
          )}
        </label>
      </div>

      <div className={styles.grid2}>
        <label className={styles.label}>
          Invoice Date
          <input className={styles.input} value={formData.createdAt} onChange={handleChange} name="createdAt" type="date" required />
          {errors.invoiceDate && (
            <p className={styles.error}>
              {errors.invoiceDate}
            </p>
          )}

        </label>

        <label className={styles.label}>
          Payment Terms
          <select className={styles.select} name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} required>
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
          {errors.paymentTerms && (
            <p className={styles.error}>
              {errors.paymentTerms}
            </p>
          )}
        </label>
      </div>

      <label className={styles.label}>
        Project Description
        <input className={styles.input} type="text" name="description" value={formData.description} onChange={handleChange} required />
        {errors.description && (
          <p className={styles.error}>
            {errors.description}
          </p>
        )}
      </label>

      <InvoiceItems items={items} setItems={setItems} errors={errors} />

      {errors.draft && (
        <p className={styles.error}>
          {errors.draft}
        </p>
      )}

      <div className={styles.footer}>

        {mode === "create" && (
          <button type="button" className={styles.discard} onClick={closeDrawer}>
            Discard
          </button>
        )}

        <div>
          {mode === "create" && (
            <button type="button" className={styles.draft} onClick={handleDraftSave}>
              Save as Draft
            </button>
          )}

          {mode === "edit" && (
            <button type="button" className={styles.discard} onClick={closeDrawer}>
              Cancel
            </button>
          )}

          <button type="submit" className={styles.save}>
            {mode === "edit"
            ? "Save Changes"
            : "Save & Send"}
          </button>
        </div>
      </div>
    </form>
  );
}
