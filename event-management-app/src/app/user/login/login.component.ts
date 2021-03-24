import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credential } from 'src/app/model/credential.model';
import { AuthService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credential: Credential = {username:undefined, password:undefined};
  credentialError:boolean;
  constructor(private userService: UserService, private router : Router, private authService : AuthService) { 

  }

  ngOnInit(): void {
    this.credentialError = false;
    if(this.authService.isAuthenticated()){
      this.router.navigateByUrl('');
    }
  }

  onSubmit(){
    this.userService.authenticateUser(this.credential).subscribe( response => {
      sessionStorage.setItem('loggedUser', JSON.stringify(response.username));
      sessionStorage.setItem('loggedUserId', JSON.stringify(response.id));
      sessionStorage.setItem('loggedUserToken', response.token);
      this.authService.signIn();
      this.router.navigateByUrl('');
    }, error => {
      this.credentialError = true;
    })
  }

}
