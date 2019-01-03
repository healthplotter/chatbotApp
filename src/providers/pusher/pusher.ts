import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

/*
  Generated class for the PusherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PusherProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PusherProvider Provider');
    var pusher = new Pusher('2ad58252-cc80-44a0-9a89-cf1afba25983:H/CkAHOuYG9IOfVvXM2qlanTajzfVQCiulHq4vV0Cwo=', {
      cluster: 'us1',
      encrypted: true,
    });
    this.channel = pusher.subscribe('healthplotter');
  }
  channel;

  public init() {
    return this.channel;
  }

}