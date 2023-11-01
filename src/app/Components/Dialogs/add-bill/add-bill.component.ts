import { Component } from '@angular/core';

//Import Dialogs a usar
import { AlertaComponent } from '../alerta/alerta.component';

//Import angular materials
import {MatDialog} from '@angular/material/dialog';

//IMPORTS DE SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FacturasService } from 'src/app/services/facturas.service';

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

  constructor(private userService: UsuariosService, private dialog: MatDialog, private billService: FacturasService){}

  ngOnInit(){

    //OBTENEMOS LOS DATOS DE LA SESION ACTUAL
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    });

  }

  uploadBills(event: any){

    

  }
    
}
