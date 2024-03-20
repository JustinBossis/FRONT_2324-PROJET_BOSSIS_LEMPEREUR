import { IEvent } from "./iEvent";
import { User } from "./user";

export class Event implements IEvent{
    _id: string;
    name: string;
    picture: string;
    price: number;
    date: string;
    theme: string;
    creator: string;
    favorite_by: User[]

    constructor(data: any){
        this._id = data._id;
        this.name = data.name;
        this.picture = data.picture;
        this.price = data.price;
        this.date = data.date;
        this.theme = data.theme;
        this.creator = data.creator;
        this.favorite_by = data.favorite_by?data.favorite_by.map((user: any) => new User(user)):[];
    }
    
}