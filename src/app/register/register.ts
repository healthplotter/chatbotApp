import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import {IonicPage} from "ionic-angular";
import { NavController } from "ionic-angular";
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {

  //apiUrl = 'http://localhost:3000';
  apiUrl = 'https://HPdevAdmin:UQurW22Vvqbp@dev.healthplotter.com';
  userRegisterName: any;
  userRegisterPassword: any;
  userRegisterEmail: any;
  userRegisterconfirmPassword: any;
  returnRegisterData: any;
  authForm : FormGroup;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public httpClient: HttpClient,public restProvider: RestProvider,private fb: FormBuilder) {
    this.returnRegisterData = {}
    this.authForm = fb.group({
      'username' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
      'email' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      'confirmpassword': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
    });

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
          this.returnRegisterData = data
          if (this.returnRegisterData.response == "already_exist"){
            const alert = this.alertCtrl.create({
              title: 'User Exist',
              subTitle: 'Email is already registered',
              buttons: ['OK']
            });
            alert.present();
          }
          if (this.returnRegisterData.response == "registration_succesfull"){
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
