import { IMessage } from "./iMessage";
import { IUser } from "./iUser";

export interface IChat  {
    _id: string;
    messages: IMessage[];
    users_data: IUser[];
}