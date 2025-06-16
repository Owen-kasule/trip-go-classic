/* src/js/entry/map.mjs
   Entry script for map.html — Trip-Go Classic
*/

import MapView from '../ui/MapView.mjs';

console.log('🗺️ Map page script loading...');

// Function to load Leaflet if not already loaded
function ensureLeafletLoaded() {
  return new Promise((resolve, reject) => {
    if (typeof L !== 'undefined') {
      console.log('✅ Leaflet already loaded');
      resolve();
      return;
    }

    console.log('📦 Loading Leaflet library...');
    
    // Load CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      console.log('✅ Leaflet loaded successfully');
      resolve();
    };
    script.onerror = (error) => {
      console.error('❌ Failed to load Leaflet:', error);
      reject(error);
    };
    document.head.appendChild(script);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🗺️ Map page DOM loaded, initializing...');
  
  try {
    // Ensure Leaflet is loaded
    await ensureLeafletLoaded();
    
    // Initialize map
    const mapView = new MapView('map');
    
    // Update trip summary
    mapView.updateTripSummary();
    
    // Handle back to search button
    const backBtn = document.getElementById('backToSearch');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🔙 Back button clicked');
        
        // Try to go back in history, fallback to home page
        if (window.history.length > 1 && document.referrer) {
          window.history.back();
        } else {
          window.location.href = './';
        }
      });
    }
    
    // Bind control events
    const centerBtn = document.getElementById('centerMap');
    const clearBtn = document.getElementById('clearMap');
    
    if (centerBtn) {
      centerBtn.addEventListener('click', () => {
        console.log('🎯 Center map button clicked');
        mapView.centerMap();
      });
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all places from your trip?')) {
          console.log('🗑️ Clearing all places');
          mapView.clearAllPlaces();
        }
      });
    }
    
    // Listen for storage changes to update map
    window.addEventListener('storage', () => {
      console.log('💾 Storage changed, updating map');
      mapView.renderPlaces();
      mapView.updateTripSummary();
    });
    
    // Periodic refresh
    setInterval(() => {
      mapView.renderPlaces();
      mapView.updateTripSummary();
    }, 5000);
    
    console.log('✅ Map page initialization complete!');
    
  } catch (error) {
    console.error('❌ Failed to initialize map page:', error);
    
    // Show error message in the map container
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column; background: #f0f0f0; color: #666; padding: 2rem; text-align: center;">
          <h3 style="margin: 0 0 1rem 0; color: #dc2626;">🚫 Map Failed to Load</h3>
          <p style="margin: 0 0 1rem 0;">Unable to load the map component. Please check your internet connection and try again.</p>
          <button onclick="window.location.reload()" style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">
            🔄 Reload Page
          </button>
        </div>
      `;
    }
  }
});
