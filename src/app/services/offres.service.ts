import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from '../models/offre';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  url = "http://127.0.0.1:8000/api/offres";

  constructor(private httpclient :HttpClient) { }

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
