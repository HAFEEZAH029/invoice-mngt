# Invoice Management Application

A responsive invoice management application built with **Next.js**, **React**, **JavaScript**, and **CSS Modules**

This project was developed from the provided Figma design and implements complete invoice lifecycle management with persistent local storage, responsive layouts, dark mode support, accessibility considerations, and polished user interactions.


# Features Implemented

## Core Functionality

* Create invoices
* Read/View invoice list
* View invoice details
* Edit invoices
* Delete invoices
* Save invoices as Draft
* Mark Pending invoices as Paid
* Filter invoices by status
* Light / Dark mode toggle
* Persistent data using LocalStorage
* Fully responsive UI

---

## Invoice Status Workflow

The application supports three statuses:

### Draft

* Invoices can be saved with incomplete details
* Draft invoices remain editable
* Completing and saving a draft changes it to Pending

### Pending

* Active unpaid invoices
* Can be marked as Paid

### Paid

* Completed invoices
* Cannot be marked as paid again
* Editing is restricted to preserve integrity

---

# Setup Instructions

## 1. Clone the Repository

```bash id="pshyy2"
git clone https://github.com/HAFEEZAH029/invoice-mngt.git
```

## 2. Enter Project Folder

```bash id="bph3g5"
cd invoice-app
```

## 3. Install Dependencies

```bash id="f7gh7e"
npm install
```

## 4. Run Development Server

```bash id="fhh0wj"
npm run dev
```

## 5. Open in Browser

```txt id="59pqwl"
http://localhost:3000
```

---

# Build for Production

```bash id="4mk3a9"
npm run build
npm start
```

---

# Architecture Explanation

The application uses a component-driven architecture with separation of concerns for maintainability and scalability.

## Tech Stack

* Next.js App Router
* React
* JavaScript
* CSS Modules
* React Context API
* LocalStorage

---

## Project Structure

```txt id="b6fwsq"
src/
│
├── app/
│   ├── page.js
│   ├── invoice/[id]/page.js
│
├── components/
│   ├── Sidebar/
│   ├── Header/
│   ├── InvoiceList/
│   ├── InvoiceCard/
│   ├── InvoiceForm/
│   ├── InvoiceItems/
│   ├── StatusBadge/
│   ├── EmptyState/
│   └── ConfirmModal/
|   ├── DetailsPage/
|   ├── FilterDropdown/
|   ├── FormDrawer/
│
├── context/
│   ├── InvoiceContext.js
│   ├── ThemeContext.js
│   └── FormContext.js
│
├── lib/
│   ├── validateInvoice.js
│   ├── formatDate.js
│   └── helpers.js
|   ├── calculateduedate.js
│

```

---

## State Management Strategy

### InvoiceContext

Responsible for:

* storing invoices
* create/update/delete actions
* mark as paid
* filtering invoices
* local storage persistence

### ThemeContext

Responsible for:

* light mode / dark mode state
* theme persistence across reload


### FormContext

Responsible for:

* Open form drawer state
* Close form drawer state
* Form mode setting
* populating form fields on edit

---

## Why Context API?

Context was chosen because:

* state scope is app-wide
* avoids prop drilling
* lightweight compared to Redux
* suitable for challenge scale

---

# Trade-offs & Engineering Decisions

## 1. LocalStorage Instead of Database

### Decision:

Used LocalStorage for persistence.

### Why:

The task explicitly allows:

* LocalStorage
* IndexedDB
* Backend solution

### Trade-off:

Pros:

* Fast implementation
* Zero backend complexity
* Reliable for single-user challenge scope

Cons:

* No multi-device sync
* No shared database
* Data cleared if browser storage is cleared

---

## 2. Context API Instead of Backend Fetching

### Why:

Challenge scope prioritized frontend functionality, responsiveness, and feature completion.

### Trade-off:

Simpler architecture now, but can be upgraded later to Prisma + PostgreSQL.

---

## 3. Paid Invoices Locked From Editing

### Why:

Preserves invoice/payment integrity and prevents accidental modification of completed records.

---

## 4. Filter State Not Persisted

### Why:

Filter is temporary UI state and not critical business data.

---

# Accessibility Notes

Accessibility was considered throughout implementation.

## Semantic HTML

Used:

* `main`
* `section`
* `header`
* `nav`
* `button`
* `form`
* `label`

---

## Forms

* Inputs connected with labels using `htmlFor`
* Validation messages displayed clearly
* Keyboard accessible controls

---

## Buttons

All actions use real `<button>` elements.

Examples:

* New Invoice
* Edit
* Delete
* Mark as Paid
* Save Draft

---

## Modal Accessibility

Delete confirmation modal supports:

* keyboard navigation
* ESC key close
* focusable buttons
* clear action labels

---

## Focus States

Interactive elements include visible focus states for keyboard users.

---

## Contrast

Light and dark themes were built with readable contrast ratios.

---

# Improvements Beyond Requirements

The following enhancements were added beyond the core brief:

## Smart Empty States

Two separate empty states:

### No invoices exist

Shows onboarding illustration.

### Filter returns zero results

Shows helpful text instead of generic empty screen.

---

## Business Logic Status Flow

Implemented realistic invoice lifecycle:

```txt id="wtg2b9"
Draft → Pending → Paid
```

---

## Persistent Theme Preference

Theme selection survives page refresh.

---

## Responsive Interaction Enhancements

* Mobile button text adapts
* Improved spacing across devices
* Better touch target sizes

---

## Locked Paid Invoices

Paid invoices cannot be incorrectly reprocessed.

---

# Validation Rules

Implemented validations include:

* Client name required
* Valid email format
* At least one invoice item
* Quantity > 0
* Price > 0

Submissions are blocked when invalid.

---

# Responsive Support

Designed for:

* Mobile: 320px+
* Tablet: 768px+
* Desktop: 1024px+

No horizontal scrolling.

---

# Future Improvements

Potential future upgrades:

* Prisma + PostgreSQL backend
* User authentication
* Multi-user dashboards
* PDF invoice export
* Search & sorting
* Analytics reporting
* Server Actions
* useOptimistic updates
* Email invoice sending

---

# Performance Notes

* Fast page interactions
* Lightweight architecture
* Minimal dependencies
* Client-side persistence

---

# Challenges Solved During Development

* Status transition logic
* LocalStorage hydration handling
* Filter empty-state UX
* Reusable invoice form structure
* Responsive multi-layout design

