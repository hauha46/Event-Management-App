import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  oldPassword:string;
  newPassword:string;
  verifyPassword:string;
  error: boolean;
  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.userService.getUserById(+this.route.snapshot.paramMap.get("id")).subscribe(response =>{
    }, error =>{
      this.router.navigate(['/accessdenied']);
    });
    this.error = false;
  }

  onSubmit(){
    if(this.newPassword !== this.verifyPassword){
      this.error = true;
    }
    else{
        this.userService.updatePassword(this.authService.getUserId(), this.oldPassword, this.newPassword).subscribe(response => {
          this.router.navigate(['']);
        }, error =>{
          this.error = true;
        });
        
    }
  }

  onCancel(){
    this.router.navigate(['/user/' + this.authService.getUserId()]);
  }
}
