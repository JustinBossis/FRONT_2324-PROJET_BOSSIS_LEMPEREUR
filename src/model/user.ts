import { IUser } from "./iUser";

export class User implements IUser{
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    admin: boolean;
    favorites: string[];
    birthdate: number;
    picture: string;

    constructor(data: any){
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.username = data.username;
        this.email = data.email;
        this.admin = data.admin;
        this.favorites = data.favorites;
        this.birthdate = data.birthdate;
        this.picture = data.picture;
    }

    displayName(): string {
        return `${this.firstname} ${this.lastname}`
    }
    
}