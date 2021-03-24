import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsRoutingModule } from './event-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventUpdateComponent } from './event-update/event-update.component';
import { DatePipe } from '@angular/common'


@NgModule({
  declarations: [EventListComponent, EventCreateComponent, EventDetailComponent, EventUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    EventsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class EventModule { }
