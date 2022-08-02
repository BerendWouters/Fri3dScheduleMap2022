import { latLng, LatLng, LatLngExpression } from 'leaflet';

export interface Location {
  name: string;
  color: string;
  location: LatLngExpression;
  eventLocations: string[];
}

export function getLocations(): Location[] {
  return [
    {
      name: 'Circustent',
      eventLocations: ['Main One', 'Main Two', 'Solder Station'],
      color: '#ac4052',
      location: [50.80036, 4.66432],
    },
    {
      name: 'Hoofdgebouw',
      eventLocations: [
        'Medium Mosfet',
        'Low Voltage',
        'Tiny Tesseract',
        'Large LED',
        'Stille ruimte',
      ],
      color: '#badc0d',
      location: [50.79866, 4.66632],
    },
    {
      name: 'Shelter',
      eventLocations: ['Shelter'],
      color: '#fa4099',
      location: [50.79917, 4.66494],
    },
    {
      name: 'Knutselbaar',
      eventLocations: ['Ingegno', 'Junior hacking'],
      color: '#4b0e76',
      location: [50.80083, 4.66367],
    },
    {
      name: 'Kapel',
      eventLocations: ['Kapel'],
      color: '#04dc0d',
      location: [50.79842, 4.66588],
    },
    {
      name: 'Hardware hacking',
      eventLocations: ['Hardware hacking area'],
      color: '#3793ba',
      location: [50.80034, 4.6639],
    },
  ];
}
