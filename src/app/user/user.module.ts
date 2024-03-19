import { NgModule } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserDetailComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  exports: [
    UserDetailComponent
  ]
})
export class UserModule { }
