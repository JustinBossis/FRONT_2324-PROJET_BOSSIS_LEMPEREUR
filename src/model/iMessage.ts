export interface IMessage  {
    _id: string;
    user: string;
    timestamp: number;
    text: string;
    conversation: string;
}