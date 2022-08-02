import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  ngOnInit(): void {
    this.scheduleService
      .getSchedule()
      .pipe(tap((x) => (this.root = x)))
      .subscribe((x) => {
        this.events = this.scheduleService.getAllEventsOrderedByDate();
      });
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
