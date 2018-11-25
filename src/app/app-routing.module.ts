import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLogComponent} from './user-log/user-log.component'
import { MainComponent } from './main/main.component';

const routes: Routes = 
[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: UserLogComponent },
  { path: 'todoapp/:listid' , component : MainComponent},
  { path: 'todoapp' , component : MainComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
