import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { RegisterComponent } from './Components/Register/register/register.component';
import { UserPageComponent } from './Components/userPage/userPage/user-page/user-page.component';
import { UserMenuComponent } from './Components/userPage/bills/menu/user-menu/user-menu.component';
import { OtherMenuComponent } from './Components/userPage/users/menu/other-menu/other-menu.component';
import { BillsListComponent } from './Components/userPage/bills/list/bills-list/bills-list.component';
import { UsersListComponent } from './Components/userPage/users/list/users-list/users-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: 'register', component: RegisterComponent},

  {path: 'home', component:UserPageComponent},

  {path: 'bills-menu', component:UserMenuComponent},

  {path: 'users-menu', component:OtherMenuComponent},

  {path: 'bills-list', component:BillsListComponent},

  {path: 'users-list', component:UsersListComponent},

  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
