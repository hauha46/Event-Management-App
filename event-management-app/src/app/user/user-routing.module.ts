import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEnrolledEventsComponent } from './user-enrolled-events/user-enrolled-events.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';


const routes : Routes = [
 { path: 'users', component: UserListComponent},
 { path: 'user/:id', component: UserDetailComponent},
 { path: 'signup', component: UserCreateComponent},
 { path: 'user/:id/edit', component: UserUpdateComponent},
 { path: 'user/:id/changePassword', component: UserChangePasswordComponent},
 { path: 'user/:id/events', component: UserEnrolledEventsComponent},
 { path: 'login', component: LoginComponent}

];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class UserRoutingModule {

}