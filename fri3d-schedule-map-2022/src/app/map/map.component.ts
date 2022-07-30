import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'fri3d-schedule-map-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  constructor() {}

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 17,
    center: latLng(50.79896, 4.66434),
  };
}
