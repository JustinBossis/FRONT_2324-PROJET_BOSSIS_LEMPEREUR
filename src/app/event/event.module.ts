import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';



@NgModule({
  declarations: [
    EventDetailComponent,
    EventListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
