import { Component } from '@angular/core';

import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  decoded_token: { [key: string]: string }

  constructor(){

    const token = localStorage.getItem("token")
    if(token){
      this.decoded_token = jwtDecode(token)
    }else{
      this.decoded_token = {}
    }
  }
  

}
