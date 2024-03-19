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
      id: '',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      admin: false,
      favorites: [],
      birthdate: "",
      picture: "",
    }
  );
  passwordValue: string = ""
  isLogin: boolean = true;
  userService: UserService
  pictureFile: File | undefined;

  constructor(private router: Router, private userServ: UserService) {
    this.userService = userServ
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: any) {
    if (this.isLogin) {
      this.userService.loginUser(this.newUser.email, this.passwordValue).subscribe(tokens => {
        this.passwordValue = ""
        if (tokens) {
          localStorage.setItem("token", tokens.token);
          localStorage.setItem("refreshtoken", tokens.refreshToken);
          this.router.navigate(['/']);
        }
      })
    } else {
      if (this.pictureFile) {
        this.userService.createUser(this.newUser, this.passwordValue, this.pictureFile).subscribe(id => {
          this.passwordValue = "";
          this.isLogin = true;
        });
      }
    }
  }

  loadFile(event: any) {
    if(event.target){
      this.pictureFile = event.target.files[0];
    }
  }
}
