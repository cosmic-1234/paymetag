// Indian Rupee & Financial Formatters (Institutional Precision)

export function formatINR(amount: number, showDecimals = false): string {
  if (isNaN(amount)) return "₹0";
  const absAmount = Math.abs(amount);
  const isNegative = amount < 0;

  // Format using Indian grouping system (3 digits, then groups of 2)
  const parts = absAmount.toFixed(showDecimals ? 2 : 0).split(".");
  let intPart = parts[0];
  const decPart = parts[1] ? `.${parts[1]}` : "";

  if (intPart.length > 3) {
    const lastThree = intPart.substring(intPart.length - 3);
    const otherNumbers = intPart.substring(0, intPart.length - 3);
    intPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }

  return `${isNegative ? "-" : ""}₹${intPart}${decPart}`;
}

export function formatUSD(amount: number, inrToUsdRate = 83.35): string {
  if (isNaN(amount)) return "$0";
  const usdVal = amount / inrToUsdRate;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usdVal);
}

export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)} K`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}
