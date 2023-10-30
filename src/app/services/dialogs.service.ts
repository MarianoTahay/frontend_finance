import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  //Observable: diferentes errores que pueden ocurrir
  public errorSubject = new BehaviorSubject<string>("");
  error$ = this.errorSubject.asObservable();

  constructor() { }
}
