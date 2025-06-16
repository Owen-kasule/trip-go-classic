/* itinerary.mjs  –  single source of truth for trip storage */
import { load, save } from './core/storage.mjs';

/* ─────────────  CRUD helpers ───────────── */

// 1  Add a place (deduplicated by id)
export function addPlace(place, day = 1) {
  const list = load();
  if (!list.some((p) => p.id === place.id)) {
    list.push({ ...place, day });        // default day = 1
    save(list);
  }
}

// 2  Remove by id
export const removePlace = (id) => save(load().filter((p) => p.id !== id));

// 3  Read all
export const getPlaces = () => load();

// 4  Clear everything
export const clearItinerary = () => localStorage.removeItem('tgc-itinerary');

// 5  Utility: which day numbers are used?
export function getTripDays() {
  return [...new Set(load().map((p) => p.day || 1))].sort((a, b) => a - b);
}
