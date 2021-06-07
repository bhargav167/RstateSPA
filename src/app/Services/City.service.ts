import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { City } from './../Shared/Model/City';
import { Observable } from 'rxjs';
import { Locality } from '../Shared/Model/Locality';
import { Sector } from '../Shared/Model/Sector';
import { Pocket } from '../Shared/Model/Pocket';
import { SearchData } from '../Shared/Model/SearchData';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { } 
  postdata(value:City) {
    return this._http.post(this.baseUrl + 'CityManage', value);
  }
  postLocality(value: Locality) {
    return this._http.post(this.baseUrl + 'CityManage/Locality', value);
  }
  postLocalityOnSearchData(value: string) {
    return this._http.post(this.baseUrl + 'CityManage/localityforsearchSuggetion/'+value,{});
  }
  postSectorForSuggetion(locality:string,sector) {
    return this._http.post(this.baseUrl + 'CityManage/sectorforsearchSuggetion/'+locality+'/'+sector,{});
  }
  

  postSector(value: Sector) {
    return this._http.post(this.baseUrl + 'CityManage/Sector', value);
  }
  postDummyImg(username:string,UniqueId:number) {
    return this._http.post(this.baseUrl + 'Photo/DummyImg/'+username+'/'+UniqueId, {});
  }
  postPocket(value: Pocket) {
    return this._http.post(this.baseUrl + 'CityManage/Pocket', value);
  }
  updateSector(id: number, session: Sector) {
    return this._http.put(this.baseUrl + 'CityManage' + '/Sector/' + id, session);
  }
  updatePocket(id: number, session: Pocket) {
    return this._http.put(this.baseUrl + 'CityManage' + '/Pocket/' + id, session);
  }
  updateCity(id: number, session: City) {
    return this._http.put(this.baseUrl + 'CityManage' + '/' + id, session);
  }
  updateLocality(id: number, session: Locality) {
    return this._http.put(this.baseUrl + 'CityManage' + '/Locality/' + id, session);
  }
  cityById(id): Observable<any> {
    return this._http.get(this.baseUrl + 'CityManage/city/' + id);
  }
  localityById(id): Observable<any> {
    return this._http.get(this.baseUrl + 'CityManage/locality/' + id);
  }

  sectorById(id): Observable<any> {
    return this._http.get(this.baseUrl + 'CityManage/Sector/' + id);
  }
  pocketById(id): Observable<any> {
    return this._http.get(this.baseUrl + 'CityManage/Pocket/' + id);
  }
  sectorEditById(id): Observable<any> {
    return this._http.get(this.baseUrl + 'CityManage/SectorEdit/' + id);
  }
 pocketEditById(id): Observable<any> {
    return this._http.get(this.baseUrl + 'CityManage/PocketEdit/' + id);
  }
  DelCity(id: number) {
    return this._http.delete(this.baseUrl + 'CityManage' + '/' + id);
  }
  DelLocality(id: number) {
    return this._http.delete(this.baseUrl + 'CityManage' + '/locality/' + id);
  }
  DelSector(id: number) {
    return this._http.delete(this.baseUrl + 'CityManage' + '/Sector/' + id);
  }
  DelPocket(id: number) {
    return this._http.delete(this.baseUrl + 'CityManage' + '/Pocket/' + id);
  }

}
