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

  //Attributs
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

  //Constructeur
  //Récupération du service nécessaire pour la gestion des utilisateurs et du router pour la navigation
  constructor(private router: Router, private userServ: UserService) {
    this.userService = userServ;
  }

  //Méthodes
  //changeIsLogin est appelé lors du clic sur le bouton "S'inscrire" ou "Se connecter" et permet de changer l'affichage du formulaire
  changeIsLogin(): void {
    this.isLogin = !this.isLogin;
  }

  //onSubmit est appelé lors du submit du formulaire et permet de créer un utilisateur ou de le connecter
  onSubmit(form: any) {
    if (this.isLogin) {
      // Connexion
      this.userService.loginUser(this.newUser.email, this.passwordValue).subscribe(tokens => {
        if (tokens) {
          // Stockage des tokens dans le localStorage
          localStorage.setItem("token", tokens.token);
          localStorage.setItem("refreshtoken", tokens.refreshToken);
          this.router.navigate(['/']);
        }
      })
    } else {
      // Inscription
      this.userService.createUser(this.newUser, this.passwordValue).subscribe(id => {
        this.passwordValue = "";
        this.isLogin = true;
      });
    }
  }

  //checkPasswordsMatch permet de vérifier si le mot de passe et le mot de passe de vérification sont identiques
  checkPasswordsMatch(): boolean {
    return this.passwordValue === this.checkPasswordValue;
  }

  //changeImageURL permet de changer l'image affichée dans le formulaire d'inscription (grise les autres images)
  changeImageURL(event: Event, nb: number) {
    // Récupération de toutes les images
    let images = document.getElementsByClassName("formImageChoice")
    for(let i = 0; i < images.length; i++){
      // Si l'image est celle sélectionnée, on la met en avant
      if(i == nb){
        if(images[i].classList.contains("disabledImage")){
          images[i].classList.remove("disabledImage");
        }
      }else{
        // Sinon, on la grise
        if(!images[i].classList.contains("disabledImage")){
          images[i].classList.add("disabledImage");
        }
      }
    }
  }

  //dateVerify permet de vérifier que la date de naissance est valide (inférieure ou égale à la date actuelle)
  dateVerify(event: any) {
    const inputDate = event.target as HTMLInputElement;
    const selectedDate = new Date(inputDate.value);
    let currentDate = new Date();
    this.isDateValid = (selectedDate <= currentDate);
  }
}
