import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import { HomePage } from '../home/home';
import { UserhomePage } from '../userhome/userhome';
import { CareplanPage } from '../careplan/careplan';
import { NavController } from "ionic-angular";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  userhomeRoot = UserhomePage;
  chatRoot = HomePage;
  careplanRoot = CareplanPage
  constructor(public navCtrl: NavController) {

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
      this.navCtrl.push(LoginPage);
    }
    

  }
}
