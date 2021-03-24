import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/event.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/user/authentication.service';
import { UserService } from 'src/app/user/user.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];
  isAdmin : boolean;
  isAuthenticated : boolean;
  user:User;
  constructor(private eventService: EventService, private userService : UserService, private authService :AuthService, private router:Router) {
  }

  ngOnInit(){
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    if(!this.isAuthenticated){
      this.eventService.getEvents().subscribe(response =>{
        this.events = response;
      })
    }
    else{
      this.eventService.getEventsWithUserId(this.authService.getUserId()).subscribe(response =>{
        this.events = response;
      })
    }
  }

  enrollEvent(event:any){
    if(this.isAuthenticated){
      this.userService.addEnrolledEvent(this.authService.getUserId(), event.id).subscribe(response => {
        this.router.navigate(['/user/' + this.authService.getUserId() + '/events'])
      }, error =>{
        alert("Enroll Event Failed")
      })
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  deleteEvent(event:any){
    if(confirm('Delete ' + event.title + '?')){
      if(this.isAdmin){
        this.eventService.deleteEvent(event.id).subscribe(response =>{
          window.location.reload();
        });
      }
    }
  }

  isActive(isActive:boolean) : string{
    if(isActive) return "Yes"
    else return "No"
  }

}
