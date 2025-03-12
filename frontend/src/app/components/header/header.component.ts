import { Component } from '@angular/core';
import { LogoJordanComponent } from '../logo-jordan/logo-jordan.component';
import { LogoConverseComponent } from '../logo-converse/logo-converse.component';
import { LogoNikeComponent } from '../logo-nike/logo-nike.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthServiceService } from '../../services/auth-service.service';
@Component({
  selector: 'app-header',
  imports: [LogoJordanComponent, LogoConverseComponent, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthServiceService) {

  }
  toggleRegister() {
    this.authService.toggleRegister();
    console.log(this.authService.getShowRegister()())
  }
  toggleLogin() {
    this.authService.toggleLogin();
  }

}
