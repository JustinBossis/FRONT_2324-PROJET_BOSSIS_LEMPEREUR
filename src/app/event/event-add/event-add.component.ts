import { Component, OnInit } from '@angular/core';
import { Event } from 'src/model/event';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit{
  newEvent: Event = new Event(
    {
      _id: '1',
      name: '',
      picture: '',
      price: 0,
      date: new Date(),
      timestamp: Date.now(),
      theme: '',
      creator: '',
      favorite_by: []
    }
  );

  isCreation: boolean = true;
  eventService: EventService;
  isDateValid: boolean = true;

  constructor(private router: Router, private eventServ: EventService, private route: ActivatedRoute){
    this.eventService = eventServ;
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['eventId'];
    if(eventId){
      this.newEvent = new Event(this.route.snapshot.data["eventResolved"]);
      this.isCreation = false;
      this.isDateValid = this.newEvent.date >= new Date(new Date().setDate(new Date().getDate() - 1));
    }
  }

  onSubmit(form:any) {
    if(this.isCreation){
      this.eventService.createEvent(this.newEvent).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.eventService.updateEvent(this.newEvent._id,this.newEvent).subscribe(() => {
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

  dateVerify(event: any) {
    const inputDate = event.target as HTMLInputElement;
    const selectedDate = new Date(inputDate.value);
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.isDateValid = (selectedDate >= currentDate);
  }

  
  changeImageURL(event: any, nb: number) {
    let images = document.getElementsByClassName("formImageChoice")
    for(let i = 0; i < images.length; i++){
      if(i == nb){
        if(images[i].classList.contains("disabledImage")){
          images[i].classList.remove("disabledImage");
        }
      }else{
        if(!images[i].classList.contains("disabledImage")){
          images[i].classList.add("disabledImage");
        }
      }
    }
  }

}
