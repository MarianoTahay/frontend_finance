import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//IMPORT DE LOS SERVICIOS
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { EmpresasService } from 'src/app/services/empresas.service';

//IMPORTS DE INTERFACES
import { Profiles } from 'src/app/Interfaces/profiles';
import { Users } from 'src/app/Interfaces/users';
import { Empresa } from 'src/app/Interfaces/empresa';

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

  //DOCUMENTO DE LA FACTRUA
  status: boolean = false;
  pdfDoc: boolean = false;
  imagePath:string = "";
  documentPath: string = "";
  data: File | null = null;

  //Lista de usuarios 
  listUsers: Users[] = [];
  username_Filter: number = 0;

  //Lista de empresas
  empresas: Empresa[] = [];

  constructor(private userService: UsuariosService, private billService: FacturasService, private alertaService: DialogsService, private dialog: MatDialog, private empresaService: EmpresasService, @Inject(MAT_DIALOG_DATA) public info: any){}

  ngOnInit(){
    this.userService.profile$.subscribe((profile) => {
      this.defaultProfile = profile;
    });

    this.userService.listUsers$.subscribe((listUsers) => {
      this.listUsers = listUsers;
    });

    this.empresaService.empresas$.subscribe((empresas) => {
      this.empresas = empresas;
    })

    console.log(this.info.pending)

  }

  selectBill(event: Event){
    const input = event.target as HTMLInputElement;
    
    if(input.files && input.files.length > 0){
      this.data = input.files[0];

      if(this.data.name.split('.').pop() == "jpg" || this.data.name.split('.').pop() == "png"  || this.data.name.split('.').pop() == "pdf" || this.data.name.split('.').pop() == "jpeg"){

        this.status = true;

        if(this.data.name.split('.').pop() == "pdf"){
          this.pdfDoc = true;
          this.imagen = "";
          this.pdf = this.data.name;
          this.documentPath = URL.createObjectURL(this.data);
        }
        else{
          this.pdfDoc = false;
          this.pdf = "";
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
    if(this.defaultProfile.rol != "contador"){
      this.username_Filter = this.defaultProfile.id_usuario;
    }

    if(this.data){
      this.billService.addBill(this.dte, this.serie, this.emisor, this.receptor, this.monto, this.emision, this.username_Filter, this.imagen, this.pdf, "ingresada", this.data);
      this.userService.getProfiles(this.defaultProfile.id_usuario.toString(), "", "", "", "", "", "", "", "");
    }
    else{
      this.alertaService.errorSubject.next("Error en el archivo");
      this.dialog.open(AlertaComponent, {
        width: '30%',
        height: '30%'
      });

    }


    
  }

  updateBill(){
    this.billService.updateBill(parseInt(this.dte), this.serie, parseInt(this.emisor), parseInt(this.receptor), parseInt(this.monto), this.emision, this.info.id_factura)
  }


}
