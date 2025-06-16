import { getPlaces, removePlace, updatePlaceDay, getTripDays } from '../itinerary.mjs';
import { toast } from '../core/alert.mjs';

export default class ItineraryPlanner {
  constructor(parentSelector) {
    this.parent = document.querySelector(parentSelector);
    this.render();
    this.bindEvents();
  }

  render() {
    const places = getPlaces();
    const days = getTripDays();

    if (!places.length) {
      this.parent.innerHTML = `
        <div class="itinerary-empty">
          <h3>�� Your Trip Itinerary</h3>
          <p>No places added yet. Search and add some places to get started!</p>
        </div>
      `;
      return;
    }

    this.parent.innerHTML = `
      <div class="itinerary-planner">
        <div class="itinerary-header">
          <h3>📋 Your Trip Itinerary (${places.length} places)</h3>
          <button id="clearTrip" class="btn-clear">Clear All</button>
        </div>
        ${days.map(day => this.renderDay(day, places.filter(p => p.day === day))).join('')}
        <button id="addDay" class="btn-add-day">+ Add Day</button>
      </div>
    `;
  }

  renderDay(day, places) {
    return `
      <div class="trip-day" data-day="${day}">
        <h4>Day ${day} (${places.length} places)</h4>
        <div class="day-places">
          ${places.map(place => `
            <div class="itinerary-item" data-place-id="${place.id}">
              <div class="place-info">
                <span class="place-name">${place.name}</span>
                <span class="place-kind">${place.kind}</span>
              </div>
              <div class="place-actions">
                <select class="day-selector" data-place-id="${place.id}">
                  ${[1,2,3,4,5,6,7].map(d => 
                    `<option value="${d}" ${d === day ? 'selected' : ''}>Day ${d}</option>`
                  ).join('')}
                </select>
                <button class="btn-remove" data-place-id="${place.id}">×</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    this.parent.addEventListener('click', (e) => {
      if (e.target.matches('.btn-remove')) {
        const placeId = e.target.dataset.placeId;
        removePlace(placeId);
        toast('Place removed from trip');
        this.render();
      }
      
      if (e.target.matches('#clearTrip')) {
        if (confirm('Clear your entire trip?')) {
          localStorage.removeItem('tgc-itinerary');
          toast('Trip cleared');
          this.render();
        }
      }
    });

    this.parent.addEventListener('change', (e) => {
      if (e.target.matches('.day-selector')) {
        const placeId = e.target.dataset.placeId;
        const newDay = parseInt(e.target.value);
        updatePlaceDay(placeId, newDay);
        toast(`Moved to Day ${newDay}`);
        this.render();
      }
    });
  }
}
