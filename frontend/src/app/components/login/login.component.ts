import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../interfaces/users';
import { response } from 'express';
import { FunctionsService } from '../../services/functions.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm: FormGroup;
  @ViewChild('sBtn') sBtn: ElementRef | undefined; //referencio a sBtn -> #sBtn
  constructor(private functions: FunctionsService, private authService: AuthServiceService, private http: HttpClient) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    })
  }
  toggleLogin() {
    this.authService.toggleLogin();
  }
  login() {
    const newUser: Users = this.userForm.value;

    this.http.get("http://localhost:2700/users").subscribe(
      (response: any) => {
        let user: any;
        for (let index = 0; index < response.users.length; index++) {
          user = response.users[index];
          if (user.email == newUser.email && user.password == newUser.password) {
            this.session(user);
            return;
          }else{
            user = undefined;
          }
        }
        if (user == undefined) {
          //shakea
          if (this.sBtn) {
            this.sBtn.nativeElement.classList.add('shake');
            setTimeout(() => {
              this.sBtn?.nativeElement.classList.remove('shake');
            }, 500);
          }
        }
      }
    )
  }
  session(user: JSON) {
    this.toggleLogin();
    sessionStorage.setItem("user", JSON.stringify(user));
    console.log(this.functions.getSessionUser())
  }
}
