import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../Shared/Model/Pagination'; 
import { map } from 'rxjs/operators';
import { All } from '../../Shared/Model/All';
import { IUserContact } from 'src/app/Shared/Model/UserContact/IUserContact';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { } 

  postUserContacts(value: IUserContact) {
    return this._http.post(this.baseUrl + 'home', value);
  }
  Lead(uniqueId:number) {
    return this._http.post(this.baseUrl + 'Save/MarkLead/'+uniqueId, {});
  }
  AllPropertyByAddress(address:string,rentorsell:string,page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams(); 
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByAddress/'+address+'/'+rentorsell, { observe: 'response', params })
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
  AllPropertyByLocality(locality: string,sellorrent:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByLocality/' + locality+'/'+sellorrent, { observe: 'response', params })
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

  AllPropertyBySector(sector: string,sellorrent:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/BySector/' + sector+'/'+sellorrent, { observe: 'response', params })
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
  AllPropertyByType(type: string,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByType/' + type+'/'+rentorsell+'/'+address, { observe: 'response', params })
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
  AllPropertyByType2(type: string,type1: string,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByType2/' + type+'/'+ type1+'/'+ rentorsell+'/'+address, { observe: 'response', params })
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

  AllPropertyByType3(type: string,type1: string,type3:string,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByType3/' + type+'/'+ type1+'/'+type3+'/'+ rentorsell+'/'+address, { observe: 'response', params })
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
  AllPropertyByType4(type: string,type1: string,type3:string,type4:string,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByType4/' + type+'/'+ type1+'/'+type3+'/'+type4+'/'+ rentorsell+'/'+address, { observe: 'response', params })
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
  AllPropertyByType5(type: string,type1: string,type3:string,type4:string,type5:string,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByType5/' + type+'/'+ type1+'/'+type3+'/'+type4+'/'+type5+'/'+ rentorsell+'/'+address, { observe: 'response', params })
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

  AllPropertyByBHK(type: string,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByBHK/' + type+'/'+rentorsell+'/'+address, { observe: 'response', params })
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
  AllPropertyByBHK2(type: string,type2: string,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByBHK2/' + type+'/'+type2+'/'+rentorsell+'/'+address, { observe: 'response', params })
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
  AllPropertyByBHK3(type: string,type2: string,type3:string, rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByBHK3/' + type+'/'+type2+'/'+type3+'/'+rentorsell+'/'+address, { observe: 'response', params })
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
  AllPropertyByBHKplus(type: string,type2: string,type3:string,type4:string, rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByBHK4/' + type+'/'+type2+'/'+type3+'/'+type4+'/'+rentorsell+'/'+address, { observe: 'response', params })
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

  AllPropertyByPrice(min: number, max:number,rentorsell:string,address:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByPrice/' + min+'/'+ max +'/'+ rentorsell+'/'+address, { observe: 'response', params })
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

  AllPropertyByTypeAndAddress(type: string,address:string,rentorsell:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByTypeAndAddress/' + type+'/'+address+'/'+rentorsell, { observe: 'response', params })
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

  AllPropertyByPGAddress(address: string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
   
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByPGAddress/' + address, { observe: 'response', params })
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

  AllPropertyByPG(page?, itemsPerPage?): Observable<PaginatedResult<All>> {

    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByPG', { observe: 'response', params })
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

  AllPropertyByPgFor(PgFor: string,location:string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByPGFor/' + PgFor+'/'+location, { observe: 'response', params })
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

  AllPropertyByPgForOnly(PgFor: string, page?, itemsPerPage?): Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/ByPGFor/' + PgFor ,{ observe: 'response', params })
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
}
