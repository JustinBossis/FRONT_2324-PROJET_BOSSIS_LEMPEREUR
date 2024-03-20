import { Component } from '@angular/core';
import { Event } from 'src/model/event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {
  newEvent: Event = new Event(
    {
      _id: '1',
      name: '',
      picture: '',
      price: 0,
      date: '',
      theme: '',
      creator: ''
    }
  );

  isCreation: boolean = true;
  eventService: EventService;

  constructor(private router: Router, eventService: EventService){
    this.eventService = eventService;
  }

  onSubmit(form:any) {
    if(this.isCreation){
      this.eventService.createEvent(this.newEvent).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  priceVerify(event: any, decimales: number) {
    let value = event.target.value;
    let decimalesActuelles = value.split('.')[1];
    if (decimalesActuelles && decimalesActuelles.length > decimales) {
      event.target.value = value.slice(0, -(decimalesActuelles.length - decimales));
    }
  }
}
