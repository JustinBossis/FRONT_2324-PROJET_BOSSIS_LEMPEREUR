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

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any | undefined>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/auth/connect', {email: email, password: password}, { headers: headers });
  }

  createUser(data: any, password: string, pictureFile: File): Observable<any | undefined>{
    delete data.id;
    data.password = password;
    const formData = new FormData();
    formData.append("pictureFile", pictureFile);
    for(let key in data){
      formData.append(key, data[key])
    }

    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/auth/', formData);
  }

  getUser(id: String): Observable<IUser | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IUser>('https://back-2324-projet-bossis-lempereur.onrender.com/auth/'+id, { headers: headers });
  }

  
  refreshToken(): Observable<any | undefined>{
    let refresh_token = localStorage.getItem("refreshtoken")
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/auth/refreshtoken', {refreshtoken: refresh_token});
  }
}
