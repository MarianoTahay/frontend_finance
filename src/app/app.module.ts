import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

//Funciones que ofrece angular
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

//Angular materials
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

//Componentes creados
import { LoginRegisterComponent } from './Components/login-register/login-register.component';
import { ContadorComponent } from './Components/Contador/contador.component';
import { AdminComponent } from './Components/admin/admin.component';

//Dialogs creados
import { AlertaComponent } from './Components/Dialogs/alerta/alerta.component';
import { AddBillComponent } from './Components/Dialogs/add-bill/add-bill.component';
import { AddUserComponent } from './Components/Dialogs/add-user/add-user.component';

//Librerias descargadas
import { ProfileComponent } from './Components/Dialogs/profile/profile.component';
import { AddCounterComponent } from './Components/Dialogs/add-counter/add-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AlertaComponent,
    ContadorComponent,
    ProfileComponent,
    LoginRegisterComponent,
    AdminComponent,
    AddCounterComponent,
    AddBillComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    FormsModule,

    MatIconModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
