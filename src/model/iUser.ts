export interface IUser {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    admin: boolean;
    favorites: string[];
    birthdate: number;
    picture: string;

    displayName(): string;
}