import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor() { }

  language : string = 'fi';
  languageOptionToShow : string = 'en'

  changeToEnglish = () => {
      this.language = 'en';
      this.languageOptionToShow = 'fi'
  }

  changeToFinnish = () => {
    this.language = 'fi';
    this.languageOptionToShow = 'en'
  }
    
}
