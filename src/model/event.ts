import { IEvent } from "./iEvent";

export class Event implements IEvent{
    id: string;
    name: string;
    picture: string;
    price: number;
    date: string;
    theme: string;
    creator: string;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.picture = data.picture;
        this.price = data.price;
        this.date = data.date;
        this.theme = data.theme;
        this.creator = data.creator;
    }
    
}