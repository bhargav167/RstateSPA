import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { AdminManageFieldsService } from '../Services/AdminManageFields.service';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { HomeService } from '../Services/Home/home.service';
import { PostService } from '../Services/Post.service';
import { All } from '../Shared/Model/All';
import { PaginatedResult, Pagination } from '../Shared/Model/Pagination';
import { PropertyConfig } from '../Shared/Model/PropertyConfiguration/PropertyConfig';
import { EmailBody } from '../Shared/Model/UserContact/EmailBody';
import { IUserContact } from '../Shared/Model/UserContact/IUserContact';
import Swal from 'sweetalert2'; 
import { EmailSenderService } from '../Services/EmailServices/emailSender.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../Services/Admin.service';
import { LoginOtpService } from '../Services/AuthServices/LoginOtp.service';
import { Options,LabelType } from 'ng5-slider';

@Component({
  selector: 'app-SearchResult',
  templateUrl: './SearchResult.component.html',
  styleUrls: ['./SearchResult.component.scss']
})
export class SearchResultComponent implements OnInit {
  propTypeSearching:string[]=[];
  bhkTypeSearching:string[]=[];
  propTypeSearchingstr:string='Property Type';
  SlideOptions = { items: 1, dots: false, nav: true,
    
  };
  CarouselOptions = {
    items: 3, dots: false,  
    mouseDrag: true, pullDrag: true
  }; 
  minValue: number = 0;
  maxValue: number = 1;
  min: number = 0;
  max: number = 1;
  // options: Options = {
  //   floor: 0,
  //   ceil: 4,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         return "₹" + value+'Cr';
  //       case LabelType.High:
  //         return "₹" + value+'Cr';
  //       default:
  //         return "₹" + value+'Cr';
  //     }
  //   }
  // };
  options: Options = {
    floor: 0,
    ceil: 4,  
        translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "₹" + value+'Cr';
        case LabelType.High:
          return "₹" + value+'Cr';
        default:
          return "₹" + value+'Cr';
      }
    },
    getPointerColor: (value: number): string => {
      if (value <= 3) {
        return 'tomato';
      }
      
      if (value >= 5) {
        return 'tomato';
      }
      return 'tomato';
    }
  };
  public btnLoader: boolean;
  public btnLoader1: boolean;
  public btnLoader2: boolean;
 
  pagination: Pagination;
  propertyConfig: PropertyConfig;
  userParams: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 8;
  Alldetais: All;
  detais: All;
  images = [];
  amenties: string[] = [];
  IshomeLoading: boolean;
  imgLoaded: boolean = false;
  amentiesloded: boolean = false;
  searchlocation: string;
  propType: string;
  SellerContact: FormGroup;
  isDetailLoading: boolean = true;
  email: string;
  names;
  otpValue:number;
  EmailContact: FormGroup;
  userContact: IUserContact;
  htmlBody:string;
  ownerRole: string;
  ownerimageUrl: string;
  hideemail: string;
  hideuserPhone: string;
  hideuseraddress: string;
  userPhone: string;
  isShow = 'block';
  thumb = '';
  mailBody: EmailBody;
  userId: string;
  uniqueId: number;
  propIds: number;
  propImgUrl: string;
  EmailpropType: string;
  DefaultPropImages: string;
  SecurityAmenities = new Array();
  phoneNo:string;
  AmentiesList: any = {
    CCTV: false,
    GatedCommunity: false,
    Security: false,
    Microwave: false,
    WaterPurifier: false,
    TTTable: false,
    Fridge: false,
    WashingMachine: false,
    TV: false,
    CoffeeMachine: false,
    SnacksMachine: false,
    Laundry: false,
    Housekeeping: false,
    Internet: false,
    Gym: false,
    Lift: false,
    RegularWaterSupply: false,
    SwimmingPool: false,
    ReservedParking: false,
    PowerBackup: false,
    Biometric: false
  };

  apartmentActive:boolean=false;
  independentHouseActive:boolean=false;
  independentFloorActive:boolean=false;
  plotActive:boolean=false;
  villaActive:boolean=false;

   onebhkActive:boolean=false;
   twobhkActive:boolean=false;
   threebhkActive:boolean=false;
   plusActive:boolean=false;

  showProp:boolean=false;
  showBhk:boolean=false;
  showprice:boolean=false;
  showPoss:boolean=false;
  filterlocation:string;
  constructor(private activatedRoute: ActivatedRoute, 
    private adminmanage: AdminManageFieldsService,
    private fb: FormBuilder,
    private adminservices: AdminService,
    private emailServices: EmailSenderService, 
    private userprofileServices: AdminRegisterService,
    private _lightbox: Lightbox,
    private services: PostService,
    private toastr: ToastrService,
    private otpServices: LoginOtpService,
    private homeServices: HomeService) { }
  ngOnInit() {
    this.loadActiveProperty();
    this.createContactForm(); 
    this.loadDefaultPropImages();
    this.createEmailForm();
    this.IshomeLoading=true;
    this.activatedRoute.params.subscribe(params => {
      const location = params['location'];
      const prop = params['propType'];
      this.LoadByAddress(location,prop);
    })
  }

  PropToggle() {
    this.showBhk=false;
    this.showprice=false;
    this.showPoss=false;
    this.showProp = !this.showProp;
  }
  BhkToggle() {
    this.showProp=false;
    this.showprice=false;
    this.showPoss=false;
    this.showBhk = !this.showBhk;
  }
  priceToggle(){
    this.showProp=false;
    this.showBhk = false;
    this.showPoss=false;
    this.showprice= !this.showprice;
  }
  PossToggle(){
    this.showProp=false;
    this.showBhk = false;
    this.showprice= false;
    this.showPoss=!this.showPoss;
  }
  Reset(){
    this.showProp=false;
    this.showBhk = false;
    this.showprice= false;
    this.showPoss=false;
    this.apartmentActive=false;
    this.independentFloorActive=false;
    this.independentHouseActive=false;
    this.villaActive=false;
    this.plotActive=false;
    this.onebhkActive=false;
    this.twobhkActive=false;
    this.threebhkActive=false;
    this.plusActive=false;
    this.LoadByAddress(this.searchlocation,this.propType);
  }
  LoadByAddress(value:string,prop:string){
    this.searchlocation=value;
    this.propType=prop;
    this.homeServices.AllPropertyByAddress(value,this.propType, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      this.IshomeLoading=false; 
      this.filterlocation=this.Alldetais.all[0].locationId.locality;
    })
  }
  loadActiveProperty() {
    this.adminmanage.GetCurrentFieldStatus().subscribe((data: PropertyConfig) => {
      this.propertyConfig = data;
    })
  }
  loadByNoOfTypes(){
    if(this.propTypeSearching.length==0){ 
      this.Reset();
    }
    if(this.propTypeSearching.length==1){
      let type=this.propTypeSearching.toString().split(",");
      this.IshomeLoading = true;
      this.homeServices.AllPropertyByType(type[0],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.propTypeSearching.length==2){
      let type=this.propTypeSearching;
      this.homeServices.AllPropertyByType2(type[0],type[1],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.propTypeSearching.length==3){
      let type=this.propTypeSearching;
      this.homeServices.AllPropertyByType3(type[0],type[1],type[3],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.propTypeSearching.length==4){
      let type=this.propTypeSearching;
      this.homeServices.AllPropertyByType4(type[0],type[1],type[3],type[4],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.propTypeSearching.length==5){
      let type=this.propTypeSearching;
      this.homeServices.AllPropertyByType5(type[0],type[1],type[3],type[4],type[5],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
  } 
  loadByNoOfBhk(){
    if(this.bhkTypeSearching.length==0){ 
      this.Reset();
    }
    if(this.bhkTypeSearching.length==1){
      let type=this.bhkTypeSearching.toString().split(",");
      this.IshomeLoading = true;
      this.homeServices.AllPropertyByBHK(type[0],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.bhkTypeSearching.length==2){
      let type=this.bhkTypeSearching;
      this.homeServices.AllPropertyByBHK2(type[0],type[1],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.bhkTypeSearching.length==3){
      let type=this.bhkTypeSearching;
      this.homeServices.AllPropertyByBHK3(type[0],type[1],type[3],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.bhkTypeSearching.length==4){
      let type=this.bhkTypeSearching;
      this.homeServices.AllPropertyByBHKplus(type[0],type[1],type[3],type[4],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
    if(this.bhkTypeSearching.length==5){
      let type=this.bhkTypeSearching;
      this.homeServices.AllPropertyByType5(type[0],type[1],type[3],type[4],type[5],this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
        this.Alldetais = res.result;
        this.pagination = res.pagination;
        this.IshomeLoading = false;
      }) 
    }
  } 
  // Filter by property type
  LoadByApartment(type) { 
   
    switch (type) {
      case 'Apartment':
        this.apartmentActive = !this.apartmentActive;
        if (this.apartmentActive == true) { 
          this.propTypeSearching.push('Apartment');
          this.propTypeSearchingstr=this.propTypeSearching.toString();
          this.loadByNoOfTypes();
        }
        if (this.apartmentActive == false) {
          var i = this.propTypeSearching.indexOf('Apartment');
          this.propTypeSearching.splice(i, 1); 
          if(this.propTypeSearching.length==0){
            this.propTypeSearchingstr='Property Type';
          }else{
            this.propTypeSearchingstr=this.propTypeSearching.toString();
           
          }
          this.loadByNoOfTypes();
        }
        break;

      case 'Independent House':
        this.independentHouseActive = !this.independentHouseActive;
        if (this.independentHouseActive == true) {
          this.propTypeSearching.push('Independent House');
          this.propTypeSearchingstr=this.propTypeSearching.toString();
          this.loadByNoOfTypes();
        }
        if (this.independentHouseActive == false) {
          var i = this.propTypeSearching.indexOf('Independent House');
          this.propTypeSearching.splice(i, 1);
          if(this.propTypeSearching.length==0){
            this.propTypeSearchingstr='Property Type';
          }else{
            this.propTypeSearchingstr=this.propTypeSearching.toString();
           
          }
          
          this.loadByNoOfTypes();
        }
        break;

      case 'Independent Floor':
        this.independentFloorActive = !this.independentFloorActive;
        if (this.independentFloorActive == true) {
          this.propTypeSearching.push('Independent Floor');
          this.loadByNoOfTypes();
          this.propTypeSearchingstr=this.propTypeSearching.toString();
        }
        if (this.independentFloorActive == false) {
          var i = this.propTypeSearching.indexOf('Independent Floor');
          this.propTypeSearching.splice(i, 1);
          if(this.propTypeSearching.length==0){
            this.propTypeSearchingstr='Property Type';
          }else{
            this.propTypeSearchingstr=this.propTypeSearching.toString();
           
          }
          this.loadByNoOfTypes();
        }
        break;

      case 'Plot':
        this.plotActive = !this.plotActive;
        if (this.plotActive == true) {
          this.propTypeSearching.push('Plot');
          this.propTypeSearchingstr=this.propTypeSearching.toString();
          this.loadByNoOfTypes();
        }
        if (this.plotActive == false) {
          var i = this.propTypeSearching.indexOf('Plot');
          this.propTypeSearching.splice(i, 1);
          if(this.propTypeSearching.length==0){
            this.propTypeSearchingstr='Property Type';
          }else{
            this.propTypeSearchingstr=this.propTypeSearching.toString(); 
          }
          this.loadByNoOfTypes();
        }
        break;

      case 'Villa':
        this.villaActive = !this.villaActive;
        if (this.villaActive == true) {
          this.propTypeSearching.push('Villa');
          this.propTypeSearchingstr=this.propTypeSearching.toString();
          this.loadByNoOfTypes();
        }
        if (this.villaActive == false) {
          var i = this.propTypeSearching.indexOf('Villa');
          this.propTypeSearching.splice(i, 1);
          if(this.propTypeSearching.length==0){
            this.propTypeSearchingstr='Property Type';
          }else{
            this.propTypeSearchingstr=this.propTypeSearching.toString();
           
          }
          this.loadByNoOfTypes();
        }
        break;
      default:
        break;
    } 
  }
  LoadByBhk(type) { 
    switch (type) {
      case '1 Bhk': 
        this.onebhkActive=!this.onebhkActive;
        if(this.onebhkActive==true){
          this.bhkTypeSearching.push(type);
          this.loadByNoOfBhk();
        }
        if(this.onebhkActive==false){
          var i = this.bhkTypeSearching.indexOf(type);
          this.bhkTypeSearching.splice(i, 1);
          this.loadByNoOfBhk();
        }
        break;
 
        case '2 Bhk':
        this.twobhkActive=!this.twobhkActive;
        if(this.twobhkActive==true){
          this.bhkTypeSearching.push(type);
          this.loadByNoOfBhk();
        }
        if(this.twobhkActive==false){
          var i = this.bhkTypeSearching.indexOf(type);
          this.bhkTypeSearching.splice(i, 1);
          this.loadByNoOfBhk();
        }
        break;
 
        case '3 Bhk':
        this.threebhkActive=!this.threebhkActive;
        if(this.threebhkActive==true){
          this.bhkTypeSearching.push(type);
          this.loadByNoOfBhk();
        }
        if(this.threebhkActive==false){
          var i = this.bhkTypeSearching.indexOf(type);
          this.bhkTypeSearching.splice(i, 1);
          this.loadByNoOfBhk();
        }
        break;
 
        case '3+ Bhk':
        this.plusActive=!this.plusActive;
        type='4 Bhk';
        if(this.plusActive==true){
          this.bhkTypeSearching.push(type);
          this.loadByNoOfBhk();
        }
        if(this.plusActive==false){
          var i = this.bhkTypeSearching.indexOf(type);
          this.bhkTypeSearching.splice(i, 1);
          this.loadByNoOfBhk();
        }
        break; 
      default:
        break;
    }
   }
   LoadByPrice(){ 
     switch (this.minValue) {
       case 1:
         this.min = 10000000;
         break;
       case 2:
         this.min= 20000000;
         break;
       case 3:
         this.min = 30000000;
         break;
       case 4:
         this.min = 40000000;
         break;
       case 5:
         this.min = 50000000;
         break;
       case 6:
         this.min = 60000000;
         break;
       case 7:
         this.min = 70000000;
         break;
       case 8:
         this.min = 80000000;
         break;
       case 9:
         this.min = 90000000;
         break;
       case 10:
         this.min = 100000000;
         break;
         case 0:
          this.min = 0;
          break;
     
       default:
         this.min=0;
         break;
     }
     switch (this.maxValue) {
      case 1:
        this.max = 10000000;
        break;
      case 2:
        this.max = 20000000;
        break;
      case 3:
        this.max = 30000000;
        break;
      case 4:
        this.max = 40000000;
        break;
      case 5:
        this.max = 50000000;
        break;
       case 6:
         this.max = 60000000;
         break;
       case 7:
         this.max = 70000000;
         break;
       case 8:
         this.max = 80000000;
         break;
       case 9:
         this.max = 90000000;
         break;
       case 10:
         this.max = 100000000;
         break;
       case 0:
         this.max = 0;
         break;
    
      default:
        this.max=0;
        break;
    }
    this.IshomeLoading = true;
    console.log(this.min,this.max)
    this.homeServices.AllPropertyByPrice(this.min,this.max,this.propType,this.filterlocation, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      this.IshomeLoading = false;
    })
  }

  createEmailForm() {
    this.EmailContact = this.fb.group({
      useremail: ['', Validators.required],
      owneremail: ['', Validators.required],
      mailBody: ['', Validators.required]
    })
  } 
  loadDefaultPropImages() {
    this.adminservices.GetDefaultPropertyImg().subscribe((data: any) => {
      this.DefaultPropImages = data.url;
    })
  }
  // Phone Validation
PhoneNoValidation($event){
  let phoneNo=$event.target.value;
  this.phoneNo=phoneNo;
  if(isNaN(phoneNo)){
     this.toastr.info('Please Enter valid phone Number');
     this.SellerContact.get('phoneNumber').setValue(null);
     return;
  }
}
  pageChanged(event: any): void {
    this.currentPage = event.page;
      this.LoadByAddress(this.searchlocation,this.propType);
  }
  modalDismiss() {
    this.isShow = 'block'; 
    this.imgLoaded=false;  
  }
  GetDetails(i) { 
    this.isDetailLoading=true; 
    this.images = [];
    this.SecurityAmenities=[]; 
    this.ResetAmenties();
    this.isShow = 'none';
    this.thumb = '';
    this.services.ViewDetails(i).subscribe((data: All) => {
      this.detais = data; 
      this.hideuseraddress = this.detais.all[0].locationId.locality.slice(0, 4) + '***********';
     this.SecurityAmenities.push(this.detais.all[0].basicDetailId.securityAmenities.split(','));  
      this.SecurityAmenities[0].forEach(element => {  
        if (element=='CCTV') {
          this.AmentiesList.CCTV = true;
        }
        if (element=="Gated Community") {
          this.AmentiesList.GatedCommunity = true;
        }
        if (element=='Microwave') {
          this.AmentiesList.Microwave = true;
        }
        if (element=='Water Purifier') {
          this.AmentiesList.WaterPurifier = true;
        }
        if (element=='TT Table') {
          this.AmentiesList.TTTable = true;
        }
        if (element=='Fridge') {
          this.AmentiesList.Fridge = true;
        }
        if (element =='Washing Machine') {
          this.AmentiesList.WashingMachine = true;
        }
        if (element =='TV') {
          this.AmentiesList.TV = true;
        }
        if (element =='Coffee Machine') {
          this.AmentiesList.CoffeeMachine = true;
        }
        if (element =='Snacks Machine') {
          this.AmentiesList.SnacksMachine = true;
        }
        if (element =='Laundry') {
          this.AmentiesList.Laundry = true;
        }
        if (element =='Housekeeping') {
          this.AmentiesList.Housekeeping = true;
        }
        if (element =='Internet/Wi-Fi Connectivity') {
          this.AmentiesList.Internet = true;
        }
        if (element =='Reserved Parking') {
          this.AmentiesList.ReservedParking = true;
        }
        if (element =='Gym') {
          this.AmentiesList.Gym = true;
        }
        if (element =='Lift') {
          this.AmentiesList.Lift = true;
        }
        if (element =='Regular Water Supply') {
          this.AmentiesList.RegularWaterSupply = true;
        }
        if (element =='Swimming Pool') {
          this.AmentiesList.SwimmingPool = true;
        }
        if (element =='Power Backup') {
          this.AmentiesList.PowerBackup = true;
        }
        if (element == 'Biometric') {
          this.AmentiesList.Biometric = true;
        }
        if (element == 'Security') {
          this.AmentiesList.Security = true;
        }
        
      });
      this.userId = this.detais.all[0].userId;
      this.uniqueId = this.detais.all[0].uniqueID;
      if (this.detais.imgs.length == 1 && this.detais.imgs[0].url == 'null') {
        this.imgLoaded == false;
        this.isDetailLoading = false;
        this.SellerContact.get('uniqueID').setValue(this.uniqueId);
        this.SellerContact.get('ownerId').setValue(this.userId);
        this.loadPropertyOwnerDetail(this.userId);
        return;
      }
      this.isDetailLoading = false;
      this.detais.imgs.forEach(element => {
        const src = element.url
        this.thumb = element.url
        const album = {
          src: src,
          thumb: this.thumb,
          caption: element.tag,
          cover:element.cover
        };
        if(album.cover==true){
          this.images.push(album);
          this.detais.imgs.forEach(element => {
            const src = element.url
            this.thumb = element.url
            const album = {
              src: src,
              thumb: this.thumb,
              caption: element.tag,
              cover:element.cover
            };
            if(album.cover==false){
              this.images.push(album); 
            } 
          });
        } 
        console.log(this.images);
      });
      this.imgLoaded = true;
      this.userId = this.detais.all[0].userId; 
      this.uniqueId = this.detais.all[0].uniqueID;
      this.propImgUrl= this.detais.imgs[0].url;
    this.EmailpropType=  this.detais.all[0].basicDetailId.propertyType;
      this.SellerContact.get('uniqueID').setValue(this.uniqueId);
      this.SellerContact.get('ownerId').setValue(this.userId);
      this.amentiesloded = true;
      this.loadPropertyOwnerDetail(this.userId);  
    })
  } 
  GetImage(uniqueID:number){
    this.images = [];
  //  this.isShow = 'none';
    this.thumb = '';
    this.services.ViewDetails(uniqueID).subscribe((data: All) => {
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
        this.images.push(album);
        
      });
      this.imgLoaded = true; 
      this.open(0);
    }) 
  }
  PostUserContact(){
    if (this.SellerContact.valid) {
      this.btnLoader = true;
      this.userContact = Object.assign({}, this.SellerContact.value);
      this.otpValue = 0;
    this.otpServices.SendOtp(this.phoneNo).subscribe((data: number) => {
      this.otpValue = data;
      console.log(this.otpValue);
      Swal.fire({
        icon:'info',
        text: "Enter otp to continue",
        confirmButtonText:'Done', 
        input: 'text',
        showCancelButton: true,
        width:'26rem',
        backdrop:'#000000ad',
        confirmButtonColor: '#ff6600',
        denyButtonColor:'#3f4448f0'
      }).then((result) => {
        if (result.value==this.otpValue) {
           Swal.fire({
            title: 'Great',
            html:`<p>Your details is shared to owner <p>
           <p style="color:white" class="badge badge-warning">${this.email}</p>  
            <p style="color:white" class="badge badge-primary">${this.userPhone}</p>
           `,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Done!',
          }).then((result) => {
            this.homeServices.postUserContacts(this.userContact).subscribe((data:IUserContact)=>{
              this.homeServices.Lead(data.uniqueID).subscribe((data1)=>{
                this.propIds=data.uniqueID;
                this.htmlBody = `
                <html lang="en">
                <head>    
                    <meta content="text/html; charset=utf-8"" http-equiv=""Content-Type">
                    <title>
                         
                    </title>
                    <style type="text/css">
                      body{
              background-color: #E4E6EB;
             }
             body::-webkit-scrollbar {
              display: none;
             }
             .main{
              margin-bottom: 50px;
             }
             .card{
              width: 525px;
              height: 250px;
             background: rgb(255,255,255);
             background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,245,248,1) 35%, rgba(236,236,237,1) 100%);
              box-shadow: 0 13px 15px rgba(0, 0, 0, 0.3);
              border-radius: 10px;
              margin-left: 5%;
              margin-top: 30px;
              transition: background-color .5s, box-shadow .5s, margin-left .5s;
             }
             .card:hover{
              margin-left: 8%;
              background-color: #ffff;
              box-shadow: 0 30px 30px rgba(0, 0, 0, 0.3);
              transition: background-color .5s, box-shadow .5s, margin-left .5s;
             }
             .post-image{
              width: 200px;
              height: 220px;
              margin-top: 15px;
              margin-left: 15px;
              border-radius: 10px 10px 10px;
              float: left;
             }
             .post-content{
              width: 55%;
              height: 250px;
              float: left;
              margin-left: 5px;
              overflow: hidden;
             }
             a:link{
              font-size: 28px;
              font-family: 'Roboto', sans-serif;
              color: #3B3C3F;
              text-decoration: none;
             }
             .post-header{
              font-size: 28px;
              font-family: 'Roboto', sans-serif;
              margin-top: 15px;
              color: #3B3C3F;
              margin-left: 10px;
              text-align: center;
             }
             .post-text{
              font-size: 15px;
              padding-left: 20px;
              color: #768CA4;
              font-family: 'Roboto', sans-serif;
              
             }
             .author{
              width: 100%;
              height: 60px;
              background-color: #F2F5F8;
              margin-left: 20px;
              margin-top: 5px;
              border-radius: 10px;
              
             }
             .author-content{
              width: 60%;
              height: 60px;
              margin-left: 10px;
              
              float: left;
             }
             .author-image{
              width: 50px;
              height: 50px;
              border-radius: 100%;
              float: left;
              margin-left: 10px;
              margin-top: 5px;
             }
             .author-name{
              font-size: 20px;
              color: #3B3C3F;
              font-family: 'Roboto', sans-serif;
              font-weight: bold;
              margin-top: 10px;
              padding-left: 10px;
             }
             .date{
              font-size: 13px;
              font-family: 'Roboto', sans-serif;
              margin-top: -15px;
              padding-left: 10px;
             }
                    </style>
                </head>
                <body>
             <div class="main">
                <div class="card">
                <div class="post">
                  <img class="post-image" src="${this.propImgUrl}"/>
                  
                  <div class="post-content">
                    <p class="post-header"> <a href="http://spacing.in/view/${this.propIds}">${this.EmailpropType}</a> </p>
                   
                    <div class="author">
                      <img style="width:50px; height:50px" src="${this.ownerimageUrl}">
                      <div class="author-content">
                        <p class="author-name">${this.names}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>  
             </div>
             </div>
                </body>
             </html>
             `;
            
                this.EmailContact.get('useremail').setValue(this.userContact.email);
                this.EmailContact.get('owneremail').setValue(this.email);
                this.EmailContact.get('mailBody').setValue(this.htmlBody);
        
                this.mailBody = Object.assign({}, this.EmailContact.value); 
                this.SendMail(this.mailBody);
                location.reload();
                this.btnLoader = false;
                if(data==null){
                  Swal.fire({
                    title: this.email,
                    text: 'Your details is already submitted',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Done!',
                  }).then((result) => {
                    location.reload();
                  })
                }else{
                  this.btnLoader = false;
                }
              })
              
            })
           
          })
        }else{
          Swal.fire('Youe Otp is incorrect');
          this.btnLoader = false;
        }
      });
    })
     
     }
  }
  createContactForm() { 
    this.SellerContact = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      uniqueID: [],
      ownerId: ['']
    })
  } 
  ResetAmenties() {
    this.AmentiesList.CCTV = false;
    this.AmentiesList.GatedCommunity = false;
    this.AmentiesList.Security = false;
    this.AmentiesList.Microwave = false;
    this.AmentiesList.WaterPurifier = false;
    this.AmentiesList.TTTable = false;
    this.AmentiesList.Fridge = false;
    this.AmentiesList.WashingMachine = false;
    this.AmentiesList.TV = false;
    this.AmentiesList.CoffeeMachine = false;
    this.AmentiesList.SnacksMachine = false;
    this.AmentiesList.Laundry = false;
    this.AmentiesList.Housekeeping = false;
    this.AmentiesList.Internet = false;
    this.AmentiesList.Gym = false;
    this.AmentiesList.Lift = false;
    this.AmentiesList.RegularWaterSupply = false;
    this.AmentiesList.SwimmingPool = false;
    this.AmentiesList.ReservedParking = false;
    this.AmentiesList.PowerBackup = false;
    this.AmentiesList.Biometric=false;
  }
  open(index: number) {  
    this._lightbox.open(this.images, index, { showImageNumberLabel: true,
      positionFromTop: '80px',
      centerVertically: true});
  }
  loadPropertyOwnerDetail(id) {
    this.email = null;
    this.names = null;
    this.userPhone = null;
    this.ownerimageUrl = null;
    this.hideemail = null;
    this.ownerRole = null;
    this.userprofileServices.GetOwnerDetail(id).subscribe((data: any) => { 
      this.email = data.email;
      this.ownerRole = data.roleId;
      this.names = data.fullName.replace(/\d(?=\d{4})/g, "*");
      this.userPhone = data.phoneNumber;
      this.hideuserPhone = data.phoneNumber.replace(/\d(?=\d{4})/g, "*");
      if (this.email.includes('@')) {
        this.hideemail = this.censorEmail(this.email);
      } else {
        this.email = '';
      }
      this.ownerimageUrl = data.imagUrl;
      if (this.ownerimageUrl == null)
        this.ownerimageUrl = '../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';
    })
  }
  loadPropertyOwnerDetailandProp(id){
    this.services.ViewDetails(id).subscribe((data: All) => {
      this.detais = data; 
      this.userId = this.detais.all[0].userId; 
      this.uniqueId = this.detais.all[0].uniqueID; 
    this.EmailpropType=  this.detais.all[0].basicDetailId.propertyType;
      this.SellerContact.get('uniqueID').setValue(this.uniqueId);
      this.SellerContact.get('ownerId').setValue(this.userId);
     
      this.loadPropertyOwnerDetail(this.userId);  
    })
  }
   Hideemail(str){
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  } 
  censorEmail(email:string) {
  var arr = email.split("@");
    return this.Hideemail(arr[0]) + "@" + this.Hideemail(arr[1]);
} 
SendMail(mail:EmailBody){
  this.emailServices.sendmail(mail).subscribe((data: EmailBody) => {
  })
}
}
