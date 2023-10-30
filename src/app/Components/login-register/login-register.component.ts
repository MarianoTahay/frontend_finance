import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Imports de los servicios utilizados
import { UsuariosService } from 'src/app/services/usuarios.service';

//Import de servicios
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {

  //Mensaje de respuesta
  mensaje: string = "";

  //Controlador de las pantallas 
  login_view: boolean = true;
  register_view: boolean = false;
  
  //Valores de los inputs
  nombre: string = "";
  apellido: string= "";
  username: string = "";
  email: string = "";
  password: string = "";

  //Validacion del registro
  usernameBorderColor: string = '';
  emailBorderColor: string = '';
  passwordBorderColor: string = '';

  usernameVal: boolean = false;
  passwordVal: boolean = false;

  constructor(private userService: UsuariosService, private router: Router, private alert: DialogsService){}

  //Logica para mostrar pantallas
  mostrarLogin(){
    this.login_view = true;
    this.register_view = false;

    this.hideSpecs();

  }

  mostrarRegister(){
    this.login_view = false;
    this.register_view = true;
  }

  //Logica para ingresar la data
  login(){  
    this.userService.userLogin(this.email, this.password);
    this.email = "";
    this.password = ""; 
  }

  register(){
    this.userService.userRegister(this.email, this.password, this.nombre, this.apellido, this.username);
  }

  //Logica para validar los datos del registro
  usernameValidation(event: Event){

    const inputElement = event.target as HTMLInputElement;
    const userInputValue = inputElement.value;

    const regex = /^(?=.*[A-Z])(?=(?:.*[a-z]){2,})(?=.*\d).{6,12}$/;

    if (!regex.test(userInputValue)) {
      this.usernameBorderColor = 'red';
    } else {
      this.usernameBorderColor = 'green';
    }
  }

  emailValidation(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const userInputValue = inputElement.value;

    const regex = /^\w+@\w+\.\w{2,}$/;

    if (!regex.test(userInputValue)) {
      this.emailBorderColor = 'red';
    } else {
      this.emailBorderColor = 'green';
    }
  }

  passwordValidation(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const userInputValue = inputElement.value;

    const regex = /^(?=.*[A-Z])(?=.*[_$!&])(.{6,12})$/;

    if (!regex.test(userInputValue)) {
      this.passwordBorderColor = 'red';
    } else {
      this.passwordBorderColor = 'green';
    }
  }

  //Logica para mostrar ayuda al ususario cuando se registra
  mostrarUserSpecs(){
    this.usernameVal = true;
    this.passwordVal = false;
  }

  mostrarPasswordSpecs(){
    this.usernameVal = false;
    this.passwordVal = true;
  }

  hideSpecs(){
    this.usernameVal = false;
    this.passwordVal = false;
  }

}
