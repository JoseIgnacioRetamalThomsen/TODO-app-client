import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {HttpService} from './../http.service';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { R3_TEMPLATE_REF_FACTORY__POST_NGCC__ } from '@angular/core/src/ivy_switch/runtime/legacy';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  lists;
  tasks;


   //values for max min name lengt
   minNameLength = 1;
   maxNameLength = 32
   //Create and add validotes to password Form Control : required,minLength, maxLength
   name = new FormControl('', [Validators.required, Validators.minLength(this.minNameLength), Validators.maxLength(this.maxNameLength)]);
  
   minTaskTitleLength = 1;
   maxTaskTitleLength = 32;
   taskTitle = new FormControl('', [Validators.required, Validators.minLength(this.minTaskTitleLength), Validators.maxLength(this.maxTaskTitleLength)]);

   minTaskBodyLength = 1;
   maxTaskBodyLength = 64;
   taskBody =  new FormControl('', [Validators.minLength(this.minTaskBodyLength), Validators.maxLength(this.maxTaskBodyLength)]);

  constructor(
   private httpService:HttpService,
   private router:Router,
   private route : ActivatedRoute
  ) { }

  ngOnInit() {

    const listId = this.route.snapshot.paramMap.get('listid');

    console.log(listId);

    this.httpService.getList().subscribe(res=>{
      this.lists = res;
      console.log(this.lists);
    });

    this.httpService.getTasks(listId).subscribe(res=>{
      console.log(res);
      this.tasks=res;
    });
  }

  onNewList()
  {
    var temp;
    console.log(this.name.value);
    this.httpService.addNewList(this.name.value).subscribe( resp =>{
      temp = resp;
      if(temp.success){
        
      }
    });
  }

  onNewTask(){
    var temp;
    console.log(this.taskTitle.value);
    console.log(this.taskBody.value);
    this.httpService.addNewTask( this.route.snapshot.paramMap.get('listid'),this.taskTitle.value,this.taskBody.value).subscribe(resp =>{
      temp = resp;
      console.log(temp);
      if(temp.success){
        this.taskTitle.reset();
        this.taskBody.reset();
      }
    })
  }

  onTaskCheckBox(taskId:string){
    console.log(taskId);
    this.httpService.setTaskCompleted(taskId,true).subscribe(res =>{
      console.log(res);
    });
  }

  getErrorMessageName() {
    return this.name.hasError('required') ? 'You must enter a value' :

      this.name.hasError('minlength') ? 'Min ' + this.minNameLength + ' characters long' :

        this.name.hasError('maxlength') ? 'Max ' + this.maxNameLength + ' characters long' :

          '';
  }

}
