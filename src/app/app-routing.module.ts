import { NgModule } from '@angular/core';
import { mapToCanActivate, mapToResolve, RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { UserGuardService } from './user/user-guard.service';
import { UserResolverService } from './user/user-resolver.service';

const routes: Routes = [
  { path: '', component: EventListComponent, canActivate: mapToCanActivate([UserGuardService]) },
  { path: 'event/:eventId', component: EventDetailComponent, canActivate: mapToCanActivate([UserGuardService])},
  { path: 'user', component: UserDetailComponent, canActivate: mapToCanActivate([UserGuardService]),  resolve: {userResolved: mapToResolve(UserResolverService)}},
  { path: 'user/login', component: UserLoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
