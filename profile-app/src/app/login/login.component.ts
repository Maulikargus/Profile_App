import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})





export class LoginComponent  {
  show=true;  
  register=false;
  registerpassword="";
  registerrepassword="";
  error="";
  loginservice:LoginService=null;
  location: Location;
  site:string="/profile";
  router:Router;

  constructor(private loginservices: LoginService,router:Router)
    {
      this.loginservice=loginservices;
      this.router=router;
    }



   toggle()
  {
    this.register=!this.register;
  }

  same()
  {
    if(this.registerpassword=="")
      return false;
    else if(this.registerpassword==this.registerrepassword)
      return true;
    else
      return false;
  }

  login(email,pass)
  {
    this.loginservice.login(email,pass).subscribe(
      data =>{
        if(data.json().type=="error")
          {
            this.error="register first";
            setTimeout(()=>{    //<<<---    using ()=> syntax
              this.error = "";
         },2000);
      }
        else
          {
            this.loginservice.email=email;
            console.log(this.loginservice.email);
          //  this.location.go('profile','');
           // this.location.forward();
            this.router.navigateByUrl('/profile');
          //  window.location.href="profile";
          }
        }
    )
  }

  signUp(email)
  {
  if(!this.same())
    {
        this.error="password did not match";
        setTimeout(()=>{    //<<<---    using ()=> syntax
          this.error = "";
     },2000);
    }
    else{
    this.loginservice.signUp(email,this.registerpassword).subscribe(
      data => console.log(data)   
    )
    this.register=false;
  }
  }



}
