import { Component } from '@angular/core';
import { LogoNikeComponent } from '../logo-nike/logo-nike.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [LogoNikeComponent,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
