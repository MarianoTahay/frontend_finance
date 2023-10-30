import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  //Controladores de contenido
  dashboard_view: boolean = true;
  users_view: boolean = false;
  empresas_view: boolean = false;
  sql_view: boolean = false;

  //Logica para manejar las vistas
  mostrarDashboard(){
    this.dashboard_view = true;
    this.users_view = false;
    this.empresas_view = false;
    this.sql_view = false;
  }

  mostrarUsers(){
    this.dashboard_view = false;
    this.users_view = true;
    this.empresas_view = false;
    this.sql_view = false;
  }

  mostrarEmpresas(){
    this.dashboard_view = false;
    this.users_view = false;
    this.empresas_view = true;
    this.sql_view = false;
  }

  mostrarSql(){
    this.dashboard_view = false;
    this.users_view = false;
    this.empresas_view = false;
    this.sql_view = true;
  }

}
