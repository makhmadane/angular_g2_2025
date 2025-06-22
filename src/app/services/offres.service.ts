import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from '../models/offre';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  url = "http://127.0.0.1:8000/api/offres";

  private authorization = new HttpHeaders({
        'Authorization' : "Bearer " + this.authService.getToken()
      });

  constructor(private httpclient :HttpClient , private authService : AuthService) { }

    getAll(){
      return  this.httpclient.get<Offre[]>(this.url, {headers :  this.authorization});
    }

    store(Offre: Offre){
      return  this.httpclient.post<Offre>(this.url,Offre,{headers :  this.authorization});
    }

    destroy(id:number){
      return this.httpclient.delete(this.url+'/'+id,{headers :  this.authorization});
    }

    getOffreById(id: number){
      return this.httpclient.get<Offre>(this.url+'/'+id,{headers :  this.authorization});
    }

    updateOffre(offre: Offre,){
      return this.httpclient.put<Offre>(this.url+'/'+offre.id, offre, {headers :  this.authorization});
    }

}
