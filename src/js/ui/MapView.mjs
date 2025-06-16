import { getPlaces } from '../itinerary.mjs';

export default class MapView {
  constructor(mapElementId) {
    console.log('MapView initialized for', mapElementId);
    this.places = getPlaces();
  }

  render() {
    console.log('Rendering places:', this.places);
  }
}