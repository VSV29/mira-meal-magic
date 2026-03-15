export type CurrencyInfo = { symbol: string; code: string; position: 'before' | 'after' };

export const countryCurrency: Record<string, CurrencyInfo> = {
  // South Asia
  "India": { symbol: "₹", code: "INR", position: "before" },
  "Pakistan": { symbol: "₨", code: "PKR", position: "before" },
  "Sri Lanka": { symbol: "රු", code: "LKR", position: "before" },
  "Bangladesh": { symbol: "৳", code: "BDT", position: "before" },
  "Nepal": { symbol: "रु", code: "NPR", position: "before" },
  // East & SE Asia
  "China": { symbol: "¥", code: "CNY", position: "before" },
  "Japan": { symbol: "¥", code: "JPY", position: "before" },
  "South Korea": { symbol: "₩", code: "KRW", position: "before" },
  "Thailand": { symbol: "฿", code: "THB", position: "before" },
  "Singapore": { symbol: "S$", code: "SGD", position: "before" },
  "Malaysia": { symbol: "RM", code: "MYR", position: "before" },
  "Indonesia": { symbol: "Rp", code: "IDR", position: "before" },
  "Philippines": { symbol: "₱", code: "PHP", position: "before" },
  "Vietnam": { symbol: "₫", code: "VND", position: "after" },
  // Middle East
  "UAE": { symbol: "AED", code: "AED", position: "before" },
  "Saudi Arabia": { symbol: "SAR", code: "SAR", position: "before" },
  "Kuwait": { symbol: "KD", code: "KWD", position: "before" },
  "Qatar": { symbol: "QR", code: "QAR", position: "before" },
  "Bahrain": { symbol: "BD", code: "BHD", position: "before" },
  "Oman": { symbol: "OMR", code: "OMR", position: "before" },
  "Lebanon": { symbol: "L£", code: "LBP", position: "before" },
  "Turkey": { symbol: "₺", code: "TRY", position: "before" },
  "Israel": { symbol: "₪", code: "ILS", position: "before" },
  "Iran": { symbol: "﷼", code: "IRR", position: "before" },
  // Europe
  "UK": { symbol: "£", code: "GBP", position: "before" },
  "Germany": { symbol: "€", code: "EUR", position: "before" },
  "France": { symbol: "€", code: "EUR", position: "before" },
  "Italy": { symbol: "€", code: "EUR", position: "before" },
  "Spain": { symbol: "€", code: "EUR", position: "before" },
  "Greece": { symbol: "€", code: "EUR", position: "before" },
  "Netherlands": { symbol: "€", code: "EUR", position: "before" },
  "Switzerland": { symbol: "CHF", code: "CHF", position: "before" },
  "Sweden": { symbol: "kr", code: "SEK", position: "after" },
  "Norway": { symbol: "kr", code: "NOK", position: "after" },
  // Americas
  "USA": { symbol: "$", code: "USD", position: "before" },
  "Canada": { symbol: "C$", code: "CAD", position: "before" },
  "Mexico": { symbol: "$", code: "MXN", position: "before" },
  "Brazil": { symbol: "R$", code: "BRL", position: "before" },
  "Argentina": { symbol: "$", code: "ARS", position: "before" },
  "Peru": { symbol: "S/", code: "PEN", position: "before" },
  // Africa
  "Nigeria": { symbol: "₦", code: "NGN", position: "before" },
  "Kenya": { symbol: "KSh", code: "KES", position: "before" },
  "South Africa": { symbol: "R", code: "ZAR", position: "before" },
  "Ethiopia": { symbol: "Br", code: "ETB", position: "before" },
  "Egypt": { symbol: "E£", code: "EGP", position: "before" },
  "Morocco": { symbol: "MAD", code: "MAD", position: "before" },
  // Oceania
  "Australia": { symbol: "A$", code: "AUD", position: "before" },
  "New Zealand": { symbol: "NZ$", code: "NZD", position: "before" },
};

// Default fallback
export const DEFAULT_CURRENCY: CurrencyInfo = { symbol: "$", code: "USD", position: "before" };

export function getCurrency(country: string): CurrencyInfo {
  return countryCurrency[country] || DEFAULT_CURRENCY;
}

export function formatBudget(amount: number, country: string): string {
  const c = getCurrency(country);
  return c.position === "before"
    ? `${c.symbol}${amount.toLocaleString()}`
    : `${amount.toLocaleString()}${c.symbol}`;
}
