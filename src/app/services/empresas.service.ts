import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Imports librerias descargadas
import axios from 'axios';

//Imports de todas las interfaces
import { Empresa } from '../Interfaces/empresa';

//Imports de otros servicios
import { DialogsService } from './dialogs.service';

//Imports angular materials
import { MatDialog } from '@angular/material/dialog';

//Imports de los dialogs
import { AlertaComponent } from '../Components/Dialogs/alerta/alerta.component';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  //Observable: Lista de todas las empresas
  private empresasSubject = new BehaviorSubject<Empresa[]>([]);
  empresas$ = this.empresasSubject.asObservable();

  constructor(private dialog: MatDialog, private alerta: DialogsService) { 
    this.getEmpresas()
  }

  //Obtener todos los usuarios
  getEmpresas(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/getEmpresas',
    }).then((response) => {
      if(response.data.status == 0){
        this.mensaje(response);
        this.dialog.open(AlertaComponent, {
          width: '30%',
          height: '30%'
        });
      }
      else{
        console.log(response.data.values)
        this.empresasSubject.next(response.data.values);
      }
    })
  }

  //Esperamos a que se cargue el mensaje.
  async mensaje(response: any){
    const message = await this.alerta.errorSubject.next(response.data.mensaje);
    return message;
  }

}
