import { Component } from '@angular/core';
import { LogoJordanComponent } from '../logo-jordan/logo-jordan.component';
import { LogoConverseComponent } from '../logo-converse/logo-converse.component';
import { LogoNikeComponent } from '../logo-nike/logo-nike.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  imports: [LogoJordanComponent,LogoConverseComponent,NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
