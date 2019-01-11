import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-hairloss',
  templateUrl: 'hairloss.html'
})
export class hairLossPage {
  
  apiUrl = 'http://localhost:3000';
  formData: any;
  postData: any;

  constructor(public httpClient: HttpClient) {

    this.formData = {}

  }

  submitHairLoss() {
    console.log(this.formData)

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('assesmentname', "Hair Loss");

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });

    this.httpClient.post(this.apiUrl+'/app/v1/assesment?'+ urlSearchParams.toString(), JSON.stringify(this.formData), requestOptions)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
    });
  }
  
}
