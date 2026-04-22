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
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";




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

  function getControlClass(errorKey, baseClass = "input") {
    return [
      styles[baseClass],
      errors[errorKey] ? styles.errorInput : "",
    ]
      .filter(Boolean)
      .join(" ");
  }



  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function createInvoice(status) {
    const createdAt = formData.createdAt
      ? formatDate(formData.createdAt)
      : "";
    const dueDate = formData.createdAt
      ? calculateDueDate(
          formData.createdAt,
          formData.paymentTerms
        )
      : "";

    const newInvoice = {
      id: generateInvoiceId(),
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      description: formData.description,
      paymentTerms: formData.paymentTerms,
      status,
      createdAt,
      dueDate,
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
    const nextStatus =
      invoice.status === "draft"
        ? "pending"
        : invoice.status;
    const createdAt = formData.createdAt
      ? formatDate(formData.createdAt)
      : "";
    const dueDate = formData.createdAt
      ? calculateDueDate(
          formData.createdAt,
          formData.paymentTerms
        )
      : "";

    editInvoice({
      ...invoice,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      description: formData.description,
      paymentTerms: formData.paymentTerms,
      status: nextStatus,
      createdAt,
      dueDate,
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
        <input className={getControlClass("fromAddress")} type="text" name="fromAddress" value={formData.fromAddress} onChange={handleChange} required />
        {errors.fromAddress && (
          <p className={styles.error}>
            {errors.fromAddress}
          </p>
        )}
      </label>

      <div className={styles.grid3}>
        <label className={styles.label} htmlFor="fromCity">
          City
          <input className={getControlClass("fromCity")} type="text" name="fromCity" id="fromCity" value={formData.fromCity} onChange={handleChange} required />
          {errors.fromCity && (
            <p className={styles.error}>
              {errors.fromCity}
            </p>
          )}
        </label>

        <label className={styles.label} htmlFor="fromPostCode">
          Post Code
          <input className={getControlClass("fromPostCode")} type="text" name="fromPostCode" id="fromPostCode" value={formData.fromPostCode} onChange={handleChange} required />
          {errors.fromPostCode && (
            <p className={styles.error}>
              {errors.fromPostCode}
            </p>
          )}
        </label>

        <label className={styles.label} htmlFor="fromCountry">
          Country
          <input className={getControlClass("fromCountry")} type="text" name="fromCountry" id="fromCountry" value={formData.fromCountry} onChange={handleChange} required />
          {errors.fromCountry && (
            <p className={styles.error}>
              {errors.fromCountry}
            </p>
          )}
        </label>
      </div>

      <h4>Bill To</h4>

      <label className={styles.label} htmlFor="clientName">
        Client&apos;s Name
        <input className={getControlClass("clientName")} type="text" name="clientName" id="clientName" value={formData.clientName} onChange={handleChange} required />
        {errors.clientName && (
          <p className={styles.error}>
            {errors.clientName}
          </p>
        )}
      </label>

      <label className={styles.label} htmlFor="clientEmail">
        Client&apos;s Email
        <input className={getControlClass("clientEmail")} type="email" name="clientEmail" id="clientEmail" value={formData.clientEmail} onChange={handleChange} required />
        {errors.clientEmail && (
          <p className={styles.error}>
            {errors.clientEmail}
          </p>
        )}
      </label>

      <label className={styles.label} htmlFor="toAddress">
        Street Address
        <input className={getControlClass("toAddress")} type="text" name="toAddress" id="toAddress" value={formData.toAddress} onChange={handleChange} required />
        {errors.toAddress && (
          <p className={styles.error}>
            {errors.toAddress}
          </p>
        )}
      </label>

      <div className={styles.grid3}>
        <label className={styles.label} htmlFor="toCity">
          City
          <input className={getControlClass("toCity")} type="text" name="toCity" id="toCity" value={formData.toCity} onChange={handleChange} required />
          {errors.toCity && (
            <p className={styles.error}>
              {errors.toCity}
            </p>
          )}
        </label>

        <label className={styles.label} htmlFor="toPostCode">
          Post Code
          <input className={getControlClass("toPostCode")} type="text" name="toPostCode" id="toPostCode" value={formData.toPostCode} onChange={handleChange} required />
          {errors.toPostCode && (
            <p className={styles.error}>
              {errors.toPostCode}
            </p>
          )}
        </label>

        <label className={styles.label} htmlFor="toCountry">
          Country
          <input className={getControlClass("toCountry")} type="text" name="toCountry" id="toCountry" value={formData.toCountry} onChange={handleChange} required />
          {errors.toCountry && (
            <p className={styles.error}>
              {errors.toCountry}
            </p>
          )}
        </label>
      </div>

      <div className={styles.grid2}>
        <label className={styles.label} htmlFor="invoiceDate">
          Invoice Date
          <div className={styles.controlWrap}>
            <input className={getControlClass("invoiceDate")} value={formData.createdAt} onChange={handleChange} name="createdAt" id="invoiceDate" type="date" required />
            <FaCalendarAlt
              className={`${styles.controlIcon} ${styles.dateIcon}`}
              aria-hidden="true"
            />
          </div>
          {errors.invoiceDate && (
            <p className={styles.error}>
              {errors.invoiceDate}
            </p>
          )}

        </label>

        <label className={styles.label} htmlFor="paymentTerms">
          Payment Terms
          <div className={styles.controlWrap}>
            <select className={getControlClass("paymentTerms", "select")} name="paymentTerms" id="paymentTerms" value={formData.paymentTerms} onChange={handleChange} required>
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
            <FaChevronDown
              className={styles.controlIcon}
              aria-hidden="true"
            />
          </div>
          {errors.paymentTerms && (
            <p className={styles.error}>
              {errors.paymentTerms}
            </p>
          )}
        </label>
      </div>

      <label className={styles.label} htmlFor="description">
        Project Description
        <input className={getControlClass("description")} type="text" name="description" id="description" value={formData.description} onChange={handleChange} required />
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
