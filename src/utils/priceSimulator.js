// Utility to simulate random price changes
export const simulatePriceChange = (crypto) => {
  // Generating random price fluctuation between -0.5% and +0.5%
  const priceChangePercentage = (Math.random() - 0.48) * 1; // Slightly biased towards positive

  // Calculating new price
  const newPrice = crypto.price * (1 + priceChangePercentage / 100);

  // Updating hourly, daily, and weekly percentages with some randomness
  // But maintaining the trend direction with small variations
  const hourlyChange = modifyPercentage(crypto.priceChange1h, 0.05);
  const dailyChange = modifyPercentage(crypto.priceChange24h, 0.08);
  const weeklyChange = modifyPercentage(crypto.priceChange7d, 0.03);

  // Updating volume with random fluctuation between -1% and +1%
  const volumeChange = (Math.random() * 2 - 0.9) / 100;
  const newVolume = crypto.volume24h * (1 + volumeChange);

  return {
    price: newPrice,
    priceChange1h: hourlyChange,
    priceChange24h: dailyChange,
    priceChange7d: weeklyChange,
    volume24h: newVolume,
  };
};

// Helper to modify percentage changes while maintaining trends
const modifyPercentage = (currentPercentage, maxChange) => {
  // Calculating random change within the maxChange limit
  const change = (Math.random() * 2 - 1) * maxChange;

  // Applying change but maintaining sign with 85% probability
  if (Math.random() > 0.15 || Math.abs(currentPercentage) < 0.1) {
    // Maintaining sign but adjust magnitude
    return currentPercentage > 0
      ? Math.max(0, currentPercentage + change)
      : Math.min(0, currentPercentage + change);
  } else {
    // Allowing sign flip with small probability
    return currentPercentage + change;
  }
};
