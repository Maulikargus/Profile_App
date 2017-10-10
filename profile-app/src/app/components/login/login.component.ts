import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loggedIn:boolean=false;
  
  show = true;
  register = false;
  registerpassword: string;
  registerrepassword: string;
  error = "";
  notification = "";
  loginservice: LoginService = null;
  site: string = "/profile";
  router: Router;

  constructor(private loginservices: LoginService, router: Router) {
    this.loginservice = loginservices;
    this.router = router;
  }



  toggle() {
    this.register = !this.register;
  }

  same(registerpassword, registerrepassword) {
    if (registerpassword == "")
      return false;
    else if (registerpassword == registerrepassword)
      return true;
    else
      return false;
  }

  login(email, pass) {
    this.loginservice.login(email, pass).subscribe(
      data => {
        if (data.json().type == "error") {
          this.error = "register first";
          setTimeout(() => {    //<<<---    using ()=> syntax
            this.error = "";
          }, 2000);
        }
        else {
          this.loginservice.email = email;
          this.loggedIn=true;
          this.router.navigateByUrl('/allprofile');
        }
      }
    )
  }

  signUp(email, registerpassword, registerrepassword) {
    if (!this.same(registerpassword, registerrepassword)) {
      this.error = "password did not match";
      setTimeout(() => {
        this.error = "";
      }, 2000);
    }
    else {
      this.loginservice.signUp(email, registerpassword).subscribe(
        data => {
          if (data.json().type == "error") {
            this.error = data.json().message;
            setTimeout(() => {
              this.error = "";
            }, 2000);
          }
          else {
            this.register = false;
            this.error = data.json().message;
            this.notification = "successfully registered";
            setTimeout(() => {
              this.notification = "";
            }, 2000);
          }
        }
      )

    }
  }



}
