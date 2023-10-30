import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

//IMPORTS DE SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FacturasService } from 'src/app/services/facturas.service';

//IMPORTS PARA LAS INTERFACES
import { Usuarios } from 'src/app/Interfaces/usuarios';
import { Facturas } from 'src/app/Interfaces/facturas';
import { Empresa } from 'src/app/Interfaces/empresa';

//IMPORTS PARA LOS DIALOGOS
import { AddUserComponent } from '../Dialogs/add-user/add-user.component';
import { AddBillComponent } from '../Dialogs/add-bill/add-bill.component';
import { ProfileComponent } from '../Dialogs/profile/profile.component';
import { AddCounterComponent } from '../Dialogs/add-counter/add-counter.component';

//IMPORTS DE LAS INTERFACES
import { Profiles } from 'src/app/Interfaces/profiles';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent {

  //VARIABLES PARA MOSTRAR U OCULTAR INFORMACION
  reportes_view: boolean = true;
  usuarios_view: boolean = false;
  facturas_view: boolean = false;

  listarFacturas_view: boolean = false;
  listarUsuarios_view: boolean = false;

  //DATOS DE LA SESION ACTUAL
  defaultProfile: Profiles = {
    id_usuario: 0,
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    avatar: "",
    status: "",
    cuenta: "",
    fecha_regsitro: "",
    fecha_eliminacion: "",
    hora_inicio: 0,
    horas: 0,
    rol: "",
    id_contador: 0
  }

  //DATOS PARA PODER MOSTRAR LOS USUARIOS
  usuarios: Usuarios[] = [];
  arregloUsuarios: string[] = [];
  arregloEmails: string[] = [];

  //DATOS PARA PODER MOSTRAR LAS FACTURAS
  facturas: Facturas[] = [];
  empresas: Empresa[] = [];

  //FILTROS EN COMUN
  username_Filter: string = "";
  order: string = "Order";

  //FILTROS PARA PODER MOSTRAR A LOS USUARIOS
  email: string = "";
  facturas_max: string = "";
  facturas_min: string = "";
  total_min: string = "";
  total_max: string = "";
  orderBy: string = "Order By";

  //FILTROS PARA PODER MOSTRAR LAS FACTURAS
  date_start: string = "";
  date_finish: string = "";
  nit_emisor: string = "";
  min: string = "";
  max: string = "";

  
  constructor(private userService: UsuariosService, private facturaService: FacturasService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(){

    //OBTENEMOS LOS DATOS DE LA SESION ACTUAL
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
/*
      if(this.defaultProfile.rol == "contador") {
        this.facturaService.showBill("", "", "", "", "", "", "", this.defaultProfile.username);
        this.userService.showUser(this.defaultProfile.username, "", "", "", "", "", "", "", "");
      } 
      else{
        this.facturaService.showBill(this.defaultProfile.username, "", "", "", "", "", "", "");
      }
      */
    });

    //OBTENEMOS LOS DATOS INICIALES PARA PODER MOSTRAR LAS FACTURAS
    this.facturaService.facturas$.subscribe((facturas) => {
      this.facturas = facturas;
    })


    //OBTENEMOS LOS DATOS INICIALES PARA PODER MOSTRAR LOS USUARIOS
    this.userService.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
      for(let i = 0; i< this.usuarios.length; i++){
        this.arregloUsuarios.push(this.usuarios[i].username);
        this.arregloEmails.push(this.usuarios[i].email);
      }
    })

    /*
    this.backend.empresa$.subscribe((empresas) => {
      this.empresas = empresas;
    })
    */

  }


  //LOGICA PARA MOSTRAR CONTENIDO
  mostrarReportes(){
    this.reportes_view = true;
    this.usuarios_view = false;
    this.facturas_view = false;

    this.listarFacturas_view = false;
    this.listarUsuarios_view = false;
  }

  mostrarUsuarios(){
    this.reportes_view = false;
    this.usuarios_view = true;
    this.facturas_view = false;

    this.listarFacturas_view = false;
    this.listarUsuarios_view = false;
  }

  mostrarFacturas(){
    this.reportes_view = false;
    this.usuarios_view = false;
    this.facturas_view = true;

    this.listarFacturas_view = false;
    this.listarUsuarios_view = false;
  }

  mostrarListaContadores(){
    this.dialog.open(AddCounterComponent, {
      width: '30%',
      height: '70%'
    });
  }

  //FUNCIONES PARA EL TAB DE USUARIOS
  addUser(){
    this.dialog.open(AddUserComponent, {
      width: '30%',
      height: '70%'
    });
  }

  showUsers(){

    this.userService.showUser(this.defaultProfile.username, this.username_Filter, this.email, this.facturas_min, this.facturas_max, this.total_min, this.total_max, this.orderBy, this.order);

    this.username_Filter = "";
    this.order = "Order";
    this.email = "";
    this.facturas_max = "";
    this.facturas_min = "";
    this.total_min = "";
    this.total_max = "";
    this.orderBy = "Order By";
  }

  //FUNCIONES PARA EL TAB DE FACTURAS
  addBill(){
    this.dialog.open(AddBillComponent, {
      width: '30%',
      height: '70%',
    });
  }

  showBills(){

    if(this.defaultProfile.rol == "cliente"){
      this.facturaService.showBill(this.username_Filter, this.date_start, this.date_finish, this.min, this.max, this.nit_emisor, this.order, "");
    }
    else{
      this.facturaService.showBill(this.username_Filter, this.date_start, this.date_finish, this.min, this.max, this.nit_emisor, this.order, this.defaultProfile.username);
    }

    this.username_Filter = "";
    this.order = "Order";
    this.date_start = "";
    this.date_finish = "";
    this.nit_emisor = "";
    this.min = "";
    this.max = "";
  }

/*
  deleteBill(dte: string, serie: string){
    this.backend.deleteBill(dte, serie);
    this.ngOnInit();
    console.log("Borrar: " + dte);
  }
*/
  //MOSTRAR EL PERFIL DEL USUARIO
  profile(){
    this.dialog.open(ProfileComponent, {
      width: '30%',
      height: '70%'
    });
  }

}