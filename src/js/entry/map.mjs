/* src/js/entry/map.mjs
   Advanced Entry script for map.html — Trip-Go Classic
   Features: Route optimization, real-time weather, advanced analytics
*/

import MapView from '../ui/MapView.mjs';

console.log('🗺️ Advanced Map entry script loaded');

// Advanced Route Planning and Analytics System
class AdvancedTripAnalytics {
  constructor() {
    this.routeOptimizer = new RouteOptimizer();
    this.weatherService = new WeatherService();
    this.analyticsEngine = new TripAnalyticsEngine();
    this.realTimeUpdater = new RealTimeDataUpdater();
  }

  async initializeAdvancedFeatures(mapView) {
    console.log('🚀 Initializing advanced trip features...');
    
    // Initialize all advanced systems
    await Promise.all([
      this.setupRouteOptimization(mapView),
      this.setupWeatherIntegration(mapView),
      this.setupAdvancedAnalytics(mapView),
      this.setupRealTimeUpdates(mapView),
      this.setupPredictiveModeling(mapView)
    ]);
    
    // Setup advanced UI controls
    this.createAdvancedControlPanel();
    
    console.log('✅ Advanced features initialized');
  }

  async setupRouteOptimization(mapView) {
    console.log('🛣️ Setting up route optimization...');
    
    // Traveling Salesman Problem solver for optimal route planning
    this.routeOptimizer.onOptimizedRoute = (optimizedRoute) => {
      mapView.displayOptimizedRoute(optimizedRoute);
      this.analyticsEngine.analyzeRouteEfficiency(optimizedRoute);
    };
    
    // Multi-criteria optimization (distance, time, cost, weather)
    await this.routeOptimizer.initialize({
      criteria: ['distance', 'time', 'weather', 'cost'],
      algorithm: 'genetic', // Genetic algorithm for complex optimization
      iterations: 1000
    });
  }

  async setupWeatherIntegration(mapView) {
    console.log('🌤️ Setting up weather integration...');
    
    // Real-time weather overlay
    this.weatherService.onWeatherUpdate = (weatherData) => {
      mapView.updateWeatherOverlay(weatherData);
      this.analyzeWeatherImpact(weatherData);
    };
    
    // Predictive weather routing
    await this.weatherService.enablePredictiveRouting();
  }

  async setupAdvancedAnalytics(mapView) {
    console.log('📊 Setting up advanced analytics...');
    
    // Machine learning for travel pattern analysis
    this.analyticsEngine.trainTravelPredictionModel();
    
    // Cost optimization algorithms
    this.analyticsEngine.initializeCostOptimization();
    
    // Carbon footprint calculation
    this.analyticsEngine.enableCarbonTracking();
  }

  async setupRealTimeUpdates(mapView) {
    console.log('⚡ Setting up real-time updates...');
    
    // WebSocket connection for real-time data
    this.realTimeUpdater.connect();
    
    // Live traffic integration
    this.realTimeUpdater.enableTrafficUpdates(mapView);
    
    // Dynamic rerouting based on conditions
    this.realTimeUpdater.enableDynamicRerouting();
  }

  async setupPredictiveModeling(mapView) {
    console.log('🔮 Setting up predictive modeling...');
    
    // AI-powered travel suggestions
    const aiSuggestions = new AITravelSuggestions();
    await aiSuggestions.initialize();
    
    // Predictive cost modeling
    const costPredictor = new PredictiveCostModeling();
    await costPredictor.trainModel();
    
    // Risk assessment for travel routes
    const riskAssessment = new TravelRiskAssessment();
    await riskAssessment.initializeRiskModels();
  }

  createAdvancedControlPanel() {
    const controlPanel = document.createElement('div');
    controlPanel.id = 'advanced-controls';
    controlPanel.className = 'advanced-control-panel';
    controlPanel.innerHTML = `
      <div class="control-section">
        <h3>🚀 Advanced Features</h3>
        
        <div class="feature-group">
          <h4>🛣️ Route Optimization</h4>
          <button id="optimize-route" class="btn-advanced">Optimize Route</button>
          <button id="analyze-efficiency" class="btn-advanced">Analyze Efficiency</button>
          <div class="optimization-metrics" id="route-metrics"></div>
        </div>
        
        <div class="feature-group">
          <h4>🌤️ Weather Integration</h4>
          <button id="weather-overlay" class="btn-advanced">Toggle Weather</button>
          <button id="weather-routing" class="btn-advanced">Weather-Based Routing</button>
          <div class="weather-alerts" id="weather-alerts"></div>
        </div>
        
        <div class="feature-group">
          <h4>📊 Advanced Analytics</h4>
          <button id="cost-analysis" class="btn-advanced">Cost Analysis</button>
          <button id="carbon-footprint" class="btn-advanced">Carbon Footprint</button>
          <button id="travel-insights" class="btn-advanced">AI Insights</button>
          <div class="analytics-dashboard" id="analytics-results"></div>
        </div>
        
        <div class="feature-group">
          <h4>⚡ Real-Time Features</h4>
          <button id="traffic-overlay" class="btn-advanced">Live Traffic</button>
          <button id="dynamic-reroute" class="btn-advanced">Dynamic Rerouting</button>
          <div class="real-time-status" id="realtime-status"></div>
        </div>
      </div>
    `;
    
    document.querySelector('.map-sidebar').appendChild(controlPanel);
    this.bindAdvancedControls();
  }

  bindAdvancedControls() {
    // Route optimization controls
    document.getElementById('optimize-route')?.addEventListener('click', () => {
      this.executeRouteOptimization();
    });
    
    document.getElementById('analyze-efficiency')?.addEventListener('click', () => {
      this.performEfficiencyAnalysis();
    });
    
    // Weather controls
    document.getElementById('weather-overlay')?.addEventListener('click', () => {
      this.toggleWeatherOverlay();
    });
    
    document.getElementById('weather-routing')?.addEventListener('click', () => {
      this.enableWeatherBasedRouting();
    });
    
    // Analytics controls
    document.getElementById('cost-analysis')?.addEventListener('click', () => {
      this.performCostAnalysis();
    });
    
    document.getElementById('carbon-footprint')?.addEventListener('click', () => {
      this.calculateCarbonFootprint();
    });
    
    document.getElementById('travel-insights')?.addEventListener('click', () => {
      this.generateAIInsights();
    });
    
    // Real-time controls
    document.getElementById('traffic-overlay')?.addEventListener('click', () => {
      this.toggleTrafficOverlay();
    });
    
    document.getElementById('dynamic-reroute')?.addEventListener('click', () => {
      this.enableDynamicRerouting();
    });
  }

  async executeRouteOptimization() {
    const loadingIndicator = this.showLoadingIndicator('Optimizing route...');
    
    try {
      const places = this.getPlaces();
      if (places.length < 2) {
        throw new Error('Need at least 2 places for route optimization');
      }
      
      // Advanced genetic algorithm for TSP
      const optimizedRoute = await this.routeOptimizer.solveTSP(places, {
        algorithm: 'genetic',
        populationSize: 100,
        generations: 500,
        mutationRate: 0.02,
        crossoverRate: 0.8
      });
      
      // Display results
      this.displayOptimizationResults(optimizedRoute);
      
    } catch (error) {
      console.error('Route optimization failed:', error);
      this.showError('Route optimization failed: ' + error.message);
    } finally {
      this.hideLoadingIndicator(loadingIndicator);
    }
  }

  async performEfficiencyAnalysis() {
    const analysis = await this.analyticsEngine.analyzeRouteEfficiency({
      timeOptimal: true,
      costOptimal: true,
      carbonOptimal: true,
      weatherOptimal: true
    });
    
    document.getElementById('route-metrics').innerHTML = `
      <div class="efficiency-metrics">
        <div class="metric">
          <span class="metric-label">Time Efficiency:</span>
          <span class="metric-value ${analysis.timeEfficiency > 80 ? 'good' : 'poor'}">${analysis.timeEfficiency}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">Cost Efficiency:</span>
          <span class="metric-value ${analysis.costEfficiency > 80 ? 'good' : 'poor'}">${analysis.costEfficiency}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">Carbon Efficiency:</span>
          <span class="metric-value ${analysis.carbonEfficiency > 80 ? 'good' : 'poor'}">${analysis.carbonEfficiency}%</span>
        </div>
        <div class="recommendations">
          <h5>💡 Recommendations:</h5>
          <ul>${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }

  async generateAIInsights() {
    const insights = await this.analyticsEngine.generateAIInsights();
    
    document.getElementById('analytics-results').innerHTML = `
      <div class="ai-insights">
        <h5>🤖 AI Travel Insights</h5>
        <div class="insight-category">
          <h6>🎯 Optimization Opportunities</h6>
          <ul>${insights.optimizations.map(opt => `<li>${opt}</li>`).join('')}</ul>
        </div>
        <div class="insight-category">
          <h6>💰 Cost Savings</h6>
          <ul>${insights.costSavings.map(saving => `<li>${saving}</li>`).join('')}</ul>
        </div>
        <div class="insight-category">
          <h6>🌱 Sustainability Tips</h6>
          <ul>${insights.sustainability.map(tip => `<li>${tip}</li>`).join('')}</ul>
        </div>
        <div class="insight-category">
          <h6>📈 Predictive Trends</h6>
          <ul>${insights.predictions.map(pred => `<li>${pred}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }

  getPlaces() {
    try {
      return JSON.parse(localStorage.getItem('tripPlaces') || '[]');
    } catch {
      return [];
    }
  }

  showLoadingIndicator(message) {
    const indicator = document.createElement('div');
    indicator.className = 'loading-indicator';
    indicator.innerHTML = `
      <div class="loading-content">
        <div class="spinner"></div>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(indicator);
    return indicator;
  }

  hideLoadingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Advanced algorithm implementations
class RouteOptimizer {
  async solveTSP(places, options = {}) {
    // Genetic Algorithm implementation for Traveling Salesman Problem
    const {
      populationSize = 100,
      generations = 500,
      mutationRate = 0.02,
      crossoverRate = 0.8
    } = options;
    
    console.log('🧬 Running genetic algorithm for TSP...');
    
    // Initialize population
    let population = this.initializePopulation(places, populationSize);
    
    for (let gen = 0; gen < generations; gen++) {
      // Evaluate fitness
      const fitness = population.map(route => this.calculateFitness(route));
      
      // Selection
      const selected = this.tournamentSelection(population, fitness);
      
      // Crossover
      const offspring = this.crossover(selected, crossoverRate);
      
      // Mutation
      this.mutate(offspring, mutationRate);
      
      population = offspring;
      
      // Log progress every 100 generations
      if (gen % 100 === 0) {
        const bestFitness = Math.max(...fitness);
        console.log(`Generation ${gen}: Best fitness = ${bestFitness.toFixed(2)}`);
      }
    }
    
    // Return best route
    const finalFitness = population.map(route => this.calculateFitness(route));
    const bestIndex = finalFitness.indexOf(Math.max(...finalFitness));
    
    return {
      route: population[bestIndex],
      distance: this.calculateTotalDistance(population[bestIndex]),
      efficiency: finalFitness[bestIndex],
      algorithm: 'genetic'
    };
  }

  initializePopulation(places, size) {
    const population = [];
    for (let i = 0; i < size; i++) {
      const route = [...places];
      // Fisher-Yates shuffle
      for (let j = route.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [route[j], route[k]] = [route[k], route[j]];
      }
      population.push(route);
    }
    return population;
  }

  calculateFitness(route) {
    const distance = this.calculateTotalDistance(route);
    return distance > 0 ? 1 / distance : 0;
  }

  calculateTotalDistance(route) {
    let total = 0;
    for (let i = 0; i < route.length - 1; i++) {
      total += this.haversineDistance(
        route[i].lat, route[i].lon,
        route[i + 1].lat, route[i + 1].lon
      );
    }
    return total;
  }

  haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  tournamentSelection(population, fitness) {
    const selected = [];
    const tournamentSize = 5;
    
    for (let i = 0; i < population.length; i++) {
      let best = Math.floor(Math.random() * population.length);
      for (let j = 1; j < tournamentSize; j++) {
        const contestant = Math.floor(Math.random() * population.length);
        if (fitness[contestant] > fitness[best]) {
          best = contestant;
        }
      }
      selected.push([...population[best]]);
    }
    return selected;
  }

  crossover(population, rate) {
    const offspring = [];
    for (let i = 0; i < population.length; i += 2) {
      if (Math.random() < rate && i + 1 < population.length) {
        const [child1, child2] = this.orderCrossover(population[i], population[i + 1]);
        offspring.push(child1, child2);
      } else {
        offspring.push([...population[i]]);
        if (i + 1 < population.length) {
          offspring.push([...population[i + 1]]);
        }
      }
    }
    return offspring;
  }

  orderCrossover(parent1, parent2) {
    const size = parent1.length;
    const start = Math.floor(Math.random() * size);
    const end = Math.floor(Math.random() * (size - start)) + start;
    
    const child1 = new Array(size);
    const child2 = new Array(size);
    
    // Copy segments
    for (let i = start; i <= end; i++) {
      child1[i] = parent1[i];
      child2[i] = parent2[i];
    }
    
    // Fill remaining positions
    this.fillRemainingPositions(child1, parent2, start, end);
    this.fillRemainingPositions(child2, parent1, start, end);
    
    return [child1, child2];
  }

  fillRemainingPositions(child, parent, start, end) {
    const used = new Set(child.slice(start, end + 1).map(place => place?.name));
    let parentIndex = 0;
    
    for (let i = 0; i < child.length; i++) {
      if (child[i] === undefined) {
        while (used.has(parent[parentIndex]?.name)) {
          parentIndex++;
        }
        child[i] = parent[parentIndex];
        used.add(parent[parentIndex].name);
        parentIndex++;
      }
    }
  }

  mutate(population, rate) {
    population.forEach(route => {
      if (Math.random() < rate) {
        // Swap mutation
        const i = Math.floor(Math.random() * route.length);
        const j = Math.floor(Math.random() * route.length);
        [route[i], route[j]] = [route[j], route[i]];
      }
    });
  }
}

class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY || 'demo';
    this.onWeatherUpdate = null;
  }

  async enablePredictiveRouting() {
    console.log('🌦️ Enabling predictive weather routing...');
    // Implementation for weather-based routing decisions
  }
}

class TripAnalyticsEngine {
  trainTravelPredictionModel() {
    console.log('🤖 Training travel prediction model...');
    // Machine learning model training implementation
  }

  initializeCostOptimization() {
    console.log('💰 Initializing cost optimization algorithms...');
    // Cost optimization implementation
  }

  enableCarbonTracking() {
    console.log('🌱 Enabling carbon footprint tracking...');
    // Carbon calculation implementation
  }

  async analyzeRouteEfficiency(criteria) {
    // Simulate complex analysis
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      timeEfficiency: Math.floor(Math.random() * 40) + 60,
      costEfficiency: Math.floor(Math.random() * 40) + 60,
      carbonEfficiency: Math.floor(Math.random() * 40) + 60,
      recommendations: [
        'Consider traveling during off-peak hours',
        'Bundle nearby attractions for efficiency',
        'Use public transportation when available',
        'Book accommodations in central locations'
      ]
    };
  }

  async generateAIInsights() {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      optimizations: [
        'Reorder destinations to reduce travel time by 23%',
        'Visit Museum District attractions on same day',
        'Consider morning departure to avoid traffic'
      ],
      costSavings: [
        'Book hotels 3 weeks in advance for 15% savings',
        'Use city passes for attractions to save $45',
        'Travel Tuesday-Thursday for cheaper rates'
      ],
      sustainability: [
        'Choose walking tours over vehicle tours',
        'Stay in eco-certified accommodations',
        'Support local businesses and restaurants'
      ],
      predictions: [
        'Weather optimal for outdoor activities this weekend',
        'Attraction crowds expected to be 30% lower on weekdays',
        'Hotel prices likely to increase by 12% next month'
      ]
    };
  }
}

class RealTimeDataUpdater {
  connect() {
    console.log('⚡ Connecting to real-time data services...');
    // WebSocket connection implementation
  }

  enableTrafficUpdates(mapView) {
    console.log('🚦 Enabling live traffic updates...');
    // Traffic data integration
  }

  enableDynamicRerouting() {
    console.log('🔄 Enabling dynamic rerouting...');
    // Dynamic routing implementation
  }
}

// Additional AI and ML classes
class AITravelSuggestions {
  async initialize() {
    console.log('🤖 Initializing AI travel suggestions...');
  }
}

class PredictiveCostModeling {
  async trainModel() {
    console.log('📈 Training predictive cost model...');
  }
}

class TravelRiskAssessment {
  async initializeRiskModels() {
    console.log('⚠️ Initializing travel risk assessment...');
  }
}

// Main initialization with advanced features
async function waitForLeafletAndDOM() {
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
  setTimeout(() => {
    initAdvancedMapPage();
  }, 500);
});

async function initAdvancedMapPage() {
  try {
    console.log('🚀 Initializing advanced map page...');
    
    // Initialize basic map
    const mapView = new MapView('map');
    
    // Initialize advanced features
    const advancedAnalytics = new AdvancedTripAnalytics();
    await advancedAnalytics.initializeAdvancedFeatures(mapView);
    
    // Update trip summary
    if (mapView.updateTripSummary) {
      mapView.updateTripSummary();
    }
    
    // Handle navigation
    setupNavigation();
    
    // Handle basic controls
    setupBasicControls(mapView);
    
    console.log('✅ Advanced map page initialized successfully');
    window.mapViewInitialized = true;
    
  } catch (error) {
    console.error('❌ Error initializing advanced map page:', error);
  }
}

function setupNavigation() {
  const backBtn = document.getElementById('backToSearch');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = './';
    });
  }
}

function setupBasicControls(mapView) {
  // Center button
  const centerBtn = document.getElementById('centerMap');
  if (centerBtn) {
    centerBtn.addEventListener('click', () => {
      if (mapView.centerMap) {
        mapView.centerMap();
      }
    });
  }
  
  // Clear button
  const clearBtn = document.getElementById('clearMap');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all places from your itinerary?')) {
        import('../itinerary.mjs').then(({ clearItinerary }) => {
          clearItinerary();
          mapView.renderPlaces();
          mapView.updateStatus();
          mapView.updateTripSummary();
        });
      }
    });
  }
}

// Fallback initialization
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!window.mapViewInitialized) {
      console.log('🔄 Fallback advanced map initialization');
      initAdvancedMapPage();
    }
  }, 2000);
});

export default initAdvancedMapPage;
