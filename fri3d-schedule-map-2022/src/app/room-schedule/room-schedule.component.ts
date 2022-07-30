import { Component, Input, OnInit } from '@angular/core';
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
    console.log(minutes);
    return minutes;
  }

  calculateStartPosition(event: Event) {
    const startPosition = this.scheduleService.calculateStartPosition(event);
    console.log(`Startposition of ${event.title}: ${startPosition}`);
    return startPosition;
  }
}
