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
  event: Event | null;
  eventService: EventService;
  userService: UserService;
  inFavorite: boolean = false;
  isCreator: boolean = false;

  constructor(private route: ActivatedRoute, private eventServ: EventService, private userServ: UserService, private router: Router){
    this.event = null;
    this.eventService = eventServ;
    this.userService = userServ;
  }


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

  modifyEvent(): void{
    this.router.navigateByUrl("/event/modify", { state: { event: this.event } });
  }

}
