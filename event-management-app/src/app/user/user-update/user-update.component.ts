import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userForm = this.fb.group({
    id:['', Validators.required],
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['']
  });
  constructor(private userService : UserService, private router : Router, private authService : AuthService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUserById(+this.route.snapshot.paramMap.get("id")).subscribe(response => {
      this.userForm.patchValue(response);
    }, error =>{
      this.router.navigate(['/accessdenied']);
    })
  }

  onSubmit(){
    if(!this.userForm.valid){
      alert("Please check your information again!")
    }else{
      this.userService.updateUser(this.userForm.getRawValue()).subscribe(response =>{
        this.router.navigate(['/user/' + this.authService.getUserId()]);
      },error =>{
        this.router.navigate(['/accessdenied']);
      });
    }
  }

  onCancel(){
    this.router.navigate(['/user/' + this.authService.getUserId()]);
  }
}
