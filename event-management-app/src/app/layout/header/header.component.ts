import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/user/authentication.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: number;
  isAdmin: boolean = false;
  isAuthenticated:boolean = false;
  loginSubscription: Subscription;
  constructor(private userService :UserService, private authService: AuthService, private router : Router) { 
    
  }

  ngOnInit(){
    this.userId = this.authService.getUserId();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.loginSubscription = this.authService.login.subscribe((val) =>{
      this.isAuthenticated = val;
      this.isAdmin = this.authService.isAdmin();
      this.userId = this.authService.getUserId();
    });
  }

  signOut(){
    this.authService.signOut();
    this.router.navigateByUrl('');
  }
}
