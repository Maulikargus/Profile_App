import { Component } from '@angular/core';
import { LoginService } from './services/login.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email=false;
  router;
  home;
  profile
  loggedIn:boolean=false;
  constructor(service:LoginService,router:Router){
    this.router=router;
  }

  componentAdded(email){
    console.log(email);
    this.email=email.loggedIn;
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
