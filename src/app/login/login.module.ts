/**
 * Created by hsuanlee on 2017/4/4.
 */
import { NgModule } from '@angular/core';
import { LoginPage} from './login';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [LoginPage],
    imports: [IonicPageModule.forChild(LoginPage)],
})
export class LoginPageModule { }