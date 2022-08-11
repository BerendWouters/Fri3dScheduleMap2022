export interface Root {
  schedule: Schedule;
}

export interface Schedule {
  version: string;
  base_url: string;
  conference: Conference;
}

export interface Conference {
  acronym: string;
  title: string;
  start: string;
  end: string;
  daysCount: number;
  timeslot_duration: string;
  days: Day[];
}

export interface Day {
  index: number;
  date: string;
  day_start: string;
  day_end: string;
  rooms: RoomEvents;
}

export interface RoomEvents {
  'Main One': Event[];
  'Main Two': Event[];
  'Junior hacking': Event[];
  Kapel: Event[];
  Shelter: Event[];
  Terrein: Event[];
  'Hardware hacking area': Event[];
  'Medium Mosfet': Event[];
  'Doorlopend programma': Event[];
  'Low Voltage': Event[];
  'Tiny Tesseract': Event[];
  'Large LED': Event[];
  Buitenpodium: Event[];
  Blokhut?: Event[];
  Knutselbaar: Event[];
}

export interface AccessRoomEvent {
  keyName: keyof RoomEvents;
}

export interface Event {
  id: number;
  guid: string;
  logo: string;
  date: Date;
  start: string;
  duration: string;
  room: string;
  slug: string;
  url: string;
  title: string;
  subtitle: string;
  track: any;
  type: string;
  language: string;
  abstract: string;
  description: string;
  recording_license: string;
  do_not_record: boolean;
  persons: Person[];
  links: any[];
  attachments: any[];
  answers: any[];
}

export interface Person {
  id: number;
  code: string;
  public_name: string;
  biography: string;
  answers: any[];
}
