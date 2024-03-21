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

  //Attributs
  userService: UserService

  //Constructeur
  //Récupération du service nécessaire pour la gestion des utilisateurs et du router pour la navigation
  constructor(private router: Router, private userServ: UserService){
    this.userService = userServ;

  }

  //Méthodes
  //disconnectUser est appelé lors du clic sur le bouton "Déconnexion" et permet de déconnecter l'utilisateur
  disconnectUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    this.userService.user = null;
    this.router.navigate(['user', 'login']);
  }
  

}
