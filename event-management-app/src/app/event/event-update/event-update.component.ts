import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/model/event.model';
import { DatePipe } from '@angular/common'
import { AuthService } from 'src/app/user/authentication.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {

  eventForm = this.fb.group({
    id: ['', Validators.required],
    title:['', Validators.required],
    shortDescription: ['', Validators.required],
    longDescription: [''],
    publishedDate: [undefined, Validators.required],
    isActive: [undefined, Validators.required],
  })
  

  constructor(private eventService: EventService, private route: ActivatedRoute, private authService : AuthService, private router:Router, private fb:FormBuilder, private datepipe : DatePipe) {
    if(!authService.isAdmin()){
      this.router.navigate(['/accessdenied']);
    }
  }

  ngOnInit(): void {
    this.eventService.getEventById(+this.route.snapshot.paramMap.get("id")).subscribe(response =>{
      this.eventForm.patchValue(response);
    }, error => {
      alert("Fail to view event");
    });
  }

  onSubmit(){
    if(this.eventForm.invalid){
      alert("Please check your information again!");
    }else{
      this.eventService.updateEvent(this.eventForm.getRawValue()).subscribe(response => {
        this.router.navigate(['/events']);
      }, error => {
        alert("Fail to update event");
      });
    }
  }

  onCancel(){
    this.router.navigate(['/events']);
  }
}
