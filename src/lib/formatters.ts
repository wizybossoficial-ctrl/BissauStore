// Formatting currency in XOF (FCFA) - West African CFA Franc
export function formatXOF(amount: number): string {
  return new Intl.NumberFormat('pt-GW', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA';
}

// Format Guinea-Bissau Phone Number (+245)
export function formatBissauPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('245')) {
    const local = cleaned.slice(3);
    return `+245 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  if (cleaned.length === 9) {
    return `+245 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
}

// Generate unique order ID (e.g. GB-84920)
export function generateOrderId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `GB-${randomNum}`;
}

// Format date for Guinea-Bissau locale
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('pt-GW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
