import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AlertaComponent } from '../../../../Dialogs/alerta/alerta.component';
import { AddBillComponent } from 'src/app/Components/Dialogs/addBill/add-bill/add-bill.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {
  userSession: string = "";
  userRol: string = "";

  constructor(private backend: BackendService, private router: Router, private dialog: MatDialog){}

  ngOnInit(): void{

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

  listBills(){
    this.router.navigate(['bills-list']);
  }

  addBill(){
    this.dialog.open(AddBillComponent, {
      width: '30%',
      height: '70%'
    });
  }

}
