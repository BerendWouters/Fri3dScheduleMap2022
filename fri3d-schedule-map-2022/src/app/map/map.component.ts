import { Component, Input, OnInit } from '@angular/core';
import {
  tileLayer,
  latLng,
  circle,
  Circle,
  marker,
  Layer,
  Marker,
  Icon,
  icon,
} from 'leaflet';
import { getRoomColor, getLocations, Location, getLocationColor } from '../shared/locations.model';

@Component({
  selector: 'fri3d-schedule-map-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() set selectedRoom(value: string) {
    this.renderMarker(value);
  }

  constructor() { }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 17,
    center: latLng(50.7998, 4.66844),
  };

  layers: Layer[] = [];

  marker!: Marker;

  locations: Location[] = [];

  ngOnInit() {
    this.locations = getLocations();
    this.layers = this.locations.map((x: Location) =>
      circle(x.location, {
        fillColor: x.color,
        fill: true,
        stroke: false,
        fillOpacity: 100,
      })
    );
  }

  renderMarker(room: string) {
    const location = getLocations().find((x) =>
      x.eventLocations.some((loc) => loc === room)
    );
    if (location) {
      this.marker = marker(location.location, {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      })
    }
  }
  getRoomColor(room: string){
    return getLocationColor(room);
  }
}
