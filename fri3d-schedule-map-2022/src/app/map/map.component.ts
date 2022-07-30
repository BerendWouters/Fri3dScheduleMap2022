import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, Circle } from 'leaflet';
import { getLocations, Location } from '../shared/locations.model';

@Component({
  selector: 'fri3d-schedule-map-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor() {}

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 17,
    center: latLng(50.7998, 4.66434),
  };

  layers: Circle[] = [];

  ngOnInit() {
    const locations = getLocations();
    this.layers = locations.map((x: Location) =>
      circle(x.location, {
        fillColor: x.color,
        fill: true,
        stroke: false,
        fillOpacity: 100,
      })
    );
  }
}
