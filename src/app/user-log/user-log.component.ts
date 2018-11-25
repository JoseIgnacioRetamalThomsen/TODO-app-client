import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from "@angular/forms";
import {HttpService} from './../http.service';
import {SessionService} from './../session.service'
import { Router } from "@angular/router";

import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {

  // emailIn;
  //nameIn;

  //password 

  hide = true;

  //isUnchanged = true;

  //form controls/validator
  //Create and add validotes to password Form Control : required,email
  email = new FormControl('', [Validators.required, Validators.email]);
  //values for max/min password length
  minPasswordLength = 1;
  maxPasswordLength = 16;
  //Create and add validotes to password Form Control : required,minLength, maxLength
  password = new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength), Validators.maxLength(this.maxPasswordLength)]);
  //values for max min name lengt
  minNameLength = 1;
  maxNameLength = 32
  //Create and add validotes to password Form Control : required,minLength, maxLength
  name = new FormControl('', [Validators.required, Validators.minLength(this.minNameLength), Validators.maxLength(this.maxNameLength)]);


  wrongDataMessage = false;
  emailInUseMessage = true;
  signUpErrorMessage = ""
  constructor(

    private router: Router,
    private http: HttpService,
    private sessionService : SessionService

  ) { }

  ngOnInit() {

  }

  /*
  * Sign in/ sign out methods, calls from form
  */

  /*
  * Sign in
  */
  onSignIn(): void {
         
    var tempData;
    //check if email/password valid
    if (this.email.valid && this.password.valid) {

      this.http.signin(this.email.value,this.password.value).subscribe(res=>{
      
        tempData = res;


        if(tempData.success){

          this.sessionService.login(tempData.token,tempData.userId);
          
          this.router.navigate(['todoapp']);

        }
        
      });

    }//if(this.email.valid)

  }//onSignIn()

  /*
  * Sign out
  */
  onSignUp(): void {

   

    if (this.email.valid && this.password.valid) {

      var temp
      this.http.addUser(this.email.value,this.password.value).subscribe(res=>{
        temp=res;
        if(temp.success){

          window.location.reload();
        }
      });
      

    }

  }//onSignUp end

  /*
  *form control methods
  */
  getErrorMessageEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :

      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorMessagePassword() {

    return this.password.hasError('required') ? 'You must enter a value' :

      this.password.hasError('minlength') ? 'Min ' + this.minPasswordLength + ' characters long' :

        this.password.hasError('maxlength') ? 'Max ' + this.maxPasswordLength + ' characters long' :

          '';

  }

  getErrorMessageName() {
    return this.name.hasError('required') ? 'You must enter a value' :

      this.name.hasError('minlength') ? 'Min ' + this.minNameLength + ' characters long' :

        this.name.hasError('maxlength') ? 'Max ' + this.maxNameLength + ' characters long' :

          '';
  }

}
