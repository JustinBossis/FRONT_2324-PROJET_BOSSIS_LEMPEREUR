import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/model/iUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: String): Observable<IUser | undefined>{
    let auth_token = self.localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IUser>('https://back-2324-projet-bossis-lempereur.onrender.com/auth/'+id, { headers: headers });
  }

  
  refreshToken(): Observable<any | undefined>{
    let refresh_token = self.localStorage.getItem("refreshtoken")
    return this.http.post<IUser>('https://back-2324-projet-bossis-lempereur.onrender.com/auth/refreshtoken', {refreshtoken: refresh_token});
  }
}
