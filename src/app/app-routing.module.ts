import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';

const routes: Routes = [
  { path: '', component: EventListComponent },
  {path: 'event/:eventId', component: EventDetailComponent},
  { path: 'user', component: UserDetailComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
