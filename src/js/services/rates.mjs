const base = 'https://api.exchangerate-api.com/v4/latest';

export async function getRate(from, to) {
  try {
    const res = await fetch(`${base}/${from}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.rates[to] || 1;
  } catch (error) {
    console.error('Currency API Error:', error);
    // Return mock rates for demo
    const mockRates = {
      'USD-EUR': 0.85,
      'USD-GBP': 0.73,
      'USD-JPY': 110,
      'USD-CAD': 1.25,
      'EUR-USD': 1.18,
      'EUR-GBP': 0.86,
      'EUR-JPY': 129,
      'EUR-CAD': 1.47,
      'GBP-USD': 1.37,
      'GBP-EUR': 1.16,
      'GBP-JPY': 151,
      'GBP-CAD': 1.71
    };
    return mockRates[`${from}-${to}`] || 1;
  }
}