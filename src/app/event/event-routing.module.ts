import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventAddComponent } from './event-add/event-add.component';

const routes: Routes = [
  {path: 'event/:eventId', component: EventDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
