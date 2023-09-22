import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
import { Facturas } from '../Interfaces/facturas';
import { Empresa } from '../Interfaces/empresa';
import { Usuarios } from '../Interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  //Observable: username que esta logeado
  private userSessionSubject = new BehaviorSubject<string>("User");
  userSession$ = this.userSessionSubject.asObservable();

  //Observable: rol del usuario que esta logeado
  private userRolSubject = new BehaviorSubject<string>("Rol");
  userRol$ = this.userRolSubject.asObservable();
  
  //Observable: diferentes errores que pueden ocurrir
  public errorSubject = new BehaviorSubject<string>("Alerta");
  error$ = this.errorSubject.asObservable();

  //Observable: Listado de facturas
  private facturasSubject = new BehaviorSubject<Facturas[]>([]);
  facturas$ = this.facturasSubject.asObservable();

  //Observable: Listado de empresas
  private empresasSubject = new BehaviorSubject<Empresa[]>([]);
  empresa$ = this.empresasSubject.asObservable();

  //Observable: Listar usuarios para contador
  private usuariosSubject = new BehaviorSubject<Usuarios[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();

  cambiarError(error: string){
    this.errorSubject.next(error);
  }

  constructor(private router: Router) {

    //Obtenemos la sesion actual
    this.locateUser()

    //Obtenemos las empresas
    this.getEmpresas()

   }


  locateUser(){
    const token = localStorage.getItem('token');

    if(token == 'undefined'){
      alert("Porfavor inicie sesion")
    }
    else{
      axios({
        method: 'post',
        url: 'http://localhost:3000/token',
        data: {
          token: token
        }
      }).then((response) => {
        if(response.data.status == 0){
          this.errorSubject.next(response.data.mensaje);
        }
        else{
          console.log(response.data.user.usuario);
          console.log(response.data.user.rol);
          this.userSessionSubject.next(response.data.user.usuario);
          this.userRolSubject.next(response.data.user.rol);
        }
      })
    }
  }

  //Logear a un usuario
  userLogin(email: string, password: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        email: email,
        contrasena: password
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.errorSubject.next(response.data.mensaje);
      }
      else{
        this.errorSubject.next(response.data.mensaje);
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['home']);
      }
    })
  }

  //Registrar usuario
  addUser(email: string, contrasena: string, nombre: string, apellido: string, username: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: {
        nombre: nombre,
        apellido: apellido,
        username: username,
        email: email,
        contrasena: contrasena
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.errorSubject.next(response.data.mensaje);
      }
      else{
        this.errorSubject.next(response.data.mensaje);
        this.router.navigate(['login']);
      }
    })
  }

  //Mostrar facturas
  showBill(username: string, date_start: string, date_finish:string, min: number, max: number, companie: number, order: string, contador: string){

    axios({
      method: 'post',
      url: 'http://localhost:3000/bills-filter',
      data: {
        username: username,
        date_start: date_start,
        date_finish: date_finish,
        min: min,
        max: max,
        companie: companie,
        order: order,
        contador: contador
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.errorSubject.next(response.data.mensaje);
      }
      else{
        this.facturasSubject.next(response.data.values);
      }
    })
  }

  //Ingresar factura
  addBill(dte: number, serie: string, nit_emisor: number, monto: number, fecha_emision: string, username: string){
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
        this.errorSubject.next(response.data.mensaje);
      }
      else{
        this.errorSubject.next(response.data.mensaje);
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
        this.errorSubject.next(response.data.mensaje);
      }
      else{
        this.errorSubject.next(response.data.mensaje);
        this.empresasSubject.next(response.data.values)
      }
    })
  }

  //Mostrar usuarios
  showUser(contador: string, username: string, email: string, facturas_min: number, facturas_max: number, total_min: number, total_max: number, orderBy: string, order: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/users-filter',
      data: {
        contador: contador,
        username: username,
        email: email,
        facturas_min: facturas_min,
        facturas_max: facturas_max,
        total_min: total_min,
        total_max: total_max,
        orderBy: orderBy,
        order: order
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.errorSubject.next(response.data.mensaje);
      }
      else{
        this.usuariosSubject.next(response.data.values);
      }
    })
  }


}
