import { Component } from '@angular/core';
import { Event } from 'src/model/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  events: Event[] = [new Event(
    {
      id: "1",
      name: "Evenement test",
      picture: "/assets/images/logo.svg",
      price: 5,
      date: "10/10/2024",
      theme: "sport",
      creator: "1"
    }
  ),
  new Event(
    {
      id: "2",
      name: "Evenement test 2",
      picture: "/assets/images/logo.svg",
      price: 5,
      date: "10/10/2024",
      theme: "sport",
      creator: "1"
    }
  ),
  new Event(
    {
      id: "3",
      name: "Evenement test 3",
      picture: "/assets/images/logo.svg",
      price: 5,
      date: "10/10/2024",
      theme: "sport",
      creator: "1"
    }
  )];

}
