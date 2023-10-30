import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  name: string = "";
  last_name: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";

  addUser(){
    
  }

}
