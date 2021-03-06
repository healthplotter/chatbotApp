import { Component } from '@angular/core';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
//import { UserhomePage } from '../userhome/userhome';
//import { HomePage } from '../home/home';
import { IonicPage } from "ionic-angular";
import { NavController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  apiUrl = 'http://localhost:3000';
  //apiUrl = 'https://HPdevAdmin:UQurW22Vvqbp@dev.healthplotter.com';
  //apiUrl = 'https://dev.healthplotter.com';
  userEmail: any;
  userPassword: any;
  returnData: any;

  constructor(public navCtrl: NavController,public httpClient: HttpClient,public restProvider: RestProvider,private alertCtrl: AlertController,public storage: Storage,public loadingCtrl: LoadingController) {
    this.returnData = {}

  }


  doLogin(){

    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();


    this.httpClient.get(this.apiUrl+'/app/v1/login?email='+this.userEmail+'&encrypted_password='+this.userPassword).subscribe(data => {

        this.returnData = data
        loading.dismiss();
        if (this.returnData.response.flag == "logged_in"){
          //this.navCtrl.push(UserhomePage,{data: this.userEmail});
          //this.navCtrl.push(HomePage,{data: this.userEmail});
          this.storage.set('userEmail', this.userEmail);
          this.storage.set('userID', this.returnData.response.user_data);
          this.navCtrl.push(TabsPage,{data: this.userEmail});
        }
        if (this.returnData.response == "password_error"){
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
