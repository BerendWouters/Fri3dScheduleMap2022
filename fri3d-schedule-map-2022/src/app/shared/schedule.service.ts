import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable } from 'rxjs';
import { Root, Event } from './schedule.model';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private url: string =
    'https://pretalx.fri3d.be/fri3dcamp2022/schedule/export/schedule.json';
  constructor(private httpClient: HttpClient) {}

  private root: Root | undefined;

  getSchedule(): Observable<Root> {
    return this.httpClient
      .get<Root>(this.url)
      .pipe(tap((x) => (this.root = x)));
  }

  getRooms(): string[] {
    const rooms = Object.getOwnPropertyNames(
      this.root?.schedule.conference.days[0].rooms
    );
    return rooms;
  }

  calculateLength() {
    const startDate = new Date(this.root!.schedule.conference.start);
    startDate.setHours(0); // Timezone crappy hackz0r
    const endDate = new Date(this.root!.schedule.conference.end);
    endDate.setHours(23); // End of day!
    endDate.setMinutes(59); // End of day!
    return this.calculateMinutes(endDate, startDate);
  }

  calculateStartPosition(event: Event) {
    const date = new Date(event.date);
    const startDate = new Date(this.root!.schedule.conference.start);
    startDate.setHours(0); // Timezone crappy hackz0r
    return this.calculateMinutes(date, startDate);
  }

  private calculateMinutes(date: Date, startDate: Date) {
    let diffMs = Math.abs(date.getTime() - startDate.getTime());

    let diffMins = diffMs / 1000 / 60;
    return Math.round(diffMins);
  }

  getAllEventsOrderedByDate(): Event[] {
    let events: Event[] = [];
    this.root?.schedule.conference.days.forEach((day) => {
      const hha = day.rooms['Hardware hacking area']
        ? day.rooms['Hardware hacking area']
        : [];
      const Kapel = day.rooms['Kapel'] ? day.rooms['Kapel'] : [];
      const mainOne = day.rooms['Main One'] ? day.rooms['Main One'] : [];
      const mainTwo = day.rooms['Main Two'] ? day.rooms['Main Two'] : [];
      const lowVoltage = day.rooms['Low Voltage']
        ? day.rooms['Low Voltage']
        : [];
      const mediumMosfet = day.rooms['Medium Mosfet']
        ? day.rooms['Medium Mosfet']
        : [];
      const Shelter = day.rooms['Shelter'] ? day.rooms['Shelter'] : [];
      const Terrein = day.rooms['Terrein'] ? day.rooms['Terrein'] : [];
      const tinyTesseract = day.rooms['Tiny Tesseract']
        ? day.rooms['Tiny Tesseract']
        : [];
      const juniorHacking = day.rooms['Junior hacking']
        ? day.rooms['Junior hacking']
        : [];
      events = [
        ...events,
        ...hha,
        ...Kapel,
        ...mainOne,
        ...mainTwo,
        ...lowVoltage,
        ...tinyTesseract,
        ...juniorHacking,
        ...mediumMosfet,
        ...Shelter,
        ...Terrein,
      ];
    });
    events.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return events;
  }

  getEventsForRoom(room: string): Event[] {
    if (this.root) {
      switch (room) {
        case 'Hardware hacking area':
          let events0: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events0 = [...events0, ...day.rooms['Hardware hacking area']];
          });
          return events0;
        case 'Kapel':
          let events1: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events1 = [...events1, ...day.rooms['Kapel']];
          });
          return events1;

        case 'Main Two':
          let events2: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events2 = [...events2, ...day.rooms['Main Two']];
          });
          return events2;
        case 'Main One':
          let events3: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events3 = [...events3, ...day.rooms['Main One']];
          });
          return events3;
        case 'Low Voltage':
          let events4: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            const lowVoltage = day.rooms['Low Voltage'];
            if (lowVoltage) {
              events4 = [...events4, ...lowVoltage];
            }
          });
          return events4;
        case 'Large LED':
          let events5: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events5 = [...events5, ...day.rooms['Large LED']];
          });
          return events5;
        case 'Knutselbaar':
          let events6: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events6 = [...events6, ...day.rooms['Knutselbaar']];
          });
          return events6;
        case 'Medium Mosfet':
          let events7: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            const mosfet = day.rooms['Medium Mosfet'];
            if (mosfet) {
              events7 = [...events7, ...mosfet];
            }
            return events7;
          });
          return events7;

        case 'Shelter':
          let events8: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events8 = [...events8, ...day.rooms['Shelter']];
          });
          return events8;

        case 'Terrein':
          let events9: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events9 = [...events9, ...day.rooms['Terrein']];
          });
          return events9;

        case 'Tiny Tesseract':
          let events10: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events10 = [...events10, ...day.rooms['Tiny Tesseract']];
          });
          return events10;
        case 'Junior hacking':
          let events11: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            events11 = [...events11, ...day.rooms['Junior hacking']];
          });
          return events11;
        default:
          break;
      }
    }
    return [];
  }
}
