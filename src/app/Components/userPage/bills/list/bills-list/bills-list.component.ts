import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from '../../../../Dialogs/alerta/alerta.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Facturas } from '../../../../../Interfaces/facturas';
import { Empresa } from 'src/app/Interfaces/empresa';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css'],
  standalone: true,
  imports: [NgFor, FormsModule, NgIf]
})
export class BillsListComponent {

  //User session
  userSession: string = "";
  userRol: string = "";
  facturas: Facturas[] = [];
  usuarios: string[] = [];
  usuariosFilter: string[] = []

  empresas: Empresa[] = [];

  //Filtros
  username: string = "";
  date_start: string = "";
  date_finish: string = "";
  nit_emisor: number = 0;
  min: number = 0;
  max: number = 0;
  order: string = "Order";

  displayedColumns: string[] = ['Username', 'DTE', 'Serie', 'Date', 'Total'];

  dataSource = this.facturas;

  //Empieza ejecucion

  constructor(private backend: BackendService, private router: Router, private dialog: MatDialog){}

  ngOnInit(): void{

    this.backend.userSession$.subscribe((userSession) => {
      this.userSession = userSession;
    });

    this.backend.userRol$.subscribe((userRol) => {
      this.userRol = userRol;
      
      if(this.userRol == "cliente"){
        this.backend.showBill(this.userSession, "", "", 0, 0, 0, "", "");
      }
      else{
        this.backend.showBill("", "", "", 0, 0, 0, "", this.userSession);
      }
    }); 

    //Obtenemos las facturas
    this.backend.facturas$.subscribe((facturas) => {
      this.facturas = facturas;
      if(this.userRol != "cliente"){
        for(let i = 0; i< this.facturas.length; i++){
          this.usuarios.push(this.facturas[i].username);
        }
        this.usuariosFilter = [...new Set(this.usuarios)];
      }
    })

    //Obtenemos todas las empresas
    this.backend.empresa$.subscribe((empresas) => {
      this.empresas = empresas;
      console.log(this.empresas)
    })

  }

  home(){
    this.router.navigate(['home']);
  }

  openMenu(){
    if(this.userRol == "cliente"){
      this.backend.errorSubject.next("You are not a counter")
      this.dialog.open(AlertaComponent, {
        width: '30%',
        height: '30%'
      });
    }
    else{
      this.router.navigate(['users-menu']);
    }
  }

  openOtherMenu(){
    this.router.navigate(['bills-menu']);
  }

  listBills(){
    this.router.navigate(['bills-list']);
  }


  showData(){

    if(this.userRol == "cliente"){
      this.username = this.userSession;
    }

    if(this.order == "Order"){
      this.order = "";
    }
    else if(this.order == "Ascend"){
      this.order = "ASC";
    }
    else{
      this.order = "DESC"
    }

    if(this.min == null){
      this.min = 0
    }

    if(this.max == null){
      this.max = 0
    }

    if(this.userRol == "cliente"){
      this.backend.showBill(this.username, this.date_start, this.date_finish, this.min, this.max, this.nit_emisor, this.order, "");
    }
    else{
      this.backend.showBill(this.username, this.date_start, this.date_finish, this.min, this.max, this.nit_emisor, this.order, this.userSession);
    }

    this.order =  "Order"

  }
}
