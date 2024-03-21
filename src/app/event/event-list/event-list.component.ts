import { Component, OnInit } from '@angular/core';
import { Event } from 'src/model/event';
import { EventService } from '../event.service';
import { filter, map } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{

  //Attributs

  events: Event[] = [];
  eventService: EventService;
  userService: UserService;

  //Constructeur
  //Récupération des services nécessaire pour la gestion des events
  constructor(private eventServ: EventService, private userServ: UserService){
    this.eventService = eventServ;
    this.userService = userServ;
  }

  //Méthodes
  //ngOnInit est appelé lors de l'initialisation et permet de récupérer la liste de tous les events
  ngOnInit(): void {
    this.eventService.getEvents().subscribe(eventList => {
      if(eventList){
        this.events = eventList.map(event => new Event(event))
      }
    })
  }

  //updateList est appelé lors de la mise à jour de la liste des events par rapport aux filtres et au tri
  updateList(data: any): void{
    this.eventService.getEvents(data.filters, data.sort).subscribe(eventList => {
      if(eventList){
        this.events = eventList.map(event => new Event(event))
      }
    })
  }

}
