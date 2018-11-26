import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import {IonicPage} from "ionic-angular";
import { NavController } from "ionic-angular";
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  //tab1Root: any = 'HomePage';
  //tab2Root: any = 'AboutPage';
  //tab3Root: any = 'ContactPage';

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }
  doRegister(){
    const alert = this.alertCtrl.create({
      title: 'Registered',
      subTitle: 'You have successfully registered',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(LoginPage);
  }
}
