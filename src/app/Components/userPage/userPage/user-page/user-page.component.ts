import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AlertaComponent } from '../../../Dialogs/alerta/alerta.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {

  userSession: string = "";
  userRol: string = "";

  constructor(private backend: BackendService, private router: Router, private dialog: MatDialog){}

  ngOnInit(): void{

    //Actualizamos al usuario
    this.backend.locateUser();

    this.backend.userSession$.subscribe((userSession) => {
      this.userSession = userSession;
    });

    this.backend.userRol$.subscribe((userRol) => {
      this.userRol = userRol;
    });

  }

  home(){
    this.router.navigate(['home']);
  }

  openMenu(){
    if(this.userRol == "cliente"){
      this.backend.errorSubject.next("You are not a counter")
      this.dialog.open(AlertaComponent, {
        width: '30%',
        height: '30%'
      });
    }
    else{
      this.router.navigate(['users-menu']);
    }
  }

  openOtherMenu(){
    this.router.navigate(['bills-menu']);
  }

}
