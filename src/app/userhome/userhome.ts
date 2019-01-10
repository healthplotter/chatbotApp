import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import { NavController } from "ionic-angular";
import { hairLossPage } from '../hairloss/hairloss';

@IonicPage()
@Component({
  selector: 'page-userhome',
  templateUrl: 'userhome.html'
})
export class UserhomePage {
  constructor(public navCtrl: NavController) {

  }

  doAssesmentNavigate(req: string){
    
    if (!req || req === '') {
      return;
    }

    if (req == 'hairloss') {
      this.navCtrl.push(hairLossPage);
    }
  }
}
