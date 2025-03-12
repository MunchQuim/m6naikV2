import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Users } from '../../interfaces/users';
@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage?: String;
  userForm:FormGroup;
  constructor(private authService: AuthServiceService,  private http: HttpClient) {
    this.userForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',Validators.required)
    }, { validators: this.passwordsMatchValidator() });
  }
  toggleRegister(){
    this.authService.toggleRegister();
  }

  passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password');
      const confirmPassword = group.get('confirmPassword');
      // Solo validar si ambos campos han sido modificados (no son 'pristine')
      if (password && confirmPassword && (!password.pristine && !confirmPassword.pristine)) {
        
        if (password.value !== confirmPassword.value) {
          confirmPassword.setErrors({ notMatching: true });
          return { notMatching: true };
        } else {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    };
  }

  saveUser(){
    const newUser: Users = this.userForm.value;
    if(this.userForm.valid){
      this.http.post("http://localhost:2700/users",newUser).subscribe(
        (response) =>{
          console.log('Usuario registrado con éxito:', response);
          this.errorMessage = undefined;
          this.toggleRegister();
        }, 
        (error) =>{
          console.error('Error al registrar el usuario:', error);
          this.errorMessage = error.error.message;
        },
      );
    }
  }



}
