import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import {MatDialog} from '@angular/material/dialog';
import { AlertaComponent } from '../../Dialogs/alerta/alerta.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  username: string = "";

  constructor(private router: Router, private backend: BackendService, public dialog: MatDialog) { }

  continue(){
    if(this.name == "" || this.last_name == "" || this.email == "" || this.password == "" || this.username == ""){
      this.backend.cambiarError("Please complete de form");
    }
    else{

      let username = new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$');
      let email = new RegExp('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$');
      let password = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,12}$');
      
      if(email.test(this.email) && password.test(this.password) && username.test(this.username)){
        this.backend.addUser(this.email, this.password, this.name, this.last_name, this.username);
      }
      else if(!email.test(this.email)){
        this.backend.cambiarError("Email not valid");
      }
      else if(!password.test(this.password)){
        this.backend.cambiarError("Password not valid");
      }
      else if(!username.test(this.username)){
        this.backend.cambiarError("Username not valid");
      }
      else{
        this.backend.cambiarError("Something went worng, please check your info");
      }
    }

    this.dialog.open(AlertaComponent, {
      width: '30%',
      height: '30%'
    });
  }
}