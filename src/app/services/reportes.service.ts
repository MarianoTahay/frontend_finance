import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Imports librerias descargadas
import axios from 'axios';

//Imports de otros servicios
import { DialogsService } from './dialogs.service';
import { UsuariosService } from './usuarios.service';

//Imports de angular materials
import { MatDialog } from '@angular/material/dialog';

//Imports de los dialogs
import { AlertaComponent } from '../Components/Dialogs/alerta/alerta.component';

//Imports de interfaces
import { Reportes } from '../Interfaces/reportes';
import { Profiles } from '../Interfaces/profiles';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

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

  //Observable: Listado de reportes
  private reportesSubject = new BehaviorSubject<Reportes[]>([]);
  reportes$ = this.reportesSubject.asObservable();

  constructor(private userService: UsuariosService, private alerta: DialogsService, private dialog: MatDialog) { 
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;

      if(profile.rol == "contador"){
        this.getReportes(profile.id_usuario.toString(), "", "", "");
      }
      else{
        this.getReportes("", profile.id_usuario.toString(), "", "");
      }

    });
  }

  //AGREGAR REPORTES A LA BASE DE DATOS
  addReport(id_usuario: number, archivo: string, fecha: string, file: File, mensaje: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/reports-insert',
      data: {
        id_usuario: id_usuario,
        archivo: archivo,
        fecha: fecha,
        mensaje: mensaje
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

        this.saveReport(formData);

      }
    })
  }

  //GUARDAR Reporte
  saveReport(file: FormData){
    axios.post('http://localhost:3000/subirReporte', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  //FILTRO PARA OBTENER LOS REPORTES
  getReportes(id_contador: string, id_usuario: string, fecha_min: string, fecha_max: string){
    axios({
      method: 'post',
      url: 'http://localhost:3000/reports-filter',
      data: {
        id_contador: id_contador,
        id_usuario: id_usuario,
        fecha_min: fecha_min,
        fecha_max: fecha_max
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
        this.reportesSubject.next(response.data.values);
      }
    })
  }

  //Borrar factura
  deleteReport(id_reporte: number){
    axios({
      method: 'post',
      url: 'http://localhost:3000/reports-delete',
      data: {
        id_reporte: id_reporte
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

        if(this.defaultProfile.rol == "contador"){
          this.getReportes(this.defaultProfile.id_usuario.toString(), "", "", "");
        }
        else{
          this.getReportes("", this.defaultProfile.id_usuario.toString(), "", "");
        }
      }
    })
  }

  //Esperamos a que se cargue el mensaje.
  async mensaje(response: any){
    const message = await this.alerta.errorSubject.next(response.data.mensaje);
    return message;
  }

}
