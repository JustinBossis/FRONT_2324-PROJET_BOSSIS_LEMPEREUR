import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  theme = ['Sport', 'Culture', 'Festif', 'Pro', 'Autres']

  constructor(private http: HttpClient) { }

  createEvent(data: any, ): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/events/', data, { headers: headers });
  }
}
