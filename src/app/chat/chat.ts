import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ChatroomPage } from '../chatroom/chatroom';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  
  apiUrl = 'http://localhost:3000';
  chatBox: any;
  chatlist: any;
  userID: any;

  constructor(public httpClient: HttpClient,public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    
    this.chatBox = '';
    this.chatlist = [];
    this.userID = '';
    
    this.storage.get('userID').then((userID) => {
      this.userID = userID;
      this.httpClient.get(this.apiUrl+'/app/v1/get_app_message_list?id='+userID).subscribe(data => {
        this.chatlist = data.response
        console.log(this.chatlist)
        }, err => {
          console.log(err);
      });
    });
  }

  navChatRoom(assessment_data) {
    console.log(assessment_data)
    this.navCtrl.push(ChatroomPage,{data: assessment_data,user_id: this.userID});  
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }
}
