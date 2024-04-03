import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/userlist/user-list/user-list.component';
import { TeamComponent } from './components/team/team/team.component';

    // array name : array datatype
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch:'full' },
  { path: 'team', component: TeamComponent},
  {path: 'users', component: UserListComponent}
];
    
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
