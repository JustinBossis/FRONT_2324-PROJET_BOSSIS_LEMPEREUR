import { IMessage } from "./iMessage";

export class Message implements IMessage{
    _id: string;
    user: string;
    timestamp: number;
    date: Date;
    text: string;
    conversation: string;

    constructor(data: any){
        this._id = data._id;
        this.user = data.user;
        this.date = new Date(data.timestamp);
        this.timestamp = data.timestamp;
        this.text = data.text;
        this.conversation = data.conversation;
    }
    
}