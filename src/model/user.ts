import { IUser } from "./iUser";

export class User implements IUser{
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    admin: boolean;
    favorites: string[];
    birthdate: number;
    birth: Date;
    picture: string;

    constructor(data: any){
        this._id = data._id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.username = data.username;
        this.email = data.email;
        this.admin = data.admin;
        this.favorites = data.favorites;
        this.birthdate = data.birthdate;
        this.birth = new Date(data.birthdate);
        this.picture = data.picture;
    }

    displayName(): string {
        return `${this.firstname} ${this.lastname}`
    }
    
}