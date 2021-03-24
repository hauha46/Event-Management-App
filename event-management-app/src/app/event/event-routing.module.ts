import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventUpdateComponent } from './event-update/event-update.component';

const routes: Routes = [
  {path:'events', component: EventListComponent},
  {path:'events/:id', component: EventDetailComponent},
  {path:'create/event', component: EventCreateComponent},
  {path:'event/:id/edit', component: EventUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
