import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import {HttpModule} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { routing  } from './app.routing';
import { ProfileComponent } from './components/profile/profile.component';
import { Router } from '@angular/router';
import { AllprofileComponent } from './components/allprofile/allprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AllprofileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
