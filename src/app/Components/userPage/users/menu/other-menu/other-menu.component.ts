import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-other-menu',
  templateUrl: './other-menu.component.html',
  styleUrls: ['./other-menu.component.css']
})
export class OtherMenuComponent {
  userSession: string = "";

  constructor(private backend: BackendService, private router: Router){}

  ngOnInit(): void{
    this.backend.userSession$.subscribe((userSession) => {
      this.userSession = userSession;
    });
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

  listUsers(){
    this.router.navigate(['users-list']);
  }

}
