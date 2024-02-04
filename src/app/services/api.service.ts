import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getlanguage(component_id: any) {
    return this.http.get('https://amctag.me/projects/myschool/auto_api/list.php?component_id=' + component_id);
  }

  setlanguage(language: any) {
    const englishWords = {
      tab1: "MySchool",
      tab2: "agenda",
      tab3: "children"
    };

    const arabicWords = {
      tab1: "مدرستي",
      tab2: "المفكرة",
      tab3: "الاولاد"
    };

    const frenchWords = {
      tab1: "FMySchool",
      tab2: "Fagenda",
      tab3: "Fchildren"
    };

    if (language === 'en') {
      const dataString = JSON.stringify(englishWords);
      localStorage.setItem('myArrayData', dataString);
    }
    if (language === 'ar') {
      const dataString = JSON.stringify(arabicWords);
      localStorage.setItem('myArrayData', dataString);
    }
    if (language === 'fr') {
      const dataString = JSON.stringify(frenchWords);
      localStorage.setItem('myArrayData', dataString);
    }
  }

}
