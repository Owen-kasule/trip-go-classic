/* src/js/entry/map.mjs
   Entry script for map.html — Trip-Go Classic
*/

import MapView from '../ui/MapView.mjs';

console.info('🗺️ Map page script loaded');

document.addEventListener('DOMContentLoaded', () => {
  // ---------- 1. Create map + markers ----------
  const mapView = new MapView('map'); // Map renders immediately

  // ---------- 2. Back / Home button ----------
  const backBtn = document.getElementById('backToSearch');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Prefer history.back, fall back to root
      if (history.length > 1 && document.referrer) history.back();
      else window.location.href = '/';
    });
  }

  // ---------- 3. Control buttons ----------
  const centerBtn = document.getElementById('centerMap');
  const clearBtn  = document.getElementById('clearMap');

  if (centerBtn) {
    centerBtn.addEventListener('click', () => mapView.centerMap());
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all places from your trip?')) mapView.clearAllPlaces();
    });
  }

  // ---------- 4. Sync with storage ----------
  window.addEventListener('storage', () => {
    mapView.renderPlaces();
    mapView.updateTripSummary();
  });

  console.info('✅ Map page initialized');
});
