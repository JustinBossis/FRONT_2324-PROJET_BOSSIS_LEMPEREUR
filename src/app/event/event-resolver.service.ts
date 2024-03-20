import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService {

  eventService: EventService;

  constructor(private eventServ: EventService){
    this.eventService = eventServ;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<IEvent | undefined> {
      const eventId = String(route.paramMap.get('eventId'));
      return this.eventService.getEvent(eventId);
    }
}
