import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/Register';
import { Token } from '@angular/compiler';
import { TokenResponse } from '../models/token';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient :HttpClient) { }

  private baseUrl = environment.apiURL;
  private authorization = new HttpHeaders({
        'Authorization' : "Bearer " + this.getToken()
      });

  login(data: Login) {
    return this.httpclient.post<TokenResponse>(`${this.baseUrl}/login`, data);
  }

  register(data: Register) {
    return this.httpclient.post<TokenResponse>(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  removeToken() {
    console.log("xxx")
    localStorage.removeItem('token');
  }

  logout() {
    return this.httpclient.post(`${this.baseUrl}/logout`, {}, { headers: this.authorization  });
  }

  isAuthenticated(){
    return !!this.getToken();
  }


}
