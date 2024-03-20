import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  theme = ['Sport', 'Culture', 'Festif', 'Pro', 'Autres']

  constructor(private http: HttpClient) { }

  createEvent(data: any, pictureFile: File): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")

    const formData = new FormData();
    formData.append("pictureFile", pictureFile);
    for(let key in data){
      formData.append(key, data[key])
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/events/', formData, { headers: headers });
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
