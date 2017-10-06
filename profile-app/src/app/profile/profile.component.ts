import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  service:LoginService;
  phone:number;
  name:string;
  email:string;
  city:string;
  website:string;
  mode=false;
  private base64textString:String="";
  image:string;

  constructor(service:LoginService,router:Router) {
      
    
      console.log("hey"+service.email)
      this.service=service;
      console.log(this.service.email);
      if(!this.service.email)
        router.navigateByUrl('/');
      this.email=service.email;
      
      this.service.getprofiles(service.email).subscribe(
        data =>{
          if(data.json().type=="error")
            {
                console.log("set data");
            }
          else
            {
              console.log(data.json());
                this.name=data.json().name;
                this.city=data.json().city;
                this.website=data.json().website;
                this.phone=data.json().phone;
                this.image='data:image/jpeg;base64,'+data.json().image;
            }
          }
      )
   }

   toggle(){
     if(this.mode==true)
      {
        this.setdata();
        this.mode=false;
      }
      else
        this.mode=true;
   }


   setdata(){
     this.service.setprofiles({
    "email":this.email,
		"name":this.name,
		"phone":this.phone,
    "city":this.city,
    "image":this.base64textString,
		"website":this.website}).subscribe(
      data=>{
        console.log(data);
      }
    );
   }

   handleFileSelect(evt){
     console.log("change detected");
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
         this.image='data:image/jpeg;base64,'+this.base64textString;
         console.log(btoa(binaryString));
      //   console.log(atob(""+binaryString));
        }
}


