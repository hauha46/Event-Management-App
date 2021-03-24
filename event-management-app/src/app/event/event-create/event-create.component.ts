import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/event.model';
import { AuthService } from 'src/app/user/authentication.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  eventForm = this.fb.group({
    title:['', Validators.required],
    shortDescription: ['', Validators.required],
    longDescription: [''],
    publishedDate: [undefined, Validators.required],
    isActive: [undefined, Validators.required],
  })
  constructor(private eventService: EventService, private router: Router, private authService : AuthService, private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate[('/accessdenied')];
    }
  }

  onSubmit(){
    if(this.eventForm.valid){
      this.eventService.addEvent(this.eventForm.getRawValue()).subscribe(response =>{
        this.router.navigate(['/events'])
      }, error =>{
        alert("Create Event Failed")
      });
    }
    else{
      alert("Please check your information again!")
    }
  }

  onCancel(){
    this.router.navigate(['']);
  }
}
