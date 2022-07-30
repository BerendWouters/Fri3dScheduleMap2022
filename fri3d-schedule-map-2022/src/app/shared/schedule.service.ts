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
    console.log(date, startDate);
    return this.calculateMinutes(date, startDate);
  }

  private calculateMinutes(date: Date, startDate: Date) {
    let diffMs = Math.abs(date.valueOf() - startDate.valueOf());

    let diffMins = diffMs / 1000 / 60;
    return Math.round(diffMins);
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
            events4 = [...events4, ...day.rooms['Low Voltage']];
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
        case 'Medium Mosfet 0':
          let events7: Event[] = [];
          this.root.schedule.conference.days.forEach((day) => {
            const mosfet = day.rooms['Medium Mosfet 0'];
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
        default:
          break;
      }
    }
    return [];
  }
}
