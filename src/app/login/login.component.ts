import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login';
import { TokenResponse } from '../models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    constructor(private authService : AuthService,
      private router : Router
    ){

    }
    
      login() {
        if (this.loginForm.valid) {
          this.authService.login(this.loginForm.value as Login).subscribe({
            next: (res : TokenResponse) => {
              console.log(res)
              this.authService.saveToken(res.access_token);
              this.router.navigateByUrl('/offre');
              
            },
            error: err => console.error(err)
          });
        }
    
      }
}
