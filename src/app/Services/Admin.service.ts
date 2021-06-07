import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../Shared/Model/Pagination';
import { All } from '../Shared/Model/All';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { } 
DeletePhoto(){
  return this._http.delete(this.baseUrl + 'Photo/DeleteAdminImg',{});
}
GetDefaultPropertyImg(){
  return this._http.get(this.baseUrl + 'Photo/PropImg');
}
  //AllProperty
  AllProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllProperty/', { observe: 'response', params })
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
  AllPendingProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllPendingProperty/', { observe: 'response', params })
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
  AllConfirmProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllConfirmProperty/', { observe: 'response', params })
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
  AllRejectProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllRejectProperty/', { observe: 'response', params })
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
  // Rent
  AllRentProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllRentProperty/', { observe: 'response', params })
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
  
  AllRentConfirmProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllRentConfirmProperty/', { observe: 'response', params })
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
  AllRentPendingProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>>{
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllRentPendingProperty/', { observe: 'response', params })
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
  AllRentRejectProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllRentRejectProperty/', { observe: 'response', params })
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

  // Sell
  AllSellProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
   
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllSellProperty/', { observe: 'response', params })
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
  AllSellConfirmProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllSellConfirmedProperty/', { observe: 'response', params })
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
  AllSellPendingProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
    
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllSellPendingProperty/', { observe: 'response', params })
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
  AllSellRejectProperty(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<All>> {
   
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Admin/AllSellRejectProperty/', { observe: 'response', params })
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
  // PG
  AllPGProperty(): Observable<any> {
    return this._http.get(this.baseUrl + 'Admin/AllPGProperty/');
  }
  AllPGConfirmProperty(): Observable<any> {
    return this._http.get(this.baseUrl + 'Admin/AllPGConfirmProperty/');
  }
  AllPGPendingProperty(): Observable<any> {
    return this._http.get(this.baseUrl + 'Admin/AllPGPendingProperty/');
  }
  AllPGRejectProperty(): Observable<any> {
    return this._http.get(this.baseUrl + 'Admin/AllPGRejectProperty/');
  }
}
