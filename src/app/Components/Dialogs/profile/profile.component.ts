import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

//IMPORTS DE SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';

//IMPORTS DE MATERIALS
import { MatDialog } from '@angular/material/dialog';

//IMPORTS DE LAS INTERFACES 
import { Profiles } from 'src/app/Interfaces/profiles';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  save: boolean = false;

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

  profiles: Profiles[] = [];

  nombre: string = "";
  apellido: string = "";
  correo: string = "";

  constructor(private userService: UsuariosService, private router: Router, private dialog: MatDialog){}

  ngOnInit(){


    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
      this.nombre = this.defaultProfile.nombre;
      this.apellido = this.defaultProfile.apellido;
      this.correo = this.defaultProfile.email;
    })

    this.userService.profiles$.subscribe((profiles) => {
      this.profiles = profiles;
    })
    
  }

  logout(){
    this.userService.userStatus("Nlogged", this.defaultProfile.email);
    this.router.navigate(['']);
    this.dialog.closeAll();
  }

  mostrarSave(){
    this.save = true;
  }

}
