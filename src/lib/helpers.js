// Utility functions for the app

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getStatusColor(status) {
  switch (status) {
    case 'paid':
      return 'var(--success)';
    case 'pending':
      return 'var(--warning)';
    case 'draft':
      return 'var(--text-secondary)';
    default:
      return 'var(--text-primary)';
  }
}