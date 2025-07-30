// utils/formatCurrency.ts
export const formatCurrency = (
  amount: number,
  currency: string = "IDR",
  locale: string = "id-ID"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
