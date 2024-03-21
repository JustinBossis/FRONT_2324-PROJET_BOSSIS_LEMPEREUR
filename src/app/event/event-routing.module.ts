import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventAddComponent } from './event-add/event-add.component';
import { UserGuardService } from '../user/user-guard.service';

const routes: Routes = [
  {path: 'event/create', component: EventAddComponent, canActivate: mapToCanActivate([UserGuardService])},
  { path: 'event/:eventId', component: EventDetailComponent, canActivate: mapToCanActivate([UserGuardService])},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
