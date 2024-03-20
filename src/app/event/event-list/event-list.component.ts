import { Component, OnInit } from '@angular/core';
import { Event } from 'src/model/event';
import { EventService } from '../event.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{

  events: Event[] = [];
  eventService: EventService

  constructor(private eventServ: EventService){
    this.eventService = eventServ
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(eventList => {
      if(eventList){
        this.events = eventList.map(event => new Event(event))
      }
    })
  }

  updateList(data: any): void{
    this.eventService.getEvents(data.filters, data.sort).subscribe(eventList => {
      if(eventList){
        this.events = eventList.map(event => new Event(event))
      }
    })
  }

}
