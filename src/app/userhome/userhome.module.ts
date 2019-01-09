import { NgModule } from '@angular/core';
import { UserhomePage} from './userhome';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [UserhomePage],
    imports: [IonicPageModule.forChild(UserhomePage)],
})
export class UserhomePageModule { }