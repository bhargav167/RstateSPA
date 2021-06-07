import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PropertyConfig } from '../Shared/Model/PropertyConfiguration/PropertyConfig';
import { AdminAccessProp } from '../Shared/Model/PropertyConfiguration/AdminAccessProp';
import { Observable } from 'rxjs';
import { EditOBB } from '../Shared/Model/EditOBB';
@Injectable({
  providedIn: 'root'
})
export class AdminManageFieldsService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { } 

  postdata(id:number,value: PropertyConfig) {
    return this._http.put(this.baseUrl + 'AdminFieldManagment'+'/'+id, value);
  }
  postAdminConfig(id: string, value: AdminAccessProp) {
    return this._http.post(this.baseUrl + 'AdminFieldManagment' + '/AdminFieldConfig/' + id, value);
  }
  GetCurrentFieldStatus(): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFieldManagment');
  }
  GetCurrentAdminFieldStatus(userId:string): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFieldManagment/AdminActiveProp/'+userId);
  } 

  GetAdminList(): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFeature/AllAdmin');
  }
  GetOwnerList(): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFeature/AllOwnerList');
  }
  GetOwner(id): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFeature/GetOwner/'+id);
  }
  DeleteOwner(id): Observable<any> {
    return this._http.post(this.baseUrl + 'AdminFeature/DeleteOwner/'+id,{});
  }
  UpdateOwner(id:string,edirData:EditOBB): Observable<any> {
    return this._http.post(this.baseUrl + 'AdminFeature/UpdateOwner/'+id,edirData);
  }
  GetBrokerList(): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFeature/AllBrokerList');
  }
  
  GetBroker(id): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFeature/GetBroker/'+id);
  }
  DeleteBroker(id): Observable<any> {
    return this._http.post(this.baseUrl + 'AdminFeature/DeleteBroker/'+id,{});
  }

  GetBuilderList(): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFeature/AllBuilderList');
  }
  GetBuilder(): Observable<any> {
    return this._http.get(this.baseUrl + 'AdminFeature/AllBuilder');
  }
}
