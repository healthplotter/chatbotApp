import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html'
})
export class ChatroomPage {
  @ViewChild(Content) content: Content;
  messages: any;
  messageForm: any;
  chatBox: any;
  isLoading: boolean;
  assessmentData: any;
  allmessage: any;
  userID: any;

  apiUrl = 'http://localhost:3000';

  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient,public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    
    this.chatBox = '';
    this.isLoading = true;
    this.assessmentData = navParams.get('data');
    this.userID = navParams.get('user_id');
    this.allmessage = []
    this.messages = []

    console.log(this.assessmentData)

    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });

    this.httpClient.get(this.apiUrl+'/get_message?assessment_id='+this.assessmentData.assessment_id).subscribe(data => {
      this.allmessage = data.response
      for (let entry of this.allmessage) {
        if ((parseInt(entry.sender_id)) == (parseInt(this.userID)))
          {
            this.messages.push({ from: 'user', text: entry.message });
          }
        else
          {
            this.messages.push({ from: 'bot', text: entry.message });
          }
      }
      }, err => {
        console.log(err);
    });
  }

  sendMessage(req: string) {
    //this.messages.push({ from: 'user', text: req });
    this.chatBox = ''; 

    this.httpClient.get(this.apiUrl+'/app_send_message?sender_id='+this.userID+'&sender_name='+this.assessmentData.receiver_name+'&receiver_id='+this.assessmentData.sender_id+'&message='+req+
    '&assessment_id='+this.assessmentData.assessment_id).subscribe(data => {
      this.allmessage = data.response
      this.messages = []
      for (let entry of this.allmessage) {
        if ((parseInt(entry.sender_id)) == (parseInt(this.userID)))
          {
            this.messages.push({ from: 'user', text: entry.message });
          }
        else
          {
            this.messages.push({ from: 'bot', text: entry.message });
          }
      }
      }, err => {
        console.log(err);
    });



  }

  
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }
}
