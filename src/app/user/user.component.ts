import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login';
import { Register } from '../models/Register';
import { Token } from '@angular/compiler';
import { TokenResponse } from '../models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
  });

  constructor(private authService : AuthService,
    private router: Router,
  ){

  }



  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as Register).subscribe({
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
