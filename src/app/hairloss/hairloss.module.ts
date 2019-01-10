import { NgModule } from '@angular/core';
import { hairLossPage} from './hairloss';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [hairLossPage],
    imports: [IonicPageModule.forChild(hairLossPage)],
})
export class hairLossPageModule { }