import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  language: any;

  constructor(private route: Router, private apiService: ApiService) { }

  ionViewWillEnter() {
    this.language = localStorage.getItem('language');
  }

  gopage(path: any) {
    this.route.navigate([path]);
  }

}
