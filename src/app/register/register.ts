import { Component } from '@angular/core';
import {LoginPage} from '../login/login';
import {IonicPage} from "ionic-angular";
import { NavController } from "ionic-angular";
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

@IonicPage()
@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {

  //apiUrl = 'http://localhost:3000';
  //apiUrl = 'https://HPdevAdmin:UQurW22Vvqbp@dev.healthplotter.com';
  apiUrl = 'https://dev.healthplotter.com';
  userRegisterName: any;
  userRegisterPassword: any;
  userRegisterEmail: any;
  userRegisterconfirmPassword: any;
  returnRegisterData: any;
  authForm : FormGroup;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public httpClient: HttpClient,public restProvider: RestProvider,public fb: FormBuilder,public loadingCtrl: LoadingController) {
    this.returnRegisterData = {}
    this.authForm = fb.group({
      'username' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
      'email' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      'confirmpassword': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
    });

  }

  
  doRegister1(username,email){

    const Chatkit = require('@pusher/chatkit-server');
    const chatkit = new Chatkit.default({
      instanceLocator: "v1:us1:a30ee8b6-ab09-4799-9fd0-e508b50e209d",
      key: "2ad58252-cc80-44a0-9a89-cf1afba25983:H/CkAHOuYG9IOfVvXM2qlanTajzfVQCiulHq4vV0Cwo=",
    })

    chatkit.createUser({
      id: this.userRegisterEmail,
      name: this.userRegisterName,
    })
      .then(() => {
        console.log('User created successfully');
      }).catch((err) => {
        console.log(err);
      });
  }

  doRegister(){

    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();


    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', this.userRegisterName);
    urlSearchParams.append('password', this.userRegisterPassword);
    urlSearchParams.append('email', this.userRegisterEmail);

    if (this.userRegisterPassword != this.userRegisterconfirmPassword){
      const alert = this.alertCtrl.create({
        title: 'Password',
        subTitle: 'Your password does not match',
        buttons: ['OK']
      });
      alert.present();
    }

    if (this.userRegisterPassword == this.userRegisterconfirmPassword){
      this.httpClient.post(this.apiUrl+'/app/v1/register?'+ urlSearchParams.toString(),null)
        .subscribe(data => {
          this.returnRegisterData = data
          loading.dismiss();
          if (this.returnRegisterData.response == "already_exist"){
            const alert = this.alertCtrl.create({
              title: 'User Exist',
              subTitle: 'Email is already registered',
              buttons: ['OK']
            });
            alert.present();
          }
          if (this.returnRegisterData.response == "registration_succesfull"){
            
            const Chatkit = require('@pusher/chatkit-server');
            const chatkit = new Chatkit.default({
              instanceLocator: "v1:us1:a30ee8b6-ab09-4799-9fd0-e508b50e209d",
              key: "2ad58252-cc80-44a0-9a89-cf1afba25983:H/CkAHOuYG9IOfVvXM2qlanTajzfVQCiulHq4vV0Cwo=",
            })

            chatkit.createUser({
              id: this.userRegisterEmail,
              name: this.userRegisterName,
            })
              .then(() => {
                console.log('User created successfully');
              }).catch((err) => {
                console.log(err);
              });

            /*
            const chatManager = new ChatManager({
              instanceLocator: 'v1:us1:a30ee8b6-ab09-4799-9fd0-e508b50e209d',
              userId: this.userRegisterEmail,
              tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a30ee8b6-ab09-4799-9fd0-e508b50e209d/token' })
            })

            chatManager
              .connect()
                .then(currentUser => {
                  currentUser.createRoom({
                    name: 'general',
                    private: true,
                    addUserIds: [this.userRegisterEmail, 'doctor@healthplotter.com'],
                    customData: { foo: 42 },
                  }).then(room => {
                    console.log(`Created room called ${room.name}`)
                  })
                  .catch(err => {
                    console.log(`Error creating room ${err}`)
                  })
                })  
            */

            const alert = this.alertCtrl.create({
              title: 'Registered',
              subTitle: 'You have successfully registered',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(LoginPage);
          }
        }, (err) => {
          console.log("--------error----");
        });      
    }
  }
}
