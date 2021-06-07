import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyEditService {
  baseUrl = environment.ApiUrl; 
constructor(private _http: HttpClient) { }
getEditProperty(id:number) { 
  return this._http.get(this.baseUrl + 'EditProperty/EditProp/'+id);
}
EditProperty(id:number,ageOfProp:string,bathroom:string,balcony:string,furnishedType:string,coverparking:string,openparking:string,maintainaceCharge:string,teanentType:string,monthlyrent:string,IsSecurityCharge:string,SecurityAmt:string,avalabledate:Date,buildUpArea:string) { 
  return this._http.post(this.baseUrl + 'EditProperty/Rent/'+id+'/'+ageOfProp+'/'+bathroom+'/'+balcony+'/'+furnishedType+'/'+coverparking+'/'+openparking+'/'+maintainaceCharge+'/'+teanentType+'/'+monthlyrent+'/'+IsSecurityCharge+'/'+SecurityAmt+'/'+buildUpArea,avalabledate);
}
EditPropertySell(id:number,ageOfProp:string,bathroom:string,balcony:string,furnishedType:string,coverparking:string,openparking:string,constructionstatus:string, brokerage:string,brockrageamt:number, monthlyrent:string,buildUpArea:string,carpetArea:string,transactiontype:string) { 
  return this._http.post(this.baseUrl + 'EditProperty/Sell/'+id+'/'+ageOfProp+'/'+bathroom+'/'+balcony+'/'+furnishedType+'/'+coverparking+'/'+openparking+'/'+constructionstatus+'/'+brokerage+'/'+brockrageamt+'/'+monthlyrent+'/'+buildUpArea+'/'+carpetArea+'/'+transactiontype,{});
}
EditPropertyPlot(id:number,transactionType:string,possesionType:string,plotprice:number,plotno:string,plotArea:number,Sqfeet:string,length:number,width:number,wfr:number,buildupArea:string,carpetArea:string) { 
  return this._http.post(this.baseUrl + 'EditProperty/Plot/'+id+'/'+transactionType+'/'+possesionType+'/'+plotprice+'/'+plotno+'/'+plotArea+'/'+Sqfeet+'/'+length+'/'+width+'/'+wfr+'/'+buildupArea+'/'+carpetArea,{});
}
EditPropertyPG(id:number,pgname:string,totalbed:number,pgfor:string,mealavalable:string,bestsuitedfor:string,roomtype:string,totalbeds:number,rent:string,securitydepo:string,facilityoffer:string,notice:number,lock:number,commonarea:string,manageby:string,propstay:string,nonveg:string,oppositesex:string,visitorallowed:string,gaurgiunall:string,drinking:string,smoking:string) { 
  return this._http.post(this.baseUrl + 'EditProperty/PG/'+id+'/'+pgname+'/'+totalbed+'/'+pgfor+'/'+mealavalable+'/'+bestsuitedfor+'/'+roomtype+'/'+totalbeds+'/'+rent+'/'+securitydepo+'/'+facilityoffer+'/'+notice+'/'+lock+'/'+commonarea+'/'+manageby+'/'+propstay+'/'+nonveg+'/'+oppositesex+'/'+visitorallowed+'/'+gaurgiunall+'/'+drinking+'/'+smoking,{});
}
}
