console.log('🏠 Trip Go Classic - Home page loading...');

// Global variables
let searchResults = [];
let itinerary = [];

// Enhanced search database
const searchDatabase = {
  'canada': [
    { name: 'CN Tower', address: 'Toronto, Ontario', lat: 43.6426, lon: -79.3871, description: 'Iconic telecommunications tower and tourist attraction' },
    { name: 'Banff National Park', address: 'Alberta', lat: 51.4968, lon: -115.9281, description: 'Stunning mountain landscapes and wildlife' },
    { name: 'Parliament Hill', address: 'Ottawa, Ontario', lat: 45.4215, lon: -75.7001, description: 'Canada\'s political center with Gothic Revival architecture' },
    { name: 'Stanley Park', address: 'Vancouver, BC', lat: 49.3017, lon: -123.1444, description: 'Large urban park with seawall and beaches' },
    { name: 'Old Quebec', address: 'Quebec City, Quebec', lat: 46.8131, lon: -71.2075, description: 'Historic walled city with European charm' }
  ],
  'uganda': [
    { name: 'Bwindi Impenetrable Forest', address: 'Southwestern Uganda', lat: -1.0667, lon: 29.6667, description: 'Home to mountain gorillas and diverse wildlife' },
    { name: 'Lake Victoria', address: 'Central Uganda', lat: 0.5, lon: 33.0, description: 'Africa\'s largest lake with fishing villages' },
    { name: 'Murchison Falls', address: 'Northern Uganda', lat: 2.283, lon: 31.683, description: 'Spectacular waterfall on the Nile River' },
    { name: 'Kampala City Centre', address: 'Kampala, Uganda', lat: 0.3476, lon: 32.5825, description: 'Bustling capital city with markets and culture' },
    { name: 'Queen Elizabeth National Park', address: 'Western Uganda', lat: -0.25, lon: 29.75, description: 'Diverse ecosystems with lions, elephants, and hippos' }
  ],
  'paris': [
    { name: 'Eiffel Tower', address: 'Champ de Mars, Paris', lat: 48.8584, lon: 2.2945, description: 'Iconic iron lattice tower and symbol of Paris' },
    { name: 'Louvre Museum', address: '1st arrondissement, Paris', lat: 48.8606, lon: 2.3376, description: 'World\'s largest art museum' },
    { name: 'Notre-Dame Cathedral', address: 'Île de la Cité, Paris', lat: 48.8530, lon: 2.3499, description: 'Gothic cathedral masterpiece' },
    { name: 'Arc de Triomphe', address: 'Champs-Élysées, Paris', lat: 48.8738, lon: 2.2950, description: 'Triumphal arch honoring French military' },
    { name: 'Montmartre', address: '18th arrondissement, Paris', lat: 48.8867, lon: 2.3431, description: 'Historic hilltop district with Sacré-Cœur' }
  ],
  'london': [
    { name: 'Big Ben', address: 'Westminster, London', lat: 51.4994, lon: -0.1245, description: 'Famous clock tower at Houses of Parliament' },
    { name: 'Tower Bridge', address: 'Tower Hamlets, London', lat: 51.5055, lon: -0.0754, description: 'Victorian bascule bridge over Thames' },
    { name: 'British Museum', address: 'Bloomsbury, London', lat: 51.5194, lon: -0.1270, description: 'World-famous museum of human history' },
    { name: 'Buckingham Palace', address: 'Westminster, London', lat: 51.5014, lon: -0.1419, description: 'Official residence of British monarchy' },
    { name: 'London Eye', address: 'South Bank, London', lat: 51.5033, lon: -0.1196, description: 'Giant observation wheel on Thames' }
  ]
};

// Utility functions
function showMessage(elementId, message, type = 'info') {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = `<div class="${type}">${message}</div>`;
  }
}

function loadItinerary() {
  try {
    const stored = localStorage.getItem('tripPlaces');
    itinerary = stored ? JSON.parse(stored) : [];
    updateItineraryDisplay();
    console.log(`📋 Loaded ${itinerary.length} items from itinerary`);
  } catch (e) {
    console.error('Error loading itinerary:', e);
    itinerary = [];
  }
}

function saveItinerary() {
  try {
    localStorage.setItem('tripPlaces', JSON.stringify(itinerary));
    console.log('✅ Itinerary saved to localStorage');
  } catch (e) {
    console.error('Error saving itinerary:', e);
  }
}

function updateItineraryDisplay() {
  const listElement = document.getElementById('itineraryList');
  const clearBtn = document.getElementById('clearItinerary');
  
  if (!listElement) return;
  
  if (itinerary.length === 0) {
    listElement.innerHTML = '<p class="empty-message">Your itinerary is empty. Search and add places to get started!</p>';
    if (clearBtn) clearBtn.style.display = 'none';
    return;
  }
  
  let html = '';
  itinerary.forEach((place, index) => {
    html += `
      <div class="itinerary-item">
        <div>
          <div class="place-name">${place.name}</div>
          ${place.address ? `<div style="font-size: 0.875rem; color: #6b7280;">${place.address}</div>` : ''}
        </div>
        <button onclick="removeFromItinerary(${index})" class="btn-remove">Remove</button>
      </div>
    `;
  });
  
  listElement.innerHTML = html;
  if (clearBtn) clearBtn.style.display = 'block';
}

function addToItinerary(place) {
  // Check if place already exists
  const exists = itinerary.some(item => item.name === place.name);
  if (exists) {
    showMessage('searchResults', `📍 "${place.name}" is already in your itinerary!`, 'error');
    setTimeout(() => displaySearchResults(searchResults), 3000);
    return;
  }
  
  itinerary.push(place);
  saveItinerary();
  updateItineraryDisplay();
  showMessage('searchResults', `✅ Added "${place.name}" to your itinerary!`, 'success');
  
  // Clear success message after 3 seconds
  setTimeout(() => {
    displaySearchResults(searchResults);
  }, 3000);
}

function removeFromItinerary(index) {
  const place = itinerary[index];
  itinerary.splice(index, 1);
  saveItinerary();
  updateItineraryDisplay();
  console.log(`✅ Removed "${place.name}" from itinerary`);
}

function clearAllItinerary() {
  if (confirm('Are you sure you want to clear your entire itinerary?')) {
    itinerary = [];
    saveItinerary();
    updateItineraryDisplay();
    console.log('✅ Cleared entire itinerary');
  }
}

function searchPlaces(query) {
  const resultsElement = document.getElementById('searchResults');
  
  if (!query.trim()) {
    showMessage('searchResults', 'Please enter a search term', 'error');
    return;
  }
  
  // Show loading
  if (resultsElement) {
    resultsElement.innerHTML = '<div class="loading">🔍 Searching for places...</div>';
  }
  
  // Simulate API delay
  setTimeout(() => {
    const queryLower = query.toLowerCase();
    let results = [];
    
    // Search in predefined database
    for (const [location, places] of Object.entries(searchDatabase)) {
      if (location.includes(queryLower) || queryLower.includes(location)) {
        results = places;
        break;
      }
    }
    
    // If no exact match, create generic results
    if (results.length === 0) {
      results = [
        {
          name: `${query} City Center`,
          address: `Downtown ${query}`,
          lat: Math.random() * 180 - 90,
          lon: Math.random() * 360 - 180,
          description: 'Historic city center with shops, restaurants, and cultural attractions'
        },
        {
          name: `${query} Museum`,
          address: `Cultural District, ${query}`,
          lat: Math.random() * 180 - 90,
          lon: Math.random() * 360 - 180,
          description: 'Local museum showcasing regional history and culture'
        },
        {
          name: `${query} Central Park`,
          address: `Green Space, ${query}`,
          lat: Math.random() * 180 - 90,
          lon: Math.random() * 360 - 180,
          description: 'Beautiful public park perfect for relaxation and outdoor activities'
        },
        {
          name: `${query} Market Square`,
          address: `Old Town, ${query}`,
          lat: Math.random() * 180 - 90,
          lon: Math.random() * 360 - 180,
          description: 'Bustling marketplace with local vendors, crafts, and food'
        }
      ];
    }
    
    searchResults = results;
    displaySearchResults(results);
    console.log(`🔍 Found ${results.length} results for "${query}"`);
  }, 800);
}

function displaySearchResults(results) {
  const resultsElement = document.getElementById('searchResults');
  if (!resultsElement) return;
  
  if (results.length === 0) {
    resultsElement.innerHTML = '<div class="loading">No places found. Try searching for "Canada", "Uganda", "Paris", or "London" for sample results!</div>';
    return;
  }
  
  let html = `<h3 style="margin-bottom: 1.5rem; color: #1f2937;">Found ${results.length} amazing places:</h3>`;
  results.forEach((place, index) => {
    html += `
      <div class="place-card">
        <div class="place-name">${place.name}</div>
        ${place.address ? `<div class="place-address">📍 ${place.address}</div>` : ''}
        ${place.description ? `<div style="font-size: 0.9rem; color: #4b5563; margin-bottom: 1rem;">${place.description}</div>` : ''}
        <div class="place-actions">
          <button onclick="addToItinerary(searchResults[${index}])" class="btn-add">
            ➕ Add to Itinerary
          </button>
        </div>
      </div>
    `;
  });
  
  resultsElement.innerHTML = html;
}

function convertCurrency() {
  const fromAmount = parseFloat(document.getElementById('fromAmount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const toAmountElement = document.getElementById('toAmount');
  const resultElement = document.getElementById('conversionResult');
  
  if (!fromAmount || fromAmount <= 0) {
    if (resultElement) resultElement.innerHTML = '<div class="error">Please enter a valid amount</div>';
    return;
  }
  
  if (fromCurrency === toCurrency) {
    if (toAmountElement) toAmountElement.value = fromAmount.toFixed(2);
    if (resultElement) resultElement.innerHTML = `1 ${fromCurrency} = 1 ${toCurrency}`;
    return;
  }
  
  // Enhanced exchange rates
  const exchangeRates = {
    'USD': { 'UGX': 3740, 'EUR': 0.85, 'GBP': 0.73, 'KES': 128, 'TZS': 2320 },
    'EUR': { 'USD': 1.18, 'UGX': 4412, 'GBP': 0.86, 'KES': 151, 'TZS': 2737 },
    'GBP': { 'USD': 1.37, 'EUR': 1.16, 'UGX': 5123, 'KES': 175, 'TZS': 3178 },
    'UGX': { 'USD': 0.000267, 'EUR': 0.000227, 'GBP': 0.000195, 'KES': 0.0342, 'TZS': 0.620 },
    'KES': { 'USD': 0.0078, 'EUR': 0.0066, 'GBP': 0.0057, 'UGX': 29.2, 'TZS': 18.1 },
    'TZS': { 'USD': 0.00043, 'EUR': 0.00037, 'GBP': 0.00031, 'UGX': 1.61, 'KES': 0.055 }
  };
  
  if (resultElement) resultElement.innerHTML = '💱 Converting...';
  
  setTimeout(() => {
    let rate = 1;
    if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
      rate = exchangeRates[fromCurrency][toCurrency];
    }
    
    const convertedAmount = fromAmount * rate;
    
    if (toAmountElement) toAmountElement.value = convertedAmount.toFixed(2);
    if (resultElement) {
      resultElement.innerHTML = `
        <div style="color: #059669; background: #f0fdf4; padding: 1rem; border-radius: 8px;">
          ✅ ${fromAmount.toLocaleString()} ${fromCurrency} = ${convertedAmount.toLocaleString()} ${toCurrency}<br>
          <small style="opacity: 0.8;">Rate: 1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}</small>
        </div>
      `;
    }
  }, 300);
}

// Event handlers
function setupEventHandlers() {
  // Search functionality
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput ? searchInput.value : '';
      searchPlaces(query);
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchPlaces(searchInput.value);
      }
    });
  }
  
  // Currency converter
  const convertBtn = document.getElementById('convertBtn');
  if (convertBtn) {
    convertBtn.addEventListener('click', convertCurrency);
  }
  
  // Auto-convert when values change
  ['fromAmount', 'fromCurrency', 'toCurrency'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', convertCurrency);
      element.addEventListener('input', convertCurrency);
    }
  });
  
  // Clear itinerary
  const clearBtn = document.getElementById('clearItinerary');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllItinerary);
  }
}

// Make functions globally available
window.addToItinerary = addToItinerary;
window.removeFromItinerary = removeFromItinerary;
window.searchResults = searchResults;

// Initialize the page
function initializePage() {
  console.log('🚀 Initializing Trip Go Classic...');
  loadItinerary();
  setupEventHandlers();
  convertCurrency(); // Load initial conversion
  console.log('✅ Trip Go Classic initialized successfully');
}

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}

console.log('🏠 Trip Go Classic loaded successfully');