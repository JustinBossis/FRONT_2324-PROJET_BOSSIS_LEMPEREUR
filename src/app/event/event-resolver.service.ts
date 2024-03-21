import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService {

  //Attributs
  eventService: EventService;

  //Constructeur
  //Récupération du service nécessaire pour la gestion des events
  constructor(private eventServ: EventService){
    this.eventService = eventServ;
  }

  //Méthodes
  //resolve est appelé lors de la navigation vers une page d'event et permet de récupérer l'event correspondant à l'id passé en paramètre
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<IEvent | undefined> {
      const eventId = String(route.paramMap.get('eventId'));
      return this.eventService.getEvent(eventId);
    }
}
