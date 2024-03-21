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

  private socket;

  constructor(private http: HttpClient) {
    let auth_token = localStorage.getItem("token")
    this.socket = io('https://back-2324-projet-bossis-lempereur.onrender.com', {
      extraHeaders: {
        authorization: `bearer ${auth_token}`
      }
    })
   }

  connectToRoom(id: string){
    this.socket.emit("joinRoom", {"conversation": id});
  }

  leaveRoom(){
    this.socket.emit("leaveRoom", null);
  }

  sendMessage(user: User, text: string, conv_id: string){
    this.socket.emit("message", {
      conversation: conv_id,
      text: text,
      user: user._id,
      timestamp: new Date().getTime()
    })
  }

  getMessages() {
    let observable = new Observable<IMessage>(observer => {
      this.socket.on('chat', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }

  
  getChatByUserId(id: string): Observable<IChat[] | undefined>{
    let auth_token = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<IChat[]>(`https://back-2324-projet-bossis-lempereur.onrender.com/chat/${id}`, { headers: headers });
  }


}
