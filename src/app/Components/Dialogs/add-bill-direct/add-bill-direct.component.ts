import { Component } from '@angular/core';

//IMPORT DE LOS SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { DialogsService } from 'src/app/services/dialogs.service';

//IMPORTS DE INTERFACES
import { Profiles } from 'src/app/Interfaces/profiles';

//IMPORTS DIALOGS
import { AlertaComponent } from '../alerta/alerta.component';

//IMPORTS DE MATERIALS
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-bill-direct',
  templateUrl: './add-bill-direct.component.html',
  styleUrls: ['./add-bill-direct.component.css']
})
export class AddBillDirectComponent {

  //INFO DEL USUARIO
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

  //INFO DE LA FACTURA
  dte: string = "";
  serie: string = "";
  emisor: string = "";
  receptor: string = "";
  monto: string = "";
  emision: string = "";
  imagen: string = "";
  pdf: string = "";

  status: boolean = false;
  pdfDoc: boolean = false;

  imagePath:string = "";
  documentPath: string = "";
  data: File | null = null;

  constructor(private userService: UsuariosService, private billService: FacturasService, private alertaService: DialogsService, private dialog: MatDialog){}

  ngOnInit(){
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    })
  }

  selectBill(event: Event){
    const input = event.target as HTMLInputElement;
    
    if(input.files && input.files.length > 0){
      this.data = input.files[0];

      if(this.data.name.split('.').pop() == "jpg" || this.data.name.split('.').pop() == "png"  || this.data.name.split('.').pop() == "pdf"){

        this.status = true;

        if(this.data.name.split('.').pop() == "pdf"){
          this.pdfDoc = true;
          this.pdf = this.data.name;
          this.documentPath = URL.createObjectURL(this.data);
        }
        else{
          this.pdfDoc = false;
          this.imagen = this.data.name;
          this.imagePath = URL.createObjectURL(this.data);
        }

      }
      else{
        console.log("Extension del archivo no valio");
      }   
    }   
  }

  addBill(){

    console.log("DTE: " + this.dte);
    console.log("SERIE: " + this.serie);
    console.log("EMISOR: " + this.emisor);
    console.log("RECEPTOR: " + this.receptor);
    console.log("MONTO: " + this.monto);
    console.log("EMISION: " + this.emision);
    console.log("USUARIO: " + this.defaultProfile.id_usuario);
    console.log("PDF: " + this.pdf);
    console.log("IMAGEN: " + this.imagen);
    console.log("STATUS: " + "ingresada");

    if(this.data){
      this.billService.addBill(this.dte, this.serie, this.emisor, this.receptor, this.monto, this.emision, this.defaultProfile.id_usuario, this.imagen, this.pdf, "ingresada", this.data);
      this.imagen = "";
      this.pdf = "";
    }
    else{
      this.alertaService.errorSubject.next("Error en el archivo");
      this.dialog.open(AlertaComponent, {
        width: '30%',
        height: '30%'
      });
    }
    
  }


}
