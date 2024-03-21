import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/model/user';
import { Chat } from 'src/model/chat';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
import { IChat } from 'src/model/iChat';
import { Message } from 'src/model/message';
import { IMessage } from 'src/model/iMessage';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy, AfterViewChecked {

  //Attributs

  @ViewChild('chatList', { static: false }) chatList: any;

  users: User[] | null;
  currentChat: User | null = null;
  currentChatData: Chat | null = null;
  userService: UserService
  chatInput: string = ""
  messages: Message[] = []
  newMessages: boolean = false;

  //Constructeur
  constructor(private route: ActivatedRoute,private router: Router, private userServ: UserService, private chatService: ChatService){
    this.users = null;
    this.userService = userServ;
  }

  //Méthodes
  //ngOnInit est appelé lors de l'initialisation et permet de récupérer le chat avec l'utilisateur dont l'id est passé en paramètre et la liste des users
  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    if(userId){
      this.currentChatData = new Chat(this.route.snapshot.data["chatDetailResolved"][0])
      this.messages = this.currentChatData.messages
      this.newMessages = true;
      if(this.currentChatData.users_data[0]._id == userId){
        this.currentChat = this.currentChatData.users_data[0]
      }else{
        this.currentChat = this.currentChatData.users_data[1]
      }
      this.chatService.connectToRoom(this.currentChatData._id);
      this.chatService.getMessages().subscribe((message: IMessage) => {
        this.messages.push(new Message(message));
        this.newMessages = true;
      });
    }
    this.users = this.route.snapshot.data['chatResolved'].map((user: any) => new User(user)).filter((user: { _id: string; }) => {return user._id != this.userService.user?._id})
  }

  //ngOnDestroy est appelé lors de la destruction du composant
  //Permet de quitter la room de chat
  ngOnDestroy(): void {
    const userId = this.route.snapshot.params['userId'];
    if(userId){
      this.chatService.leaveRoom();
    }
  }

  //ngAfterViewChecked est appelé après chaque changement de la vue
  //Permet de scroller vers le bas de la liste des messages
  ngAfterViewChecked() {
    if(this.newMessages){
      const el: HTMLDivElement = this.chatList.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.newMessages = false;
    }
  }

  //selectChat est appelé lors du clic sur un utilisateur
  //Permet de rediriger l'utilisateur vers la page de chat avec cet utilisateur
  selectChat(user: User): void{
    this.router.navigateByUrl('/chat', { skipLocationChange: true }).then(() => {
      this.router.navigate(["chat", user._id]);
    });
  }

  //sendMessage est appelé lors de l'envoi d'un message
  //Permet d'envoyer le message à la room de chat
  sendMessage(){
    if(this.currentChatData && this.userService.user){
      this.chatService.sendMessage(this.userService.user, this.chatInput, this.currentChatData._id);
      this.chatInput = "";
    }
  }
}
