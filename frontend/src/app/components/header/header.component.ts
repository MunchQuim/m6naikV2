import { Component } from '@angular/core';
import { LogoJordanComponent } from '../logo-jordan/logo-jordan.component';
import { LogoConverseComponent } from '../logo-converse/logo-converse.component';
import { LogoNikeComponent } from '../logo-nike/logo-nike.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthServiceService } from '../../services/auth-service.service';
import { FunctionsService } from '../../services/functions.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [LogoJordanComponent, LogoConverseComponent, NavbarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthServiceService, private funciones: FunctionsService) {

  }
  toggleRegister() {
    this.authService.toggleRegister();
    console.log(this.authService.getShowRegister()())
  }
  toggleLogin() {
    this.authService.toggleLogin();
  }
  logout(){
    this.authService.logout();
  }

}
