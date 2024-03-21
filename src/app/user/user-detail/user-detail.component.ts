import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/event/event.service';
import { Event } from 'src/model/event'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  user: User | null
  createdEvents: Event[] | null = null
  favorites: Event[] | null = null
  isVisibleFavorites: boolean = false

  constructor(private route: ActivatedRoute, private eventService: EventService){
    this.user = null
  }


  ngOnInit(): void {
    this.user = new User(this.route.snapshot.data['userResolved'])
    this.eventService.getCreatedEvents(this.user._id).subscribe(events => {
      if(events){
        this.createdEvents = events.map(event => new Event(event));
        // TODO CHANGER LISTE FAVORITES
        this.favorites = events.map(event => new Event(event));
      }
    })
  }

  getFavoritesCount(): number {
    return this.user ? this.user.favorites.length : 0;
  }

  toggleVisibilityFavorites(): void {
    this.isVisibleFavorites = !this.isVisibleFavorites;
  }

  

}
