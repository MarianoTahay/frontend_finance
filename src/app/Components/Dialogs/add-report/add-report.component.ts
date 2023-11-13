import { Component } from '@angular/core';

//IMOPRT ANGULAR MATERIAL
import { MatDialog } from '@angular/material/dialog';

//IMPORT DE SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReportesService } from 'src/app/services/reportes.service';

//IMPORT DE COMPONENETES
import { AlertaComponent } from '../alerta/alerta.component';

//IMPORT DE INTERFACES
import { Profiles } from 'src/app/Interfaces/profiles';
import { Users } from 'src/app/Interfaces/users';

const fechaActual: Date = new Date();

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {

  //DATOS DEL USUARIO
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

  //lLISTA DE USUARIOS 
  listUsers: Users[] = [];

  status: boolean = false;
  mensaje: string = "Seleccione el reporte"

  reportPath: string = "";

  titulo: string = "";

  //Informacion del reporte
  id_usuario: string = "";
  archivo: string = "";
  fecha: string = fechaActual.getFullYear() + '/' + (fechaActual.getMonth() + 1) + '/' + (fechaActual.getDay() + 1);
  file: File | null = null;

  constructor(private userService: UsuariosService, private dialog: MatDialog, private alerta: DialogsService, private reportService: ReportesService){

    //OBTENEMOS LOS DATOS DE LA SESION ACTUAL
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    });

    //LISTADO DE USUARIOS
    this.userService.listUsers$.subscribe((listUsers) => {
      this.listUsers = listUsers;
    });

  }

  selectReport(event: Event){
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length > 0){
      this.file = input.files[0];

      if(this.file.name.split('.').pop() == "pdf"){
        this.status = true;
        this.archivo = this.file.name;
        this.reportPath = URL.createObjectURL(this.file);
      }
      else{
        this.status = false;
        this.alerta.errorSubject.next("Archivo invalido")
          this.dialog.open(AlertaComponent, {
            width: '30%',
            height: '30%'
        });
      }
      
    }
    else{
      console.log("No hay archivos seleccionados");
    } 
  }


  addReport(){

    if(this.file){
      this.reportService.addReport(parseInt(this.id_usuario), this.archivo, this.fecha, this.file, this.titulo);
    }
    else{
      this.alerta.errorSubject.next("Seleccine un archivo")
      this.dialog.open(AlertaComponent, {
        width: '30%',
        height: '30%'
      });
    }

  }

}
