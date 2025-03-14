import { Component } from '@angular/core';
import { LogoNikeComponent } from '../logo-nike/logo-nike.component';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [LogoNikeComponent, RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthServiceService) {

  }
}
