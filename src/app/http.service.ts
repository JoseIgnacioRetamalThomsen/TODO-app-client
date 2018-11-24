import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from './Models/User'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }


  addUser(email: string, password: string) {

    const user: User = { email: email.toUpperCase(), password: password};

    return this.http.post("http://localhost:8081/api/signup", user);

  }

}
