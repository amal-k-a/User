
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AddUserComponent } from './add-user/add-user.component';


const routes: Routes = [
  { path: '', component: UserListComponent },            
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: EdituserComponent },
  { path: '**', redirectTo: '' }                         // fallback
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
