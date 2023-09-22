import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import {MatDialog} from '@angular/material/dialog';
import { AlertaComponent } from '../../Dialogs/alerta/alerta.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  data: any;

  constructor(private router: Router, private backend: BackendService, public dialog: MatDialog){}

  login(){

    let correo = new RegExp('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$');

    if(this.email == "" || this.password == "" || !correo.test(this.email)){
      this.backend.cambiarError("Please complete de form");
    }
    else{
      this.backend.userLogin(this.email, this.password);
    }

    this.dialog.open(AlertaComponent, {
      width: '30%',
      height: '30%'
    });
  }
}