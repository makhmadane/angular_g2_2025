import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_lv_g2_2025';

  constructor(private authService : AuthService, private router :Router){

  }
  logOut(){
    this.authService.logout().subscribe(
      ()=>{
        this.authService.removeToken();
        this.router.navigateByUrl("login");
  
      },
      (error)=>{

      }
      
    )
  }
}
