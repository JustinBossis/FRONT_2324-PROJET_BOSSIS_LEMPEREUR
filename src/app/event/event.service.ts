import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //Attributs

  theme = ['Sport', 'Culture', 'Festif', 'Pro', 'Autres'];
  theme_pictures: any = [
    "/assets/images/events/sport.jpg",
    "/assets/images/events/culture.jpg",
    "/assets/images/events/festif.jpg",
    "/assets/images/events/pro.jpg",
    "/assets/images/events/autres.jpg",
  ]

  //Constructeur
  //Récupération du service nécessaire pour les requêtes http
  constructor(private http: HttpClient) { }

  //Méthodes
  //createEvent est appelé lors de la création d'un event et permet de créer un event à partir des données passées en paramètre
  createEvent(data: any): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token");
    delete data._id;
    delete data.favorite_by;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/events/', data, { headers: headers });
  }

  //getEvents est appelé lors de la récupération de la liste des events et permet de récupérer la liste des events en fonction des filtres et du tri passés en paramètre
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

  //getCreatedEvents est appelé lors de la récupération de la liste des events créés par un utilisateur et permet de récupérer la liste des events créés par l'utilisateur dont l'id est passé en paramètre
  getCreatedEvents(userId: string): Observable<IEvent[] | undefined> {
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IEvent[]>(`https://back-2324-projet-bossis-lempereur.onrender.com/events/user/${userId}`, { headers: headers});
  }

  //getEvent est appelé lors de la récupération d'un event et permet de récupérer l'event dont l'id est passé en paramètre
  getEvent(id: string): Observable<IEvent | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IEvent>(`https://back-2324-projet-bossis-lempereur.onrender.com/events/${id}`, { headers: headers });
  }

  //addFavoriteEvent est appelé lors de l'ajout d'un event aux favoris du user et permet d'ajouter l'event aux favoris de l'utilisateur
  addFavoriteEvent(idEvent: string): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/user/addFavoriteEvent', {idEvent: idEvent}, { headers: headers});
  }

  //removeFavoriteEvent est appelé lors de la suppression d'un event des favoris du user et permet de retirer l'event des favoris de l'utilisateur
  removeFavoriteEvent(idEvent: string): Observable<any | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/user/removeFavoriteEvent', {idEvent: idEvent}, { headers: headers});
  }

  //updateEvent est appelé lors de la modification d'un event et permet de mettre à jour l'event dont l'id est passé en paramètre avec les données passées en paramètre
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
