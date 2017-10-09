import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {Router} from '@angular/router'
@Component({
  selector: 'app-allprofile',
  templateUrl: './allprofile.component.html',
  styleUrls: ['./allprofile.component.css']
})
export class AllprofileComponent {
  data=null;
  sanitizer:DomSanitizer;
  filteredItems;
  loggedIn:boolean=false;
  search:String;
  
  constructor(service:LoginService,router: Router,sanitizer:DomSanitizer) {
    this.sanitizer=sanitizer;  
    if(!service.email)
      router.navigateByUrl('/');
    this.loggedIn=true;
    service.getAllProfiles().subscribe(
        data =>{
         this.data=data.json();
         this.filteredItems=this.data;
        }
      )
   }

   getImg(img){
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + img);
   }

   filterItem(){
    if(this.search=="")
      {
        this.filteredItems=this.data;
      }
    else if(this.search){//when nothing has typed
    this.filteredItems = this.data.filter(
      result=> {
        return result.name.toLowerCase().includes(this.search.toLowerCase());
      }
      );
  }
 }

}
