import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/Post.service';
import { CityService } from 'src/app/Services/City.service'; 
import { All } from 'src/app/Shared/Model/All';
import { ToastrService } from 'ngx-toastr'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {City} from './../Shared/Model/City';
import { Sector } from './../Shared/Model/Sector';
import { Pocket } from './../Shared/Model/Pocket';
import { Locality } from './../Shared/Model/Locality';  
import { Lightbox } from 'ngx-lightbox'; 
import { ChartType, ChartOptions } from 'chart.js';  
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AdminService} from './../Services/Admin.service'; 
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts'; 
import { LabelOptions } from 'chartjs-plugin-datalabels/types/options'; 
import { PaginatedResult, Pagination } from '../Shared/Model/Pagination';
import { PropertyConfig} from './../Shared/Model/PropertyConfiguration/PropertyConfig';
import { AdminManageFieldsService } from './../Services/AdminManageFields.service';
import { Router } from '@angular/router';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Images } from '../Shared/Model/Images';
import * as _ from 'underscore'; 
import { IUpdateProfile } from '../Shared/Model/IUpdateProfile';
import { ProfileEditService } from '../Services/Profile/profileEdit.service';
import { AdminAccessProp } from '../Shared/Model/PropertyConfiguration/AdminAccessProp';
import { IUrl } from '../Shared/Model/IUrl';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-AdminPanel',
  templateUrl: './AdminPanel.component.html',
  styleUrls: ['./AdminPanel.component.css']
})
export class AdminPanelComponent implements OnInit { 
  isActivePropLoaded:boolean=false;
  propertyConfig:PropertyConfig;
  AdminpropertyConfig:any={
    isManageAddress:false,
    isManageFeild:false,
    isSetPropImg:false
  }
  SlideOptions = { items: 1, dots: false, nav: true,
    
  };
  CarouselOptions = {
    items: 3, dots: false,  
    mouseDrag: true, pullDrag: true
  }; 
  pagination: Pagination;
  userParams: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 5;
  public dataLoader: boolean;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
public labeloption:LabelOptions={
  color:'#fff'
}
  public pieChartOptions: ChartOptions = {
    responsive: true, 
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet=[0,0,0,0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true; 
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#6861ce', '#28a745', '#17a2b8','#dc3545'], 
      color: '#ffffff'
    },
  ];
 
  totalProperty:number;
  totalPendingProperty: number;
  totalConfirmProperty: number;
  totalRejectProperty: number; 
  Alldetais: All;
  detail: All;
  Alldetaiss: All[];
  iShowImg: string = 'none';
  images = [];
  imgLoaded:boolean=false;
  isShow = 'block';
  registerCity: FormGroup;
  registerLocality:FormGroup;
  registerFields: FormGroup;
  registerAdminFields: FormGroup;
  registerSector: FormGroup;
  registerPocket: FormGroup;
  editData:IUpdateProfile;
  city:City;
  citys: City[];

  DefaultPropImages:string;

  whichPropLoaded:string='';
  msgNodata:string='No Property To Display';
  isData:boolean=false;

  uploading: boolean;
  AdminListActive:boolean=false;
  OwnerListActive: boolean=false;
  BrokerListActive: boolean=false;
  BuilderListActive: boolean=false;
  particularcity:City;
  locality:Locality;
  localitys: Locality[]; 
  sectors:Sector[];
  sector:Sector;
  pockets: Pocket[];
  pocket: Pocket;
  Id: number;
  cityId:number;  
  localityId: number; 
  sectorId: number; 
  show:boolean=false; 
  userDetails;
  activeEdit:boolean;
  userId:string;
  adminId:string;
  imgurl: IUrl;
  a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen '];

  b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'];
  AmtInK:string;
  userEmail:string;
  userPhone: string;
  userimgUrl:string;
  baseUrl = environment.ApiUrl; 
  imgs: Images[]=[];
  url:any;
  role:string;
  PropertyToLoad:string='All';
  isDetailLoading:boolean;
  ownerimageUrl:string;
  localityName:string;
  isLogin:boolean;
  public btnLoader: boolean = false;
  constructor(private postservices: PostService,
    private cityServices: CityService,
    private adminServices: AdminService,
    private adminregisterservices: AdminRegisterService,
    private _router: Router,
    private _lightbox: Lightbox,
    private profileUpdate: ProfileEditService,
    private adminmanage: AdminManageFieldsService,
    private _http:HttpClient,
    private toastr: ToastrService,private fb: FormBuilder) {
      let token=localStorage.getItem('token');
      this._http.post(environment.ApiUrl+'ApplicationManager/tokenMatch/'+token,{}).subscribe((data:boolean)=>{
        this.isLogin=data;
        if(this.isLogin==false){
          localStorage.clear();
          _router.navigateByUrl('/');
        }
       
     })
     this.AdminListActive=false;
    this.TotalProperty();
    this.TotalPendingProperty();
    this.TotalConfirmProperty();
    this.TotalRejectProperty();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.initializeUploader();
     }
  ngOnInit() {  
    this.AdminListActive=false;
    this.adminId = localStorage.getItem("userId");
    this.url = localStorage.getItem("url");
    this.role = localStorage.getItem("role");
    if(this.role=='Admin'){
      this.LoadAdminActiveProp(this.adminId);
    }
    if (this.url == 'null') {
      this.url = './../../assets/41-512.png';
    }
      this.adminregisterservices.GetUserProfile().subscribe(
        res => {
          this.userDetails = res; 
        },
        err => {
          console.log(err);
        }
      )

    this.load();
    this.loadCity();
    this.createRegisterSession();
    this.createRegisterLocality();
    this.createManageFields();
    this.createAdminManageFields();
    this.createRegisterSector();
    this.createRegisterPocket();
  }
  loadAdminList(){
    this.activeEdit=false;
    this.AdminListActive=true;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
  }
  loadOwnerList() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.OwnerListActive=true;
  }
  loadBrokerList(){
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BuilderListActive = false;
    this.BrokerListActive=true;
  }
  loadBuilderList() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive=true;
  }
  Edits() {
    this.GetEditData(this.adminId);
    this.activeEdit = true;
  }
  Dash() {
    this.activeEdit = false;
  }
  loadimg(url){
    this.url=url;
    this.imgurl = <IUrl>this.url;
    
  }
  Upload() {
    this.profileUpdate.GetPropImg(this.adminId).subscribe((data: any) => {
      this.url= data.imagUrl;
     localStorage.setItem("url", this.url);
    })
  }
  SaveChanges() {
    this.btnLoader = true;
    this.profileUpdate.postUserImg(this.adminId, this.imgurl).subscribe(() => {
      
      this.Upload();
    });
    this.profileUpdate.UPdateProfile(this.editData).subscribe((data) => {
      this.toastr.success('Profile Updated');
      this.GetEditData(this.userId);
      this.btnLoader = false;
    }, err => {
      console.log(err);
    })
  }
  GetEditData(userId: string) {
    this.profileUpdate.EditData(userId).subscribe((data: IUpdateProfile) => {
      this.editData = data;
    })
  }
  LoadAdminActiveProp(userId){
    this.adminmanage.GetCurrentAdminFieldStatus(userId).subscribe((data:AdminAccessProp)=>{
      this.AdminpropertyConfig.isManageAddress=data.isManageAddress;
      this.AdminpropertyConfig.isManageFeild = data.isManageFeild;
      this.AdminpropertyConfig.isSetPropImg = data.isSetPropImg; 
      this.AdminpropertyConfig.isManageCity = data.isManageCity;
      this.AdminpropertyConfig.isManageLocality = data.isManageLocality;
      this.AdminpropertyConfig.isManageSector = data.isManageSector;
      this.AdminpropertyConfig.isManagePocket = data.isManagePocket;
    })
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Photo/DummyImgByAdmin',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { 
      this.deletePhotos();
      file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log(response);
      if (response) { 
        const res: Images = JSON.parse(response); 
        this.imgs.push(res);  
        this.iShowImg = 'block';
      };
      
    }
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.toastr.info("Only image file allowed.");
    }
  }
  
  deletePhotos(){
  this.adminServices.DeletePhoto().subscribe(()=>{
    this.imgs.splice(_.findIndex(this.imgs), 1);
    this.iShowImg = 'none';
  });
  }
  open(index: number) {
    // override the default config on second parameter
    this._lightbox.open(this.images, index, {
      showImageNumberLabel: true,
      positionFromTop: '80px',
      centerVertically: true
    });
  } 
  logout(){
    localStorage.clear();
    return this._router.navigateByUrl('/adminlogin');
  }
  close(): void { 
    this._lightbox.close();
  }
 
  TotalProperty() {
    this.postservices.TotalProperty().subscribe((data: number) => {
      this.totalProperty = data;  
    })
  }
  
  TotalRejectProperty() {
    this.postservices.TotalRejectProperty().subscribe((data: number) => {
      this.totalRejectProperty = data;  
    })
  }
  TotalConfirmProperty() {
    this.postservices.TotalConfirmProperty().subscribe((data: number) => {
      this.totalConfirmProperty = data; 
    })
  }
  TotalPendingProperty() {
    this.postservices.TotalPendingProperty().subscribe((data: number) => {
      this.totalPendingProperty = data; 
    })
  }
  modalDismiss() {
    this.isShow = 'block'; 
    this.imgLoaded = false;
    this.images=[];
    this.imgs=[];
    this.iShowImg = 'none';
    this.ResetManageAddress();
  }
  ResetManageAddress(){
this.registerSector.reset();
this.registerCity.reset();
this.registerLocality.reset();
this.registerPocket.reset();
  }
  GetDetails(i) {
    this.images=[]
    this.isDetailLoading = true;
    this.isShow = 'none';
    this.postservices.ViewDetails(i).subscribe((data: All) => {
      this.detail = data;  
      this.userId = this.detail.all[0].userId;
     
      if (this.detail.imgs.length == 1 && this.detail.imgs[0].url=='null'){
        this.imgLoaded==false;
        this.loadPropertyOwnerDetail();
        return;
      }
      this.detail.imgs.forEach(element => {
        const path =  element.url; 
        const images = {
          src: path,
          thumb:path
        };
        this.images.push(images); 
      });   
      console.log(this.images);
      this.imgLoaded = true;
      this.loadPropertyOwnerDetail(); 
    })
  }
  loadPropertyOwnerDetail() {
    this.adminregisterservices.GetOwnerDetail(this.userId).subscribe((data:any)=>{
      this.ownerimageUrl = data.imagUrl; 
      if(this.ownerimageUrl==null)
      this.ownerimageUrl ='../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';
   
      this.userEmail=data.email;
      this.userPhone = data.phoneNumber;
      
      if(!this.userEmail.includes('@'))
      this.userEmail ='';

      if(this.userPhone.includes('@'))
      this.userPhone ='';
    })
  }
  Accept(id: number) {
    this.postservices.confirm(id).subscribe((data) => {
      this.toastr.success("Detail Accepted! Property is now listed");
      this.load();
      this.modalDismiss();
      this.TotalProperty();
      this.TotalPendingProperty();
      this.TotalConfirmProperty();
      this.TotalRejectProperty();
      this.imgLoaded = false;
    })
  }

  ManageField(){
   this.propertyConfig= this.registerFields.value;  
   this.propertyConfig.Id=1;
    this.adminmanage.postdata(this.propertyConfig.Id,this.propertyConfig).subscribe((data)=>{
      this.toastr.success("Field Managed successfully");
      this.loadActiveProperty();
    })
   }
 
  LoadProType($event){
    let selectedValue = $event.target.value;
    if(selectedValue=='All'){
      this.PropertyToLoad='All';
      this.load();
    }
    if (selectedValue == 'Rent') {
      this.PropertyToLoad = 'Rent';
      this.AllRentPendingProperty();
    }
    if (selectedValue == 'Sell') {
      this.PropertyToLoad = 'Sell';
      this.AllSellPendingProperty();
    }
    if (selectedValue == 'PG') {
      this.PropertyToLoad = 'PG';
      this.AllPGPendingProperty();
    }
  }
  load() {
    this.loadDefaultPropImages();
    this.whichPropLoaded='';
    this.postservices.getData(this.currentPage, this.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination; 
      this.whichPropLoaded='allloded';
      this.pieChartData = [this.totalProperty, this.totalPendingProperty, this.totalConfirmProperty, this.totalRejectProperty];
      this.pieChartLabels = [[`${this.totalProperty} - Total Properties`], [`${this.totalPendingProperty} - Pending Properties`], [`${this.totalConfirmProperty} - Confirmed Properties`], [`${this.totalRejectProperty} - Rejected Properties        `]]  
    })
  }
  pageChanged(event: any): void { 
    this.currentPage = event.page; 
    switch (this.PropertyToLoad) {
      case 'All':
        this.load();
        break;
      case 'TP':
        this.AllProperty();
        break;
      case 'PP':
        this.AllPendingProperty();
        break;
      case 'CP':
        this.AllConfirmProperty();
        break;
      case 'RP':
        this.AllRejectProperty();
        break;
      case 'Rent':
        this.AllRentProperty();
        break;
      case 'Sell':
        this.AllSellProperty();
        break;
      case 'PG':
        this.AllPGProperty();
        break;
    
      default:
        break;
    }
   
  }
  LoadPerPage($event){
    this.itemsPerPage=$event.target.value;
    switch (this.PropertyToLoad) {
      case 'All':
        this.load();
        break;
      case 'TP':
        this.AllProperty();
        break;
      case 'PP':
        this.AllPendingProperty();
        break;
      case 'CP':
        this.AllConfirmProperty();
        break;
      case 'RP':
        this.AllRejectProperty();
        break;
      case 'Rent':
        this.AllRentProperty();
        break;
      case 'Sell':
        this.AllSellProperty();
        break;
      case 'PG':
        this.AllPGProperty();
        break;
    
      default:
        break;
    }
    
  }
  loadDefaultPropImages(){
    this.adminServices.GetDefaultPropertyImg().subscribe((data:any)=>{
      this.DefaultPropImages=data.url;
    })
  }
  AddCity() { 
    if (this.registerCity.valid) {
      this.city = Object.assign({}, this.registerCity.value);
      if (this.Id == null) {
        this.city.id = 0;
        this.cityServices.postdata(this.city).subscribe(() => {
          this.toastr.success('City Added! Data Saved');
          this.registerCity.reset();
          this.createRegisterSession();
          this.loadCity();
        }, error => {
          console.log(error)
          
            this.toastr.error('Saving City Failed! Problem in saving Data', error.error.message); 
         
        });
      } else {
        this.cityServices.updateCity(this.Id, this.city).subscribe(() => {
          this.toastr.success('City Updated! Data Saved');
          this.registerCity.reset();
          this.createRegisterSession(); 
          this.loadCity();
          this.Id = null;
        }, error => {
          this.toastr.error('Update Class Failed!', 'Problem in saving Data', error.error.message);
         
        }); 
      }

    }
  }
  AddLocality(){
    if (this.registerLocality.valid) {
      this.locality = Object.assign({}, this.registerLocality.value);
      if (this.Id == null) {
        this.locality.id = 0;
        this.cityServices.postLocality(this.locality).subscribe(() => {
          this.cityServices.postLocalityOnSearchData(this.locality.localityName).subscribe(() => {
          
          })
          this.toastr.success('Locality Added!', 'Data Saved');
          this.registerLocality.controls['localityName'].setValue(null);
          this.postservices.allLocality(this.locality.cityId).subscribe((data: Locality) => {
            this.locality = data;
            this.loadlocality();
          }) 
        }, error => {
          this.toastr.error('Update Class Failed!', 'Problem in saving Data', error.error.message);
        });
      }
      else {
        this.cityServices.updateLocality(this.Id, this.locality).subscribe(() => {
          
          this.toastr.success('Locality Updated! Data Saved');
          this.registerLocality.controls['localityName'].setValue(null); 
          this.Id = null;
          this.loadlocality();
        }, error => {
            this.toastr.error('Update Class Failed! Problem in saving Data');

        });
      } 

    }
  }

  AddPocket(){
    if (this.registerPocket.valid) {
      this.pocket = Object.assign({}, this.registerPocket.value);
      if (this.Id == null) {
        this.pocket.id = 0;
        this.cityServices.postPocket(this.pocket).subscribe(() => {
          this.toastr.success('Pocket Added!', 'Data Saved');
          this.registerPocket.controls['PocketAddress'].setValue(null);
         this.loadPocket();
        }, error => {
          this.toastr.error('Update Class Failed!', 'Problem in saving Data', error.error.message);
        });
      }
      else {
        this.cityServices.updatePocket(this.Id, this.pocket).subscribe(() => {
          this.toastr.success('Pocket Updated! Data Saved');
          this.registerPocket.controls['PocketAddress'].setValue(null);
          this.Id = null;
          this.loadPocket();
        }, error => {
          this.toastr.error('Update Pocket Failed! Problem in saving Data');
        });
      }

    }
  }
  EditPocket(item:Pocket){
    this.cityServices.pocketEditById(item.id).subscribe((data: Pocket) => {
      this.pocket = data;  
      this.registerPocket.controls['PocketAddress'].setValue(this.pocket.pocketAddress);
      this.Id = this.pocket.id;
    })
  }
  DeletePocket(item:Pocket){
    var isConfirm = confirm("Are You Sure!");
    if (isConfirm == true) {
      this.cityServices.DelPocket(item.id).subscribe(() => {
        this.toastr.success("Pocket Deleted Successfully");
        this.Id = null
       this.loadPocket();
      })
    } else {
      this.Id = null;
    }
  }

  Edit(item: City) {
    this.cityServices.cityById(item.id).subscribe((data:City) => {
      this.city=data; 
      this.registerCity.controls['CitynName'].setValue(this.city.citynName);
      this.Id = this.city.id;
    })
  }

  EditLocality(item: Locality) {
    this.cityServices.localityById(item.id).subscribe((data: Locality) => {
      this.locality = data;
      this.registerLocality.controls['localityName'].setValue(this.locality.localityName);
      this.Id = this.locality.id;

    })
  }
  DeleteCity(item: City) {
    var isConfirm = confirm("Are You Sure!");
    if (isConfirm == true) {
      this.cityServices.DelCity(item.id).subscribe(() => {
        this.toastr.success("City Deleted Successfully");
        this.loadCity();
        this.Id = null
      })
    } else {
      this.Id = null;
    }

  }
  DeleteLocality(item: Locality) {
    var isConfirm = confirm("Are You Sure!");
    if (isConfirm == true) {
      this.cityServices.DelLocality(item.id).subscribe(() => {
        this.toastr.success("Locality Deleted Successfully");
        this.Id = null
        this.loadlocality();
      })
    } else {
      this.Id = null;
    }

  }
  //Mange Addresses
   
  loadCity(){
    this.postservices.allCity().subscribe((data:City[])=>{
      this.citys=data;
    })
  }
  loadlocality() {
    this.postservices.allLocality(this.cityId).subscribe((data: Locality) => {
      this.locality = data; 
    })
  }
  GetLocality($event) { 
    this.registerLocality.controls['localityName'].setValue(null); 
    this.cityId=$event.target.value;
    
   this.citys.forEach(element => {
     if(element.id==this.cityId){
       this.cityId=element.id; 
     }
   });
    this.postservices.allLocality(this.cityId).subscribe((data: Locality) => {
      this.locality = data;
      this.show=true;
      this.registerLocality.get('cityId').setValue(this.cityId);
    })
  }

  GetSector($event){ 
    this.localityId = $event.target.value;
    this.cityServices.localityById(this.localityId).subscribe((data)=>{ 
      this.localityName=data.localityName;
    })
    this.cityServices.sectorById(this.localityId).subscribe((data: Sector[]) => {
      this.sectors= data; 
      this.registerSector.get('localityId').setValue(this.localityId);
    })
  }
  GetPocket($event){
    this.sectorId = $event.target.value;
    this.cityServices.pocketById(this.sectorId).subscribe((data: Pocket[]) => {
      this.pockets = data; 
      this.registerPocket.get('sectorId').setValue(this.sectorId);
    })
  }
  EditSector(item: Sector) {
    this.cityServices.sectorEditById(item.id).subscribe((data: Sector) => {
      this.sector = data; 
      this.registerSector.controls['sectorName'].setValue(this.sector.sectorName);
      this.Id = this.sector.id; 

    })
  }
  loadSector(){
    this.cityServices.sectorById(this.sector.localityId).subscribe((data: Sector[]) => {
      this.sectors = data; 
    })
  }
  loadPocket() {
    this.cityServices.pocketById(this.pocket.sectorId).subscribe((data: Pocket[]) => {
      this.pockets = data; 
    })
  }
  AddSector() {
    if (this.registerSector.valid) {
      this.sector = Object.assign({}, this.registerSector.value);
      if (this.Id == null) {
        this.sector.id = 0;
        this.cityServices.postSector(this.sector).subscribe(() => {
          this.cityServices.postSectorForSuggetion(this.localityName,this.sector.sectorName).subscribe(() => {
          
          })
          this.toastr.success('Sector Added!', 'Data Saved');
          this.registerSector.controls['sectorName'].setValue(null);
         this.loadSector();
        }, error => {
          this.toastr.error('Saving Sector Failed! Problem in saving Data');
        });
      }
      else {
        this.cityServices.updateSector(this.Id, this.sector).subscribe(() => {
          this.toastr.success('Sector Updated! Data Saved');
          this.registerSector.controls['sectorName'].setValue(null);
          this.Id = null; 
          this.loadSector();
        }, error => {
          this.toastr.error('Update sector Failed! Problem in Updating Data');

        });
      }

    }
  }
  DeleteSector(item: Sector) {
    var isConfirm = confirm("Are You Sure!");
    if (isConfirm == true) {
      this.cityServices.DelSector(item.id).subscribe(() => {
        this.toastr.success("Sector Deleted Successfully");
        this.Id = null
       this.loadSector();
      })
    } else {
      this.Id = null;
    }

  }
  createRegisterSession() {
    this.registerCity = this.fb.group({
      CitynName: ['', Validators.required]
    })
  } 
  createRegisterLocality() {
    this.registerLocality = this.fb.group({
      localityName: ['', Validators.required],
      cityId: [this.cityId, Validators.required]
    })
  } 
  createRegisterSector() {
    this.registerSector = this.fb.group({
      sectorName: ['', Validators.required],
      localityId: [this.localityId, Validators.required]
    })
  } 
  createRegisterPocket() {
    this.registerPocket = this.fb.group({
      PocketAddress: ['', Validators.required],
      sectorId: [this.sectorId, Validators.required]
    })
  } 
  createManageFields() {
    this.registerFields = this.fb.group({
      IsPropertyType: ['', Validators.required],
      IsBhk: ['', Validators.required],
      AgeOfProperty: ['', Validators.required],
      MaintainCharge: ['', Validators.required],
      BathRoom: ['', Validators.required],
      Balcony: ['', Validators.required],
      FurnishType: ['', Validators.required],
      CoverParking: ['', Validators.required],
      OpenParking: ['', Validators.required],
      TenantType: ['', Validators.required],
      AvailableFrom: ['', Validators.required],
      MonthlyRent: ['', Validators.required],
      SecurityDeposite: ['', Validators.required],
      brokerage: ['', Validators.required],
      buildArea: ['', Validators.required],
      TransactionType: ['', Validators.required],
      ConstructionStatus: ['', Validators.required],


      PGName: ['', Validators.required],
      TotalBed: ['', Validators.required],
      PGFor: ['', Validators.required],
      SuitedFor: ['', Validators.required],
      MealAvalable: ['', Validators.required],
      CarpetArea: [true],
      RoomType: ['', Validators.required],
      BedInRoom: ['', Validators.required],
      PgRent: ['', Validators.required],
      SecurityType: [true],
      FacilitiesOffered: ['', Validators.required],
      CommonAreas: ['', Validators.required],
      PropertyManagedBy: ['', Validators.required],
      NonVegAllowed: ['', Validators.required],
      OppositeSexAllowed: ['', Validators.required],
      AnyTimeAllowed: ['', Validators.required],
      VisitorsAllowed: ['', Validators.required],
      GuardianAllowed: ['', Validators.required],
      DrinkingAllowed: ['', Validators.required],
      SmokingAllowed: ['', Validators.required] 
    })
  } 
  createAdminManageFields() {
    this.registerAdminFields = this.fb.group({
      IsManageAddress: ['', Validators.required],
      IsManageFeild: ['', Validators.required],
      IsSetPropImg: ['', Validators.required]
    })
  }

  Decline(id) {
    this.postservices.decline(id).subscribe((data) => {
      this.toastr.error("Opps! Detail Decline");
      this.load();
      this.modalDismiss();
      this.TotalProperty();
      this.TotalPendingProperty();
      this.TotalConfirmProperty();
      this.TotalRejectProperty();
      this.imgLoaded = false;
    })
  }

//AllProperty
  AllProperty() {
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.PropertyToLoad='TP';
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllProperty(this.currentPage, this.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        if (this.Alldetais.all.length == 0) {
          this.isData = true;
          this.dataLoader = false;
        } else {
          this.isData = false;
          this.dataLoader = false;
        }
       // this.whichPropLoaded = 'AllRent';
      })
  }
  AllPendingProperty() {
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.PropertyToLoad = 'PP';
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllPendingProperty(this.currentPage, this.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        if (this.Alldetais.all.length == 0) {
          this.isData = true;
          this.dataLoader = false;
        } else {
          this.isData = false;
          this.dataLoader = false;
        }
        // this.whichPropLoaded = 'AllRent';
      })
  }
  AllConfirmProperty() {
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.PropertyToLoad = 'CP';
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllConfirmProperty(this.currentPage, this.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        if (this.Alldetais.all.length == 0) {
          this.isData = true;
          this.dataLoader = false;
        } else {
          this.isData = false;
          this.dataLoader = false;
        }
        // this.whichPropLoaded = 'AllRent';
      })
  }
  AllRejectProperty() {
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.PropertyToLoad = 'RP';
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllRejectProperty(this.currentPage, this.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        if (this.Alldetais.all.length == 0) {
          this.isData = true;
          this.dataLoader = false;
        } else {
          this.isData = false;
          this.dataLoader = false;
        }
        // this.whichPropLoaded = 'AllRent';
      })
  }



  // Rent
  AllRentProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true; 
    this.whichPropLoaded = '';
    this.adminServices.AllRentProperty(this.currentPage, this.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<All>) => { 
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false; 
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllRent';
    })
   }
  AllRentConfirmedProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = ''; 
    this.adminServices.AllRentConfirmProperty(this.currentPage, this.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllRentConfirmed';
    })
  }
  AllRentPendingProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllRentPendingProperty(this.currentPage, this.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllRentPending';
    })
  }
  AllRentRejectProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllRentRejectProperty(this.currentPage, this.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllRentReject';
    })
  }

  // Sell
  AllSellProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = ''; 
    this.adminServices.AllSellProperty(this.currentPage, this.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllSell';
    })
  }
  AllSellConfirmedProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllSellConfirmProperty(this.currentPage, this.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      }else{
        this.isData=false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllSellConfirmed';
    })
  }
  AllSellPendingProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllSellPendingProperty(this.currentPage, this.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllSellPending';
    })
  }
  AllSellRejectProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllSellRejectProperty(this.currentPage, this.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      if (this.Alldetais.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllSellReject';
    })
  }

  // PG
  AllPGProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllPGProperty().subscribe((data: All) => {
      this.Alldetais = data;
      if (data.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllPG';
    })
  }
  AllPGConfirmedProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllPGConfirmProperty().subscribe((data: All) => {
      this.Alldetais = data;
      if (data.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllPGConfirmed';
    })
  }
  AllPGPendingProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllPGPendingProperty().subscribe((data: All) => {
      this.Alldetais = data;
      if (data.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllPGPending';
    })
  }
  AllPGRejectProperty() {
    this.activeEdit=false;
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.dataLoader = true;
    this.whichPropLoaded = '';
    this.adminServices.AllPGRejectProperty().subscribe((data: All) => {
      this.Alldetais = data;
      if (data.all.length == 0) {
        this.isData = true;
        this.dataLoader = false;
      } else {
        this.isData = false;
        this.dataLoader = false;
      }
      this.whichPropLoaded = 'AllPGReject';
    })
  }

  loadActiveProperty() {
    this.AdminListActive = false;
    this.OwnerListActive = false;
    this.BrokerListActive = false;
    this.BuilderListActive = false;
    this.isActivePropLoaded = true;
    this.adminmanage.GetCurrentFieldStatus().subscribe((data: PropertyConfig) => {
      this.propertyConfig = data;
      this.registerFields.get('IsPropertyType').setValue(this.propertyConfig.isPropertyType);
      this.registerFields.get('IsBhk').setValue(this.propertyConfig.isBhk);
      this.registerFields.get('AgeOfProperty').setValue(this.propertyConfig.ageOfProperty);
      this.registerFields.get('MaintainCharge').setValue(this.propertyConfig.maintainCharge);
      this.registerFields.get('BathRoom').setValue(this.propertyConfig.bathRoom);
      this.registerFields.get('Balcony').setValue(this.propertyConfig.balcony);
      this.registerFields.get('FurnishType').setValue(this.propertyConfig.furnishType);
      this.registerFields.get('CoverParking').setValue(this.propertyConfig.coverParking);
      this.registerFields.get('OpenParking').setValue(this.propertyConfig.openParking);
      this.registerFields.get('TenantType').setValue(this.propertyConfig.tenantType);
      this.registerFields.get('AvailableFrom').setValue(this.propertyConfig.availableFrom);
      this.registerFields.get('MonthlyRent').setValue(this.propertyConfig.monthlyRent);
      this.registerFields.get('SecurityDeposite').setValue(this.propertyConfig.securityDeposite);
      this.registerFields.get('brokerage').setValue(this.propertyConfig.brokerage);
      this.registerFields.get('buildArea').setValue(this.propertyConfig.buildArea);
      this.registerFields.get('TransactionType').setValue(this.propertyConfig.transactionType);
      this.registerFields.get('ConstructionStatus').setValue(this.propertyConfig.constructionStatus);
      this.registerFields.get('PGName').setValue(this.propertyConfig.pGName);
      this.registerFields.get('TotalBed').setValue(this.propertyConfig.totalBed);
      this.registerFields.get('PGFor').setValue(this.propertyConfig.pgFor);
      this.registerFields.get('SuitedFor').setValue(this.propertyConfig.suitedFor);
      this.registerFields.get('MealAvalable').setValue(this.propertyConfig.mealAvalable);
      this.registerFields.get('RoomType').setValue(this.propertyConfig.roomType);
      this.registerFields.get('BedInRoom').setValue(this.propertyConfig.bedInRoom);
      this.registerFields.get('PgRent').setValue(this.propertyConfig.pgRent);
      this.registerFields.get('FacilitiesOffered').setValue(this.propertyConfig.facilitiesOffered);
      this.registerFields.get('CommonAreas').setValue(this.propertyConfig.commonAreas);
      this.registerFields.get('PropertyManagedBy').setValue(this.propertyConfig.propertyManagedBy);
      this.registerFields.get('NonVegAllowed').setValue(this.propertyConfig.nonVegAllowed);
      this.registerFields.get('SmokingAllowed').setValue(this.propertyConfig.smokingAllowed);
      this.registerFields.get('OppositeSexAllowed').setValue(this.propertyConfig.oppositeSexAllowed);
      this.registerFields.get('AnyTimeAllowed').setValue(this.propertyConfig.anyTimeAllowed);
      this.registerFields.get('VisitorsAllowed').setValue(this.propertyConfig.visitorsAllowed);
      this.registerFields.get('GuardianAllowed').setValue(this.propertyConfig.guardianAllowed);
      this.registerFields.get('DrinkingAllowed').setValue(this.propertyConfig.drinkingAllowed);
    })
  }
 
 
  // Toggle Fields
  PropTypeCheck() {
    this.propertyConfig.isPropertyType = !this.propertyConfig.isPropertyType;
    this.registerFields.get('IsPropertyType').setValue(this.propertyConfig.isPropertyType);
  }
  BHKCheck() {
    this.propertyConfig.isBhk = !this.propertyConfig.isBhk;
    this.registerFields.get('IsBhk').setValue(this.propertyConfig.isBhk);
  }
  AgeofPropCheck() { 
    this.propertyConfig.ageOfProperty = !this.propertyConfig.ageOfProperty;
    this.registerFields.get('AgeOfProperty').setValue(this.propertyConfig.ageOfProperty);
  }
  MaintainChargeCheck(){
    this.propertyConfig.maintainCharge = !this.propertyConfig.maintainCharge;
    this.registerFields.get('MaintainCharge').setValue(this.propertyConfig.maintainCharge);
  }
  BathRoomCheck(){
    this.propertyConfig.bathRoom= !this.propertyConfig.bathRoom;
    this.registerFields.get('BathRoom').setValue(this.propertyConfig.bathRoom);
  }
  BalconyCheck(){
    this.propertyConfig.balcony = !this.propertyConfig.balcony;
    this.registerFields.get('Balcony').setValue(this.propertyConfig.balcony);
  }
  FurnishTypeCheck(){
    this.propertyConfig.furnishType = !this.propertyConfig.furnishType;
    this.registerFields.get('FurnishType').setValue(this.propertyConfig.furnishType);
  }
  CoverParkingCheck(){
    this.propertyConfig.coverParking = !this.propertyConfig.coverParking;
    this.registerFields.get('CoverParking').setValue(this.propertyConfig.coverParking);
  }
  OpenParkingCheck(){
    this.propertyConfig.openParking = !this.propertyConfig.openParking;
    this.registerFields.get('OpenParking').setValue(this.propertyConfig.openParking);
  }
  TenantTypeCheck(){
    this.propertyConfig.tenantType = !this.propertyConfig.tenantType;
    this.registerFields.get('TenantType').setValue(this.propertyConfig.tenantType);
  }
  AvailableFromCheck(){
    this.propertyConfig.availableFrom = !this.propertyConfig.availableFrom;
    this.registerFields.get('AvailableFrom').setValue(this.propertyConfig.availableFrom);
  }
  MonthlyRentCheck(){
    this.propertyConfig.monthlyRent = !this.propertyConfig.monthlyRent;
    this.registerFields.get('MonthlyRent').setValue(this.propertyConfig.monthlyRent);
  }
  SecurityDepositeCheck(){
    this.propertyConfig.securityDeposite = !this.propertyConfig.securityDeposite;
    this.registerFields.get('SecurityDeposite').setValue(this.propertyConfig.securityDeposite);
  }
  brokerage(){
    this.propertyConfig.brokerage = !this.propertyConfig.brokerage;
    this.registerFields.get('brokerage').setValue(this.propertyConfig.brokerage);
  }
  buildAreaCheck(){
    this.propertyConfig.buildArea = !this.propertyConfig.buildArea;
    this.registerFields.get('buildArea').setValue(this.propertyConfig.buildArea);
  }

  TransactionTypeCheck(){
    this.propertyConfig.transactionType = !this.propertyConfig.transactionType;
    this.registerFields.get('TransactionType').setValue(this.propertyConfig.transactionType);
  }
  ConstructionStatusCheck(){
    this.propertyConfig.constructionStatus = !this.propertyConfig.constructionStatus;
    this.registerFields.get('ConstructionStatus').setValue(this.propertyConfig.constructionStatus);
  }
  PGNameCheck(){
    this.propertyConfig.pGName = !this.propertyConfig.pGName;
    this.registerFields.get('PGName').setValue(this.propertyConfig.pGName);
  }
  TotalBedCheck(){
    this.propertyConfig.totalBed = !this.propertyConfig.totalBed;
    this.registerFields.get('TotalBed').setValue(this.propertyConfig.totalBed);
  }
  PGForCheck(){
    this.propertyConfig.pgFor = !this.propertyConfig.pgFor;
    this.registerFields.get('PGFor').setValue(this.propertyConfig.pgFor);
  }
  SuitedForCheck(){
    this.propertyConfig.suitedFor = !this.propertyConfig.suitedFor;
    this.registerFields.get('SuitedFor').setValue(this.propertyConfig.suitedFor);
  }
  MealAvalableCheck(){
    this.propertyConfig.mealAvalable = !this.propertyConfig.mealAvalable;
    this.registerFields.get('MealAvalable').setValue(this.propertyConfig.mealAvalable);
  }
  RoomTypeCheck(){
    this.propertyConfig.roomType = !this.propertyConfig.roomType;
    this.registerFields.get('RoomType').setValue(this.propertyConfig.roomType);
  }
  BedInRoomCheck(){
    this.propertyConfig.bedInRoom = !this.propertyConfig.bedInRoom;
    this.registerFields.get('BedInRoom').setValue(this.propertyConfig.bedInRoom);
  }
  PgRentCheck(){
    this.propertyConfig.pgRent = !this.propertyConfig.pgRent;
    this.registerFields.get('PgRent').setValue(this.propertyConfig.pgRent);
  }
  FacilitiesOfferedCheck(){
    this.propertyConfig.facilitiesOffered = !this.propertyConfig.facilitiesOffered;
    this.registerFields.get('FacilitiesOffered').setValue(this.propertyConfig.facilitiesOffered);
  }
  CommonAreasCheck(){
    this.propertyConfig.commonAreas = !this.propertyConfig.commonAreas;
    this.registerFields.get('CommonAreas').setValue(this.propertyConfig.commonAreas);
  }
  PropertyManagedByCheck(){
    this.propertyConfig.propertyManagedBy = !this.propertyConfig.propertyManagedBy;
    this.registerFields.get('PropertyManagedBy').setValue(this.propertyConfig.propertyManagedBy);
  }
  NonVegAllowedCheck(){
    this.propertyConfig.nonVegAllowed = !this.propertyConfig.nonVegAllowed;
    this.registerFields.get('NonVegAllowed').setValue(this.propertyConfig.nonVegAllowed);
  }
  OppositeSexAllowedCheck(){
    this.propertyConfig.oppositeSexAllowed = !this.propertyConfig.oppositeSexAllowed;
    this.registerFields.get('OppositeSexAllowed').setValue(this.propertyConfig.oppositeSexAllowed);
  }
  AnyTimeAllowedCheck(){
    this.propertyConfig.anyTimeAllowed = !this.propertyConfig.anyTimeAllowed;
    this.registerFields.get('AnyTimeAllowed').setValue(this.propertyConfig.anyTimeAllowed);
  }
  VisitorsAllowedCheck(){
    this.propertyConfig.visitorsAllowed = !this.propertyConfig.visitorsAllowed;
    this.registerFields.get('VisitorsAllowed').setValue(this.propertyConfig.visitorsAllowed);
  }
  GuardianAllowedCheck(){
    this.propertyConfig.guardianAllowed = !this.propertyConfig.guardianAllowed;
    this.registerFields.get('GuardianAllowed').setValue(this.propertyConfig.guardianAllowed);
  }
  DrinkingAllowedCheck(){
    this.propertyConfig.drinkingAllowed = !this.propertyConfig.drinkingAllowed;
    this.registerFields.get('DrinkingAllowed').setValue(this.propertyConfig.drinkingAllowed);
  }
  SmokingAllowedCheck(){
    this.propertyConfig.smokingAllowed = !this.propertyConfig.smokingAllowed;
    this.registerFields.get('SmokingAllowed').setValue(this.propertyConfig.smokingAllowed);
  }
}
