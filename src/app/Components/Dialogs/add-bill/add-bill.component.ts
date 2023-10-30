import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { AlertaComponent } from '../alerta/alerta.component';
import {MatDialog} from '@angular/material/dialog';

//IMPORTS DE SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';

//IMPORTS DE INTERFACES
import { Profiles } from 'src/app/Interfaces/profiles';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css'],
  standalone: true,
  imports: [MatDialogModule, FormsModule, NgFor, NgIf]
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


  constructor(private userService: UsuariosService, private dialog: MatDialog){}

  ngOnInit(){

    //OBTENEMOS LOS DATOS DE LA SESION ACTUAL
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    });

  }
    
}
