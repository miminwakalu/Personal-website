export async function analyzeStock(symbol: string) {
  return {
    symbol,
    price: 100,
    recommendation: "Buy"
  };
}