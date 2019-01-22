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
import { UserhomePageModule } from './userhome/userhome.module';
import { CareplanPageModule } from './careplan/careplan.module';
import { ChatPageModule } from './chat/chat.module';
import { ChatroomPageModule } from './chatroom/chatroom.module';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';

import { hairLossPageModule } from './hairloss/hairloss.module';

@NgModule({
  declarations: [MyApp],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HomeModule, LoginPageModule, RegisterPageModule,TabsPageModule,UserhomePageModule,CareplanPageModule,ChatroomPageModule,ChatPageModule,hairLossPageModule,HttpClientModule,IonicStorageModule.forRoot()],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    RestProvider,
    IonicStorageModule
  ]
})
export class AppModule {}
