import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserLogComponent} from './user-log/user-log.component'

const routes: Routes = 
[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: UserLogComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
