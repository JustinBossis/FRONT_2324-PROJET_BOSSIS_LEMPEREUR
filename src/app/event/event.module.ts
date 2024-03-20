import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './event-routing.module';
import { EventAddComponent } from './event-add/event-add.component';
import { EventFilterComponent } from './event-filter/event-filter.component';



@NgModule({
  declarations: [
    EventDetailComponent,
    EventListComponent,
    EventAddComponent,
    EventFilterComponent
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
