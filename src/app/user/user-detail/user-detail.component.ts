import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  user: User | null

  constructor(private route: ActivatedRoute){
    this.user = null
  }


  ngOnInit(): void {
    this.user = new User(this.route.snapshot.data['userResolved'])
  }

  getFavoritesCount(): number {
    return this.user ? this.user.favorites.length : 0;
  }

  viewFavorites(): void {
    console.log('viewFavorites');
  }

  

}
