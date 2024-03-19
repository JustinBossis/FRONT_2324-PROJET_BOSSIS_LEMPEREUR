import { Component } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  newUser: User = new User(
    {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'test@gmail.com',
      admin: false,
      favorites: [],
      birthdate: "01/01/1990",
      picture: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
    }
  );
  isLogin: boolean = true;

  constructor() { }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  onSubmit(registerForm:any): void {
    console.log(this.newUser);
  }

}
