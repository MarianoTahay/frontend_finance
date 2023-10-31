import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

//Imports de otros servicios
import { DialogsService } from './dialogs.service';

//Imports de interfaces
import { Profiles } from '../Interfaces/profiles';
import { Usuarios } from '../Interfaces/usuarios';

//Imports librerias descargadas
import axios from 'axios';

//Imports angular materials
import { MatDialog } from '@angular/material/dialog';

//Imports de dialogs
import { AlertaComponent } from '../Components/Dialogs/alerta/alerta.component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //Observable: profile del usuario
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
  private profileSubject = new BehaviorSubject<Profiles>(this.defaultProfile);
  profile$ = this.profileSubject.asObservable();

  //Observable: todos los perfiles
  private profilesSubject = new BehaviorSubject<Profiles[]>([]);
  profiles$ = this.profilesSubject.asObservable();

  //Observable: Listar usuarios para contador
  private usuariosSubject = new BehaviorSubject<Usuarios[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();

  constructor(private router: Router, private alerta: DialogsService, private dialog: MatDialog) {

    this.locateUser();

   }

   //Guardar la sesion del usuario
  locateUser(){

    const token = localStorage.getItem('token');

    axios({
      method: 'post',
      url: 'http://localhost:3000/decodeToken',
      data: {
        token: token
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.alerta.errorSubject.next(response.data.mensaje);
      }
      else{
        this.profileSubject.next(response.data.values);

        if(response.data.values.rol != 'contador'){
          this.getUsers(response.data.values.id_usuario);
        }
      }
    })

  }

  //Creamos la sesion del usuario
  setUser(email: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/token',
      data: {
        email: email
      }
    }).then((response) => {
      if(response.data.status == 0){
        console.log(response.data.mensaje);
      }
      else{
        console.log(response.data.mensaje)
        localStorage.setItem('token', response.data.token);
        this.locateUser();
      }
    })
  }

  //Logear a un usuario
  userLogin(email: string, password: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        email: email,
        password: password
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.mensaje(response);
        this.dialog.open(AlertaComponent, {
          width: '30%',
          height: '30%'
        });
      }
      else{

        if(response.data.status == 'logged'){
          this.alerta.errorSubject.next("Sesion ya iniciada");
          this.dialog.open(AlertaComponent, {
            width: '30%',
            height: '30%'
          });
        }
        else if(response.data.cuenta != 'activa'){
          this.alerta.errorSubject.next("Esta cuenta fue eliminada");
          this.dialog.open(AlertaComponent, {
            width: '30%',
            height: '30%'
          });
        }
        else{
          this.mensaje(response);
          this.dialog.open(AlertaComponent, {
            width: '30%',
            height: '30%'
          });
          this.userStatus("logged", email);
          console.log(email);
          this.setUser(email);
          this.router.navigate(['contador-page']);
        }

      }
    })
  }

  //Cambiar el status del usuario
  userStatus(type: string, email: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/changeLogged',
      data: {
        type: type,
        email: email
      }
    }).then((response) => {
      if(response.data.status == 0){
        console.log(response.data.mensaje)
      }
      else{
        console.log(response.data.mensaje)
      }
    })
  }

  //Registrar a un usuario
  userRegister(email: string, password: string, nombre: string, apellido: string, username: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: {
        nombre: nombre,
        apellido: apellido,
        username: username,
        email: email,
        password: password
      }
    }).then((response) => {
      console.log(response.data.status)
      if(response.data.status == 0){
        this.mensaje(response);
        this.dialog.open(AlertaComponent, {
          width: '30%',
          height: '30%'
        });
      }
      else{
        this.mensaje(response);
        this.dialog.open(AlertaComponent, {
          width: '30%',
          height: '30%'
        });
      }
    })
  }

  //Obtiene el listado de usuarios (contadores)
  showUser(contador: string, username: string, email: string, facturas_min: string, facturas_max: string, total_min: string, total_max: string, orderBy: string, order: string){
    
    if(orderBy == "Order By" || order == "Order"){
      orderBy = "";
      order = "";
    }

    if(order == "Order"){
      order = "";
    }
    else if(order == "Ascend"){
      order = "ASC";
    }
    else{
      order = "DESC"
    }
    
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
        this.alerta.errorSubject.next(response.data.values);
      }
      else{
        this.usuariosSubject.next(response.data.values);
      }
    })
  }

  //Obtener todos los usuarios
  getUsers(id: number){
    axios({
      method: 'post',
      url: 'http://localhost:3000/getUsers',
      data: {
        id: id
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.mensaje(response);
        this.dialog.open(AlertaComponent, {
          width: '30%',
          height: '30%'
        });
      }
      else{
        this.profilesSubject.next(response.data.values);
      }
    })
  }

  //Los usuarios agragan a un contador
  addContador(id_contador: number, id_usuario: number, email: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/addContador',
      data: {
        id_contador: id_contador,
        id_usuario: id_usuario
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.mensaje(response);
        this.dialog.open(AlertaComponent, {
          width: '30%',
          height: '30%'
        });
      }
      else{
        this.mensaje(response);
        this.dialog.open(AlertaComponent, {
          width: '30%',
          height: '30%'
        });
        this.setUser(email);
      }
    })
  }

  //Esperamos a que se cargue el mensaje.
  async mensaje(response: any){
    const message = await this.alerta.errorSubject.next(response.data.mensaje);
    return message;
  }
}
