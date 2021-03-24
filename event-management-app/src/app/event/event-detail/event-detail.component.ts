import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from "@angular/router";
import { Event } from 'src/app/model/event.model';
import { AuthService } from 'src/app/user/authentication.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: Event;
  isAdmin:boolean;
  eventId:string;
  constructor(private eventService: EventService, private route: ActivatedRoute, private authService : AuthService) { 
    this.isAdmin = this.authService.isAdmin();
    this.eventId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.eventService.getEventById(+this.route.snapshot.paramMap.get("id")).subscribe(response =>{
      this.event = response;
    }, error => {
      alert("Fail to view event")
    });
  }
  isActive(isActive:Boolean) : string{
    if(isActive) return "Yes"
    else return "No"
  }

}
