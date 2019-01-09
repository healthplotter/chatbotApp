import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import { HomePage } from '../home/home';
import { CareplanPage } from '../careplan/careplan';

@IonicPage()
@Component({
  selector: 'page-userhome',
  templateUrl: 'userhome.html'
})
export class UserhomePage {
  chatRoot = HomePage;
  careplanRoot = CareplanPage
  constructor() {

  }
}
