import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    dupPassword: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['']
  });
  passwordNotMatch : boolean;
  duplicateUsername:boolean;
  constructor(private userService: UserService, private router: Router, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.passwordNotMatch = false;
  }

  onSubmit(){
    if(!this.userForm.valid){
      alert("Please check your information again")
    } else{
      if(this.passwordNotMatch==false && this.duplicateUsername == false){
        this.userService.addUser(this.userForm.getRawValue()).subscribe(response =>{
          this.router.navigate(['/']);
        }, error => {
          alert("Failed to create user")
        });
      }
    }
    
  }
  
  verifyPassword(){
    console.log(this.userForm.get('password').value);
    if(this.userForm.get('password').value !== this.userForm.get('dupPassword').value){
      this.passwordNotMatch = true;
    }
    else{
      this.passwordNotMatch = false;
    }
  }

  checkUsernameAvailable(){
    this.userService.checkUser(this.userForm.get('username').value).subscribe(response =>{
      this.duplicateUsername = response;
    });
  }
}
