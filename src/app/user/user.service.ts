import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/model/iUser';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | null = null
  
  avatars = [
    '/assets/images/users/avatar_1.png',
    '/assets/images/users/avatar_2.png',
    '/assets/images/users/avatar_3.png',
    '/assets/images/users/avatar_4.png',
    '/assets/images/users/avatar_5.png',
    '/assets/images/users/avatar_6.png',
  ]

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any | undefined>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>('http://localhost:3000/auth/connect', {email: email, password: password}, { headers: headers });
  }

  createUser(data: any, password: string): Observable<any | undefined>{
    delete data._id;
    data.password = password;

    return this.http.post<any>('http://localhost:3000/auth/', data);
  }

  getUser(id: String): Observable<IUser | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IUser>('http://localhost:3000/auth/'+id, { headers: headers });
  }

  
  refreshToken(): Observable<any | undefined>{
    let refresh_token = localStorage.getItem("refreshtoken")
    return this.http.post<any>('http://localhost:3000/auth/refreshtoken', {refreshtoken: refresh_token});
  }
}
