import { Component, Input, OnInit } from '@angular/core';
import { getLocations } from '../shared/locations.model';
import { Event } from '../shared/schedule.model';
import { ScheduleService } from '../shared/schedule.service';

@Component({
  selector: 'fri3d-schedule-map-room-schedule',
  templateUrl: './room-schedule.component.html',
  styleUrls: ['./room-schedule.component.scss'],
})
export class RoomScheduleComponent implements OnInit {
  @Input() room: string | undefined;
  @Input() lengthOfTimeblock = 20;
  @Input() events: Event[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {}

  calculateEventDuration(event: Event) {
    const durationArray = event.duration.split(':');
    const hours = parseInt(durationArray[0]);
    let minutes = parseInt(durationArray[1]);
    minutes = hours * 60 + minutes;
    return minutes;
  }

  calculateStartPosition(event: Event) {
    const startPosition = this.scheduleService.calculateStartPosition(event);
    return startPosition;
  }

  getBackgroundColor() {
    const location = this.room;
    const existingLocations = getLocations();
    const roomColor = existingLocations.find((x) =>
      x.eventLocations.some((loc) => loc === location)
    )?.color;
    return roomColor;
  }
}
