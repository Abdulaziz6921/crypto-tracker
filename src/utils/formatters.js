// Formatting currency with appropriate precision
export const formatCurrency = (
  value,
  symbol = "$",
  maximumFractionDigits = 2
) => {
  if (value === null || value === undefined) return "-";

  // For values under 1, showing more decimal places
  const precision = value < 1 ? 6 : maximumFractionDigits;

  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: precision,
  })}`;
};

// Formatting large numbers with appropriate suffix (K, M, B, T)
export const formatLargeNumber = (num) => {
  if (num === null || num === undefined) return "-";

  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;

  return `$${num.toFixed(2)}`;
};

// Formatting percentage with appropriate sign and precision
export const formatPercentage = (value) => {
  if (value === null || value === undefined) return "-";

  // For values near zero, showing more decimal places
  const precision = Math.abs(value) < 0.1 ? 3 : 2;

  const formattedValue = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: precision,
    signDisplay: "never",
  });

  // Adding sign manually for clarity
  return value >= 0 ? `+${formattedValue}%` : `${formattedValue}%`;
};

// Formatting supply with appropriate unit
export const formatSupply = (value, unit) => {
  if (value === null || value === undefined) return "-";
  return `${value.toFixed(2)} ${unit}`;
};
