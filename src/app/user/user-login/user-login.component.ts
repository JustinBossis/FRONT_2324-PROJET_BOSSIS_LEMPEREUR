import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/model/user';
import { Router } from '@angular/router';

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
  passwordValue: string = ""
  isLogin: boolean = true;
  userService: UserService

  constructor(private router: Router, private userServ: UserService) {
    this.userService = userServ
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form:any) {
    if(this.isLogin){
      this.userService.loginUser(this.newUser.email, this.passwordValue).subscribe(tokens => {
        this.passwordValue = ""
        if(tokens){
          localStorage.setItem("token", tokens.token);
          localStorage.setItem("refreshtoken", tokens.refreshToken);
          this.router.navigate(['/']);
        }
      })
    }
  }

}
