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
  constructor(private chatService: ChatService){
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<IChat[] | undefined> {
      const userId = String(route.paramMap.get('userId'));
      return this.chatService.getChatByUserId(userId)
    }
}
