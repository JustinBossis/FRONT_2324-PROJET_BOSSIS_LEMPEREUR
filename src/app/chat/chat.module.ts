import { NgModule } from '@angular/core';
import { ChatListComponent } from './chat-list/chat-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ChatListComponent
  ],
  imports: [
    SharedModule,
  ],
})
export class ChatModule { }
