import { IChat } from "./iChat";
import { Message } from "./message";
import { User } from "./user";

export class Chat implements IChat{
    _id: string;
    messages: Message[];
    users_data: User[];

    constructor(data: any){
        this._id = data._id;
        this.messages = data.messages.map((message: any) => new Message(message));
        this.users_data = data.users_data.map((user: any) => new User(user));
    }
    
}