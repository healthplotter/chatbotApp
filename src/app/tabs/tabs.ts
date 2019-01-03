import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import { HomePage } from '../home/home';
import { CareplanPage } from '../careplan/careplan';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  chatRoot = HomePage;
  careplanRoot = CareplanPage
  constructor() {

  }
}
