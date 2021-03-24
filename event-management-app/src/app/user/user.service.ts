import { Injectable, OnInit } from '@angular/core';
import { Event } from '../model/event.model';
import { User} from '../model/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Credential } from '../model/credential.model';
import { UserPagination } from '../model/user-pagination.model';
@Injectable({
    providedIn: 'root'
})
export class UserService{
    private users: User[] = [];
    private readonly baseURL = "https://localhost:44314/user";
    private readonly enrollURL = "https://localhost:44314/enroll";
    constructor(private httpClient : HttpClient){
    }

    public getUsers(query: string, page:number, itemCount: number): Observable<UserPagination> {
        if(query !== null && query !== ''){
            return this.httpClient.get<UserPagination>(`${this.baseURL}/all/${query}/${page}/${itemCount}`);
        }
        else{
            return this.httpClient.get<UserPagination>(`${this.baseURL}/all/${page}/${itemCount}`);
        }
    }

    public getUserById(id: number): Observable<User>{
        return this.httpClient.get<User>(`${this.baseURL}/${id}`);
    }

    public checkUser(username: string) : Observable<boolean>{
        return this.httpClient.get<boolean>(`${this.baseURL}/check/${username}`);
    }

    public isUser(username:string) : boolean{
        for(let user of this.users){
            if(user.username === username){
                return true;
            }
        }
        return false;
    }

    public authenticateUser(credential:Credential): Observable<User>{
        return this.httpClient.post<User>(`${this.baseURL}/auth`, JSON.stringify(credential));
    }
    
    public addUser(user: User) : Observable<number> {
        return this.httpClient.post<number>(`${this.baseURL}/add`, JSON.stringify(user))
    }

    public updateUser(user: User) : Observable<User> {
        return this.httpClient.patch<User>(`${this.baseURL}/update`, JSON.stringify(user));
    }
    
    public updatePassword(id: number, oldPassword: string, newPassword:string){
        return this.httpClient.patch<User>(`${this.baseURL}/change-password`, JSON.stringify({id, oldPassword, newPassword}));
    }

    public addEnrolledEvent(userId: number, eventId: number){
        return this.httpClient.post(`${this.enrollURL}/add`, JSON.stringify({userId, eventId}));
    }

    public getEventsByUserId(id: number) : Observable<Event[]>{
        return this.httpClient.get<Event[]>(`${this.enrollURL}/${id}`);
    }

    public removeEnrollEvent(userId: number, eventId: number){
        return this.httpClient.delete(`${this.enrollURL}/delete/${userId}/${eventId}`);
    }
}