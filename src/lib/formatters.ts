export function formatXOF(amount: number): string {
  return new Intl.NumberFormat('pt-GW', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA';
}
