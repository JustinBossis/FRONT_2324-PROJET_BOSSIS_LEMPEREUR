import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
