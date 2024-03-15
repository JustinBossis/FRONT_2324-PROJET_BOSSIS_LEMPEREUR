import { Component } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  user: User = new User(
    {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'test@gmail.com',
      admin: false,
      favorites: [],
      birthdate: "01/01/1990",
      picture: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
    }
  );

  getFavoritesCount(): number {
    return this.user.favorites.length;
  }

  viewFavorites(): void {
    console.log('viewFavorites');
  }

  

}
