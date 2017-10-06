
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  email:string;
  constructor (
    private http: Http
  ) {}
 
  // Calling the Hackernews API using GET method.
  getprofiles(email:string) {
    return this.http.get('http://192.1.125.44:3000/get/'+email)
  }

  setprofiles(data){
    return this.http.post('http://192.1.125.44:3000/setdata',data);
  }

  login(name,password)
  {
      console.log("runnign");
      var body={
          "type":"login",
          "email":name,
          "password":password
      }
      console.log(body);
    return this.http.post('http://192.1.125.44:3000',body)
  }



  signUp(name,password)
  {
      console.log("runnign");
      var body={
          "type":"register",
          "email":name,
          "password":password
      }
      console.log(body);
    return this.http.post('http://192.1.125.44:3000',body)
  }
}