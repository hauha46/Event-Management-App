import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserEnrolledEventsComponent } from './user-enrolled-events/user-enrolled-events.component';



@NgModule({
  declarations: [UserCreateComponent, UserDetailComponent, UserListComponent, UserUpdateComponent, LoginComponent, UserChangePasswordComponent, UserEnrolledEventsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule  
  ]
})
export class UserModule { }
