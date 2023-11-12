import { Component } from '@angular/core';

//Import Dialogs a usar
import { AlertaComponent } from '../alerta/alerta.component';

//Import angular materials
import {MatDialog} from '@angular/material/dialog';

//IMPORTS DE SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { DialogsService } from 'src/app/services/dialogs.service';

//IMPORTS DE INTERFACES
import { Profiles } from 'src/app/Interfaces/profiles';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
})
export class AddBillComponent {

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

  status: boolean = false;
  mensaje: string = "Ingrese factura(s)"

  archivos: File[] = [];
  imagen: string = "";
  pdf: string = "";

  constructor(private userService: UsuariosService, private dialog: MatDialog, private billService: FacturasService, private alerta: DialogsService){}

  ngOnInit(){

    //OBTENEMOS LOS DATOS DE LA SESION ACTUAL
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    });

  }

  uploadBills(event: any){

    const input = event.target as HTMLInputElement;

    if(input.files){
      for(let i = 0; i < input.files.length; i++){  
        if(input.files[i].name.split('.').pop() == "jpg" || input.files[i].name.split('.').pop() == "png" || input.files[i].name.split('.').pop() == "pdf"){
          this.status = true;
          this.mensaje = "Factura(s) lista(s)"

          this.archivos.push(input.files[i])

        }
        else{
          this.alerta.errorSubject.next("Archivo no seleccionado: " + input.files[i].name)
          this.dialog.open(AlertaComponent, {
            width: '30%',
            height: '30%'
          });
        }
      }
    }
    else{
      this.status = false;
      console.log("No has archivos seleccionados");
    } 

    console.log(this.archivos)

  }

  async sendBills(){

    for(let i = 0; i < this.archivos.length; i++){

      if(this.archivos[i].name.split('.').pop() == "pdf"){
        this.imagen = "";
        this.pdf = this.archivos[i].name;
      }
      else{
        this.pdf = "";
        this.imagen = this.archivos[i].name;
      }

      const fechaActual: Date = new Date();
      const fecha = fechaActual.getFullYear() + '/' + fechaActual.getMonth() + '/' + fechaActual.getDay()

      await this.billService.addBill((Math.floor(Math.random() * (1000 - 0)) + 0).toString(), ((Math.floor(Math.random() * (1000 - 0)) + 0)).toString(), "0", "0", "0", fecha, this.defaultProfile.id_usuario, this.imagen, this.pdf, "pendiente", this.archivos[i]);

      if(this.defaultProfile.rol == "contador"){
        this.billService.getPendingBills(this.defaultProfile.id_usuario.toString(), "", "", "");
      }
      else{
        this.billService.getPendingBills("", this.defaultProfile.id_usuario.toString(), "", "");
      }
    }


    
  }
    
}
