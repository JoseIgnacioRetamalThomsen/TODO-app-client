import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from './../http.service';
import { Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { R3_TEMPLATE_REF_FACTORY__POST_NGCC__ } from '@angular/core/src/ivy_switch/runtime/legacy';
import { template } from '@angular/core/src/render3';
import { Task } from './../Models/Task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  lists;
  tasks;

  selectedList = "Create or Select a list";
  selectedListId = "";

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
  taskBody = new FormControl('', [Validators.minLength(this.minTaskBodyLength), Validators.maxLength(this.maxTaskBodyLength)]);

  listId;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {




    this.httpService.getList().subscribe((res) => {
      this.lists = res;


      if (this.lists.length > 0 && this.selectedListId != "") {

        this.httpService.getTasks(this.selectedListId).subscribe(res => {

          this.tasks = res;
        });
      }
    });




  }

  onNewList() {
    var temp;

    this.httpService.addNewList(this.name.value).subscribe(resp => {
      temp = resp;

      if (temp.success) {

        this.selectedList = this.name.value;


        this.selectedListId = temp.listId;

        this.router.navigate(['todoapp/' + temp.listId]);
        this.selectList(this.name.value, temp.listId);
      }
    });
  }

  onNewTask() {
    var temp;
    if (this.selectList) {
      this.httpService.addNewTask(this.selectedListId, this.taskTitle.value, this.taskBody.value).subscribe(resp => {
        temp = resp;

        if (temp.success) {

          this.taskTitle.reset();
          this.taskBody.reset();
          this.ngOnInit();
        }
      })
    }
  }

  onTaskCheckBox(taskId: string, isCompleted: boolean) {

    //set is completed to inverse
    this.httpService.setTaskCompleted(taskId, isCompleted ? false : true).subscribe(res => {
      if (res) {

      }
    });
  }

  onDelete(taskId: string) {
    var temp;
    this.httpService.deleteTask(taskId).subscribe(res => {
      temp = res;
      if (temp.success) {


        this.ngOnInit();
      }


    });
  }

  selectList(listName, listId) {


    this.selectedList = listName;
    this.selectedListId = listId;
    this.ngOnInit();
  }

  getErrorMessageName() {
    return this.name.hasError('required') ? 'You must enter a value' :

      this.name.hasError('minlength') ? 'Min ' + this.minNameLength + ' characters long' :

        this.name.hasError('maxlength') ? 'Max ' + this.maxNameLength + ' characters long' :

          '';
  }

}
