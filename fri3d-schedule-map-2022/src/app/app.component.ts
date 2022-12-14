import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fri3d-schedule-map-2022';

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  showMap = false;
  selectedRoom: string = '';

  showUpcomingEvents = true;

  onShowRoom(room: string) {
    // this.drawer.open();
    this.selectedRoom = room;
  }

  onChangeUpcomingEvents() {
    this.showUpcomingEvents = !this.showUpcomingEvents;
  }

  onShowMap() {
    this.showMap = !this.showMap;
  }
}
