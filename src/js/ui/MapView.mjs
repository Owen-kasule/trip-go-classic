import { getPlaces } from '../itinerary.mjs';

export default class MapView {
  constructor(mapElementId) {
    this.mapElementId = mapElementId;
    this.mapElement = document.getElementById(mapElementId);
    this.map = null;
    this.markers = [];
    
    console.log('🗺️ MapView constructor');
    
    // Simple initialization
    this.init();
  }

  init() {
    if (!this.mapElement) {
      console.error('❌ Map element not found');
      return;
    }

    if (typeof window.L === 'undefined') {
      console.error('❌ Leaflet not available');
      return;
    }

    try {
      console.log('🗺️ Creating map');
      
      this.map = window.L.map(this.mapElementId).setView([0.35, 32.6], 6);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
      
      // Force resize
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 100);
      
      console.log('✅ Map created');
      
    } catch (error) {
      console.error('❌ Map creation error:', error);
    }
  }

  renderPlaces() {
    if (!this.map) return;
    
    const places = getPlaces();
    
    // Clear markers
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
    
    // Add new markers
    places.forEach(place => {
      if (place.lat && place.lon) {
        const marker = window.L.marker([place.lat, place.lon])
          .addTo(this.map)
          .bindPopup(`<h4>${place.name}</h4>`);
        
        this.markers.push(marker);
      }
    });
    
    // Fit bounds
    if (this.markers.length > 0) {
      const group = new window.L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }
}
