import { IUser } from "./iUser";

export interface IEvent  {
    _id: string;
    name: string;
    picture: string;
    price: number;
    timestamp: number;
    theme: string;
    creator: string;
    favorite_by: IUser[] | null;
}