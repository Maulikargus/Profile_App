import { Component } from '@angular/core';
import { LoginService } from './services/login.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email='';
  router;
  home;
  profile
  constructor(service:LoginService,router:Router){
    this.email=service.email;
    this.router=router;
  }

  componentAdded(email){
    console.log(email);
   if(email.loggedIn)
    this.email='true';
  }

  logout(){
    this.email=null;
    this.router.navigateByUrl('/');
  }

  activateHome(){
    this.profile="";
    this.home="active";
  }

  activateProfile(){
    this.home="";
    this.profile="active";
  }

}
