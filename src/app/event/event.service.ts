import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  theme = ['Sport', 'Culture', 'Festif', 'Pro', 'Autres']
  theme_pictures: any = {
    'Sport': "/assets/images/events/sport.jpg",
    'Culture': "/assets/images/events/culture.jpg",
    'Festif': "/assets/images/events/festif.jpg",
    'Pro': "/assets/images/events/pro.jpg",
    'Autres': "/assets/images/events/autres.jpg",
  }

  constructor(private http: HttpClient) { }

  createEvent(data: any): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")

    data.picture = this.theme_pictures[data.theme];

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/events/', data, { headers: headers });
  }

  getEvents(filters: any[] = [], sort: any = {date: 1}): Observable<IEvent[] | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    const params = {
      filter: JSON.stringify(filters),
      sort: JSON.stringify(sort)
    }
    return this.http.get<IEvent[]>('https://back-2324-projet-bossis-lempereur.onrender.com/events/', { headers: headers, params: params});
  }
}
