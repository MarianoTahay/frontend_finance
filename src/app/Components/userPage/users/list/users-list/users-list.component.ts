import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BackendService } from 'src/app/services/backend.service';
import {Router} from '@angular/router';
import { Usuarios } from 'src/app/Interfaces/usuarios';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  standalone: true,
  imports: [NgFor, FormsModule, NgIf]
})
export class UsersListComponent {

  userSession: string = "";
  userRol: string = "";

  usuarios: Usuarios[] = [];

  arregloUsuarios: string[] = [];
  arregloEmails: string[] = [];

  username: string = "";
  email: string = "";
  facturas_max: number = 0;
  facturas_min: number = 0;
  total_min: number = 0;
  total_max: number = 0;
  orderBy: string = "Order By";
  order: string = "Order";

  constructor(private backend: BackendService, private router: Router){}

  ngOnInit(): void{

    this.backend.userSession$.subscribe((userSession) => {
      this.userSession = userSession;
      this.backend.showUser(this.userSession, "", "", 0, 0, 0, 0, "", "")
    });

    this.backend.userRol$.subscribe((userRol) => {
      this.userRol = userRol;
    }); 

    this.backend.usuarios$.subscribe((usuarios) => {
      this.usuarios = usuarios;
      for(let i = 0; i< this.usuarios.length; i++){
        this.arregloUsuarios.push(this.usuarios[i].username);
        this.arregloEmails.push(this.usuarios[i].email);
      }
    })


  }

  home(){
    this.router.navigate(['home']);
  }

  openMenu(){
    this.router.navigate(['users-menu']);
  }

  openOtherMenu(){
    this.router.navigate(['bills-menu']);
  }

  showData(){

    if(this.orderBy == "Order By" || this.order == "Order"){
      this.orderBy = "";
      this.order = "";
    }

    if(this.order == "Order"){
      this.order = "";
    }
    else if(this.order == "Ascend"){
      this.order = "ASC";
    }
    else{
      this.order = "DESC"
    }

    console.log("Contador: " + this.userSession);
    console.log("Username: " + this.username);
    console.log("Email: " + this.email);
    console.log("Facturas Range: " + this.facturas_min + " - " + this.facturas_max);
    console.log("Total Range: " + this.total_min + " - " + this.total_max);
    console.log("Order: " + this.orderBy + " --> " + this.order)

    this.backend.showUser(this.userSession, this.username, this.email, this.facturas_min, this.facturas_max, this.total_min, this.total_max, this.orderBy, this.order);

    this.orderBy = "Order By";
    this.order = "Order";

  }


}
