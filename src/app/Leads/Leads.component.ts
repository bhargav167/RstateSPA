import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdminService } from '../Services/Admin.service';
import { PostService } from '../Services/Post.service';
import { ILeadModel } from '../Shared/Model/ILeadModel';

@Component({
  selector: 'app-Leads',
  templateUrl: './Leads.component.html',
  styleUrls: ['./Leads.component.css']
})
export class LeadsComponent implements OnInit {
userId:string;
Alldetais: any;
Alldetais1: any;
Alldetais2: any;

totalsell:number;
totalrent:number;
totalpg:number;

ActiveSell:boolean=true;
ActiveRent:boolean=false;
ActivePg:boolean=false;
isLogin:boolean;
DefaultPropImages: string;
  constructor(private leadServices: PostService, 
    private _http:HttpClient,
    private _router: Router,
    private adminservices: AdminService) { 
    this.userId = localStorage.getItem("propertyId"); 
    let token=localStorage.getItem('token');
    this._http.post(environment.ApiUrl+'ApplicationManager/tokenMatch/'+token,{}).subscribe((data:boolean)=>{
      this.isLogin=data;
      if(this.isLogin==false){
        localStorage.clear();
        this._router.navigateByUrl('/');
      }
     
   })

  }

  ngOnInit() {
    this.loadLead();
    this.loadRentLead();
    this.loadPgLead();
    this.loadDefaultPropImages();
  }
  Rent(){
    this.ActiveSell=false;
    this.ActivePg=false;
    this.ActiveRent=true;
  }
  Buy(){
    this.ActiveRent=false;
    this.ActivePg=false;
    this.ActiveSell=true; 
  }
  Pg(){
    this.ActiveRent=false;
    this.ActiveSell=false;
    this.ActivePg=true; 
  }
  loadLead(){
    this.leadServices.getLead(this.userId).subscribe((data)=>{
       this.Alldetais=data;  
       this.totalsell=this.Alldetais.all.length;
    })
  }
  loadRentLead(){
    this.leadServices.getRentLead(this.userId).subscribe((data)=>{
       this.Alldetais1=data;  
       this.totalrent=this.Alldetais1.all.length;
    })
  }
  loadPgLead(){
    this.leadServices.getPgLead(this.userId).subscribe((data)=>{
       this.Alldetais2=data;
       this.totalpg=this.Alldetais2.all.length;
    })
  }
  loadDefaultPropImages() {
    this.adminservices.GetDefaultPropertyImg().subscribe((data: any) => {
      this.DefaultPropImages = data.url;
    })
  }

}
