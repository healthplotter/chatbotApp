import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import { HttpClient } from '@angular/common/http';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NavController } from "ionic-angular";
import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-hairloss',
  templateUrl: 'hairloss.html'
})
export class hairLossPage {
  
  //apiUrl = 'http://localhost:3000';
  apiUrl = 'https://dev.healthplotter.com';
  formData: any;
  postData: any;

  constructor(public httpClient: HttpClient,public storage: Storage,public navCtrl: NavController,private alertCtrl: AlertController) {

    this.formData = {}
    console.log("userID")

    this.storage.get('userID').then((userID) => {
      console.log(userID)
      this.formData.userID = userID
    });

  }

  submitHairLoss() {
    console.log(this.formData)
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('assesmentname', "Hair Loss");

    this.httpClient.post(this.apiUrl+'/app/v1/assesment?'+ urlSearchParams.toString(), JSON.stringify(this.formData))
      .subscribe(data => {
        let alert = this.alertCtrl.create({
            title: 'Submitted',
            subTitle: 'Questionaire submitted.Your practitioner will follow up',
            buttons: ['OK']
          });
        alert.present();
        this.navCtrl.push(TabsPage);
      }, error => {
        console.log(error);
    });
  }
  
}
