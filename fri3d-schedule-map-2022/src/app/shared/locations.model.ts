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
      color: '#8835c9',
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
      color: '#ff3e3e',
      location: [50.79866, 4.66632],
    },
    {
      name: 'Shelter',
      eventLocations: ['Shelter'],
      color: '#c085ff',
      location: [50.79917, 4.66494],
    },
    {
      name: 'Knutselbaar',
      eventLocations: ['Ingegno', 'Junior hacking'],
      color: '#ffad64',
      location: [50.80083, 4.66367],
    },
    {
      name: 'Kapel',
      eventLocations: ['Kapel'],
      color: '#3ce8b3',
      location: [50.79842, 4.66588],
    },
    {
      name: 'Hardware hacking',
      eventLocations: ['Hardware hacking area'],
      color: '#2fad83',
      location: [50.80034, 4.6639],
    },
    {
      name: 'Buitenpodium',
      eventLocations: ['Buitenpodium'],
      color: '#c1402F',
      location: [50.80064, 4.66466],
    },
  ];
}

export function getLocationColor(location: string) {
  const existingLocations = getLocations();
  const color = existingLocations.find((x) => x.name === location)?.color;
  return color;
}

export function getRoomColor(room: string) {
  const location = room;
  const existingLocations = getLocations();
  const roomColor = existingLocations.find((x) =>
    x.eventLocations.some((loc) => loc === location)
  )?.color;
  return roomColor;
}
