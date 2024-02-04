import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabs: any;
  language: any;
  ArrayData: any;
  data: any;

  private isAlertPresented: boolean = false;

  constructor(private navCtrl: NavController, private platform: Platform, private location: Location, private alertController: AlertController) {
    this.language = localStorage.getItem('language');
    this.platform.ready().then(() => {
      document.addEventListener('backbutton', this.onBackButton.bind(this));
    });
  }

  ionViewWillEnter() {
    this.language = localStorage.getItem('language');
    this.ArrayData = localStorage.getItem("myArrayData");
    this.data = JSON.parse((this.ArrayData));
  }

  onBackButton(event: Event) {
    if (window.location.pathname === '/tabs/tab1' || window.location.pathname === '/tabs/tab2'
      || window.location.pathname === '/tabs/tab3' || window.location.pathname === '/tabs/tab4'
      || window.location.pathname === '/tabs/tab5') {
      event.preventDefault();
      if (this.language === 'ar') {
        this.showExitConfirm('rtl');
      }
      if (this.language !== 'ar') {
        this.showExitConfirm('ltr');
      }
    }
  }


  showExitConfirm(isRTL: any) {
    if (this.isAlertPresented) {
      return;
    }

    this.isAlertPresented = true;

    const directionClass = isRTL ? 'rtl' : 'ltr';
    this.alertController.create({
      message: 'Are you sure you want to exit?',
      backdropDismiss: false,
      cssClass: `alert-Btn ${directionClass}`, // Add the direction class here
      buttons: [{
        text: 'No',
        role: 'cancel',
        cssClass: 'alert-Btn',
        handler: () => {
          this.isAlertPresented = false;
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Yes',
        cssClass: 'alert-Btn',
        handler: () => {
          App.exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present().then(() => {
          this.isAlertPresented = true; // Set the flag to true when the alert is successfully presented
        });
      });
  }

}