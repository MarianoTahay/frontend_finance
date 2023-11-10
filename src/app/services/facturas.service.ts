import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

//Imports de otros servicios
import { DialogsService } from './dialogs.service';
import { UsuariosService } from './usuarios.service';

//Imports librerias descargadas
import axios from 'axios';

//Imports de las interfaces
import { Facturas } from '../Interfaces/facturas';
import { Profiles } from '../Interfaces/profiles';

//Imports de angular materials
import { MatDialog } from '@angular/material/dialog';

//Imports de los dialogs
import { AlertaComponent } from '../Components/Dialogs/alerta/alerta.component';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

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

  //Observable: Listado de facturas
  private facturasSubject = new BehaviorSubject<Facturas[]>([]);
  facturas$ = this.facturasSubject.asObservable();

  constructor(private router: Router, private userService: UsuariosService, private alerta: DialogsService, private dialog: MatDialog) { 
     //OBTENEMOS LOS DATOS DE LA SESION ACTUAL
     this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    });

  }

  //Mostrar facturas
  showBill(id_usuario: string, date_start: string, date_finish:string, min: string, max: string, nit_emisor: string, nit_receptor: string, order: string, id_contador: string, status: string){

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
      url: 'http://localhost:3000/bills-filter',
      data: {
        id_usuario: id_usuario,
        date_start: date_start,
        date_finish: date_finish,
        min: min,
        max: max,
        nit_emisor: nit_emisor,
        nit_receptor: nit_receptor,
        order: order,
        id_contador: id_contador,
        status: status
      }
    }).then((response) => {
      if(response.data.status == 0){
        this.alerta.errorSubject.next(response.data.mensaje);
      }
      else{
        this.facturasSubject.next(response.data.values);
        console.log(response.data.values)
      }
    })
  }

  //Insertar facturas 
  addBill(dte: string, serie: string, emisor: string, receptor: string, monto: string, emision: string, user: number, imagen: string, pdf: string, status: string, file: File){
    axios({
      method: 'post',
      url: 'http://localhost:3000/bills-insert',
      data: {
        dte: dte, 
        serie: serie, 
        emisor: emisor, 
        receptor: receptor, 
        monto: monto, 
        emision: emision, 
        user: user, 
        imagen: imagen, 
        pdf: pdf, 
        status: status
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

        const formData = new FormData();

        formData.append('token', response.data.documentToken);
        formData.append('archivo', file);

        this.saveBill(formData);

        if(this.defaultProfile.rol != "contador"){
          this.showBill(this.defaultProfile.id_usuario.toString(), "", "", "", "", "", "", "", "", "ingresada")
        }
        else{
          this.showBill("", "", "", "", "", "", "", "", this.defaultProfile.id_usuario.toString(), "ingresada")
        }

      }
    })
  }

  //GUARDAR FACTURA
  saveBill(file: FormData){
    axios.post('http://localhost:3000/subirFactura', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  //Borrar factura
  deleteBill(usuario: string, dte: string, serie: string, contador: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/bills-delete',
      data: {
        dte: dte, 
        serie: serie
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
        this.showBill(usuario, "", "", "", "", "", "", "", contador, "ingresada")
      }
    })
  }

  downloadBill(token: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/downloadFile',
      data: {
        token:token
      }
    }).then((response) => {
      console.log("Se esta descargando")
    })
  }

  //Esperamos a que se cargue el mensaje.
  async mensaje(response: any){
    const message = await this.alerta.errorSubject.next(response.data.mensaje);
    return message;
  }
}
