import { autosuggest } from '../services/opentrip.mjs';
import CardList from '../ui/CardList.mjs';
import CurrencyConverter from '../ui/CurrencyConverter.mjs';
import ItineraryPlanner from '../ui/ItineraryPlanner.mjs';
import MapView from '../ui/MapView.mjs';

console.log('🏠 Home page script loading...');

// Simple router
function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  
  if (hash === 'map') {
    showMapView();
  } else {
    showHomeView();
  }
}

function showHomeView() {
  document.body.innerHTML = `
    <header>
      <h1>🌍 Trip Go Classic</h1>
      <p>Plan your perfect adventure</p>
    </header>
    
    <nav>
      <a href="#home">🏠 Home</a>
      <a href="#map">🗺️ Map View</a>
    </nav>
    
    <section class="search-section">
      <div class="search-container">
        <h2>🔍 Discover Amazing Places</h2>
        <div class="search-form">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Search for cities, attractions, restaurants..."
            class="search-input"
          >
          <button id="searchBtn" class="btn-primary">Search</button>
        </div>
        <div id="searchResults" class="search-results">
          <div class="loading" style="display: none;" id="searchLoading">
            <div>🔍 Searching...</div>
          </div>
        </div>
      </div>
    </section>
    
    <div class="sidebar">
      <div class="sidebar-section">
        <h3>📋 Your Itinerary</h3>
        <div id="itineraryList">
          <p style="color: #6b7280; font-style: italic;">Your itinerary is empty. Search and add places to get started!</p>
        </div>
        <div style="margin-top: 1rem;">
          <button id="clearItinerary" class="btn-remove" style="display: none;">Clear All</button>
        </div>
      </div>
      
      <div class="sidebar-section">
        <h3>💱 Currency Converter</h3>
        <div class="currency-form">
          <div class="currency-input-group">
            <input type="number" id="fromAmount" class="currency-input" placeholder="Amount" value="100">
            <select id="fromCurrency" class="currency-select">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="UGX">UGX</option>
            </select>
          </div>
          <div style="text-align: center;">↓</div>
          <div class="currency-input-group">
            <input type="number" id="toAmount" class="currency-input" placeholder="Converted amount" readonly>
            <select id="toCurrency" class="currency-select">
              <option value="UGX">UGX</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <button id="convertBtn" class="btn-primary">Convert</button>
          <div id="conversionResult" style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;"></div>
        </div>
      </div>
    </div>
  `;
  
  initHomeApp();
}

function showMapView() {
  document.body.innerHTML = `
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    
    <header>
      <h1>🗺️ Your Trip Map</h1>
      <p>Visualize your planned destinations</p>
    </header>
    
    <nav>
      <a href="#home">← Back to Search</a>
      <a href="#map">🗺️ Map View</a>
    </nav>
    
    <main>
      <div class="app-container">
        <div class="map-container">
          <div class="map-header">
            <h2>📍 Your Trip Locations</h2>
            <div class="map-controls">
              <button id="centerMap" class="btn-map">📍 Center Map</button>
              <button id="clearMap" class="btn-map btn-danger">🗑️ Clear All</button>
            </div>
          </div>
          <div id="map" class="map-view"></div>
          <div class="map-info">
            <p id="mapStatus">Loading your trip locations...</p>
          </div>
        </div>
        
        <aside class="map-sidebar">
          <div class="trip-summary">
            <h3>📋 Trip Summary</h3>
            <div id="tripSummary"></div>
          </div>
        </aside>
      </div>
    </main>
    
    <footer>
      <p>&copy; 2025 Trip Go Classic | Made with ❤️ for travelers</p>
    </footer>
  `;
  
  // Load Leaflet
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = initMapApp;
  document.head.appendChild(script);
}

function initHomeApp() {
  // Your existing home app initialization code
  const cardList = new CardList('.card-grid');
  const currencyConverter = new CurrencyConverter('.currency-section');
  const itineraryPlanner = new ItineraryPlanner('.itinerary-section');

  const searchInput = document.querySelector('#searchInput');
  const searchBtn = document.querySelector('#searchBtn');
  const contentHeader = document.querySelector('.content-header h2');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', search);
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') search();
    });

    // Auto-suggest with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length === 0) {
        cardList.render([]);
        if (contentHeader) contentHeader.textContent = 'Search Results';
        return;
      }
      
      if (query.length >= 3) {
        searchTimeout = setTimeout(() => search(), 500);
      }
    });
  }

  async function search() {
    const query = searchInput.value.trim();
    if (!query || query.length < 2) {
      cardList.render([]);
      if (contentHeader) contentHeader.textContent = 'Search Results';
      return;
    }

    try {
      searchBtn.disabled = true;
      searchBtn.textContent = '⏳ Searching...';
      if (contentHeader) contentHeader.textContent = `Searching for "${query}"...`;
      
      const results = await autosuggest(query, 20);
      cardList.render(results);
      
      if (contentHeader) {
        contentHeader.textContent = results.length > 0 
          ? `Found ${results.length} places for "${query}"`
          : `No results for "${query}"`;
      }
    } catch (err) {
      console.error('Search error:', err);
      cardList.render([]);
      if (contentHeader) contentHeader.textContent = 'Search failed - please try again';
    } finally {
      searchBtn.disabled = false;
      searchBtn.textContent = '🔍 Search';
    }
  }

  // Refresh itinerary when storage changes
  window.addEventListener('storage', () => {
    itineraryPlanner.render();
  });

  // Periodic refresh for itinerary
  setInterval(() => {
    itineraryPlanner.render();
  }, 3000);

  // Initial message
  if (contentHeader) {
    contentHeader.textContent = 'Start by searching for places above';
  }
}

function initMapApp() {
  const mapView = new MapView('map');
  mapView.updateTripSummary();
  
  const centerBtn = document.getElementById('centerMap');
  const clearBtn = document.getElementById('clearMap');
  
  if (centerBtn) {
    centerBtn.addEventListener('click', () => mapView.centerMap());
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all places from your trip?')) {
        mapView.clearAllPlaces();
      }
    });
  }
}

// Initialize router
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleRoute);
} else {
  handleRoute();
}