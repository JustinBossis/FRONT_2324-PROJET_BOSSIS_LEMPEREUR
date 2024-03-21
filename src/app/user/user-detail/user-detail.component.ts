import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/event/event.service';
import { Event } from 'src/model/event'
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{

  //Attributs
  user: User | null
  createdEvents: Event[] | null = null
  favorites: Event[] | null = null
  isVisibleFavorites: boolean = false

  //Constructeur
  constructor(private route: ActivatedRoute, private eventService: EventService, private userService: UserService){
    this.user = null
  }

  //Méthodes
  //ngOnInit est appelé lors de l'initialisation et permet de récupérer les données du user à partir de la route
  ngOnInit(): void {
    this.user = new User(this.route.snapshot.data['userResolved'])
    // Récupération des événements créés par l'utilisateur
    this.eventService.getCreatedEvents(this.user._id).subscribe(events => {
      if(events){
        this.createdEvents = events.map(event => new Event(event));
      }
    })
    // Récupération des événements favoris de l'utilisateur
    this.userService.getFavoriteEvents().subscribe(events => {
      console.log(events)
      if(events){
        this.favorites = events.map(event => new Event(event));
      }
    })
  }

  //getFavoritesCount permet de récupérer le nombre d'événements favoris de l'utilisateur
  getFavoritesCount(): number {
    return this.user ? this.user.favorites.length : 0;
  }

  //toggleVisibilityFavorites permet d'afficher ou non les événements favoris de l'utilisateur
  toggleVisibilityFavorites(): void {
    this.isVisibleFavorites = !this.isVisibleFavorites;
  }

  

}
