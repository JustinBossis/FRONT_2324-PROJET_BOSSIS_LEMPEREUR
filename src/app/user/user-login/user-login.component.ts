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
      _id: '',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      admin: false,
      favorites: [],
      date: new Date(),
      birthdate: new Date("2000-01-01").getTime(),
      picture: "",
    }
  );
  passwordValue: string = "";
  checkPasswordValue: string = "";
  isLogin: boolean = true;
  userService: UserService;
  isDateValid: boolean = true;


  constructor(private router: Router, private userServ: UserService) {
    this.userService = userServ;
  }

  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: any) {
    if (this.isLogin) {
      this.userService.loginUser(this.newUser.email, this.passwordValue).subscribe(tokens => {
        if (tokens) {
          localStorage.setItem("token", tokens.token);
          localStorage.setItem("refreshtoken", tokens.refreshToken);
          this.router.navigate(['/']);
        }
      })
    } else {
      this.userService.createUser(this.newUser, this.passwordValue).subscribe(id => {
        this.passwordValue = "";
        this.isLogin = true;
      });
    }
  }

  checkPasswordsMatch(): boolean {
    return this.passwordValue === this.checkPasswordValue;
  }

  changeImageURL(event: Event, nb: number) {
    let images = document.getElementsByClassName("formImageChoice")
    for(let i = 0; i < images.length; i++){
      if(i == nb){
        if(images[i].classList.contains("disabledImage")){
          images[i].classList.remove("disabledImage");
        }
      }else{
        if(!images[i].classList.contains("disabledImage")){
          images[i].classList.add("disabledImage");
        }
      }
    }
  }

  dateVerify(event: any) {
    const inputDate = event.target as HTMLInputElement;
    const selectedDate = new Date(inputDate.value);
    let currentDate = new Date();
    this.isDateValid = (selectedDate <= currentDate);
  }
}
