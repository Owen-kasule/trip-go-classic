import L from 'leaflet';
import { getPlaces, getTripDays } from '../itinerary.mjs';

export default class MapView {
  constructor(mapElementId) {
    this.mapElement = document.getElementById(mapElementId);
    this.map = null;
    this.markers = [];
    console.log('🗺️ MapView constructor, element:', this.mapElement);
    
    // Wait for Leaflet to be available
    this.initWhenReady();
  }

  initWhenReady() {
    if (typeof L !== 'undefined') {
      console.log('✅ Leaflet is available, initializing map');
      this.init();
    } else {
      console.log('⏳ Waiting for Leaflet to load...');
      setTimeout(() => this.initWhenReady(), 100);
    }
  }

  init() {
    if (!this.mapElement) {
      console.error('❌ Map element not found');
      return;
    }

    try {
      console.log('🗺️ Initializing Leaflet map');
      
      // Initialize Leaflet map with better options
      this.map = L.map(this.mapElement, {
        center: [0.35, 32.6], // Uganda coordinates as default
        zoom: 6,
        zoomControl: true,
        attributionControl: true
      });
      
      console.log('📍 Map created, adding tile layer');
      
      // Add tile layer with error handling
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        timeout: 10000
      });
      
      tileLayer.on('tileerror', (error) => {
        console.error('❌ Tile loading error:', error);
      });
      
      tileLayer.on('tileload', () => {
        console.log('✅ Tiles loaded successfully');
      });
      
      tileLayer.addTo(this.map);
      
      // Force map to refresh after a short delay
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
          console.log('🔄 Map size invalidated');
        }
      }, 500);

      this.renderPlaces();
      this.updateStatus();
      
    } catch (error) {
      console.error('❌ Error initializing map:', error);
      this.showMapError();
    }
  }

  showMapError() {
    if (this.mapElement) {
      this.mapElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column; background: #f0f0f0; color: #666;">
          <div style="text-align: center; padding: 2rem;">
            <h3 style="margin: 0 0 1rem 0;">🗺️ Map Loading Issue</h3>
            <p style="margin: 0 0 1rem 0;">The map is having trouble loading. This might be due to:</p>
            <ul style="text-align: left; margin: 0;">
              <li>Network connectivity issues</li>
              <li>External map service temporarily unavailable</li>
              <li>JavaScript loading conflicts</li>
            </ul>
            <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
              🔄 Reload Page
            </button>
          </div>
        </div>
      `;
    }
  }

  renderPlaces() {
    const places = getPlaces();
    console.log('📍 Rendering places on map:', places.length);
    
    // Clear existing markers
    this.markers.forEach(marker => {
      if (this.map) this.map.removeLayer(marker);
    });
    this.markers = [];

    if (places.length === 0) {
      this.updateStatus('No places in your trip yet. Add some places from the search page!');
      return;
    }

    if (!this.map) {
      console.error('❌ Map not initialized, cannot render places');
      return;
    }

    // Add markers for each place
    const bounds = [];
    
    places.forEach((place, index) => {
      try {
        const marker = L.marker([place.lat, place.lon])
          .addTo(this.map)
          .bindPopup(`
            <div style="text-align: center; min-width: 150px;">
              <h4 style="margin: 0 0 8px 0; color: #2563eb;">${place.name}</h4>
              <p style="margin: 0 0 4px 0; color: #666; font-size: 0.9em;">${this.formatKind(place.kind)}</p>
              <p style="margin: 8px 0 0 0; font-weight: bold; color: #f59e0b;">📅 Day ${place.day}</p>
              <p style="margin: 4px 0 0 0; font-size: 0.8em; color: #888;">📍 ${place.lat.toFixed(4)}, ${place.lon.toFixed(4)}</p>
            </div>
          `);
        
        this.markers.push(marker);
        bounds.push([place.lat, place.lon]);
        
        console.log(`📍 Added marker for ${place.name}`);
      } catch (error) {
        console.error('❌ Error adding marker for', place.name, error);
      }
    });

    // Fit map to show all markers
    if (bounds.length > 0) {
      try {
        this.map.fitBounds(bounds, { 
          padding: [20, 20],
          maxZoom: 12 
        });
        console.log('🎯 Map bounds fitted to show all places');
      } catch (error) {
        console.error('❌ Error fitting bounds:', error);
      }
    }

    this.updateStatus(`Showing ${places.length} places on your trip`);
  }

  formatKind(kind) {
    return kind?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Place';
  }

  updateStatus(message = null) {
    const statusElement = document.getElementById('mapStatus');
    if (statusElement) {
      if (message) {
        statusElement.textContent = message;
      } else {
        const places = getPlaces();
        statusElement.textContent = places.length > 0 
          ? `Showing ${places.length} places on your trip`
          : 'No places added yet';
      }
    }
  }

  centerMap() {
    const places = getPlaces();
    if (places.length > 0 && this.map) {
      const bounds = places.map(place => [place.lat, place.lon]);
      this.map.fitBounds(bounds, { padding: [20, 20] });
      console.log('🎯 Map centered on trip locations');
    } else if (this.map) {
      this.map.setView([0.35, 32.6], 6); // Default to Uganda
      console.log('🎯 Map centered on default location');
    }
  }

  clearAllPlaces() {
    localStorage.removeItem('tgc-itinerary');
    this.renderPlaces();
    this.updateTripSummary();
    console.log('🗑️ All places cleared from trip');
  }

  updateTripSummary() {
    const summaryElement = document.getElementById('tripSummary');
    if (!summaryElement) return;

    const places = getPlaces();
    const days = getTripDays();
    
    if (places.length === 0) {
      summaryElement.innerHTML = '<p style="color: #6b7280; text-align: center; font-style: italic;">No places in your trip yet</p>';
      return;
    }

    const summary = `
      <div class="summary-item">
        <span class="summary-label">Total Places</span>
        <span class="summary-value">${places.length}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Trip Duration</span>
        <span class="summary-value">${days.length} day${days.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Countries</span>
        <span class="summary-value">1</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Last Updated</span>
        <span class="summary-value">${new Date().toLocaleDateString()}</span>
      </div>
    `;
    
    summaryElement.innerHTML = summary;
    console.log('📊 Trip summary updated');
  }
}
