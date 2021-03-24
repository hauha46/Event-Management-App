import { Injectable } from '@angular/core';
import { Event } from '../model/event.model';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class EventService {
    private events: Event[] = [];
    private readonly baseURL = "https://localhost:44314/event";

    constructor(private httpClient : HttpClient){
        if(localStorage.getItem('events') != null && localStorage.getItem('events') != undefined){
            this.events = JSON.parse(localStorage.getItem('events'));
        }
    }

    public getEvents(): Observable<Event[]> {
        return this.httpClient.get<Event[]>(`${this.baseURL}/all`);
    }

    public getEventsWithUserId(id : number): Observable<Event[]> {
        return this.httpClient.get<Event[]>(`${this.baseURL}/all/${id}`);
    }

    public getEventById(id: number): Observable<Event> {
        return this.httpClient.get<Event>(`${this.baseURL}/${id}`);
    }
    
    public addEvent(event: Event) : Observable<number> {
        return this.httpClient.post<number>(`${this.baseURL}/add`, JSON.stringify(event))
    }

    public updateEvent(event: Event) : Observable <Event>{
        return this.httpClient.patch<Event>(`${this.baseURL}/update`, JSON.stringify(event));
    }
    
    public deleteEvent(id : number) {
        return this.httpClient.delete(`${this.baseURL}/${id}`);
    }
}