/* itinerary.mjs  –  single source of truth for trip storage */
import { load, save } from './core/storage.mjs';

export function addPlace(place) {
  const list = load();
  if (!list.some((p) => p.id === place.id)) {
    const newPlace = { 
      ...place, 
      day: 1, 
      order: list.length,
      addedAt: new Date().toISOString(),
      notes: ''
    };
    list.push(newPlace);
    save(list);
    return true;
  }
  return false;
}

export const removePlace = (id) => {
  const list = load().filter((p) => p.id !== id);
  save(list);
};

export const updatePlaceDay = (id, day) => {
  const list = load();
  const place = list.find(p => p.id === id);
  if (place) {
    place.day = day;
    save(list);
  }
};

export const updatePlaceNotes = (id, notes) => {
  const list = load();
  const place = list.find(p => p.id === id);
  if (place) {
    place.notes = notes;
    save(list);
  }
};

export const reorderPlaces = (fromIndex, toIndex) => {
  const list = load();
  const [removed] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, removed);
  list.forEach((place, index) => place.order = index);
  save(list);
};

export const getPlaces = () => load();
export const getPlacesByDay = (day) => load().filter(p => p.day === day);

export const clearItinerary = () => {
  localStorage.removeItem('tgc-itinerary');
  console.log('🗑️ Itinerary cleared');
};

export const getTripDays = () => {
  const list = load();
  return [...new Set(list.map((p) => p.day || 1))].sort((a, b) => a - b);
};
