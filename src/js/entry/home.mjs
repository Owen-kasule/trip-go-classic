import { autosuggest } from '../services/opentrip.mjs';
import CardList from '../ui/CardList.mjs';
import CurrencyConverter from '../ui/CurrencyConverter.mjs';
import ItineraryPlanner from '../ui/ItineraryPlanner.mjs';

console.log('🏠 Home page script loading...');

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  console.log('📄 DOM still loading, waiting...');
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  console.log('📄 DOM already loaded, initializing...');
  initApp();
}

function initApp() {
  console.log('🚀 Initializing app...');
  
  // Initialize components
  console.log('🔧 Creating components...');
  const cardList = new CardList('.card-grid');
  const currencyConverter = new CurrencyConverter('.currency-section');
  const itineraryPlanner = new ItineraryPlanner('.itinerary-section');

  // Search functionality
  console.log('🔍 Setting up search...');
  const searchInput = document.querySelector('#searchInput');
  const searchBtn = document.querySelector('#searchBtn');
  const contentHeader = document.querySelector('.content-header h2');

  console.log('📋 Elements found:', {
    searchInput: !!searchInput,
    searchBtn: !!searchBtn,
    contentHeader: !!contentHeader
  });

  if (searchBtn && searchInput) {
    console.log('✅ Binding search events...');
    
    searchBtn.addEventListener('click', (e) => {
      console.log('🖱️ Search button clicked!');
      e.preventDefault();
      search();
    });
    
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        console.log('⌨️ Enter key pressed!');
        e.preventDefault();
        search();
      }
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
        console.log('📝 Auto-searching for:', query);
        searchTimeout = setTimeout(() => search(), 500);
      }
    });
  } else {
    console.error('❌ Search elements not found!');
  }

  async function search() {
    console.log('🔍 Search function called!');
    const query = searchInput.value.trim();
    console.log('📝 Search query:', query);
    
    if (!query || query.length < 2) {
      console.log('⚠️ Query too short, clearing results');
      cardList.render([]);
      if (contentHeader) contentHeader.textContent = 'Search Results';
      return;
    }

    try {
      console.log('🔄 Starting search...');
      searchBtn.disabled = true;
      searchBtn.textContent = '⏳ Searching...';
      if (contentHeader) contentHeader.textContent = `Searching for "${query}"...`;
      
      const results = await autosuggest(query, 20);
      console.log('📋 Search results:', results);
      
      cardList.render(results);
      
      if (contentHeader) {
        contentHeader.textContent = results.length > 0 
          ? `Found ${results.length} places for "${query}"`
          : `No results for "${query}"`;
      }
    } catch (err) {
      console.error('❌ Search error:', err);
      cardList.render([]);
      if (contentHeader) contentHeader.textContent = 'Search failed - please try again';
    } finally {
      searchBtn.disabled = false;
      searchBtn.textContent = '🔍 Search';
      console.log('✅ Search completed');
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

  // Initial search suggestion
  if (contentHeader) {
    contentHeader.textContent = 'Start by searching for places above';
  }
  
  console.log('✅ App initialization complete!');
}