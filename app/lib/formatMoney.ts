export function formatMoney(amount: number) {
  return new Intl.NumberFormat().format(amount)
}
