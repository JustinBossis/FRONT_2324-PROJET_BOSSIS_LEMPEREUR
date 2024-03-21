import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from 'src/model/iEvent';
import { IUser } from 'src/model/iUser';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Attributs
  user: User | null = null
  
  avatars = [
    '/assets/images/users/avatar_1.png',
    '/assets/images/users/avatar_2.png',
    '/assets/images/users/avatar_3.png',
    '/assets/images/users/avatar_4.png',
    '/assets/images/users/avatar_5.png',
    '/assets/images/users/avatar_6.png',
  ]

  //Constructeur
  //Récupération du service nécessaire pour les requêtes http
  constructor(private http: HttpClient) { }

  //Méthodes
  //loginUser est appelé lors de la connexion d'un utilisateur et permet de connecter un utilisateur à partir de l'email et du mot de passe passés en paramètre
  loginUser(email: string, password: string): Observable<any | undefined>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/user/connect', {email: email, password: password}, { headers: headers });
  }

  //createUser est appelé lors de la création d'un utilisateur et permet de créer un utilisateur à partir des données passées en paramètre
  createUser(data: any, password: string): Observable<any | undefined>{
    delete data._id;
    data.password = password;

    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/user/', data);
  }

  //getUser est appelé lors de la récupération d'un utilisateur et permet de récupérer l'utilisateur dont l'id est passé en paramètre
  getUser(id: String): Observable<IUser | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IUser>('https://back-2324-projet-bossis-lempereur.onrender.com/user/'+id, { headers: headers });
  }

  //getAllUsers est appelé lors de la récupération de la liste des utilisateurs et permet de récupérer la liste des utilisateurs
  getAllUsers(): Observable<IUser[] | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IUser[]>('https://back-2324-projet-bossis-lempereur.onrender.com/user/', { headers: headers });
  }

  //getFavoriteEvents est appelé lors de la récupération de la liste des events favoris d'un utilisateur et permet de récupérer la liste des events favoris de l'utilisateur connecté
  getFavoriteEvents(): Observable<IEvent[] | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IEvent[]>('https://back-2324-projet-bossis-lempereur.onrender.com/user/favorites', { headers: headers });
  }

  //refreshToken est appelé lors de la récupération d'un nouveau token et permet de récupérer un nouveau token à partir du refresh token stocké dans le localStorage
  refreshToken(): Observable<any | undefined>{
    let refresh_token = localStorage.getItem("refreshtoken")
    return this.http.post<any>('https://back-2324-projet-bossis-lempereur.onrender.com/user/refreshtoken', {refreshtoken: refresh_token});
  }
}
