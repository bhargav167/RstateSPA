import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ISave } from './../Shared/Model/ISave';
import { map } from 'rxjs/operators';
import {PaginatedResult} from './../Shared/Model/Pagination';
import { All } from '../Shared/Model/All';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.ApiUrl; 
  private photoUrl = new BehaviorSubject<string>('./../assets/img/faces/face-0.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();


  constructor(private _http: HttpClient) { }
  postdata(value:ISave) {
   return this._http.post(this.baseUrl + 'Save',value); 
  }
  TotalPendingProperty() { 
    return this._http.get(this.baseUrl + 'Save/TotalPendingProperty');
  }
  TotalConfirmProperty() {
    return this._http.get(this.baseUrl + 'Save/TotalConfirmedProperty');
  }
  TotalRejectProperty() {
    return this._http.get(this.baseUrl + 'Save/TotalRejectProperty');
  }
  TotalProperty() {
    return this._http.get(this.baseUrl + 'Save/TotalProperty');
  }
//Photos
   
  setMainPhoto(uniqueID: number, Id: number) {
    return this._http
      .post(this.baseUrl + 'Photo/' + uniqueID + '/photos/' + Id + '/setMain', {});
  }
  setTagPhoto(userId: string, Id: number,tag:string) {
    return this._http
      .post(this.baseUrl + 'Photo/' + userId + '/photos/' + Id + '/setTag/'+tag,{});
  }
  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
  deletePhoto(userId: string, id: number) {
    return this._http
      .delete(this.baseUrl + 'Photo/' + userId + '/photos/' + id);
  }
  getData( page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    } 
    return this._http.get<All>(this.baseUrl + 'Save', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }


  getDataHome(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Save/home', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      ); 
  }
  allCity(): Observable<any> {
    return this._http.get(this.baseUrl+'Save/city');
  }
  allLocality(id): Observable<any> {
    return this._http.get(this.baseUrl + 'Save/locality/'+id);
  }
  allSector(id): Observable<any> {
    return this._http.get(this.baseUrl + 'Save/sector/'+id);
  }
  confirm(id: number) {
    return this._http.put(this.baseUrl + 'Save/'+id,{});
  }
  ViewDetails(uniqueID:number){
    return this._http.get(this.baseUrl + 'Save/View/'+uniqueID);
  }
  decline(id: number) {
    return this._http.put(this.baseUrl + 'Save/decline/' + id, {});
  }

  getLastUniqueId(){
    return this._http.get(this.baseUrl + 'Save/LastUniqueId');
  }
  getLead(userId:string){
    return this._http.get(this.baseUrl + 'Lead/lead/'+userId);
  }
  getRentLead(userId:string){
    return this._http.get(this.baseUrl + 'Lead/Rentlead/'+userId);
  }
  getPgLead(userId:string){
    return this._http.get(this.baseUrl + 'Lead/Pglead/'+userId);
  }
}
