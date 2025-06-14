import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Offre } from '../models/offre';
import { OffresService } from '../services/offres.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.css'
})
export class OffreComponent implements OnInit {

  name: any = "GL G2";

  offres: Offre[] = [];
  constructor(private offreService: OffresService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.offreService.getAll().subscribe(
      (data: Offre[]) => {
        this.offres = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  destroy(id: number) {
    this.offreService.destroy(id).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

