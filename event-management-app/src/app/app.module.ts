import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ShellComponent } from './layout/shell/shell.component';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { HomeComponent } from './home/home.component';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    HomeComponent,

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EventModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
