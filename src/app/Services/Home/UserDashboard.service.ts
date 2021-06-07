import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { PaginatedResult } from 'src/app/Shared/Model/Pagination';
import { All } from 'src/app/Shared/Model/All';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {
  baseUrl = environment.ApiUrl;
  constructor(private _http: HttpClient) { } 

  YourPropertys(userId:string,propType:string,page?, itemsPerPage?):Observable<PaginatedResult<All>> {
    const paginatedResult: PaginatedResult<All> = new PaginatedResult<All>();

    let params = new HttpParams(); 
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<All>(this.baseUrl + 'Home/UserProperty/'+userId+'/'+propType, { observe: 'response', params })
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
