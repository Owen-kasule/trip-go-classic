import { load, save } from './core/storage.mjs';

export function addPlace(place) {
  const list = load();
  if (!list.some((p) => p.id === place.id)) list.push({ ...place, day: 1 });
  save(list);
}

export const removePlace = (id) => save(load().filter((p) => p.id !== id));
export const getPlaces = () => load();