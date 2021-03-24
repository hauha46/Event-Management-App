import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrolledEventsComponent } from './user-enrolled-events.component';

describe('UserEnrolledEventsComponent', () => {
  let component: UserEnrolledEventsComponent;
  let fixture: ComponentFixture<UserEnrolledEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnrolledEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrolledEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
