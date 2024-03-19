import { Component } from '@angular/core';
import { Event } from 'src/model/event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent {
  newEvent: Event = new Event(
    {
      id: '1',
      name: '',
      picture: '',
      price: 0,
      date: '',
      theme: '',
      creator: ''
    }
  );

  imageUrls = ['assets/images/maths.jpg',
              'assets/images/sport.jpg',
              'assets/images/chimie.jpg',
              'assets/images/histoire.jpg',
              'assets/images/info.jpg',
              'assets/images/philo.jpg',
              'assets/images/physique.jpg'];

  themes: string[];

  isCreation: boolean = true;

  constructor(eventService: EventService){
    this.themes = eventService.theme;
  }

  onSubmit(form:any) {
  }

  priceVerify(event: any, decimales: number) {
    let value = event.target.value;
    let decimalesActuelles = value.split('.')[1];
    if (decimalesActuelles && decimalesActuelles.length > decimales) {
      event.target.value = value.slice(0, -(decimalesActuelles.length - decimales));
    }
  }
}
