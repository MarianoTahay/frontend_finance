import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Rutas de los componenetes creados
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { ContadorComponent } from './Components/Contador/contador.component';
import { AdminComponent } from './Components/admin/admin.component';

const routes: Routes = [
  {path: 'contador-page', component: ContadorComponent},

  {path: 'admin', component: AdminComponent},

  {path: '', component: LoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
