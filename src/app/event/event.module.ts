import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './event-routing.module';



@NgModule({
  declarations: [
    EventDetailComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
  ],
  exports: [
    EventListComponent
  ]
})
export class EventModule { }
