import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { }
  UpdatePassword(mobNo: string,passwordToUpdate:string) {
    return this._http.put(this.baseUrl + 'ForgetPassword/' + mobNo+'/'+passwordToUpdate, {});
  }
}