import { addPlace } from '../itinerary.mjs';
import { toast } from '../core/alert.mjs';

export default class CardList {
  constructor(parentSelector) {
    console.log('📦 CardList: Initializing with selector:', parentSelector);
    this.parent = document.querySelector(parentSelector);
    console.log('📦 CardList: Parent element found:', !!this.parent);
    
    if (!this.parent) {
      console.error('❌ CardList: Parent element not found!');
      return;
    }
    
    this.parent.addEventListener('click', (e) => {
      if (e.target.dataset.add) {
        console.log('➕ Adding place:', e.target.dataset.add);
        addPlace(JSON.parse(e.target.dataset.add));
        toast('✓ Added to your trip!');
      }
    });
  }

  render(items) {
    console.log('🎨 CardList: Rendering', items.length, 'items');
    
    if (!this.parent) {
      console.error('❌ CardList: Cannot render, parent element missing');
      return;
    }
    
    if (!items.length) {
      this.parent.innerHTML = '<p class="no-results">No places found. Try a different search term.</p>';
      return;
    }

    this.parent.innerHTML = items
      .map(
        (p) => `
      <article class="card" data-place-id="${p.id}">
        <div class="card-header">
          <h3>${p.name || 'Unknown Place'}</h3>
          <span class="card-type">${this.formatKind(p.kind)}</span>
        </div>
        <div class="card-content">
          <p class="coordinates">📍 ${p.lat?.toFixed(4)}, ${p.lon?.toFixed(4)}</p>
          ${p.kinds ? `<p class="tags">${this.formatTags(p.kinds)}</p>` : ''}
        </div>
        <div class="card-actions">
          <button class="btn-add" data-add='${JSON.stringify(p)}'>
            <span>+</span> Add to Trip
          </button>
        </div>
      </article>`
      )
      .join('');
      
    console.log('✅ CardList: Render complete');
  }

  formatKind(kind) {
    return kind?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Place';
  }

  formatTags(kinds) {
    return kinds.split(',').slice(0, 3).map(tag => 
      `<span class="tag">${tag.replace(/_/g, ' ')}</span>`
    ).join('');
  }
}