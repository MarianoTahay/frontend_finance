import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

//IMPORTS DE LAS INTERFACES
import { Facturas } from '../Interfaces/facturas';
import { Empresa } from '../Interfaces/empresa';
import { Usuarios } from '../Interfaces/usuarios';
import { Profiles } from '../Interfaces/profiles';

@Injectable({
  providedIn: 'root'
})
export class BackendService {


  

  //Observable: Listado de empresas
  private empresasSubject = new BehaviorSubject<Empresa[]>([]);
  empresa$ = this.empresasSubject.asObservable();

  

  constructor(private router: Router) {

    //Obtenemos las empresas
    this.getEmpresas();

   }

  

  //Ingresar factura
  addBill(dte: string, serie: string, nit_emisor: string, monto: string, fecha_emision: string, username: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/bills-insert',
      data: {
        dte: dte,
        serie: serie,
        nit_emisor: nit_emisor,
        monto: monto,
        fecha_emision: fecha_emision,
        username: username
      }
    }).then((response) => {
      if(response.data.status == 0){
        console.log("xd")
      }
      else{
        console.log("xd")
      }
    })
  }

  //Borrar factura
  deleteBill(dte: string, serie: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/bills-delete',
      data: {
        dte: dte,
        serie: serie,
      }
    }).then((response) => {
      if(response.data.status == 0){
        console.log("xd")
      }
      else{
        console.log("xd")
      }
    })
  }

  //Obtener las empresas
  getEmpresas(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/empresas'
    }).then((response) => {
      if(response.data.status == 0){
        console.log("xd")
      }
      else{
        console.log("xd")
        this.empresasSubject.next(response.data.values)
      }
    })
  }

  //Mostrar usuarios
  


}
