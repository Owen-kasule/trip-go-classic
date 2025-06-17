/* src/js/entry/map.mjs
   Entry script for map.html — Trip-Go Classic
*/

import MapView from '../ui/MapView.mjs';

console.log('🗺️ Map page script loading...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('🗺️ Map page DOM loaded');
  
  // Simple delay to ensure everything is loaded
  setTimeout(() => {
    initMapPage();
  }, 1000);
});

function initMapPage() {
  try {
    // Initialize map
    const mapView = new MapView('map');
    
    // Update trip summary
    if (mapView.updateTripSummary) {
      mapView.updateTripSummary();
    }
    
    // Handle back button
    const backBtn = document.getElementById('backToSearch');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './';
      });
    }
    
    // Handle center button
    const centerBtn = document.getElementById('centerMap');
    if (centerBtn) {
      centerBtn.addEventListener('click', () => {
        if (mapView.centerMap) {
          mapView.centerMap();
        }
      });
    }
    
    // Handle clear button
    const clearBtn = document.getElementById('clearMap');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all places from your trip?')) {
          localStorage.removeItem('tgc-itinerary');
          window.location.reload();
        }
      });
    }
    
    console.log('✅ Map page initialized');
    
  } catch (error) {
    console.error('❌ Map initialization error:', error);
    showMapError();
  }
}

function showMapError() {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; padding: 2rem; text-align: center;">
        <div>
          <h3>🗺️ Map temporarily unavailable</h3>
          <p>Please try refreshing the page</p>
          <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; background: #2563eb; color: white; border: none; border-radius: 4px;">
            Refresh
          </button>
        </div>
      </div>
    `;
  }
}
