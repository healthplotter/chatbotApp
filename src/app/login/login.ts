import { Component } from '@angular/core';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
import {IonicPage} from "ionic-angular";
import { NavController } from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  //tab1Root: any = 'HomePage';
  //tab2Root: any = 'AboutPage';
  //tab3Root: any = 'ContactPage';

  constructor(public navCtrl: NavController) {

  }
  doLogin(){
    this.navCtrl.push(HomePage);
  }

  doRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
