import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm:FormGroup;
  constructor(private authService: AuthServiceService,  private http: HttpClient) {
    this.userForm = new FormGroup({
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
      if (password && confirmPassword && !password.pristine && !confirmPassword.pristine) {
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


}
