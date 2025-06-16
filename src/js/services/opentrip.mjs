const base = 'https://api.opentripmap.com/0.1/en';
const key = import.meta.env.VITE_TRIPMAP_KEY;

function options() {
  return { headers: { 'Content-Type': 'application/json' } };
}

async function toJson(res) {
  const body = await res.json();
  if (res.ok) return body;
  throw { name: 'apiError', message: body };
}

export async function autosuggest(query, limit = 15) {
  // If no API key, return mock data for demo
  if (!key || key === 'your_actual_api_key_here') {
    console.warn('OpenTripMap API key not configured. Using mock data.');
    return getMockData(query);
  }

  const url = `${base}/places/autosuggest?apikey=${key}&name=${encodeURIComponent(
    query
  )}&limit=${limit}`;
  
  try {
    const res = await fetch(url, options());
    const data = await toJson(res);
    return data.features?.map((f) => ({
      id: f.properties.xid || Math.random().toString(36),
      name: f.properties.name,
      kind: f.properties.kinds?.split(',')[0] || 'place',
      kinds: f.properties.kinds,
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
    })) || [];
  } catch (error) {
    console.error('API Error:', error);
    return getMockData(query);
  }
}

function getMockData(query) {
  const mockPlaces = [
    {
      id: 'mock1',
      name: `${query} Museum`,
      kind: 'museum',
      kinds: 'museum,cultural,tourist_attraction',
      lat: 40.7128 + Math.random() * 0.1,
      lon: -74.0060 + Math.random() * 0.1
    },
    {
      id: 'mock2',
      name: `${query} Park`,
      kind: 'park',
      kinds: 'park,natural,recreation',
      lat: 40.7128 + Math.random() * 0.1,
      lon: -74.0060 + Math.random() * 0.1
    },
    {
      id: 'mock3',
      name: `${query} Restaurant`,
      kind: 'restaurant',
      kinds: 'restaurant,food,dining',
      lat: 40.7128 + Math.random() * 0.1,
      lon: -74.0060 + Math.random() * 0.1
    },
    {
      id: 'mock4',
      name: `${query} Hotel`,
      kind: 'hotel',
      kinds: 'hotel,accommodation,lodging',
      lat: 40.7128 + Math.random() * 0.1,
      lon: -74.0060 + Math.random() * 0.1
    }
  ];
  
  return mockPlaces.slice(0, Math.floor(Math.random() * 4) + 1);
}