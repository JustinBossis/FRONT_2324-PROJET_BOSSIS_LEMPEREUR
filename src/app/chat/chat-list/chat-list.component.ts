import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ChatListComponent implements OnInit, OnDestroy{
  users: User[] | null;
  currentChat: User | null = null;
  currentChatData: Chat | null = null;
  userService: UserService
  chatInput: string = ""
  messages: Message[] = []

  constructor(private route: ActivatedRoute,private router: Router, private userServ: UserService, private chatService: ChatService){
    this.users = null;
    this.userService = userServ;
  }


  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    if(userId){
      this.currentChatData = new Chat(this.route.snapshot.data["chatDetailResolved"][0])
      this.messages = this.currentChatData.messages
      if(this.currentChatData.users_data[0]._id == userId){
        this.currentChat = this.currentChatData.users_data[0]
      }else{
        this.currentChat = this.currentChatData.users_data[1]
      }
      this.chatService.connectToRoom(this.currentChatData._id);
      this.chatService.getMessages().subscribe((message: IMessage) => {
        this.messages.push(new Message(message));
      });
    }
    this.users = this.route.snapshot.data['chatResolved'].map((user: any) => new User(user)).filter((user: { _id: string; }) => {return user._id != this.userService.user?._id})
  }

  ngOnDestroy(): void {
    const userId = this.route.snapshot.params['userId'];
    if(userId){
      this.chatService.leaveRoom();
    }
  }

  selectChat(user: User): void{
    this.router.navigate(["chat", user._id]);
  }

  sendMessage(){
    if(this.currentChatData && this.userService.user){
      this.chatService.sendMessage(this.userService.user, this.chatInput, this.currentChatData._id);
      this.chatInput = "";
    }
  }
}
