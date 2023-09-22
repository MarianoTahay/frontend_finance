import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css'],
  standalone: true,
  imports: [MatDialogModule]
})
export class AlertaComponent {

  error: string = ""

  constructor(private backend: BackendService){}

  ngOnInit(): void{
    this.backend.error$.subscribe((error) => {
      this.error = error;
    });
  }
}
