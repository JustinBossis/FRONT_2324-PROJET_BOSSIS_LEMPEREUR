import { Component, OnInit } from '@angular/core';
import { Event } from 'src/model/event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit{

  //Attributs
  event: Event | null;
  eventService: EventService;
  userService: UserService;
  inFavorite: boolean = false;
  isCreator: boolean = false;

  //Constructeur
  //Récuperation des services nécessaires pour la gestion des events et des users
  constructor(private route: ActivatedRoute, private eventServ: EventService, private userServ: UserService, private router: Router){
    this.event = null;
    this.eventService = eventServ;
    this.userService = userServ;
  }

  //Méthodes
  //ngOnInit est appelé lors de l'initialisation et permet de récupérer les données de l'event à partir de la route
  ngOnInit(): void {
    this.event = new Event(this.route.snapshot.data['eventResolved']);
    if (this.userService.user && this.userService.user.favorites.includes(this.event._id)) {
      this.inFavorite = true;
    } else {
      this.inFavorite = false;
    }
    if (this.userService.user && this.userService.user._id == this.event.creator) {
      this.isCreator = true;
    } else {
      this.isCreator = false;
    }
  }

  //addToFavorites est appelé lors du clic sur le bouton "Ajouter aux favoris" et permet d'ajouter l'event aux favoris de l'utilisateur
  addToFavorites(): void{
    if (this.event) {
      this.eventService.addFavoriteEvent(this.event._id).subscribe(() => {
        this.inFavorite = true;
        if(this.userService.user && this.event){
          this.event.favorite_by.push(this.userService.user);
        }
    });
      
    }
  }

  //removeToFavorites est appelé lors du clic sur le bouton "Retirer des favoris" et permet de retirer l'event des favoris de l'utilisateur
  removeToFavorites(): void{
    if (this.event) {
      this.eventService.removeFavoriteEvent(this.event._id).subscribe(() => {
        this.inFavorite = false;
        if(this.userService.user && this.event){
          const userId = this.userService.user._id;
          this.event.favorite_by = this.event.favorite_by.filter(utilisateur => utilisateur._id != userId);
        }
      });
      
    }
  }

  //clickUser est appelé lors du clic sur le nom d'un utilisateur et permet de rediriger l'utilisateur vers la page de chat avec cet utilisateur
  clickUser(userId: string): void{
    if (this.userService.user && userId != this.userService.user._id) {
      this.router.navigateByUrl("/chat/"+userId);
    }
  }

}
