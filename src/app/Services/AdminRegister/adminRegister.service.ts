import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AdminRegister } from './../../Shared/Model/Auth/Admin/AdminRegister';
 
@Injectable({
  providedIn: 'root'
})
export class AdminRegisterService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { } 
  register(authRes: AdminRegister, role: string) {
    return this._http.post(this.baseUrl + 'ApplicationManager/register/'+ role , authRes);
  }
  checklogin(email:string){
    return this._http.post(this.baseUrl + 'ApplicationManager/Checklogin/'+email , {});
  }
  checkloginMail(email: string) {
    return this._http.post(this.baseUrl + 'ApplicationManager/Checkloginmail/' + email,{});
  }

  checkAdminlogin(email: string) {
    return this._http.post(this.baseUrl + 'ApplicationManager/CheckAdminlogin/' + email, {});
  }
  checkAdminloginMail(email: string) {
    return this._http.post(this.baseUrl + 'ApplicationManager/CheckAdminloginmail/' + email, {});
  }

  login(formData, role: string) { 
    return this._http.post(this.baseUrl + 'ApplicationManager/login' + '/' + role, formData);
  }
  loginByPhone(login) {
    return this._http.post(this.baseUrl + 'ApplicationManager/login',login);
  }
  loginByPhone1(login) {
    return this._http.post(this.baseUrl + 'ApplicationManager/loginPhone', login);
  }
  GetUserProfile() {
    return this._http.get(this.baseUrl + 'UserProfile');
  }

  GetOwnerDetail(userId:string) {
    return this._http.get(this.baseUrl + 'UserProfile/OwnerDetail/'+userId);
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;

    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return true;
  }
}
