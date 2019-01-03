import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomeModule } from './home/home.module';
import { LoginPageModule } from './login/login.module';
import { RegisterPageModule } from './register/register.module';
import { TabsPageModule } from './tabs/tabs.module';
import { CareplanPageModule } from './careplan/careplan.module';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [MyApp],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HomeModule, LoginPageModule, RegisterPageModule,TabsPageModule,CareplanPageModule,HttpClientModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    RestProvider
  ]
})
export class AppModule {}
