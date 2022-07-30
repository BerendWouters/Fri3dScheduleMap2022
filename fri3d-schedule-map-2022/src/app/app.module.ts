import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RoomScheduleComponent } from './room-schedule/room-schedule.component';

@NgModule({
  declarations: [AppComponent, MapComponent, ScheduleComponent, RoomScheduleComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, LeafletModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
