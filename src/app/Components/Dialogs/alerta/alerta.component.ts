import { Component, OnInit } from '@angular/core';

//IMPORTS DE SERVICIOS
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css'],
})
export class AlertaComponent {

  error: string = ""

  constructor(private mensaje: DialogsService){}

  ngOnInit(): void{
    this.mensaje.error$.subscribe((error) => {
      this.error = error;
    });
  }
}
