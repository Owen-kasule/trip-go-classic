/* src/js/entry/map.mjs
   Entry script for map.html — Trip-Go Classic
*/

import MapView from '../ui/MapView.mjs';

console.log('🗺️ Map page script loading...');

// Wait for both DOM and Leaflet to be ready
function waitForLeafletAndDOM() {
  return new Promise((resolve) => {
    const checkReady = () => {
      if (document.readyState === 'complete' && typeof window.L !== 'undefined') {
        console.log('✅ Both DOM and Leaflet are ready');
        resolve();
      } else {
        console.log('⏳ Waiting for DOM and Leaflet...');
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  });
}

waitForLeafletAndDOM().then(() => {
  // Additional delay to ensure everything is stable
  setTimeout(() => {
    initMapPage();
  }, 500);
});

function initMapPage() {
  try {
    console.log('🚀 Initializing map page');
    
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
        if (confirm('Are you sure you want to clear all places from your itinerary?')) {
          // Import clearItinerary dynamically to avoid circular deps
          import('../itinerary.mjs').then(({ clearItinerary }) => {
            clearItinerary();
            mapView.renderPlaces();
            mapView.updateStatus();
            mapView.updateTripSummary();
          });
        }
      });
    }
    
    console.log('✅ Map page initialized successfully');
    
  } catch (error) {
    console.error('❌ Error initializing map page:', error);
  }
}

// Fallback initialization if everything else fails
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!window.mapViewInitialized) {
      console.log('🔄 Fallback map initialization');
      initMapPage();
    }
  }, 2000);
});
