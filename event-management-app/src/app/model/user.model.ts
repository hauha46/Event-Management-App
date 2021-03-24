import { Event } from './event.model';

export interface User {
    id: number,
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    token : string;
}