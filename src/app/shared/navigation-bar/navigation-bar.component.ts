import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { jwtDecode } from "jwt-decode";
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  userService: UserService

  constructor(private router: Router, private userServ: UserService){
    this.userService = userServ;

  }

  disconnectUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    this.userService.user = null;
    this.router.navigate(['user', 'login']);
  }
  

}
