import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { PostService } from '../Services/Post.service';
import { PaginatedResult, Pagination } from '../Shared/Model/Pagination';
import { UserDashboardService } from './../Services/Home/UserDashboard.service';
import { All } from './../Shared/Model/All';

@Component({
  selector: 'app-UserDash',
  templateUrl: './UserDash.component.html',
  styleUrls: ['./UserDash.component.scss']
})
export class UserDashComponent implements OnInit { 
  userId:string;
  userName:string;
  fullname:string;
  Alldetais:All;
  detail:All;
  pagination: Pagination; 
  userParams: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 5;
  snNo:number=1;
  PropertyToLoad:string='All';
  imageObject = [];
  ownerimageUrl:string;
  imgLoaded: boolean = false;
  isShow = 'block'; 
  SlideOptions = { items: 1, dots: false, nav: true };
  CarouselOptions = { items: 3, dots: false, nav: true,
    mouseDrag: true, pullDrag: true };

  email: string;
  userPhone: string;
  propId:string;
  isLogin:boolean;
  constructor(private userServices: UserDashboardService, private _router: Router, 
    private _lightbox: Lightbox,
    private userprofileServices: AdminRegisterService,
    private toastr: ToastrService,
    private _http:HttpClient,
    private postservices: PostService) {
      let token=localStorage.getItem('token');
      this._http.post(environment.ApiUrl+'ApplicationManager/tokenMatch/'+token,{}).subscribe((data:boolean)=>{
        this.isLogin=data;
        if(this.isLogin==false){
          localStorage.clear();
          _router.navigateByUrl('/');
        }
       
     })
    this.propId = localStorage.getItem("propertyId");
   this.userId= localStorage.getItem("username");
    this.userName = localStorage.getItem("name");
  }

  ngOnInit() {
    this.loaduserProperty(this.propId,this.PropertyToLoad,this.itemsPerPage);
  }
  open(index: number) {
    // override the default config on second parameter
    this._lightbox.open(this.imageObject, index, {
      showImageNumberLabel: true,
      positionFromTop: '80px',
      centerVertically: true
    });
  } 
  close(): void {
    this._lightbox.close();
  }
  modalDismiss() {
    this.isShow = 'block';
    this.imgLoaded = false;
    this.imageObject = [];
  } 
  Edit(id){
this._router.navigateByUrl('/UserPropertyEdit/'+id);
  }
  LoadProType($event){
    this.PropertyToLoad = $event.target.value;
    this.loaduserProperty(this.propId,this.PropertyToLoad,this.itemsPerPage);
  }
  LoadItemByPage($event){
    this.itemsPerPage=parseInt($event.target.value);
    this.loaduserProperty(this.propId,this.PropertyToLoad,this.itemsPerPage);
  }
  loaduserProperty(propId:string,propType,itemsPerPage:number){
    this.userServices.YourPropertys(propId,propType,this.currentPage, itemsPerPage).subscribe((res: PaginatedResult<All>)=>{
      this.Alldetais = res.result;
      this.pagination = res.pagination;
    }) 
  }
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.loaduserProperty(this.propId,this.PropertyToLoad,this.itemsPerPage);
  }
  GetDetails(i) {
    this.isShow = 'none';
    this.postservices.ViewDetails(i).subscribe((data: All) => {
      this.detail = data; 
      this.userId = this.detail.all[0].userId; 
      if (this.detail.imgs.length == 1 && this.detail.imgs[0].url == 'null') {
        this.imgLoaded == false; 
        this.loadPropertyOwnerDetail();
        return;
      }
      this.detail.imgs.forEach(element => {
        const src = element.url
        const thumb = element.url
        const album = {
          src: src,
          thumb: thumb,
          caption: element.tag
        };
        this.imageObject.push(album);
      });
      this.imgLoaded = true;
      this.loadPropertyOwnerDetail();
    })

  }
  Delete(id){
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure to delete this property',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if(result.isConfirmed==true){
        this.postservices.decline(id).subscribe((data) => {
        this.toastr.error("Your detail deleted successfully");
        this.loaduserProperty(this.propId,this.PropertyToLoad,this.itemsPerPage);
        this.imgLoaded = false;
      })
      }else{
        
      }
      
    })
   
  }
  loadPropertyOwnerDetail() { 
    this.ownerimageUrl=null;
    this.userprofileServices.GetOwnerDetail(this.propId).subscribe((data: any) => {
      this.fullname=data.fullName
      this.email = data.email;
      this.userPhone = data.phoneNumber; 
      this.ownerimageUrl = data.imagUrl;
      
      if (this.ownerimageUrl == null)
        this.ownerimageUrl = '../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg'

      if(!this.email.includes('@'))
      this.email ='';

      if(this.userPhone.includes('@'))
      this.userPhone ='';
    })
  }
  logout() {
    localStorage.clear();
    return this._router.navigateByUrl('/');
  }
}
