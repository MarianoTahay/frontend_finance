import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Login/login/login.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './Components/Register/register/register.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertaComponent } from './Components/Dialogs/alerta/alerta.component';
import { UserMenuComponent } from './Components/userPage/bills/menu/user-menu/user-menu.component';
import { OtherMenuComponent } from './Components/userPage/users/menu/other-menu/other-menu.component';
import { AddBillComponent } from './Components/Dialogs/addBill/add-bill/add-bill.component';
import { UsersListComponent } from './Components/userPage/users/list/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserMenuComponent,
    OtherMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AlertaComponent,
    AddBillComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
