import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { getLocations } from '../shared/locations.model';
import { Root, Event } from '../shared/schedule.model';
import { ScheduleService } from '../shared/schedule.service';

@Component({
  selector: 'fri3d-schedule-map-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  public root: Root | undefined;

  public events: Event[] = [];

  @Output() openRoomEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private scheduleService: ScheduleService) {}

  private _showUpcomingEvents = false;
  @Input() set showUpcomingEvents(value: boolean) {
    this._showUpcomingEvents = value;
    this.loadEvents();
  }

  get showUpcomingEvents() {
    return this._showUpcomingEvents;
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.scheduleService
      .getSchedule()
      .pipe(tap((x) => (this.root = x)))
      .subscribe((x) => {
        this.events = this.filterEvents(
          this.scheduleService.getAllEventsOrderedByDate()
        );
      });
  }

  private filterEvents(events: Event[]): Event[] {
    const now = new Date('2022-08-13T13:00:00+02:00');
    if (this.showUpcomingEvents) {
      console.log(events);
      const filteredEvents = events.filter(
        (x) => new Date(x.date).valueOf() > now.valueOf()
      );
      console.log(filteredEvents);
      return filteredEvents;
    }
    return events;
  }

  getBackgroundColor(room: string) {
    const location = room;
    const existingLocations = getLocations();
    const roomColor = existingLocations.find((x) =>
      x.eventLocations.some((loc) => loc === location)
    )?.color;
    return roomColor;
  }

  showRoom(room: string) {
    this.openRoomEvent.emit(room);
  }
}
