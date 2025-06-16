export const autosuggest = async (query, limit = 15) => {
  const base = 'https://api.opentripmap.com/0.1/en';
  const key = import.meta.env.VITE_TRIPMAP_KEY;

  const options = () => {
    return { headers: { 'Content-Type': 'application/json' } };
  };

  const toJson = async (res) => {
    const body = await res.json();
    if (res.ok) return body;
    throw { name: 'apiError', message: body };
  };

  const url = `${base}/places/autosuggest?apikey=${key}&name=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url, options());
  return (await toJson(res)).features.map((f) => ({
    id: f.properties.xid,
    name: f.properties.name,
    kind: f.properties.kinds.split(',')[0],
    lat: f.geometry.coordinates[1],
    lon: f.geometry.coordinates[0],
  }));
};