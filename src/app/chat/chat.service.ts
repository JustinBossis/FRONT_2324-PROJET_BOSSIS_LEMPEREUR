import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChat } from 'src/model/iChat';
import { io, Socket } from 'socket.io-client';import { User } from 'src/model/user';
import { IMessage } from 'src/model/iMessage';
 "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //Attributs
  private socket;

  //Constructeur
  constructor(private http: HttpClient) {
    //Récupération du token de l'utilisateur
    let auth_token = localStorage.getItem("token");
    //Création de la socket
    this.socket = io('https://back-2324-projet-bossis-lempereur.onrender.com', {
      extraHeaders: {
        authorization: `bearer ${auth_token}`
      }
    });
   }

   //Méthodes
   //connectToRoom est appelé lors de la connexion à une room et permet de se connecter à la room dont l'id est passé en paramètre
  connectToRoom(id: string){
    this.socket.emit("joinRoom", {"conversation": id});
  }

  //leaveRoom est appelé lors de la déconnexion d'une room et permet de se déconnecter de la room
  leaveRoom(){
    this.socket.emit("leaveRoom", null);
  }

  //sendMessage est appelé lors de l'envoi d'un message et permet d'envoyer un message à la room dont l'id est passé en paramètre
  sendMessage(user: User, text: string, conv_id: string){
    this.socket.emit("message", {
      conversation: conv_id,
      text: text,
      user: user._id,
      timestamp: new Date().getTime()
    })
  }

  //getMessages est appelé lors de la réception d'un message et permet de récupérer les messages de la room
  getMessages() {
    let observable = new Observable<IMessage>(observer => {
      this.socket.on('chat', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }

  //getChatByUserId est appelé lors de la récupération d'un chat et permet de récupérer le chat avec l'utilisateur dont l'id est passé en paramètre
  getChatByUserId(id: string): Observable<IChat[] | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IChat[]>(`https://back-2324-projet-bossis-lempereur.onrender.com/chat/${id}`, { headers: headers });
  }


}
