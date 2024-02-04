import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage {

  currentLanguage: string;
  language: any;
  text: any;
  newLanguage: any;

  selectedValue: any;
  data: any;
  languages: any;
  size: any;

  selectedOption: any;

  constructor(private translate: TranslateService, private route: Router, private apiService: ApiService) {
    this.selectedValue = 1;
    this.getlanguage();
    this.currentLanguage = this.translate.currentLang || 'en';

    this.selectedOption = localStorage.getItem('language');
  }

  ionViewWillEnter() {
    this.selectedOption = localStorage.getItem('language');
  }

  getlanguage() {
    this.apiService.getlanguage(4).subscribe((data: any) => {
      this.data = JSON.parse(JSON.stringify(data));
      this.languages = this.data.objects;
      this.size = this.languages.length;
    });

  }

  showSelectedValue() {
    console.log('Selected Value:', this.selectedValue);
  }

  gopage(path: any) {
    this.route.navigate([path]);
  }

  toggleLanguage(event: any) {
    this.selectedOption = event.detail.value;
    this.newLanguage = this.selectedOption;
    this.apiService.setlanguage(this.newLanguage);
    this.translate.use(this.newLanguage).subscribe(() => {
      this.currentLanguage = this.newLanguage;
      document.documentElement.dir = this.translate.instant('direction');
      localStorage.setItem('language', this.newLanguage);
    });
  }

}
