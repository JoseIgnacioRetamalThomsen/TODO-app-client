import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { User } from './Models/User'
import { TaskList } from './Models/TaskList';
import { Task } from './Models/Task';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { }


  addUser(email: string, password: string) {

    const user: User = { email: email.toUpperCase(), password: password };

    return this.http.post("http://localhost:8081/api/signup", user);

  }

  signin(email: string, password: string) {
    const user: User = { email: email.toUpperCase(), password: password };

    return this.http.post("http://localhost:8081/api/signin", user);

  }

  addNewList(name: string) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.sessionService.getToken() })
    };

    var taskList: TaskList = { name: name, userId: this.sessionService.getId() };

    return this.http.post('http://localhost:8081/api/newlist', taskList, httpOptions);
  }

  getList() {

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.sessionService.getToken() })
    };

    return this.http.get('http://localhost:8081/api/getlists/' + this.sessionService.getId(), httpOptions);
  }

  addNewTask(listId: string, taskTitle: string, taskBody: string) {

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.sessionService.getToken() })
    };

    var task: Task = { taskListId: listId, taskTitle: taskTitle, taskBody: taskBody, isCompleted: false }

    return this.http.post('http://localhost:8081/api/newtask', task, httpOptions);
  }

  getTasks(listId:string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.sessionService.getToken() })
    };

    return this.http.get('http://localhost:8081/api/gettasks/' + listId, httpOptions);
  }

  setTaskCompleted(taskId:string, isCompleted:boolean){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.sessionService.getToken() })
    };

    let taskCompleted = { taskId:taskId,isCompleted: isCompleted}

    return this.http.post('http://localhost:8081/api/settaskcompleted',taskCompleted, httpOptions);
  }

  deleteTask(taskId:string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.sessionService.getToken() })
    };
    let task = { taskId:taskId}
    return this.http.delete('http://localhost:8081/api/deletetask/'+taskId,httpOptions);
  }

  editTask(task){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.sessionService.getToken() })
    };
    
    return this.http.put('http://localhost:8081/api/updatetask',task,httpOptions);

  }
}
