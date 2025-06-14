import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Offre } from '../models/offre';
import { OffresService } from '../services/offres.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offre-add',
  templateUrl: './addOffre.component.html',
  styleUrl: './offre.component.css'
})
export class AddOffreComponent implements OnInit {
  submitted = false;
  textButton = "Valider";
  offreForm = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lieu: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private offreService: OffresService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  //Constructeur
  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.textButton = "Update";
      this.getOffreById(this.route.snapshot.params['id']);
    }
  }

  get f2() {
    return this.offreForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    if (this.offreForm.invalid) {
      return;
    } else {
      if (this.textButton == "Valider") {
        const offre = this.offreForm.value as Offre;
        this.offreService.store(offre).subscribe(
          (data) => {
            this.router.navigateByUrl('/offre');
          },
          (error) => {
            console.log(error);
          }
        )
      } else {
        const offre = this.offreForm.value as Offre;
        this.offreService.updateOffre(offre).subscribe(
          (data) => {
            this.router.navigateByUrl('/offre');
          },
          (error) => {
            console.log(error);
          }
        )
      }
    }
  }

  getOffreById(id: number) {
    this.offreService.getOffreById(id).subscribe(
      (data: Offre) => {
        this.offreForm.get('id')?.setValue(data.id);
        this.offreForm.get('lieu')?.setValue(data.lieu);
        this.offreForm.get('title')?.setValue(data.title);
        this.offreForm.get('description')?.setValue(data.description);
        this.offreForm.get('date')?.setValue(data.date);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

