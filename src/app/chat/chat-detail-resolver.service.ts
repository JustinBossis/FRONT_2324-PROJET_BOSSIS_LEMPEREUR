import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/model/iUser';
import { ChatService } from './chat.service';
import { IChat } from 'src/model/iChat';

@Injectable({
  providedIn: 'root'
})
export class ChatDetailResolverService {
  //Constructeur
  constructor(private chatService: ChatService){
  }

  //Méthodes
  //resolve est appelé lors de la navigation vers une page de chat et permet de récupérer du chat avec l'utilisateur dont l'id est passé en paramètre
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<IChat[] | undefined> {
      //Récupération de l'id de l'utilisateur
      const userId = String(route.paramMap.get('userId'));
      //Récupération du chat avec l'utilisateur
      return this.chatService.getChatByUserId(userId);
    }
}
