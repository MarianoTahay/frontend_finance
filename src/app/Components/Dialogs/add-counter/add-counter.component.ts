import { Component } from '@angular/core';

//Imports de servicios
import { UsuariosService } from 'src/app/services/usuarios.service';

//Imports interfaces
import { Profiles } from 'src/app/Interfaces/profiles';

@Component({
  selector: 'app-add-counter',
  templateUrl: './add-counter.component.html',
  styleUrls: ['./add-counter.component.css']
})
export class AddCounterComponent {

  contadorSeleccionado: string = "";

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

  profiles: Profiles[] = [];

  constructor(private userService: UsuariosService){}

  ngOnInit(){

    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    })

    this.userService.profiles$.subscribe((profiles) => {

      for(let i = 0; i < profiles.length; i++){
        if(profiles[i].rol != 'cliente'){
          this.profiles.push(profiles[i]);
        }
      }

    })
  }

  addContador(){
    this.userService.addContador(Number(this.contadorSeleccionado), this.defaultProfile.id_usuario);
  }

}
