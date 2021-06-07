import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../Services/Post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { All } from '../Shared/Model/All'; 
import { PropertyConfig } from '../Shared/Model/PropertyConfiguration/PropertyConfig';
import { AdminManageFieldsService } from '../Services/AdminManageFields.service';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-ViewDetails',
  templateUrl: './ViewDetails.component.html',
  styleUrls: ['./ViewDetails.component.scss']
})
export class ViewDetailsComponent implements OnInit { 
  detais: All; 
  imageObject = [];  
  propertyConfig: PropertyConfig;
  thumb = '';
  url;
  names;
  email: string;
  userPhone:string;
  hideemail: string;
  userId: string;
  uniqueId: number; 
  SlideOptions = { items: 1, dots: true, nav: false };
  CarouselOptions = { items: 3, dots: true, nav: false, mouseDrag: true, pullDrag: true };
 id:number;
  isDetailLoading: boolean = true;
  imgLoaded: boolean = false;  
  IshomeLoading: boolean = true;
  ownerimageUrl:string;
  isLogin:boolean;
  constructor(private services: PostService, private route: ActivatedRoute,
    private userprofileServices: AdminRegisterService,
    private _router: Router,
    private _http:HttpClient,
    private adminmanage: AdminManageFieldsService) { 
      let token=localStorage.getItem('token');
      this._http.post(environment.ApiUrl+'ApplicationManager/tokenMatch/'+token,{}).subscribe((data:boolean)=>{
        this.isLogin=data;
        if(this.isLogin==false){
          localStorage.clear();
          _router.navigateByUrl('/');
        }
       
     })
  } 
  ngOnInit() {
   
  this.id = +this.route.snapshot.paramMap.get('id');
    this.loadActiveProperty();
   this.GetDetails(this.id);
   
  } 
  GetDetails(i) {
    this.isDetailLoading = true;
    this.url = './../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';

    this.imageObject = [];
    
    this.thumb = '';
    this.services.ViewDetails(i).subscribe((data: All) => {
      this.detais = data; 
      this.isDetailLoading = false;
      this.detais.imgs.forEach(element => {
        const src = element.url
        this.thumb = element.url
        const album = {
          src: src,
          thumb: this.thumb,
          caption: element.tag
        };
        this.imageObject.push(album);
      });
      this.imgLoaded = true; 
      this.userId = this.detais.all[0].userId; 
      this.loadPropertyOwnerDetail();  
    })
  } 
  loadPropertyOwnerDetail() {
    this.userprofileServices.GetOwnerDetail(this.userId).subscribe((data: any) => {
      this.email = data.email;
      this.names = data.fullName;
      this.userPhone = data.phoneNumber;
      this.ownerimageUrl = data.imagUrl;
       
      this.ownerimageUrl = data.imagUrl;
      if (this.ownerimageUrl == null)
        this.ownerimageUrl = '../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg'

    })
  }
  loadActiveProperty() {
    this.adminmanage.GetCurrentFieldStatus().subscribe((data: PropertyConfig) => {
      this.propertyConfig = data;
    })
  }
}
