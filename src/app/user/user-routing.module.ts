import { NgModule } from '@angular/core';
import { mapToCanActivate, mapToResolve, RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserGuardService } from './user-guard.service';
import { UserResolverService } from './user-resolver.service';

const routes: Routes = [
  { path: 'user', component: UserDetailComponent, canActivate: mapToCanActivate([UserGuardService]),  resolve: {userResolved: mapToResolve(UserResolverService)}},
  { path: 'user/login', component: UserLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
