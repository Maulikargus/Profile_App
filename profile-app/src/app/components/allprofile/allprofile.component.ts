import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router'
@Component({
  selector: 'app-allprofile',
  templateUrl: './allprofile.component.html',
  styleUrls: ['./allprofile.component.css']
})
export class AllprofileComponent {
  data = null;
  sanitizer: DomSanitizer;
  filteredItems;
  loggedIn: boolean = false;
  search: String="";
  filteredCountry: String[]=[];
  filteredState: String[]=[];
  filteredCity: String[]=[];
  country: String;
  state: String;
  city: String;
  field:String;
  profession:string;
  filteredField:String[]=[];
  filteredProfession:String[]=[];

  constructor(service: LoginService, router: Router, sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
    if (!service.email)
      router.navigateByUrl('/');
    this.loggedIn = true;
    service.getAllProfiles().subscribe(
      data => {
        this.data = data.json();
        this.filteredItems = this.data;
        this.setSearchdata();
      }
    )
  }

  setState(){
    this.filteredState=[];
    this.state=null;
  }

  setCity(){
    this.filteredCity=[];
    this.city=null;
  }

  setProfession(){
    this.filteredProfession=[];
    this.profession=null;
  }

  setSearchdata() {
    for (var i = 0; i < this.filteredItems.length; i++) {
      try{
        if(this.filteredCountry.indexOf(this.filteredItems[i].location.country)==-1)
          this.filteredCountry.push(this.filteredItems[i].location.country);
        if(this.filteredState.indexOf(this.filteredItems[i].location.state)==-1)
          this.filteredState.push(this.filteredItems[i].location.state);
        if(this.filteredCity.indexOf(this.filteredItems[i].location.city)==-1)
          this.filteredCity.push(this.filteredItems[i].location.city);
        if(this.filteredField.indexOf(this.filteredItems[i].field)==-1)
          this.filteredField.push(this.filteredItems[i].field);
        if(this.filteredProfession.indexOf(this.filteredItems[i].profession)==-1)
          this.filteredProfession.push(this.filteredItems[i].profession);
      }catch(e)
      {
      }
    }
  }

  getImg(img) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + img);
  }

  filterItem() {
      this.filteredItems = this.data.filter(
        result => {      
          return (
            ((this.search=="")?true:result.name.toLowerCase().includes(this.search.toLowerCase()))
             &&
            (this.country ? result.location.country == this.country : true) &&
            (this.state ? result.location.state == this.state : true) &&
            (this.city ? result.location.city == this.city : true) &&
            (this.field ? result.field == this.field : true) &&
            (this.profession ? result.profession == this.profession : true)
          );
        }
      );
      this.setSearchdata();
  }

}
