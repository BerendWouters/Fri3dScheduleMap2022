import { Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { Event, Root } from '../shared/schedule.model';
import { ScheduleService } from '../shared/schedule.service';

@Component({
  selector: 'fri3d-schedule-map-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  public rooms: string[] = [];
  public root: Root | undefined;
  public lengthOfTimeblock = 0;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService
      .getSchedule()
      .pipe(tap((x) => (this.root = x)))
      .subscribe((x) => {
        this.rooms = this.scheduleService.getRooms();
        this.lengthOfTimeblock = this.scheduleService.calculateLength();
      });
  }

  getAllEventsForRoom(room: string): Event[] {
    if (this.root) {
      return this.scheduleService.getEventsForRoom(room);
    }
    return [];
  }
}
