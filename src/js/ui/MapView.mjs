import L from 'leaflet';
import { getPlaces, clearItinerary } from '../itinerary.mjs';

export default class MapView {
  constructor(mapElementId) {
    this.mapEl = mapElementId;
    this.places = getPlaces();
    this.map = null;      // Leaflet instance
    this.markerGroup = null;
    this.initMap();       // ← create Leaflet map immediately
    this.renderPlaces();  // ← draw pins
  }

  /* ---------- private ---------- */
  initMap() {
    // Create map
    this.map = L.map(this.mapEl).setView([0.35, 32.58], 6);
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.map);

    // Prepare marker layer
    this.markerGroup = L.layerGroup().addTo(this.map);
  }

  /* ---------- public ---------- */
  renderPlaces() {
    this.markerGroup.clearLayers();
    this.places = getPlaces();               // refresh from localStorage
    if (this.places.length === 0) return;

    this.places.forEach((p) => {
      L.marker([p.lat, p.lon])
        .addTo(this.markerGroup)
        .bindPopup(`<strong>${p.name}</strong><br>${p.kind}`);
    });

    // Auto-fit map to markers
    const bounds = this.markerGroup.getBounds();
    if (bounds.isValid()) this.map.fitBounds(bounds, { padding: [30, 30] });
  }

  centerMap() {
    if (this.places.length === 0) return;
    const bounds = this.markerGroup.getBounds();
    if (bounds.isValid()) this.map.fitBounds(bounds, { padding: [30, 30] });
  }

  clearAllPlaces() {
    clearItinerary();
    this.renderPlaces();
  }

  updateTripSummary() {
    const target = document.getElementById('tripSummary');
    if (!target) return;
    if (this.places.length === 0) {
      target.innerHTML = '<p>No places added yet 💤</p>';
      return;
    }
    target.innerHTML = this.places
      .map(
        (p, i) =>
          `<p><strong>${i + 1}.</strong> ${p.name} <span class="tag">${p.kind}</span></p>`
      )
      .join('');
  }
}
