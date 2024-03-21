import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  theme = ['Sport', 'Culture', 'Festif', 'Pro', 'Autres'];
  theme_pictures: any = [
    "/assets/images/events/sport.jpg",
    "/assets/images/events/culture.jpg",
    "/assets/images/events/festif.jpg",
    "/assets/images/events/pro.jpg",
    "/assets/images/events/autres.jpg",
  ]

  constructor(private http: HttpClient) { }

  createEvent(data: any): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token");
    delete data._id;
    delete data.favorite_by;

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

  getCreatedEvents(userId: string): Observable<IEvent[] | undefined> {
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IEvent[]>(`https://back-2324-projet-bossis-lempereur.onrender.com/events/user/${userId}`, { headers: headers});
  }

  getEvent(id: string): Observable<IEvent | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IEvent>(`https://back-2324-projet-bossis-lempereur.onrender.com/events/${id}`, { headers: headers });
  }

  addFavoriteEvent(idEvent: string): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/user/addFavoriteEvent', {idEvent: idEvent}, { headers: headers});
  }

  removeFavoriteEvent(idEvent: string): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/user/removeFavoriteEvent', {idEvent: idEvent}, { headers: headers});
  }

  updateEvent(idEvent:string, data: any): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")

    delete data._id;
    delete data.favorite_by;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`https://back-2324-projet-bossis-lempereur.onrender.com/events/${idEvent}`, data, { headers: headers });
  }
}
