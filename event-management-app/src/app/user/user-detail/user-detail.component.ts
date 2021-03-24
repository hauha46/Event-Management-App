import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{

  user : User;
  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService, private router : Router) {
   }

  ngOnInit(): void {
    this.userService.getUserById(+this.route.snapshot.paramMap.get("id")).subscribe(response => {
      this.user = response;
    }, error =>{
      this.router.navigate(['/accessdenied']);
    })
  }
}
