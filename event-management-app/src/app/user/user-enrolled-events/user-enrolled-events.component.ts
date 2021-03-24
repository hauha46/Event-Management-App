import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/event/event.service';
import { Event } from 'src/app/model/event.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-enrolled-events',
  templateUrl: './user-enrolled-events.component.html',
  styleUrls: ['./user-enrolled-events.component.css']
})
export class UserEnrolledEventsComponent implements OnInit {

  events : Event[];
  user: User;
  isAdmin:boolean;
  isAuthenticated:boolean;
  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService, private router : Router, private eventService:EventService) { 
    this.isAdmin = this.authService.isAdmin();
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  

  ngOnInit(): void {
    this.userService.getEventsByUserId(+this.route.snapshot.paramMap.get("id")).subscribe(response => {
      this.events = response;
    }, error => {
      this.router.navigate(['/accessdenied']);
    })
  }
  
  removeEnrollEvent(eventId:any){
    if(confirm("Delete Enrolled Event?")){
      this.userService.removeEnrollEvent(this.authService.getUserId(),eventId).subscribe(response => {
        window.location.reload();
      }, error =>{
        alert("Remove event failed")
      })
    }
    
    
  }

}
