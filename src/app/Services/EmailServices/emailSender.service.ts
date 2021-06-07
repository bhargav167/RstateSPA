import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmailBody } from '../../Shared/Model/UserContact/EmailBody';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { }
  sendmail(value: EmailBody) {  
    return this._http.post(this.baseUrl + 'EmailServices/SendMail', value);
  }
  confirmmail(userId:string) {
    return this._http.post(this.baseUrl + 'EmailServices/' + userId, {});
  }
}
