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
    // Use global L instead of imported L
    if (typeof window.L !== 'undefined') {
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
      
      // Use global L variable
      const L = window.L;
      
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
    console.log('🏠 Rendering places on map:', places.length);
    
    if (!this.map || !places.length) {
      console.log('⚠️ No map or places to render');
      return;
    }

    // Use global L variable
    const L = window.L;
    
    // Clear existing markers
    this.clearMarkers();

    // Add markers for each place
    places.forEach((place, index) => {
      if (place.lat && place.lon) {
        try {
          const marker = L.marker([place.lat, place.lon])
            .addTo(this.map)
            .bindPopup(`
              <div style="min-width: 200px;">
                <h4 style="margin: 0 0 0.5rem 0;">${place.name}</h4>
                ${place.address ? `<p style="margin: 0 0 0.5rem 0; color: #666;"><small>${place.address}</small></p>` : ''}
                ${place.description ? `<p style="margin: 0;">${place.description}</p>` : ''}
              </div>
            `);
          
          this.markers.push(marker);
          console.log(`✅ Added marker ${index + 1}: ${place.name}`);
        } catch (error) {
          console.error(`❌ Error adding marker for ${place.name}:`, error);
        }
      } else {
        console.warn(`⚠️ Place ${place.name} has no coordinates`);
      }
    });

    // Fit map to show all markers if we have places
    if (this.markers.length > 0) {
      try {
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
        console.log('🔍 Map bounds adjusted to fit all places');
      } catch (error) {
        console.error('❌ Error fitting bounds:', error);
      }
    }
  }

  clearMarkers() {
    // Use global L variable
    const L = window.L;
    
    this.markers.forEach(marker => {
      if (marker && this.map) {
        this.map.removeLayer(marker);
      }
    });
    this.markers = [];
    console.log('🧹 Cleared all markers');
  }

  centerMap() {
    if (!this.map) return;
    
    const places = getPlaces();
    if (places.length > 0) {
      // Use global L variable
      const L = window.L;
      
      if (this.markers.length > 0) {
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
      }
    } else {
      // Default to Uganda if no places
      this.map.setView([0.35, 32.6], 6);
    }
    console.log('🎯 Map centered');
  }

  updateStatus() {
    const statusElement = document.getElementById('mapStatus');
    if (!statusElement) return;

    const places = getPlaces();
    if (places.length === 0) {
      statusElement.textContent = 'No places in your itinerary yet. Start by searching and adding places!';
    } else {
      statusElement.textContent = `Showing ${places.length} place${places.length === 1 ? '' : 's'} on your map`;
    }
  }

  updateTripSummary() {
    const summaryElement = document.getElementById('tripSummary');
    if (!summaryElement) return;

    const tripDays = getTripDays();
    
    if (tripDays.length === 0) {
      summaryElement.innerHTML = `
        <p style="color: #666; font-style: italic;">
          Your itinerary is empty. <a href="./" style="color: #2563eb;">Start planning your trip!</a>
        </p>
      `;
      return;
    }

    let summaryHTML = '';
    tripDays.forEach((day, index) => {
      summaryHTML += `
        <div style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 4px;">
          <h4 style="margin: 0 0 0.5rem 0;">Day ${index + 1}</h4>
          <ul style="margin: 0; padding-left: 1.5rem;">
            ${day.places.map(place => `<li>${place.name}</li>`).join('')}
          </ul>
        </div>
      `;
    });

    summaryElement.innerHTML = summaryHTML;
  }
}
