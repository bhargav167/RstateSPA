import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUpdateProfile } from '../../Shared/Model/IUpdateProfile';
import { IUrl } from '../../Shared/Model/IUrl';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { }  

  EditData(userId:string){
    return this._http.get(this.baseUrl + 'ProfileManagment/' + userId);
  }
  UPdateProfile(updateProp:IUpdateProfile) {
    return this._http.put(this.baseUrl + 'ProfileManagment/', updateProp);
  }
 verifyEmail(userId:string,email: string) {
   return this._http.post(this.baseUrl + 'ProfileManagment/UpdateEmail/'+userId +'/'+email,{});
  }
  GetPropImg(userId:string){
    return this._http.get(this.baseUrl + 'ProfileManagment/UserImage/' + userId);
  }
  postUserImg(userId: string,url:IUrl) { 
    return this._http.post(this.baseUrl + 'ProfileManagment/UpdateUserImageUrl/'+userId,{url});
  }
}
