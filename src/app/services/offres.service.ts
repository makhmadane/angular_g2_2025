import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from '../models/offre';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  url = environment.apiURL+"/offres";
  constructor(private httpclient :HttpClient , private authService : AuthService) { }

    getAll(){
      return  this.httpclient.get<Offre[]>(this.url);
    }

    store(Offre: Offre){
      return  this.httpclient.post<Offre>(this.url,Offre);
    }

    destroy(id:number){
      return this.httpclient.delete(this.url+'/'+id);
    }

    getOffreById(id: number){
      return this.httpclient.get<Offre>(this.url+'/'+id);
    }

    updateOffre(offre: Offre,){
      return this.httpclient.put<Offre>(this.url+'/'+offre.id, offre);
    }

}
