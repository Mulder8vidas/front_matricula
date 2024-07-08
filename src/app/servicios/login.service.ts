import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://127.0.0.1:5000";

  constructor(private http:HttpClient) { }

  login(username:any,password:any):Observable<any>{

    let payload={
      username:username,
      password:password
    }

    return this.http.post(this.url+"/login",payload);
  }
}
