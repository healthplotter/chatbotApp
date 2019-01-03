import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareplanPage } from './careplan';

@NgModule({
    declarations: [
        CareplanPage,
    ],
    imports: [
        IonicPageModule.forChild(CareplanPage),
    ],
    exports: [
        CareplanPage
    ]
})
export class CareplanPageModule {}