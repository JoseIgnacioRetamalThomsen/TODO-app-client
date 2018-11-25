import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  login(token:string,id:string){

    localStorage.setItem('jwtToken', token);
    localStorage.setItem('id', id);
  }

  logout(){

    localStorage.removeItem('jwtToken');
    localStorage.removeItem('id');
    
  }

  getToken(){
    return localStorage.getItem('jwtToken');
  }

  getId(){
    return localStorage.getItem('id');
  }

  
  
}
