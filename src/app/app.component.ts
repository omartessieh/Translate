import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  currentLanguage: any;
  language: any;

  constructor(private translate: TranslateService, private apiService: ApiService) {

    this.currentLanguage = this.translate.currentLang || 'en';
    this.language = localStorage.getItem('language');

    if (this.language == null) {
      this.translate.use('ar').subscribe(() => {
        this.currentLanguage = 'ar';
        document.documentElement.dir = this.translate.instant('direction');
      });
      this.apiService.setlanguage('ar');
      localStorage.setItem('language', 'ar');
    }
    if (this.language != null) {
      this.translate.use(this.language).subscribe(() => {
        this.currentLanguage = this.language;
        document.documentElement.dir = this.translate.instant('direction');
      });
      this.apiService.setlanguage(this.language);
      localStorage.setItem('language', this.language);
    }
  }
}
