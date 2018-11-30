import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import {IonicPage} from "ionic-angular";
import { NavController } from "ionic-angular";
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {

  //apiUrl = 'http://localhost:3000';
  apiUrl = 'http://HPdevAdmin:UQurW22Vvqbp@dev.healthplotter.com'

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public httpClient: HttpClient,public restProvider: RestProvider) {

  }
  doRegister(){

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', this.userRegisterName);
    urlSearchParams.append('password', this.userRegisterPassword);
    urlSearchParams.append('email', this.userRegisterEmail);

    if (this.userRegisterPassword != this.userRegisterconfirmPassword){
      const alert = this.alertCtrl.create({
        title: 'Password',
        subTitle: 'Your password does not match',
        buttons: ['OK']
      });
      alert.present();
    }

    if (this.userRegisterPassword == this.userRegisterconfirmPassword){
      this.httpClient.post(this.apiUrl+'/app/v1/register?'+ urlSearchParams.toString(),null)
        .subscribe(data => {
          console.log(data)
          if (data.response == "already_exist"){
            const alert = this.alertCtrl.create({
              title: 'User Exist',
              subTitle: 'Email is already registered',
              buttons: ['OK']
            });
            alert.present();
          }
          if (data.response == "registration_succesfull"){
            const alert = this.alertCtrl.create({
              title: 'Registered',
              subTitle: 'You have successfully registered',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(LoginPage);
          }
        }, (err) => {
          console.log("--------error----");
        });      
    }
  }
}
