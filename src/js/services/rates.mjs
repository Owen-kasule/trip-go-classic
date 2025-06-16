const base = 'https://api.exchangerate-api.com/v4/latest';

export async function getRate(from, to) {
  try {
    const res = await fetch(`${base}/${from}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.rates[to] || getMockRate(from, to);
  } catch (error) {
    console.error('Currency API Error:', error);
    return getMockRate(from, to);
  }
}

function getMockRate(from, to) {
  console.log(`🏦 Using mock rate for ${from} → ${to}`);
  
  // Realistic exchange rates (approximate)
  const mockRates = {
    // From USD
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-JPY': 110,
    'USD-CAD': 1.25,
    'USD-UGX': 3700,    // 1 USD ≈ 3,700 UGX
    'USD-KES': 130,     // 1 USD ≈ 130 KES
    'USD-TZS': 2300,    // 1 USD ≈ 2,300 TZS
    
    // From EUR
    'EUR-USD': 1.18,
    'EUR-GBP': 0.86,
    'EUR-JPY': 129,
    'EUR-CAD': 1.47,
    'EUR-UGX': 4370,    // 1 EUR ≈ 4,370 UGX
    'EUR-KES': 153,
    'EUR-TZS': 2714,
    
    // From GBP
    'GBP-USD': 1.37,
    'GBP-EUR': 1.16,
    'GBP-JPY': 151,
    'GBP-CAD': 1.71,
    'GBP-UGX': 5069,    // 1 GBP ≈ 5,069 UGX
    'GBP-KES': 178,
    'GBP-TZS': 3151,
    
    // From UGX
    'UGX-USD': 0.00027,  // 1 UGX ≈ 0.00027 USD
    'UGX-EUR': 0.00023,
    'UGX-GBP': 0.000197,
    'UGX-JPY': 0.0297,
    'UGX-CAD': 0.000338,
    'UGX-KES': 0.0351,   // 1 UGX ≈ 0.035 KES
    'UGX-TZS': 0.622,    // 1 UGX ≈ 0.62 TZS
    
    // From KES
    'KES-USD': 0.0077,
    'KES-EUR': 0.0065,
    'KES-GBP': 0.0056,
    'KES-UGX': 28.46,    // 1 KES ≈ 28.5 UGX
    'KES-TZS': 17.69,
    'KES-JPY': 0.846,
    'KES-CAD': 0.0096,
    
    // From TZS
    'TZS-USD': 0.000435,
    'TZS-EUR': 0.000368,
    'TZS-GBP': 0.000317,
    'TZS-UGX': 1.608,    // 1 TZS ≈ 1.6 UGX
    'TZS-KES': 0.0565,
    'TZS-JPY': 0.0478,
    'TZS-CAD': 0.000544,
  };
  
  const key = `${from}-${to}`;
  return mockRates[key] || 1;
}