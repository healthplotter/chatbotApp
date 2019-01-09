import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import { HomePage } from '../home/home';
import { UserhomePage } from '../userhome/userhome';
import { CareplanPage } from '../careplan/careplan';
import { NavController } from "ionic-angular";
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  userhomeRoot = UserhomePage;
  chatRoot = HomePage;
  careplanRoot = CareplanPage
  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  chatRoomNavigate(req: string){

    if (!req || req === '') {
      return;
    }

    if (req == 'chat') {
      this.navCtrl.push(HomePage);
    }

    if (req == 'careplan') {
      this.navCtrl.push(CareplanPage);
    }

    if (req == 'logout') {
      this.storage.set('userId', '');
      this.navCtrl.push(LoginPage);
    }
    

  }
}
