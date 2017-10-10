import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  cities: any[];
  states: any[];
  loggedIn:boolean=false;
  http: Http;
  sanitizer:DomSanitizer;
  service: LoginService;
  phone: number;
  name: string;
  email: string;
  location: location = {
    city: "",
    state: "",
    country: ""
  };
  website: string;
  mode = false;
  private base64textString: String = "";
  images:SafeUrl;
  countries;
  country;
  state;
  city;
  profession;
  field;
  fields;
  professions;

  constructor(service: LoginService, router: Router, http: Http,sanitizer:DomSanitizer) {
    this.http = http;
    this.service = service;
    this.sanitizer=sanitizer;
    if (!this.service.email)
      router.navigateByUrl('/');
    this.email = service.email;
    this.loggedIn=true;
    this.service.getprofile(service.email).subscribe(
      data => {
        if (data.json().type == "error") {
        }
        else {
          this.name = data.json().name;
          this.location = {
            city: data.json().location.city,
            state: data.json().location.state,
            country: data.json().location.country
          };
          this.city = data.json().location.city;
          this.state = data.json().location.state;
          this.country = data.json().location.country;
          this.field=data.json().field;
          this.profession=data.json().profession;
          this.website = data.json().website;
          this.phone = data.json().phone;
          this.images = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + data.json().image);
        }
      }
    )

    this.setCountries();
    this.setFields();
  }

  toggle() {
    if (this.mode == true) {
      this.setdata();
      this.mode = false;
    }
    else
      this.mode = true;
  }
  setCountries() {
    var tempthis = this;
    this.http.get('../assets/countries.json').subscribe(
      data => {
        tempthis.countries = data.json().countries;
      }
    )
  }


  setFields(){
    var tempthis = this;
    this.http.get('../assets/fields.json').subscribe(
      data => {
        tempthis.fields = data.json();
      }
    )
  }

  setProfessions(){
    var tempthis=this;
    this.http.get('../assets/professions.json').subscribe(
      data => {
        tempthis.professions = data.json()[tempthis.field];
      }
    )
  }


  setsCity() {
    this.location.city = this.city.name;
  }

  setdata() {
    this.service.setprofiles({
      "email": this.email,
      "name": this.name,
      "phone": this.phone,
      "location": this.location,
      "image": this.base64textString,
      "field":this.field,
      "profession":this.profession,
      "website": this.website
    }).subscribe(
      data => {
      }
      );
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.images = 'data:image/jpeg;base64,' + this.base64textString;
  }

  setState() {
    var tempthis = this;
    this.http.get('../assets/states.json').subscribe(
      data => {
        this.states = data.json().states.filter(function (state) {
          return state.country_id == tempthis.country.id;
        });
        this.cities = [];
        this.location.country = this.country.name;
      }
    )
  }

  setCity() {
    var tempthis = this;
    this.http.get('../assets/cities.json').subscribe(
      data => {
        this.cities = data.json().cities.filter(function (city) {
          return city.state_id == tempthis.state.id;
        });
        this.location.state = this.state.name;
      }
    )
  }


}

interface location {
  city: String,
  state: String,
  country: String
}
