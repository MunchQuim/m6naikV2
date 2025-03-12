import { Injectable } from '@angular/core';
import { signal,Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  showLogin = signal<boolean>(false);
  showRegister = signal<boolean>(false);
  
  getShowLogin():Signal<boolean>{
    return this.showLogin;
  }
  getShowRegister():Signal<boolean>{
    return this.showRegister;
  }
  toggleRegister(){
    this.showRegister.set(!this.showRegister());
  }
  toggleLogin(){
    this.showLogin.set(!this.showLogin());
  }
}
