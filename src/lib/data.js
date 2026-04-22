export const mockInvoices = [
  {
    id: "RT3080",
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    description: 'Web Development Services',
    amount: 1500,
    status: 'paid',
    dueDate: '01 May 2024',
    createdAt: '2024-04-01',
  },

  {
    id: "XM9141",
    clientName: 'Jane Smith',
    clientEmail: 'jane@example.com',
    description: 'Design Consultation',
    amount: 800,
    status: 'pending',
    dueDate: '15 May 2024',
    createdAt: '21 Aug 2021',
    senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
    },
    clientAddress: {
    street: '84 Church Way',
    city: 'Bradford',
    postCode: 'BD1 9PB',
    country: 'United Kingdom',
    },
    items: [
      { name: 'Banner Design', quantity: 1, price: 156.0, total: 156.0 },
      { name: 'Email Design', quantity: 2, price: 200.0, total: 400.0 },
    ],
  },

  {
    id: "RG0314",
    clientName: 'Bob Johnson',
    clientEmail: 'bob@example.com',
    description: 'SEO Optimization',
    amount: 1200,
    status: 'draft',
    dueDate: '01 June 2024',
    createdAt: '2024-04-20',
  },
];