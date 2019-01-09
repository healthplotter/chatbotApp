import { Component, ViewChild } from '@angular/core';
import { Platform, Content } from 'ionic-angular';
import { ApiAiClient } from 'api-ai-javascript';
import { Message } from './models/message';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  accessToken: string = '765e77e009c34f4dbb95d5c723f23288';
  client;
  messages: Message[] = [];
  messageForm: any;
  chatBox: any;
  isLoading: boolean;
  initialScreen: boolean;
  yesNoScreen: boolean;
  sureNoScreen: boolean;
  maleFemaleScreen: boolean;
  noBlock: boolean;
  yesBlock: boolean;
  age: any;
  sex: any;
  userEmail: any;
  chatManager: any;
  roomId: any;

  constructor(public platform: Platform, public formBuilder: FormBuilder, public httpClient: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    
    this.chatBox = '';
    this.initialScreen = true;
    this.yesNoScreen = false;
    this.sureNoScreen = false;
    this.maleFemaleScreen = false;
    this.noBlock = false;
    this.yesBlock = false;
    this.age = '';
    this.sex = '';
    this.roomId = ''
    //this.userEmail = navParams.get('data');
    this.userEmail = "user@healthplotter.com"

    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });

    this.client = new ApiAiClient({
      accessToken: this.accessToken
    });

    this.chatManager = new ChatManager({
      instanceLocator: 'v1:us1:a30ee8b6-ab09-4799-9fd0-e508b50e209d',
      userId: this.userEmail,
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a30ee8b6-ab09-4799-9fd0-e508b50e209d/token' })
    })

    this.chatManager
      .connect()
        .then(currentUser => {
          console.log('Successful connection', currentUser)
        })

  }

  startConversation(req: string) {
    this.initialScreen = false;

    this.chatManager
      .connect()
        .then(currentUser => {
          currentUser.createRoom({
            name: currentUser.name,
            private: true,
            addUserIds: [this.userEmail, 'doctor@healthplotter.com'],
            customData: { name: currentUser.name },
          }).then(room => {
            this.roomId = room.id;
            currentUser.subscribeToRoom({
              roomId: room.id,
              hooks: {
                onMessage: message => {
                  if (message.senderId == "doctor@healthplotter.com")
                    {
                      this.messages.push({ from: 'bot', text: `${message.text}` });
                    }
                  else
                    {
                      this.messages.push({ from: 'user', text: `${message.text}` });
                    }
                }
              }
            });
          })
          .catch(err => {
            console.log(`Error creating room ${err}`)
          })
        })  
  }

  

  sendMessage(req: string) {
    this.chatManager
      .connect()
        .then(currentUser => {
          currentUser.sendMessage({
            text: req,
            roomId: this.roomId
          });

        })
        .catch(error => {
          console.error("error:", error);
        })
    this.chatBox = '';    
  }

  sendMessage2(req: string) {
    if (!req || req === '') {
      return;
    }
    this.initialScreen = false;
    this.messages.push({ from: 'user', text: req });

    if (req === 'Yes' || req === 'No'){
      this.yesNoScreen = false;
    }

    
    if (this.messages.length==1){
      this.messages.push({ from: 'bot', text: 'Hi There – Welcome to SimpleCheckups, do you have any health concerns?' });
      this.yesNoScreen = true;
    }

    if (this.messages.length==3){
      if (req === 'No'){
        this.noBlock = true;
        this.yesBlock = false;
      }

      if (req === 'Yes'){
        this.noBlock = false;
        this.yesBlock = true;
      }
    }

    if (this.noBlock){
      if (this.messages.length==3){
        this.messages.push({ from: 'bot', text: 'ok great, glad you were able to reach out even when you are well. We want to help you when you sick and you are well.' });
        this.messages.push({ from: 'bot', text: 'Here are some quick items to help you' });
        this.messages.push({ from: 'bot', text: 'Fill out profile – It is easier when you reach out with other health concerns' });
        this.messages.push({ from: 'bot', text: 'Enter your name' });
      }
      if (this.messages.length==8){
        this.messages.push({ from: 'bot', text: 'Know your preventative care – these are best practices to maximize prevention'});
        this.messages.push({ from: 'bot', text: 'Enter your age'});
      }
      if (this.messages.length==11){
        this.age = req
        this.messages.push({ from: 'bot', text: 'Enter your sex'});
        this.maleFemaleScreen = true;
      }
      if (this.messages.length==13){
        this.sex = req
        this.maleFemaleScreen = false;

        if (this.sex == "Male"){
          this.messages.push({ from: 'bot', text: 'Get Shots to Protect Your Health.Get important adult shots (vaccinations). (ACIP)'});
          this.messages.push({ from: 'bot', text: 'Get the Seasonal Flu Vaccine .Get the flu vaccine every year to protect yourself and others from the flu. (ACIP)'});
          this.messages.push({ from: 'bot', text: 'Talk with a Doctor about Your Alcohol Use.If you are concerned about your drinking, ask your doctor about screening and counseling. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for HIV.Get tested for HIV at least once. You may need to get tested more often depending on your risk. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Your Blood Pressure Checked.Get your blood pressure checked once a year. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Help to Quit Smoking.If you smoke, ask your doctor about services to help you quit. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Talk with Your Doctor about Depression.Talk with your doctor about how you are feeling if you have been sad, down, or hopeless. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Based on family history and other risk factors, doctors recommend that'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Hepatitis C.If you have risk factors for hepatitis C (like any injection drug use or if you had a blood transfusion before 1992), talk to your doctor about getting tested. (USPSTF'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Type 2 Diabetes.If you are overweight or have other risk factors for type 2 diabetes (like a family history of diabetes), ask your doctor to test you for diabetes. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Watch Your Weight.If you are obese, ask your doctor about counseling for obesity. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Help with Healthy Eating.If your doctor has told you that you are at risk for heart disease or diabetes, ask about dietary counseling. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Hepatitis B.If you have risk factors for hepatitis B (like any injection drug use or if you were born in a country where hepatitis B is common), talk to your doctor about getting tested. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Syphilis.If you have HIV or another risk factor for syphilis (like having sex with other men), ask your doctor about testing and prevention counseling. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Ask Your Doctor about Preventing STDs.If you are sexually active, ask your doctor about prevention counseling for sexually transmitted diseases like chlamydia and gonorrhea. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Latent Tuberculosis Infection (LTBI).If you are at risk for LTBI – for example, if you have lived in a country where TB is common – ask your doctor about testing. (USPSTF)'});

        }
        if (this.sex == "Female"){
          this.messages.push({ from: 'bot', text: 'Get Enough Folic Acid Learn why women your age need folic acid. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Shots to Protect Your Health Get important adult shots (vaccinations). (ACIP)'});
          this.messages.push({ from: 'bot', text: 'Get Your Well-Woman Visit Every Year.See a doctor or nurse for a checkup once a year. (HRSA)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Cervical Cancer. Get a Pap test every 3 years. If you get a Pap test and an HPV test, you can get screened every 5 years instead. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Your Blood Pressure Checked.Get your blood pressure checked once a year. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get the Seasonal Flu Vaccine.Get the flu vaccine every year to protect yourself and others from the flu. (ACIP)'});
          this.messages.push({ from: 'bot', text: 'Watch for Warning Signs of Relationship Violence.If you think your partner might be abusive, talk with your doctor about getting help. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Help to Quit Smoking.If you smoke, ask your doctor about services to help you quit. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Talk with Your Doctor about Depression.Talk with your doctor about how you are feeling if you have been sad, down, or hopeless. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for HIV.Get tested for HIV at least once. You may need to get tested more often depending on your risk. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Talk with a Doctor about Your Alcohol Use.If you are concerned about your drinking, ask your doctor about screening and counseling. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Type 2 Diabetes.If you are overweight or have other risk factors for type 2 diabetes (like a family history of diabetes), ask your doctor to test you for diabetes. (USPSTF'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Breast Cancer.Talk with your doctor about when to start getting mammograms and how often you need them. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Hepatitis C.If you have risk factors for hepatitis C (like any injection drug use or if you had a blood transfusion before 1992), talk to your doctor about getting tested. (USPSTF)'});
          this.messages.push({ from: 'bot', text: 'Get Tested for Chlamydia and Gonorrhea.If you have more than one sex partner or a new sex partner, get tested for chlamydia and gonorrhea. Ask your doctor about prevention counseling. (USPSTF)'});
        }
      }
    }


    if (this.yesBlock){
      if (this.messages.length==3){
        this.messages.push({ from: 'bot', text: 'What are your concerns?'});
      }
      if (this.messages.length==5){
        this.messages.push({ from: 'bot', text: 'Is there any other relevant history regarding this concern so we can share it with the doctor?'});
      }
      if (this.messages.length==7){
        this.messages.push({ from: 'bot', text: 'We also don’t have your profile, would you mind filling it out?'});
        this.sureNoScreen = true;
      }

      if (this.messages.length==9){
        this.sureNoScreen = false;
        if (req === 'Sure'){
          this.messages.push({ from: 'bot', text: 'Enter Age'});
        }
        if (req === 'No'){
          this.messages.push({ from: 'bot', text: 'Ok thanks, a healthcare provider will reach out to you shortly – please note this is for educational purposes only and does not establish a doctor-patient relationship?'});
          this.yesBlock = false;
        }
        
      }

      if (this.messages.length==11){
        this.messages.push({ from: 'bot', text: 'Enter Sex'});
        this.maleFemaleScreen = true;
      }

      if (this.messages.length==13){
        this.maleFemaleScreen = false;
        this.messages.push({ from: 'bot', text: 'Are you currently on any Medications?'});
        this.yesNoScreen = true;
      }

      if (this.messages.length==15){
        this.messages.push({ from: 'bot', text: 'Do you have any Allergies?'});
        this.yesNoScreen = true;
      }
      if (this.messages.length==17){
        this.messages.push({ from: 'bot', text: 'Do you have any other Medical Conditions?'});
        this.yesNoScreen = true;
      }
      if (this.messages.length==19){
        this.messages.push({ from: 'bot', text: 'Ok thanks, a healthcare provider will reach out to you shortly – please note this is for educational purposes only and does not establish a doctor-patient relationship?'});
        this.yesBlock = false;
      }

    }

    if (this.messages.length>3){
     if (!(this.yesBlock) && !(this.noBlock)){
      this.messages.push({ from: 'bot', text: 'Please wait, our healthcare provider will reach out to you shortly'}); 
     }

    }

    this.isLoading = true;
    this.scrollToBottom();
    this.isLoading = false;
    this.chatBox = '';
  }

  sendMessage1(req: string) {
    if (!req || req === '') {
      return;
    }
    this.messages.push({ from: 'user', text: req });
    this.isLoading = true;

    this.client
      .textRequest(req)
      .then(response => {
        /* do something */
        console.log('res');
        console.log(response);
        this.messages.push({
          from: 'bot',
          text: response.result.fulfillment.speech
        });
        this.scrollToBottom();
        this.isLoading = false;
      })
      .catch(error => {
        /* do something here too */
        console.log('error');
        console.log(error);
      });

    this.chatBox = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }
}
