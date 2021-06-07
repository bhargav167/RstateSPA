import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginOtpService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { }
  SendOtp(mobNo:string) {
    return this._http.post(this.baseUrl + 'UserProfile/SendOtp/'+mobNo, {});
  }
  VerifyOtp(otp: number,VerifyOtp:number) { 
    return this._http.post(this.baseUrl + 'UserProfile/Verify/'+otp+'/'+VerifyOtp, {});
  }

  otpLogin(mobNo: string, role: string) {
    if(role=='')
     role='NewRole';
    return this._http.post(this.baseUrl + 'UserProfile/OTPlogin/' + mobNo + '/' + role, {});
  }
  confirmPhone(mobNo: string) {
    return this._http.post(this.baseUrl + 'UserProfile/ConfirmPhome/' + mobNo, {});
  }
  confirmPhoneFromEdit(mobNo: string,phoneToUpdate:string) {
    return this._http.post(this.baseUrl + 'UserProfile/ConfirmPhomeFromEdit/' + mobNo+'/'+phoneToUpdate, {});
  }
}
