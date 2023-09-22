import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';
import { Facturas } from '../../../../Interfaces/facturas';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { AlertaComponent } from '../../alerta/alerta.component';
import {MatDialog} from '@angular/material/dialog';
import { Empresa } from 'src/app/Interfaces/empresa';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
  standalone: true,
  imports: [MatDialogModule, FormsModule, NgFor, NgIf]
})
export class AddBillComponent {

  userSession: string = "";
  userRol: string = "";

  facturas: Facturas[] = [];
  usuarios: string[] = [];
  usuariosFilter: string[] = []

  empresas: Empresa[] = [];

  dte: number = 0;
  serie: string = "";
  nit_emisor: number = 0;
  monto: number = 0;
  fecha_emision: string = "";
  username: string = "";


  constructor(private backend: BackendService, private dialog: MatDialog){}

  ngOnInit(){

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

    //Obtenermos todos los usuarios que estan permitidos
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

  addBill(){

    if(this.userRol == "cliente"){
      this.username = this.userSession;
    }

    console.log("DTE: " + this.dte)
    console.log("Serie: " + this.serie)
    console.log("NIT Emisor: " + this.nit_emisor)
    console.log("Monto: " + this.monto)
    console.log("Fecha Emision: " + this.fecha_emision)
    console.log("Username: " + this.username)

    this.backend.addBill(this.dte, this.serie, this.nit_emisor, this.monto, this.fecha_emision, this.username);

    this.dialog.closeAll();

    this.dialog.open(AlertaComponent, {
      width: '30%',
      height: '30%'
    });

    //Recargar facturas
    if(this.userRol == "cliente"){
      this.backend.showBill(this.userSession, "", "", 0, 0, 0, "", "");
    }
    else{
      this.backend.showBill("", "", "", 0, 0, 0, "", this.userSession);
    }

  }

}
