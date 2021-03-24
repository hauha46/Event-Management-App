import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Credential } from '../model/credential.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    login = new Subject<boolean>();
    constructor() {}

    public getUsername():string{
        return JSON.parse(sessionStorage.getItem("loggedUser"));
    }

    public getUserId():number{
        return JSON.parse(sessionStorage.getItem("loggedUserId"));
    }

    public isAdmin(): boolean{
        if(JSON.parse(sessionStorage.getItem("loggedUser")) === 'admin' ){
            return true;
        }
        return false;
    }

    public isAuthenticated(): boolean{
        if(JSON.parse(sessionStorage.getItem("loggedUser"))){
            return true;
        }
        return false;
    }

    public signIn(){
        this.login.next(true);
    }

    public signOut(){
        sessionStorage.removeItem("loggedUser");
        sessionStorage.removeItem("loggedUserToken");
        this.login.next(false);
    }
}