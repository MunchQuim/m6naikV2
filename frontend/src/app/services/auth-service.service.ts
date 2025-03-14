import { Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  showLogin = signal<boolean>(false);
  showRegister = signal<boolean>(false);

  getShowLogin(): Signal<boolean> {
    return this.showLogin;
  }
  getShowRegister(): Signal<boolean> {
    return this.showRegister;
  }
  toggleRegister() {
    this.showRegister.set(!this.showRegister());
  }
  toggleLogin() {
    this.showLogin.set(!this.showLogin());
  }
  logout() {
    sessionStorage.removeItem("user");
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  isAdmin(): boolean {
    if (this.isAuthenticated()) {
      let user = sessionStorage.getItem('user');
      if (user) {
        let userRole = JSON.parse(user).roles_id;
        return userRole === 1;
      }

    }
    return false;
  }
  isCustomer(): boolean {
    if (this.isAuthenticated()) {
      let user = sessionStorage.getItem('user');
      if (user) {
        let userRole = JSON.parse(user).roles_id;
        return userRole === 2;
      }
    }
    return false;
  }
  getUser() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
