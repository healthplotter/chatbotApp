import { Component } from '@angular/core';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
import {IonicPage} from "ionic-angular";
import { NavController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  
  apiUrl = 'http://localhost:3000';
  //apiUrl = 'https://HPdevAdmin:UQurW22Vvqbp@dev.healthplotter.com';
  userEmail: any;
  userPassword: any;
  returnData: any;

  constructor(public navCtrl: NavController,public httpClient: HttpClient,public restProvider: RestProvider,private alertCtrl: AlertController) {
    this.returnData = {}

  }


  doLogin(){
    this.httpClient.get(this.apiUrl+'/app/v1/login?email='+this.userEmail+'&encrypted_password='+this.userPassword).subscribe(data => {

        this.returnData = data
        if (this.returnData.response == "logged_in"){
          this.navCtrl.push(HomePage);
        }
        if (this.returnData.response == "logged_out"){
          let alert = this.alertCtrl.create({
            title: 'Password Error',
            subTitle: 'Please enter the correct password',
            buttons: ['OK']
          });
          alert.present();
        }
        if (this.returnData.response == "user_not_exist"){
          let alert = this.alertCtrl.create({
            title: 'Email error',
            subTitle: 'Please verify your email',
            buttons: ['OK']
          });
          alert.present();
        }
      }, err => {
        console.log(err);
      });
  }

  doRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
