import { Component, OnInit, EventEmitter, Output } from '@angular/core';  
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { PostService } from '../Services/Post.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISave } from '../Shared/Model/ISave'; 
import { Images } from '../Shared/Model/Images';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Options } from 'ng5-slider';
import { CityService } from '../Services/City.service';
import { Sector } from '../Shared/Model/Sector';
import { Pocket } from '../Shared/Model/Pocket';
import { SocialAuthService } from 'angularx-social-login';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from './../../environments/environment';
import * as _ from 'underscore'; 
import { HttpClient } from '@angular/common/http';
 
// const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
//   let start = fg.get('PlotPrice').value;
//   return start >= 100000 && start < 9900000000
//     ? null
//     : { range: true };
// };
  @Component({
  selector: 'app-PostProperties',
  templateUrl: './PostProperties.component.html',
  styleUrls: ['./PostProperties.component.scss']
})

export class PostPropertiesComponent implements OnInit {
  FinalPrice:string;
  rentTypetxt:string='Monthly Rent';
  FinalSaving:boolean=false;
    value: number = 5;
    InWords: string;
    options: Options = {
      floor: 0,
      ceil: 10,
      step: 1,
      showTicks: true,
      showTicksValues: true,
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

    uploader: FileUploader;
    hasBaseDropZoneOver: boolean;
    hasAnotherDropZoneOver: boolean;
    response: string;

    minValue: number = 0;
    maxValue: number = 10;
    Flooroptions: Options = {
      ceil: 300,
      showSelectionBar: true,
      getPointerColor: (value: number): string => {
        if (value <= 3) {
          return 'tomato';
        }

        if (value >= 100) {
          return 'tomato';
        }
        return 'tomato';
      },
      selectionBarGradient: {
        from: 'white',
        to: 'tomato'
      }
    };
    lead:boolean;
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  checkoutForm: FormGroup; 
  progress: string = '0';
  progressText:string='0'; 
  final: any;
  fileData: File = null;
  previewUrl: any = null;
  @Output() public onUploadFinished = new EventEmitter();
   SubmitData:ISave;
  formData = new FormData();

  progress1: string = '0';
  progressText1: string = '0';
    timeallowedNo:boolean=false;
  validationMsg:string='';
  validationMsg1: string = '';
  validationMsg2: string = '';
  validationMsg3: string = '';

  validationFloorNoMsg:string='';
  ActivevalidationFloorNoMsg:boolean=false;

  validationTotalFloorNoMsg: string = '';
  ActivevalidationTotalFloorNoMsg: boolean = false;

  validationTotalFloorNoGreterMsg:string='';
  ActivevalidationTotalFloorNoGreterMsg:boolean = false; 
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
  BhkValue: string = 'Property Type';
  PropertyTypeValue: string = '';
  FurnishedTypeValue: string = '';
  monthlyRent: number=0;
  rentinK:string;
  isRentEnter:boolean; 

    maintainceCharge: number = 0;
    maintainK: string;

    sucurityCharge: number = 0;
    securityinK: string;

    pgsucurityCharge: number = 0;
    pgsecurityinK: string;

    brokregeCharge: number = 0;
    brokregeinK: string;

  builduparea:number=0;
  areainK:string='';
  Addresstext: string ='Your Property Address';
  AgeOfPropertytext: string = 'Age of Property (in years)';

  DepositeYes: boolean = false;
  DepositeNo: boolean = false;

  ActiveBI:string='active';
  ActiveAddress:string='disabled';
  ActivePhoto: string ='disabled'; 
 
  ActiveRent: boolean = true;
  ActiveSell: boolean = false;
  ActivePG: boolean = false;

  Apartments: boolean = false;
  Villas: boolean = false;
  IndependentFloors: boolean = false;
  IndependantHouses: boolean = false;
  Plotss: boolean = false;

  ActiveImmidiate: boolean = false;
  ActiveInFuture: boolean = false;
  
    ActiveRK: boolean = false;
    Active1BHK: boolean = false;
    Active2BHK: boolean = false;
    Active3BHK: boolean = false;
    Active4BHK: boolean = false;
    Active5BHK: boolean = false;
    Active6BHK: boolean = false;
    Active7BHK: boolean = false;
    Active8BHK: boolean = false;
    Active9BHK: boolean = false;
    Active10BHK: boolean = false;
    Active3PlusBHK: boolean = false;
    PlusBhk: boolean = false;

    ActiveZeroBathroom: boolean = false;
    ActiveOneBathroom: boolean = false;
    ActiveTwoBathroom: boolean = false;
    ActiveThreeBathroom: boolean = false;
    ActiveFourBathroom: boolean = false;
    ActiveFiveBathroom: boolean = false;
    ActiveSixBathroom: boolean = false;
    ActiveSevenBathroom: boolean = false;
    ActiveEightBathroom: boolean = false;

    ActiveThreePlusBathroom: boolean = false;
    PlusBathroom: boolean = false;

  ActiveZeroBalconey: boolean = false;
  ActiveOneBalconey: boolean = false;
  ActiveTwoBalconey: boolean = false;
  ActiveThreeBalconey: boolean = false;
  ActiveFourBalconey: boolean = false;
  ActiveFiveBalconey: boolean = false;
  ActiveSixBalconey: boolean = false;
  ActiveSevenBalconey: boolean = false;
  ActiveEightBalconey: boolean = false;
  ActiveThreePlusBalconey: boolean = false;
    BalconeyPlus:boolean=false;

  ActiveFurnished: boolean = false;
  ActiveSemiFurnished: boolean = false;
  ActiveUnfurnished: boolean = false;

  ActiveCoverParking0: boolean = false;
  ActiveCoverParking1: boolean = false;
  ActiveCoverParking2: boolean = false;
  ActiveCoverParking3: boolean = false;
  ActiveCoverParking4: boolean = false;
  ActiveCoverParking5: boolean = false;
  ActiveCoverParking6: boolean = false;
  ActiveCoverParking7: boolean = false;
  ActiveCoverParking8: boolean = false;
  cp4:boolean=false;

  ActiveOpenParking0: boolean = false;
  ActiveOpenParking1: boolean = false;
  ActiveOpenParking2: boolean = false;
  ActiveOpenParking3: boolean = false;
  ActiveOpenParking4: boolean = false;
  ActiveOpenParking5: boolean = false;
  ActiveOpenParking6: boolean = false;
  ActiveOpenParking7: boolean = false;
  ActiveOpenParking8: boolean = false;
  OpenParkingPlus:boolean=false;

  ActiveFamiliy: boolean = false;
  ActiveBeachlor: boolean = false;
  ActiveCompany: boolean = false;
  ActiveOther: boolean = false;

  securityDepositeYes: boolean = false;
  securityDepositeNo: boolean = false;

  ChargeBrokerageYes: boolean = false;
  ChargeBrokerageNo: boolean = false;

  ActiveNewbooking: boolean = false;
  ActiveResale: boolean = false;

  ActiveReadyToMove: boolean = false;
  ActiveUnderConstruction: boolean = false; 

  //PG VARIABLES
  BoyPgYes: boolean = false;
  GirlPgYes: boolean = false;
  BothPgYes: boolean = false;
  ActiveProfessionals:boolean=false;
  ActiveStudent:boolean=false;
  ActiveMealYes:boolean=false;
  isMealOffering:boolean=false;
  ActiveMealNo: boolean = false;

  ActiveBreakfast: boolean = false;
  ActiveLunch: boolean = false;
  ActiveDinner: boolean = false;

  ActiveLivingRoom:boolean=false;
  ActiveKitchen:boolean=false;
  ActiveDining:boolean=false;
  ActiveStudyRoom:boolean=false;
  ActiveBreakout:boolean=false;
  ActiveLandlord: boolean = false;
  ActiveCaretaker: boolean = false;
  ActiveDedicated: boolean = false;
  ActiveStayYes: boolean = false;
  ActiveStayNo: boolean = false;
  ActiveNonVegYes: boolean = false;
  ActiveNonVegNo: boolean = false;
  ActiveOppoSexYes:boolean=false;
  ActiveOppoSexNo:boolean=false;
  ActiveTimeAllowedYes: boolean = false;
  ActiveTimeAllowedNo: boolean = false;
  ActiveAllowedYes: boolean = false;
  ActiveAllowedNo: boolean = false;
  ActiveGuardianYes: boolean = false;
  ActiveGuardianNo: boolean = false;
  ActiveDrinkingYes: boolean = false;
  ActiveDrinkingNo: boolean = false;
  ActiveSmokingYes: boolean = false;
  ActiveSmokingNo: boolean = false;
  today: Date; 
  CommonAreas:string=' ';
  MealOff: string = ' ';
  bhkval: string ='3+ BHK';

  urls=[];
  fileName:string[]=[];
  iShowImg:string='none';
  Imgs:Images[]=[];
  img:Images; 
  randomId:number;
  country: any; 
  city: any;
  keyword = 'citynName';
  keyword1 = 'localityName';
  cols:string=''
  imgTage:string;
  covers:number;  
  previousVal:number=0; 
  activecover:number;
  totalfloor:number; 

    // PG EXTRA TAB
    ActivePrivateRoom: boolean = false;
    ActiveDoubleRoom: boolean = false;
    ActiveTripleRoom: boolean = false;
    ActiveSharingRoom: boolean = false;


    ActiveCupboardRoom: boolean = false;
    ActiveTableChair: boolean = false;
    ActiveTv: boolean = false;
    ActiveAttachbalconey: boolean = false;
    ActiveAttachBathromm: boolean = false;
    ActiveMealInclude: boolean = false;

    ActiveCCTV: boolean = false;
    ActiveGatedCommunity: boolean = false;
    ActiveSecurity: boolean = false;
    ActiveBiometric: boolean = false;
    ActiveFridge: boolean = false;
    ActiveWashingMachine: boolean = false;
    ActiveMicrowave: boolean = false;
    ActiveWaterPurifier: boolean = false;
    ActiveTTTable: boolean = false;
    ActiveTV: boolean = false;
    ActiveCoffeeMachine: boolean = false;
    ActiveSnacksMachine: boolean = false;
    ActiveLaundry: boolean = false;
    ActiveHousekeeping: boolean = false;
    ActiveInternet: boolean = false;
    ActiveGym: boolean = false;
    ActiveLift: boolean = false;
    ActiveRegularWaterSupply: boolean = false;
    ActiveSwimmingPool: boolean = false;
    ActiveReservedParking: boolean = false;
    ActivePowerBackup: boolean = false; 
    Facility:string='';
    Amenties: string = '';
    sectors: Sector[];
    pockets: Pocket[]; 
    url;
    names;
    userRole:string;
    userId:string;
    userName:string;
    propertyIds:string;
    currentMainPhotoId:number;
    imgs:Images[]=[];
    currentMain: Images;
  imges:Images[]=[];
    @Output() getMemberPhotoChange = new EventEmitter<string>();
    baseUrl = environment.ApiUrl; 
    tabhome:boolean;
    tablead:boolean;
    isLogin:boolean;
  constructor(private fb: FormBuilder, private services: PostService, 
    private _http:HttpClient,
    private cityServices:CityService,
    private userprofileServices: AdminRegisterService,
    private authService: SocialAuthService, 
    private toastr: ToastrService, private _router: Router) { 
      let token=localStorage.getItem('token');
      this._http.post(environment.ApiUrl+'ApplicationManager/tokenMatch/'+token,{}).subscribe((data:boolean)=>{
        this.isLogin=data;
        if(this.isLogin==false){
          localStorage.clear();
          _router.navigateByUrl('/');
        }
       
     })


      if(localStorage.getItem("role")=='Admin'){
        _router.navigateByUrl('/');
      } else{
        this.services.getLastUniqueId().subscribe((UniquId: number) => {
          this.randomId = UniquId;
          this.initializeUploader();
        })  
      }
  }
 
  ngOnInit() {  
    this.tabhome=true;
   this.url= localStorage.getItem("url");
   this.names= localStorage.getItem("name");
    this.userId = localStorage.getItem("userId");
   this.userName= localStorage.getItem("username");
   this.propertyIds= localStorage.getItem("propertyId"); 
    if (this.url == 'null') {
      this.url = './../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';
    }
   if(this.names==null){
     this.loadUserProfile();
   } 
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers:false }); 
    this.today = new Date();
    this.ActivePhoto = 'disabled';
    this.ActiveBI = 'active';
    this.ActiveAddress = 'disabled';
    this.ActiveRent = true;
    this.ActivePG = false;
    this.ActiveSell = false;
    this.createCheckoutForm();
    this.initializeUploader();
    this.checkoutForm.get('basicInfo.WantTo').setValue('RENT');
    this.progress = '5px';
    this.progressText = '10';
    this.Rent();
    this.services.allCity().subscribe((data) => {
      this.country = data; 
    })
    this.loadUserProfile();
    this.checkoutForm.get('PhotosInfo.cover').setValue(true); 
  } 
  Lead(userId){
    this._router.navigateByUrl(`/UserEdit/${userId}`);
      localStorage.setItem("lead", "true");
  }
 
  initializeUploader() { 
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Photo/' + this.userName + '/' + this.randomId, 
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true, 
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Images = JSON.parse(response);  
        this.imgs.push(res);   
        this.iShowImg='block';
        if (this.imgs.length==1 && this.imgs.length<=4){
          this.progressText='87';
          this.progress='150px' 
        }
        if (this.imgs.length>4 && this.imgs.length<=7){
          this.progressText='';
          this.progressText='93';
          this.progress='157px';
        }
        if (this.imgs.length>7 && this.imgs.length<=8){
          this.progressText='';
          this.progressText='100';
          this.progress='170px';
          
        }
        if (this.imgs.length==0){
          this.checkoutForm.get('PhotosInfo.cover').setValue(true); 
        }else{
          this.checkoutForm.get('PhotosInfo.cover').setValue(null); 
        }
      };
    }
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.toastr.info("Only image file allowed.");
    }
  }
    setMainPhoto(photo: any) { 
      this.services.setMainPhoto(this.randomId, photo.id).subscribe(() => {
        this.currentMain = _.findWhere(this.imgs, { cover: true });
        for (let index = 0; index < this.imgs.length; index++) {
          this.imgs[index].cover = false; 
        }
      
        photo.cover = true; 
        this.checkoutForm.get('PhotosInfo.cover').setValue(true); 
        this.getMemberPhotoChange.emit(photo.url);
        this.services.changeMemberPhoto(photo.url);
       this.currentMainPhotoId=  photo.id
      //  this.services.photoUrl = photo.url;
     //   localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      }, error => {
       // this.alertify.error(error);
      });
    }
    setTagPhotos($event,photo: any) { 
      photo.tag=$event.target.value; 
      this.services.setTagPhoto(this.userId, photo.id,photo.tag).subscribe(() => {
    
      }, error => {
        // this.alertify.error(error);
      });
    }
    deletePhotos(id: number) {  
        this.services.deletePhoto(this.userId, id).subscribe(() => {
          this.imgs.splice(_.findIndex(this.imgs, { id: id }), 1);

          if(id==this.currentMainPhotoId){
            this.checkoutForm.get('PhotosInfo.cover').setValue(null);
          }
         if(this.imgs.length==0){
           this.checkoutForm.get('PhotosInfo.cover').setValue(true);
           this.iShowImg = 'none'; 
           this.progressText='80';
           this.progress='150px' 
         } 
         if (this.imgs.length==1 && this.imgs.length<=4){
          this.progressText='82';
          this.progress='155px' 
        }
        if (this.imgs.length>4 && this.imgs.length<=7){
          this.progressText='';
          this.progressText='87';
          this.progress='157px';
        }
        if (this.imgs.length>7 && this.imgs.length<=8){
          this.progressText='';
          this.progressText='88';
          this.progress='160px';
          
        }
        }, error => { 
        }) 
    }
 loadUserProfile(){
   this.userprofileServices.GetUserProfile().subscribe((data:any)=>{
     this.names = data.fullName;
     this.userRole=data.roleId;
     if(this.userRole!='Broker'){
      this.checkoutForm.get('basicInfo.brokerage').setValue('NO');
      this.checkoutForm.get('basicInfo.brokerageAmt').setValue(0);
     }
   })
 }
    Logout() {
      localStorage.clear();
      this.authService.signOut();
      this._router.navigateByUrl('/'); 
      this.toastr.success("Logout successful");
    }
    RedirectToDash(userId) {
      this._router.navigateByUrl(`/UserEdit/${userId}`);
      localStorage.setItem("dash", "true");
    }
    CCTV(){
      this.Amenties=this.Amenties+'CCTV,';
      this.ActiveCCTV = !this.ActiveCCTV;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);

    }
    GatedCommunity(){
      this.Amenties = this.Amenties + 'Gated Community,';
      this.ActiveGatedCommunity = !this.ActiveGatedCommunity;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Security(){
      this.Amenties = this.Amenties + 'Security,';
      this.ActiveSecurity = !this.ActiveSecurity;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Biometric(){
      this.Amenties = this.Amenties + 'Biometric,';
      this.ActiveBiometric = !this.ActiveBiometric;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Fridge(){
      this.Amenties = this.Amenties + 'Fridge,';
      this.ActiveFridge = !this.ActiveFridge;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    WashingMachine(){
      this.Amenties = this.Amenties + 'Washing Machine,';
      this.ActiveWashingMachine = !this.ActiveWashingMachine;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Microwave(){
      this.Amenties = this.Amenties + 'Microwave,';
      this.ActiveMicrowave = !this.ActiveMicrowave;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    WaterPurifier(){
      this.Amenties = this.Amenties + 'Water Purifier,';
      this.ActiveWaterPurifier = !this.ActiveWaterPurifier;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    TTTable(){
      this.Amenties = this.Amenties + 'TT Table,';
      this.ActiveTTTable = !this.ActiveTTTable;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    TVs(){
      this.Amenties = this.Amenties + 'TV,';
      this.ActiveTV = !this.ActiveTV;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    CoffeeMachine(){
      this.Amenties = this.Amenties + 'Coffee Machine,';
      this.ActiveCoffeeMachine = !this.ActiveCoffeeMachine;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    SnacksMachine(){
      this.Amenties = this.Amenties + 'Snacks Machine,';
      this.ActiveSnacksMachine = !this.ActiveSnacksMachine;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Laundry(){
      this.Amenties = this.Amenties + 'Laundry,';
      this.ActiveLaundry = !this.ActiveLaundry;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Housekeeping(){
      this.Amenties = this.Amenties + 'Housekeeping,';
      this.ActiveHousekeeping = !this.ActiveHousekeeping;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Internet(){
      this.Amenties = this.Amenties + 'Internet,';
      this.ActiveInternet = !this.ActiveInternet;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Gym(){
      this.Amenties = this.Amenties + 'Gym,';
      this.ActiveGym = !this.ActiveGym;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    Lift(){
      this.Amenties = this.Amenties + 'Lift,';
      this.ActiveLift = !this.ActiveLift;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    RegularWaterSupply(){
      this.Amenties = this.Amenties + 'Regular Water Supply,';
      this.ActiveRegularWaterSupply = !this.ActiveRegularWaterSupply;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    SwimmingPool(){
      this.Amenties = this.Amenties + 'Swimming Pool,';
      this.ActiveSwimmingPool = !this.ActiveSwimmingPool;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    ReservedParking(){
      this.Amenties = this.Amenties + 'Reserved Parking,';
      this.ActiveReservedParking = !this.ActiveReservedParking;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    } 
    PowerBackup(){
      this.Amenties = this.Amenties + 'Power Backup,';
      this.ActivePowerBackup = !this.ActivePowerBackup;
      this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(this.Amenties);
    }
    PrivateRoom(){
      this.ActivePrivateRoom = true;
      this.ActiveDoubleRoom= false;
      this.ActiveTripleRoom = false;
      this.ActiveSharingRoom = false;
      this.checkoutForm.get('basicInfo.RoomType').setValue('Private Room');
    }
    DoubleRoom(){
      this.ActivePrivateRoom = false;
      this.ActiveDoubleRoom = true;
      this.ActiveTripleRoom = false;
      this.ActiveSharingRoom = false;
      this.checkoutForm.get('basicInfo.RoomType').setValue('Double Room');
    }
    TripleRoom() {
      this.ActivePrivateRoom = false;
      this.ActiveDoubleRoom = false;
      this.ActiveTripleRoom = true;
      this.ActiveSharingRoom = false;
      this.checkoutForm.get('basicInfo.RoomType').setValue('Triple Room');
    }
    sharingRoom() {
      this.ActivePrivateRoom = false;
      this.ActiveDoubleRoom = false;
      this.ActiveTripleRoom = false;
      this.ActiveSharingRoom = true;
      this.checkoutForm.get('basicInfo.RoomType').setValue('sharing Room');
    }
    PersonalCupboard(){
      this.ActiveCupboardRoom = !this.ActiveCupboardRoom
     
      this.Facility = this.Facility+'Personal Cupboard,';
      this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(this.Facility);
    }
    TableChair(){
      this.ActiveTableChair = !this.ActiveTableChair; 
      this.Facility = this.Facility + 'Table Chair,';
      this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(this.Facility);
    }
    TV(){
      this.ActiveTv =!this.ActiveTv;
      this.Facility = this.Facility + 'Tv,';
      this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(this.Facility);
    }
    Attachbalconey(){
      this.ActiveAttachbalconey = !this.ActiveAttachbalconey;
      this.Facility = this.Facility + 'Attach balconey,';
      this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(this.Facility);
    }
    AttachBathroom(){
      this.ActiveAttachBathromm = !this.ActiveAttachBathromm;
      this.Facility = this.Facility + 'Attach Bathroom,';
      this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(this.Facility);
    }
    MealInclude(){
      this.ActiveMealInclude = !this.ActiveMealInclude;
      this.Facility = this.Facility + 'Meal Include,';
      this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(this.Facility);
    }
  selectEvent(item) {  
    this.Addresstext=item.citynName;
    this.services.allLocality(item.id).subscribe((data) => {
      this.city = data; 
    })
    this.checkoutForm.get('AddressInfo.City').setValue(item.citynName);
  }
    selectEvent1(item) {  
      this.sectors=[];
      this.pockets=[]; 
      this.Addresstext = this.Addresstext +', '+ item.localityName;
      this.checkoutForm.get('AddressInfo.Locality').setValue(item.localityName);
      this.cityServices.sectorById(item.id).subscribe((data: Sector[]) => {
        this.sectors = data; 
      })
    }
    SectorChange($event){ 
      let ids = $event.target.value;
      this.cityServices.pocketById(ids).subscribe((data: Pocket[]) => {
        this.pockets = data; 
      })
    }
    PlotPrice($event){  
      this.isRentEnter=true;
      this.monthlyRent=$event.target.value;
      if (parseInt(this.monthlyRent.toString().replace(/,/g, '')) > 990000000){
        this.monthlyRent = null;
        this.checkoutForm.get('basicInfo.PlotPrice').setValue(null);
        this.rentinK = '';
        this.toastr.info("Plot Price Should not be greater than 99 Cr");
        return;
      } 
     
      this.checkoutForm.get('basicInfo.PlotPrice').setValue(this.monthlyRent);
    this.rentinK=this.transform(this.monthlyRent.toString().replace(/,/g, ''));
    }
 
    SecurityDepo($event){ 
      this.sucurityCharge = $event.target.value; 
      if (parseInt(this.sucurityCharge.toString().replace(/,/g, '')) > 990000000) {
        this.sucurityCharge = null;
        this.checkoutForm.get('basicInfo.SecurityDepositeAmt').setValue(null);
        this.securityinK = '';
        this.toastr.info("Security charge Should not be greater than 99 Cr");
        return;
      }
      this.securityinK = this.transform(this.sucurityCharge.toString().replace(/,/g, ''));
    }
    PGSecurityDepo($event) {
      this.pgsucurityCharge = $event.target.value;
      this.pgsecurityinK = this.transform(this.pgsucurityCharge);
    }

    BrokageAmt($event) {
      this.brokregeCharge = $event.target.value;
      if (parseInt(this.brokregeCharge.toString().replace(/,/g, '')) > 9900000) {
        this.monthlyRent = null;
        this.checkoutForm.get('basicInfo.brokerageAmt').setValue(null);
        this.brokregeinK = '';
        this.toastr.info("Brokerage Amount Should not be greater than 99 Lakh");
        return;
      } 
      this.brokregeinK = this.transform(this.brokregeCharge.toString().replace(/,/g, ''));
    }

    maintainCharge($event) { 
      this.maintainceCharge = $event.target.value;
      if (this.maintainceCharge > 9900000){
        this.checkoutForm.get('basicInfo.MaintainesCharge').setValue(null);
        this.maintainK='';
        return;
      }  
      this.maintainK = this.transform(this.maintainceCharge.toString().replace(/,/g, ''));
    }
   
  BackToBS(){ 
    this.ActivePhoto = 'disabled';
    this.ActiveBI = 'active';
    this.ActiveAddress = '';
  }
  BackToAddress(){
    this.ActivePhoto = '';
    this.ActiveBI = '';
    this.ActiveAddress = 'active';
  }
  checkNumeric($event){
    if(isNaN($event.target.value)){ 
      this.toastr.warning("Opps!","Only Numeric Value is Allowed");
      this.checkoutForm.get('basicInfo.propertadyAge').setValue(0);
      return;
    }else{
      this.AgeOfPropertytext=$event.target.value;
    }
  } 

  //PG METHOD
  SmokingYes() {
    this.ActiveSmokingYes = true;
    this.ActiveSmokingNo = false;
    this.checkoutForm.get('basicInfo.SmokingAllowed').setValue('Yes');
  }
  
  SmokingNo(){
    this.ActiveSmokingYes =false;
    this.ActiveSmokingNo = true;
    this.checkoutForm.get('basicInfo.SmokingAllowed').setValue('No');
  }
  DrinkingYes(){
    this.ActiveDrinkingYes=true;
    this.ActiveDrinkingNo = false;
    this.checkoutForm.get('basicInfo.DrinkingAllowed').setValue('Yes');
  }
  DrinkingNo(){
    this.ActiveDrinkingYes = false;
    this.ActiveDrinkingNo = true;
    this.checkoutForm.get('basicInfo.DrinkingAllowed').setValue('No');

  }
  GuardianYes(){
    this.ActiveGuardianYes=true;
    this.ActiveGuardianNo=false;
    this.checkoutForm.get('basicInfo.GardianAllowed').setValue('Yes');
  }
  GuardianNo(){
    this.ActiveGuardianYes = false;
    this.ActiveGuardianNo = true;
    this.checkoutForm.get('basicInfo.GardianAllowed').setValue('No');
  }
  VisitorYes(){
    this.ActiveAllowedYes=true;
    this.ActiveAllowedNo = false;
    this.checkoutForm.get('basicInfo.VisitorAllowed').setValue('Yes');
  }
  VisitorNo(){
    this.ActiveAllowedYes = false;
    this.ActiveAllowedNo = true;
    this.checkoutForm.get('basicInfo.VisitorAllowed').setValue('No');
  }
  TimeAllowedYes(){
    this.timeallowedNo = false;
    this.ActiveTimeAllowedYes=true;
    this.ActiveTimeAllowedNo=false;
    this.checkoutForm.get('basicInfo.AnyTimeAllowed').setValue('Yes');
  }
  TimeAllowedNo(){
    this.timeallowedNo=true;
    this.ActiveTimeAllowedYes = false;
    this.ActiveTimeAllowedNo = true;
    this.checkoutForm.get('basicInfo.AnyTimeAllowed').setValue('No');
  }
  OppoSexYes(){
    this.ActiveOppoSexYes=true;
    this.ActiveOppoSexNo = false;
    this.checkoutForm.get('basicInfo.OppositeSex').setValue('Yes');
  }
  OppoSexNo(){
    this.ActiveOppoSexYes = false;
    this.ActiveOppoSexNo = true;
    this.checkoutForm.get('basicInfo.OppositeSex').setValue('No');
  }
  NonVegYes(){
    this.ActiveNonVegYes=true;
    this.ActiveNonVegNo= false;
    this.checkoutForm.get('basicInfo.NonVegAllowed').setValue('Yes');
  }
  NonVegNo() {
    this.ActiveNonVegYes = false;
    this.ActiveNonVegNo = true;
    this.checkoutForm.get('basicInfo.NonVegAllowed').setValue('No');
  }


BoyPG() {
  this.BoyPgYes = true;
  this.GirlPgYes = false; 
  this.BothPgYes = false;
  this.checkoutForm.get('basicInfo.PgFor').setValue('Boys');
}
GirlPG() {
  this.BoyPgYes = false;
  this.GirlPgYes = true;
  this.BothPgYes = false;
  this.checkoutForm.get('basicInfo.PgFor').setValue('Girls');
}
BothPG() {
  this.BoyPgYes = false;
  this.GirlPgYes = false;
  this.BothPgYes=true;
  this.checkoutForm.get('basicInfo.PgFor').setValue('Boys, Girls');
} 
Professionals(){
  this.ActiveProfessionals = !this.ActiveProfessionals; 
  this.checkoutForm.get('basicInfo.PgSuitedFor').setValue('Professionals');
}
Student() { 
  this.ActiveStudent = !this.ActiveStudent;
  this.checkoutForm.get('basicInfo.PgSuitedFor').setValue('Student');
}  
  MealYes(){
    this.ActiveMealYes = true;
    this.ActiveMealNo = false;
    this.checkoutForm.get('basicInfo.MealAvalable').setValue('Yes');
    this.isMealOffering=true;
  }
  MealNo(){
    this.ActiveMealYes = false;
    this.ActiveMealNo = true;
    this.checkoutForm.get('basicInfo.MealAvalable').setValue('No');
    this.isMealOffering = false;
  }
    Breakfast() {
      this.ActiveBreakfast = !this.ActiveBreakfast;
      this.MealOff = this.MealOff + 'Breakfast,';
      this.checkoutForm.get('basicInfo.MealOffering').setValue(this.MealOff);
    }
    Lunch() { 
      this.ActiveLunch = !this.ActiveLunch; 
      this.MealOff = this.MealOff + 'Lunch,';
      this.checkoutForm.get('basicInfo.MealOffering').setValue(this.MealOff);
    }
    Dinner() { 
      this.ActiveDinner = !this.ActiveDinner;
      this.MealOff = this.MealOff + 'Dinner,';
      this.checkoutForm.get('basicInfo.MealOffering').setValue(this.MealOff);
    }

  LivingRoom() {
    this.ActiveLivingRoom = !this.ActiveLivingRoom
    this.CommonAreas = this.CommonAreas+'Living Room,';
    this.checkoutForm.get('basicInfo.CommonArea').setValue(this.CommonAreas);
  }
  Kitchen() {
    this.ActiveKitchen = !this.ActiveKitchen;
    this.CommonAreas = this.CommonAreas + 'Kitchen,';
    this.checkoutForm.get('basicInfo.CommonArea').setValue(this.CommonAreas);
  }
  Dining() {
    this.ActiveDining = !this.ActiveDining;
    this.CommonAreas = this.CommonAreas + 'Dining,';

    this.checkoutForm.get('basicInfo.CommonArea').setValue(this.CommonAreas);
  }
  StudyRoom() {
    this.ActiveStudyRoom = !this.ActiveStudyRoom;
    this.CommonAreas = this.CommonAreas + 'StudyRoom,';
    this.checkoutForm.get('basicInfo.CommonArea').setValue(this.CommonAreas);
  }
  Breakout() {
    this.ActiveBreakout = !this.ActiveBreakout;
    this.CommonAreas = this.CommonAreas + 'Breakout,';

    this.checkoutForm.get('basicInfo.CommonArea').setValue(this.CommonAreas);
     
  } 

  Landlord(){
    this.ActiveLandlord=true;
    this.ActiveCaretaker=false;
    this.ActiveDedicated=false;
    this.checkoutForm.get('basicInfo.PropertyManageBy').setValue('Landlord');
  }
  Caretaker(){
    this.ActiveLandlord = false;
    this.ActiveCaretaker = true;
    this.ActiveDedicated = false;
    this.checkoutForm.get('basicInfo.PropertyManageBy').setValue('Caretaker');

  }
  Dedicated(){
    this.ActiveLandlord = false;
    this.ActiveCaretaker = false;
    this.ActiveDedicated = true;
    this.checkoutForm.get('basicInfo.PropertyManageBy').setValue('Dedicated');
  }
  StayYes(){
    this.ActiveStayYes=true;
    this.ActiveStayNo=false;
    this.checkoutForm.get('basicInfo.PropertyManageStay').setValue('Yes');
  }
  StayNo(){
    this.ActiveStayYes = false;
    this.ActiveStayNo = true;
    this.checkoutForm.get('basicInfo.PropertyManageStay').setValue('No');
  }
  NavToAddress() {
    if(this.Plotss==true){
     let plot= this.checkoutForm.get('basicInfo.PlotPrice').value;
     if(parseInt(plot.toString().replace(/,/g, ''))<100000){
    this.toastr.warning("Plot amount must be grater than 1 Lakh")
    return;
     }
    }
    this.ActiveAddress='active';
    this.ActiveBI = '';
    this.ActivePhoto = 'disabled';
    this.progress='100px';
    this.progressText='70';
  }
  NavToPhoto(){
    this.ActiveAddress = '';
    this.ActiveBI = '';
    this.ActivePhoto = 'active';
    this.progress = '145px';
    this.progressText = '80';
  }
  MonthRent($event){ 
    this.monthlyRent = $event.target.value;
    if (this.monthlyRent > 9900000) {
      this.monthlyRent = null;
      this.checkoutForm.get('basicInfo.mothlyRent').setValue(null);
      this.rentinK = '';
      this.toastr.info("Monthly Rent Should not be greater than 99 Lakh");
      return;
    }
    this.checkoutForm.get('basicInfo.mothlyRent').setValue(this.monthlyRent);
    this.isRentEnter = true;
    this.rentinK = this.transform(this.monthlyRent.toString().replace(/,/g, ''));
  }
    PlotRent($event) {
      this.monthlyRent = $event.target.value.toString().replace(/,/g, '');
      if (this.monthlyRent > 990000000) {
        this.monthlyRent = null;
        this.checkoutForm.get('basicInfo.mothlyRent1').setValue(null);
        this.rentinK = '';
        this.toastr.info("Price Should not be greater than 99 Cr");
        return;
      }
      
      this.checkoutForm.get('basicInfo.mothlyRent1').setValue($event.target.value);
      this.isRentEnter = true;
      this.rentinK = this.transform(this.monthlyRent);
    }
    PgRent($event){
      this.isRentEnter = true; 
      this.monthlyRent = $event.target.value;
      this.rentinK = this.transform(this.monthlyRent.toString().replace(/,/g, ''));
      this.isRentEnter=true; 
    }
  BasicInfo() {
    this.ActiveBI = 'active';
    this.ActiveAddress = ''; 
    this.ActivePhoto='';
  }
  BasicAddress(){
    this.ActiveBI = '';
    this.ActivePhoto = '';
    this.ActiveAddress = 'active'; 
  }
  Photo(){
    this.ActiveBI = '';
    this.ActiveAddress = '';
    this.ActivePhoto = 'active';
  }
  Immidiate() {
    this.ActiveImmidiate = true;
    this.ActiveInFuture = false
    this.progress1 = '40px';
    this.progressText1 = '35';
    this.checkoutForm.get('basicInfo.PossesionType').setValue('Lease Hold');
  }
  Infuture() {
    this.ActiveImmidiate = false;
    this.ActiveInFuture = true;
    this.progress1 = '40px';
    this.progressText1 = '35';
    this.checkoutForm.get('basicInfo.PossesionType').setValue('Free Hold');
  }
  ReadyToMove() {
    this.ActiveReadyToMove = true;
    this.ActiveUnderConstruction = false;
    this.checkoutForm.get('basicInfo.ConstructionType').setValue('Ready To Move');
  }
  UnderConstruction() {
    this.ActiveReadyToMove = false;
    this.ActiveUnderConstruction = true;
    this.checkoutForm.get('basicInfo.ConstructionType').setValue('Under Construction');
  }
    Allocy() {
    this.ActiveNewbooking = true;
    this.ActiveResale = false;
    this.progress1 = '30px';
    this.progressText1 = '30';
    this.checkoutForm.get('basicInfo.TransactionType').setValue('Allocy');
   
  }
  Resale() {
    this.ActiveNewbooking = false;
    this.ActiveResale = true;
    this.progress1 = '30px';
    this.progressText1 = '30';
    this.checkoutForm.get('basicInfo.TransactionType').setValue('Resale');
  }


  Plot() {
    this.PropertyTypeValue = 'Plot';
    if (this.BhkValue == 'Property Type')
      this.BhkValue = '';

    this.Apartments = false;
    this.IndependantHouses = false;
    this.IndependentFloors = false;
    this.monthlyRent=0;
    this.rentinK='';
    this.Villas = false;
    this.Plotss = true;
    this.checkoutForm.get('basicInfo.propertytype').setValue('Plot');
    this.progress = '20px';
    this.progressText = '20';
    this.progress1 = '20px';
    this.progressText1 = '20';  
    
    this.checkoutForm.get('basicInfo.bhk').setValue('null');
    this.checkoutForm.get('basicInfo.bhk').setValue('null'); 
    this.checkoutForm.get('basicInfo.mothlyRent').setValue(0);
    this.checkoutForm.get('basicInfo.mothlyRent1').setValue(0); 
    this.checkoutForm.get('basicInfo.propertadyAge').setValue(0); 
    this.checkoutForm.get('basicInfo.MaintainesCharge').setValue(0); 
    this.checkoutForm.get('basicInfo.FloorRange').setValue(null);
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;

    this.checkoutForm.get('basicInfo.bathroom').setValue('null');
    this.ActiveOneBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false;
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 

    this.checkoutForm.get('basicInfo.balconey').setValue('null');
    this.ActiveOneBalconey = false;
    this.ActiveTwoBalconey = false;
    this.ActiveThreeBalconey = false;
    this.ActiveFourBalconey = false;
    this.ActiveFiveBalconey = false;
    this.ActiveSixBalconey = false;
    this.ActiveSevenBalconey = false;
    this.ActiveEightBalconey = false;
    

    this.checkoutForm.get('basicInfo.furnishedType').setValue('null');
    this.ActiveFurnished = false;
    this.ActiveSemiFurnished = false;
    this.ActiveUnfurnished = false;

    this.checkoutForm.get('basicInfo.coverparking').setValue('null');
    this.ActiveCoverParking0 = false;
    this.ActiveCoverParking1 = false;
    this.ActiveCoverParking2 = false;
    this.ActiveCoverParking3 = false;
    this.ActiveCoverParking4 = false;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8 = false;
    

    this.checkoutForm.get('basicInfo.openparking').setValue('null');
    this.ActiveOpenParking0 = false;
    this.ActiveOpenParking1 = false;
    this.ActiveOpenParking2 = false;
    this.ActiveOpenParking3 = false;
    this.ActiveOpenParking4 = false;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
    

    this.checkoutForm.get('basicInfo.teneandType').setValue('null');
    this.ActiveFamiliy = false;
    this.ActiveBeachlor = false;
    this.ActiveCompany = false;
    this.ActiveOther = false;
    this.checkoutForm.get('basicInfo.PlotPrice').setValue(null);
    this.checkoutForm.get('basicInfo.AreaUnit').setValue(null);

    this.checkoutForm.get('basicInfo.Length').setValue(null);

    this.checkoutForm.get('basicInfo.Width').setValue(null);

    this.checkoutForm.get('basicInfo.WFR').setValue(null);
    this.checkoutForm.get('basicInfo.ConstructionType').setValue('null');
    this.ActiveReadyToMove=false;
    this.ActiveUnderConstruction=false;
    this.monthlyRent = 0;
    this.rentinK = '';
    this.isRentEnter = false;

    this.maintainceCharge = 0;
    this.maintainK = '';

    this.builduparea = 0;
    this.areainK = '';
  }
  BrokerageYes() {
    this.ChargeBrokerageYes = true; 
    this.ChargeBrokerageNo = false;
    this.checkoutForm.get('basicInfo.brokerage').setValue('YES');
    this.checkoutForm.get('basicInfo.brokerageAmt').setValue(null);
    this.progress = '115px';
    this.progressText = '75';
    this.progress1 = '45px';
    this.progressText1 = '40';
  }
  BrokerageNo() {
    this.ChargeBrokerageNo = true;
    this.ChargeBrokerageYes = false; 
    this.checkoutForm.get('basicInfo.brokerage').setValue('NO');
    this.checkoutForm.get('basicInfo.brokerageAmt').setValue(0);
    this.progress = '115px';
    this.progressText = '75';
    this.progress1 = '45px';
    this.progressText1 = '40';
  }
  securityDepositeYess() {
    this.DepositeYes = true;
    this.securityDepositeYes = true;
    this.securityDepositeNo = false; 
    this.checkoutForm.get('basicInfo.SecurityDeposite').setValue('YES');
    this.checkoutForm.get('basicInfo.SecurityDepositeAmt').setValue(null);
    this.progress = '110px';
    this.progressText = '73';
  }

  securityDepositeNoo() {
    this.DepositeYes = false;
    this.securityDepositeYes = false;
    this.securityDepositeNo = true;
    this.checkoutForm.get('basicInfo.SecurityDeposite').setValue('NO');
    this.checkoutForm.get('basicInfo.SecurityDepositeAmt').setValue(0);
    this.progress = '110px';
    this.progressText = '73';
  }

  Family() {
    this.ActiveFamiliy = !this.ActiveFamiliy;
    this.ActiveOther = false;
    this.checkoutForm.get('basicInfo.teneandType').setValue('Family');
    this.progress = '105px';
    this.progressText = '70';
  }
  Beachelor() { 
    this.ActiveOther = false;
    this.ActiveBeachlor = !this.ActiveBeachlor; 
    this.checkoutForm.get('basicInfo.teneandType').setValue('Bachelors');
    this.progress = '105px';
    this.progressText = '70';
  }
  Company() { 
    this.ActiveOther=false;
    this.ActiveCompany = !this.ActiveCompany;
    this.checkoutForm.get('basicInfo.teneandType').setValue('Company');
    this.progress = '105px';
    this.progressText = '70';
  }
  Other() {
    this.ActiveOther = !this.ActiveOther;
    if(this.ActiveOther==true){
      this.checkoutForm.get('basicInfo.teneandType').setValue('Family,Bachelors,Company');
      this.progress = '105px';
      this.progressText = '70';
      this.ActiveFamiliy = true;
      this.ActiveBeachlor = true;
      this.ActiveCompany = true;
    }else{
      this.checkoutForm.get('basicInfo.teneandType').setValue(null);
      this.progress = '105px';
      this.progressText = '70';
      this.ActiveFamiliy = false;
      this.ActiveBeachlor = false;
      this.ActiveCompany = false;
    }
  
  }

  OpenParkingZero() { 
    this.ActiveOpenParking0 = true;
    this.ActiveOpenParking1 = false;
    this.ActiveOpenParking2 = false;
    this.ActiveOpenParking3 = false;
    this.ActiveOpenParking4 = false;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
     
    this.checkoutForm.get('basicInfo.openparking').setValue('0 Open Parking');
    this.progress = '100px';
    this.progressText = '65';
  }
  OpenParkingOne() { 
    this.ActiveOpenParking0 = false;
    this.ActiveOpenParking1 = true;
    this.ActiveOpenParking2 = false;
    this.ActiveOpenParking3 = false;
    this.ActiveOpenParking4 = false;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
    
    this.checkoutForm.get('basicInfo.openparking').setValue('1 Open Parking');
    this.progress = '100px';
    this.progressText = '65';
  }
  OpenParkingTwo() { 
    this.ActiveOpenParking0 = false;
    this.ActiveOpenParking1 = false;
    this.ActiveOpenParking2 = true;
    this.ActiveOpenParking3 = false;
    this.ActiveOpenParking4 = false;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
    
    this.checkoutForm.get('basicInfo.openparking').setValue('2 Open Parking');
    this.progress = '100px';
    this.progressText = '65';
  }
  OpenParkingThree() {
    this.ActiveOpenParking0 = false;
    this.ActiveOpenParking1 = false;
    this.ActiveOpenParking2 = false;
    this.ActiveOpenParking3 = true;
    this.ActiveOpenParking4 = false;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
    
    this.checkoutForm.get('basicInfo.openparking').setValue('3 Open Parking');
    this.progress = '100px';
    this.progressText = '65';
    
  }
  OpenParkingFour() {
    
    this.ActiveOpenParking0 = false;
    this.ActiveOpenParking1 = false;
    this.ActiveOpenParking2 = false;
    this.ActiveOpenParking3 = false;
    this.ActiveOpenParking4 = true;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
    
    this.checkoutForm.get('basicInfo.openparking').setValue('4 Open Parking');
    this.progress = '100px';
    this.progressText = '65';
  }
    OpenParkingFive() {
      
      this.ActiveOpenParking0 = false;
      this.ActiveOpenParking1 = false;
      this.ActiveOpenParking2 = false;
      this.ActiveOpenParking3 = false;
      this.ActiveOpenParking4 = false;
      this.ActiveOpenParking5 = true;
      this.ActiveOpenParking6 = false;
      this.ActiveOpenParking7 = false;
      this.ActiveOpenParking8 = false;
      
      this.checkoutForm.get('basicInfo.openparking').setValue('5 Open Parking');
      this.progress = '100px';
      this.progressText = '65';
    }
    OpenParkingSix() {
      
      this.ActiveOpenParking0 = false;
      this.ActiveOpenParking1 = false;
      this.ActiveOpenParking2 = false;
      this.ActiveOpenParking3 = false;
      this.ActiveOpenParking4 = false;
      this.ActiveOpenParking5 = false;
      this.ActiveOpenParking6 = true;
      this.ActiveOpenParking7 = false;
      this.ActiveOpenParking8 = false;
      
      this.checkoutForm.get('basicInfo.openparking').setValue('6 Open Parking');
      this.progress = '100px';
      this.progressText = '65';
    }
    OpenParkingSeven() { 
      this.ActiveOpenParking0 = false;
      this.ActiveOpenParking1 = false;
      this.ActiveOpenParking2 = false;
      this.ActiveOpenParking3 = false;
      this.ActiveOpenParking4 = false;
      this.ActiveOpenParking5 = false;
      this.ActiveOpenParking6 = false;
      this.ActiveOpenParking7 = true;
      this.ActiveOpenParking8 = false;
      
      this.checkoutForm.get('basicInfo.openparking').setValue('7 Open Parking');
      this.progress = '100px';
      this.progressText = '65';
    }
    OpenParkingEight() {
      this.ActiveOpenParking0 = false;
      this.ActiveOpenParking1 = false;
      this.ActiveOpenParking2 = false;
      this.ActiveOpenParking3 = false;
      this.ActiveOpenParking4 = false;
      this.ActiveOpenParking5 = false;
      this.ActiveOpenParking6 = false;
      this.ActiveOpenParking7 = false;
      this.ActiveOpenParking8 = true;
      
      this.checkoutForm.get('basicInfo.openparking').setValue('8 Open Parking');
      this.progress = '100px';
      this.progressText = '65';
    }
    
    OpenParkingPluss(){ 
    this.OpenParkingPlus=true;
  }

  CoverParkingZero() { 
    this.ActiveCoverParking0 = true;
    this.ActiveCoverParking1 = false;
    this.ActiveCoverParking2 = false;
    this.ActiveCoverParking3 = false;
    this.ActiveCoverParking4 = false;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8 = false;
    
    this.checkoutForm.get('basicInfo.coverparking').setValue('0 Cover Parking');
    this.progress = '90px';
    this.progressText = '60';
    
  }
  CoverParkingOne() { 
    this.ActiveCoverParking0 = false;
    this.ActiveCoverParking1 = true;
    this.ActiveCoverParking2 = false;
    this.ActiveCoverParking3 = false;
    this.ActiveCoverParking4 = false;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8 = false;
    
    this.checkoutForm.get('basicInfo.coverparking').setValue('1 Cover Parking');
    this.progress = '90px';
    this.progressText = '60';
  }
  CoverParkingTwo() { 
    this.ActiveCoverParking0 = false;
    this.ActiveCoverParking1 = false;
    this.ActiveCoverParking2 = true;
    this.ActiveCoverParking3 = false;
    this.ActiveCoverParking4 = false;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8 = false;
    
    this.checkoutForm.get('basicInfo.coverparking').setValue('2 Cover Parking');
    this.progress = '90px';
    this.progressText = '60';
  }
  CoverParkingThree() { 
    this.ActiveCoverParking0 = false;
    this.ActiveCoverParking1 = false;
    this.ActiveCoverParking2 = false;
    this.ActiveCoverParking3 = true;
    this.ActiveCoverParking4 = false;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8 = false;
    
    this.checkoutForm.get('basicInfo.coverparking').setValue('3 Cover Parking');
    this.progress = '90px';
    this.progressText = '60';
  }
  CoverParkingFour() { 
    this.ActiveCoverParking0 = false;
    this.ActiveCoverParking1 = false;
    this.ActiveCoverParking2 = false;
    this.ActiveCoverParking3 = false;
    this.ActiveCoverParking4 = true;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8 = false;
    
    this.checkoutForm.get('basicInfo.coverparking').setValue('4 Cover Parking');
    this.progress = '90px';
    this.progressText = '60';
  }
    CoverParkingFive() { 
      this.ActiveCoverParking0 = false;
      this.ActiveCoverParking1 = false;
      this.ActiveCoverParking2 = false;
      this.ActiveCoverParking3 = false;
      this.ActiveCoverParking4 = false;
      this.ActiveCoverParking5 = true;
      this.ActiveCoverParking6 = false;
      this.ActiveCoverParking7 = false;
      this.ActiveCoverParking8 = false;
      
      this.checkoutForm.get('basicInfo.coverparking').setValue('5 Cover Parking');
      this.progress = '90px';
      this.progressText = '60';
    }
    CoverParkingSix() { 
      this.ActiveCoverParking0 = false;
      this.ActiveCoverParking1 = false;
      this.ActiveCoverParking2 = false;
      this.ActiveCoverParking3 = false;
      this.ActiveCoverParking4 = false;
      this.ActiveCoverParking5 = false;
      this.ActiveCoverParking6 = true;
      this.ActiveCoverParking7 = false;
      this.ActiveCoverParking8 = false;
      
      this.checkoutForm.get('basicInfo.coverparking').setValue('6 Cover Parking');
      this.progress = '90px';
      this.progressText = '60';
    }
    CoverParkingSeven() { 
      this.ActiveCoverParking0 = false;
      this.ActiveCoverParking1 = false;
      this.ActiveCoverParking2 = false;
      this.ActiveCoverParking3 = false;
      this.ActiveCoverParking4 = false;
      this.ActiveCoverParking5 = false;
      this.ActiveCoverParking6 = false;
      this.ActiveCoverParking7 = true;
      this.ActiveCoverParking8 = false;
      
      this.checkoutForm.get('basicInfo.coverparking').setValue('7 Cover Parking');
      this.progress = '90px';
      this.progressText = '60';
    }
    CoverParkingEight() { 
      this.ActiveCoverParking0 = false;
      this.ActiveCoverParking1 = false;
      this.ActiveCoverParking2 = false;
      this.ActiveCoverParking3 = false;
      this.ActiveCoverParking4 = false;
      this.ActiveCoverParking5 = false;
      this.ActiveCoverParking6 = false;
      this.ActiveCoverParking7 = false;
      this.ActiveCoverParking8 = true;
      
      this.checkoutForm.get('basicInfo.coverparking').setValue('8 Cover Parking');
      this.progress = '90px';
      this.progressText = '60';
    }
   
    CoverPlus(){
      this.cp4=true;
    }
  Furnished() {
    this.FurnishedTypeValue = 'Fully Furnished';
    this.ActiveFurnished = true;
    this.ActiveSemiFurnished = false;
    this.ActiveUnfurnished = false; 
    this.checkoutForm.get('basicInfo.furnishedType').setValue(this.FurnishedTypeValue);
    this.progress = '80px';
    this.progressText = '55';

  }
  Unfurnished() {
    this.FurnishedTypeValue = 'Unfurnished';
    this.ActiveFurnished = false;
    this.ActiveSemiFurnished = false;
    this.ActiveUnfurnished = true;
    this.checkoutForm.get('basicInfo.furnishedType').setValue(this.FurnishedTypeValue);
    this.progress = '80px';
    this.progressText = '55';
  }
  SemiFurnished() {
    this.FurnishedTypeValue = 'Semi Furnished';
    this.ActiveFurnished = false;
    this.ActiveSemiFurnished = true;
    this.ActiveUnfurnished = false;
    this.checkoutForm.get('basicInfo.furnishedType').setValue(this.FurnishedTypeValue);
    this.progress = '80px';
    this.progressText = '55';
  }
  Bathroom0() {
    this.ActiveZeroBathroom = true;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false;
    this.ActiveThreePlusBathroom = false;
   
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.checkoutForm.get('basicInfo.bathroom').setValue('0');
    this.progress = '50px';
    this.progressText = '40'; 
  }
  Bathroom1() {
    this.ActiveZeroBathroom = false;

    this.ActiveOneBathroom = true;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false; 
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveThreePlusBathroom = false;
    this.checkoutForm.get('basicInfo.bathroom').setValue('1');
    this.progress = '50px';
    this.progressText = '40';
    this.validationMsg = '';
  }
  Bathroom2() {
    this.ActiveZeroBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveTwoBathroom = true;
    this.ActiveThreeBathroom = false;
    this.ActiveThreePlusBathroom = false;
    this.checkoutForm.get('basicInfo.bathroom').setValue('2');
    this.progress = '50px';
    this.progressText = '40';
    this.validationMsg = '';
  }
  Bathroom3() {
    
    this.ActiveZeroBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false; 
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveThreeBathroom = true;
    this.ActiveThreePlusBathroom = false;
    this.checkoutForm.get('basicInfo.bathroom').setValue('3');
    this.progress = '50px';
    this.progressText = '40';
    this.validationMsg='';
  }
  Bathroom4() {
 
    this.ActiveZeroBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false;
  
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveFourBathroom = true;
    this.checkoutForm.get('basicInfo.bathroom').setValue('4');
    this.progress = '50px';
    this.progressText = '40';
  }
    Bathroom5() { 
     
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
     
      this.ActiveSixBathroom = false;
      this.ActiveSevenBathroom = false;
      this.ActiveEightBathroom = false; 
      this.ActiveFiveBathroom = true;
      this.checkoutForm.get('basicInfo.bathroom').setValue('5');
      this.progress = '50px';
      this.progressText = '40';
    }
    Bathroom6() {
      
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
      this.ActiveFiveBathroom = false; 
      this.ActiveSevenBathroom = false;
      this.ActiveEightBathroom = false;
      this.ActiveSixBathroom = true;
      this.checkoutForm.get('basicInfo.bathroom').setValue('6');
      this.progress = '50px';
      this.progressText = '40';
    }
    Bathroom7() {
      
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
      this.ActiveFiveBathroom = false;
      this.ActiveSixBathroom = false;
      this.ActiveEightBathroom = false;
      this.ActiveSevenBathroom = true;
      this.checkoutForm.get('basicInfo.bathroom').setValue('7');
      this.progress = '50px';
      this.progressText = '40';
    }
    Bathroom8() { 
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
      this.ActiveFiveBathroom = false;
      this.ActiveSixBathroom = false;
      this.ActiveSevenBathroom = false;
      this.ActiveEightBathroom = true;
      this.checkoutForm.get('basicInfo.bathroom').setValue('8');
      this.progress = '50px';
      this.progressText = '40';
    }
   
    BathroomPlus() {
      this.PlusBathroom = true;
    }

  Balconey0() {
    this.ActiveZeroBalconey = true;
    this.ActiveOneBalconey = false;
    this.ActiveTwoBalconey = false;
    this.ActiveThreeBalconey = false;
    this.ActiveThreePlusBalconey = false; 
    this.ActiveFourBalconey = false;
    this.ActiveFiveBalconey = false;
    this.ActiveSixBalconey = false;
    this.ActiveSevenBalconey = false;
    this.ActiveEightBalconey = false;
    
    this.checkoutForm.get('basicInfo.balconey').setValue('0');
    this.progress = '60px';
    this.progressText = '50';
    this.validationMsg1 = '';
  }
  Balconey1() {
    this.ActiveZeroBalconey = false;
    this.ActiveOneBalconey = true;
    this.ActiveTwoBalconey = false;
    this.ActiveThreeBalconey = false;
    this.ActiveFourBalconey = false;
    this.ActiveFiveBalconey = false;
    this.ActiveSixBalconey = false;
    this.ActiveSevenBalconey = false;
    this.ActiveEightBalconey = false;
    
    this.ActiveThreePlusBalconey = false;
    this.checkoutForm.get('basicInfo.balconey').setValue('1');
    this.progress = '60px';
    this.progressText = '50';
    this.validationMsg1 = '';
  }
  Balconey2() {
    this.ActiveZeroBalconey = false;
    this.ActiveOneBalconey = false;
    this.ActiveTwoBalconey = true;
    this.ActiveThreeBalconey = false;
    this.ActiveThreePlusBalconey = false;
    this.ActiveFourBalconey = false;
    this.ActiveFiveBalconey = false;
    this.ActiveSixBalconey = false;
    this.ActiveSevenBalconey = false;
    this.ActiveEightBalconey = false;
    
    this.checkoutForm.get('basicInfo.balconey').setValue('2');
    this.progress = '60px';
    this.progressText = '50'; 
     
  }
  Balconey3() {
    this.ActiveZeroBalconey = false;
    this.ActiveOneBalconey = false;
    this.ActiveTwoBalconey = false;
    this.ActiveFourBalconey = false;
    this.ActiveFiveBalconey = false;
    this.ActiveSixBalconey = false;
    this.ActiveSevenBalconey = false;
    this.ActiveEightBalconey = false;
    
    this.ActiveThreeBalconey = true;
    this.ActiveThreePlusBalconey = false;
    this.checkoutForm.get('basicInfo.balconey').setValue('3');
    this.progress = '60px';
    this.progressText = '50';
    
  }
    Balconey4() {
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = false;
      this.ActiveThreeBalconey = false;
      this.ActiveFourBalconey = true;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = false;
      this.ActiveEightBalconey = false;
      
      this.ActiveSevenBalconey = false;
      this.checkoutForm.get('basicInfo.balconey').setValue('4');
      this.progress = '60px';
      this.progressText = '50';
      
    } 
    BalconeyPluss() {
      this.BalconeyPlus = true;
    }
    Balconey5() {
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = false;
      this.ActiveThreeBalconey = false;
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = true;
      this.ActiveSixBalconey = false;
      this.ActiveEightBalconey = false;
      
      this.ActiveSevenBalconey = false;
      this.ActiveThreePlusBalconey = true;
      this.checkoutForm.get('basicInfo.balconey').setValue('5');
      this.progress = '60px';
      this.progressText = '50';
      
    } 
    Balconey6() {
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = false;
      this.ActiveThreeBalconey = false;
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = true;
      this.ActiveEightBalconey = false;
      
      this.ActiveSevenBalconey = false;
      this.ActiveThreePlusBalconey = true;
      this.checkoutForm.get('basicInfo.balconey').setValue('6');
      this.progress = '60px';
      this.progressText = '50';
     
    } 
    Balconey7() {
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = false;
      this.ActiveThreeBalconey = false;
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = false;
      this.ActiveEightBalconey = false;
      
      this.ActiveSevenBalconey = true;
      this.ActiveThreePlusBalconey = true;
      this.checkoutForm.get('basicInfo.balconey').setValue('7');
      this.progress = '60px';
      this.progressText = '50';
      
    } 
    Balconey8() {
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = false;
      this.ActiveThreeBalconey = false;
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = false;
      this.ActiveSevenBalconey = false;
      
      this.ActiveEightBalconey = true;
      this.ActiveThreePlusBalconey = true;
      this.checkoutForm.get('basicInfo.balconey').setValue('8');
      this.progress = '60px';
      this.progressText = '50';
      
    } 
  
  Sell() { 
    this.rentTypetxt='Selling Price';
    this.ActiveRent = false;
    this.ActivePG = false;
    this.ActiveSell = true;
    this.checkoutForm.get('basicInfo.WantTo').setValue('Sell'); 
    this.checkoutForm.get('basicInfo.propertadyAge').setValue(null);
    this.Apartments = false;
    this.IndependantHouses = false;
    this.IndependentFloors = false;
    this.Villas = false;
    this.progress = '5px';
    this.progressText = '10';
    this.checkoutForm.get('basicInfo.bhk').setValue(null);
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;

    this.checkoutForm.get('basicInfo.bathroom').setValue(null);
    this.ActiveOneBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false;
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 

    this.checkoutForm.get('basicInfo.balconey').setValue(null);
    this.ActiveOneBalconey = false;
    this.ActiveTwoBalconey = false;
    this.ActiveThreeBalconey = false;
    this.ActiveFourBalconey = false;
    this.ActiveFiveBalconey = false;
    this.ActiveSixBalconey = false;
    this.ActiveSevenBalconey = false;
    this.ActiveEightBalconey = false; 

    this.checkoutForm.get('basicInfo.furnishedType').setValue(null);
    this.ActiveFurnished = false;
    this.ActiveSemiFurnished = false;
    this.ActiveUnfurnished = false;

    this.checkoutForm.get('basicInfo.coverparking').setValue(null);
    this.ActiveCoverParking0 = false;
    this.ActiveCoverParking1 = false;
    this.ActiveCoverParking2 = false;
    this.ActiveCoverParking3 = false;
    this.ActiveCoverParking4 = false;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8 = false;
    

    this.checkoutForm.get('basicInfo.openparking').setValue(null);
    this.ActiveOpenParking0 = false;
    this.ActiveOpenParking1 = false;
    this.ActiveOpenParking2 = false;
    this.ActiveOpenParking3 = false;
    this.ActiveOpenParking4 = false;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
    

    this.checkoutForm.get('basicInfo.teneandType').setValue('null');
    this.ActiveFamiliy = false;
    this.ActiveBeachlor = false;
    this.ActiveCompany = false;
    this.ActiveOther = false;

    this.checkoutForm.get('basicInfo.mothlyRent').setValue(0); 
    this.checkoutForm.get('basicInfo.mothlyRent1').setValue(null); 

    this.checkoutForm.get('basicInfo.TransactionType').setValue(null);
    this.ActiveNewbooking = false;
    this.ActiveResale = false; 
    this.checkoutForm.get('basicInfo.propertytype').setValue(null);
    this.Plotss=false;
    
    this.checkoutForm.get('basicInfo.PlotPrice').setValue(100000);
    
    this.checkoutForm.get('basicInfo.ConstructionType').setValue(null);
    this.ActiveReadyToMove = false;
    this.ActiveUnderConstruction = false;

    this.checkoutForm.get('basicInfo.PossesionType').setValue('null');
    this.ActiveImmidiate = false;
    this.ActiveFurnished = false;

    this.checkoutForm.get('basicInfo.SecurityDeposite').setValue('null');
    this.securityDepositeNo = false;
    this.securityDepositeYes = false;
    this.checkoutForm.get('basicInfo.SecurityDepositeAmt').setValue(null);

    if(this.userRole!='Broker'){
      this.checkoutForm.get('basicInfo.brokerage').setValue('NO');
      this.checkoutForm.get('basicInfo.brokerageAmt').setValue(0);
     }else{
      this.checkoutForm.get('basicInfo.brokerage').setValue(null);
      this.ChargeBrokerageYes = false;
      this.ChargeBrokerageNo = false;
      this.checkoutForm.get('basicInfo.brokerageAmt').setValue(null);
  
     }
   
    this.checkoutForm.get('basicInfo.MaintainesCharge').setValue(0);
    this.checkoutForm.get('basicInfo.buildUpArea').setValue(null);
    this.checkoutForm.get('basicInfo.PloatArea').setValue(0);

    this.checkoutForm.get('basicInfo.PlotPrice').setValue(100000);

    this.checkoutForm.get('basicInfo.AreaUnit').setValue(0);

    this.checkoutForm.get('basicInfo.Length').setValue(0);

    this.checkoutForm.get('basicInfo.Width').setValue(0);

    this.checkoutForm.get('basicInfo.WFR').setValue(0);

    this.monthlyRent = 0;
    this.rentinK = '';
    this.isRentEnter = false;

    this.maintainceCharge = 0;
    this.maintainK = '';

    this.builduparea = 0;
    this.areainK = '';

      //PG 
    this.checkoutForm.get('basicInfo.RoomType').setValue('null');
    this.ActivePrivateRoom = false;
    this.ActiveDoubleRoom = false;
    this.ActiveTripleRoom = false;
    this.ActiveSharingRoom = false;
    this.checkoutForm.get('basicInfo.PGRent').setValue(0);
    this.checkoutForm.get('basicInfo.BedInRoom').setValue(0);
    this.checkoutForm.get('basicInfo.PgSecurityDeposite').setValue(0);
    this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue('null');
    this.ActiveCupboardRoom = false;
    this.ActiveTableChair = false;
    this.ActiveTv = false;
    this.ActiveAttachbalconey = false;
    this.ActiveAttachBathromm = false;
    this.ActiveMealInclude = false;
    this.checkoutForm.get('basicInfo.SecurityAmenities').setValue('null'); 

    this.ActiveCCTV = false;
    this.ActiveGatedCommunity = false;
    this.ActiveSecurity = false;
    this.ActiveBiometric = false;
    this.ActiveFridge = false;
    this.ActiveWashingMachine = false;
    this.ActiveMicrowave = false;
    this.ActiveWaterPurifier = false;
    this.ActiveTTTable = false;
    this.ActiveTV = false;
    this.ActiveCoffeeMachine = false;
    this.ActiveSnacksMachine = false;
    this.ActiveLaundry = false;
    this.ActiveHousekeeping = false;
    this.ActiveInternet = false;
    this.ActiveGym = false;
    this.ActiveLift = false;
    this.ActiveRegularWaterSupply = false;
    this.ActiveSwimmingPool = false;
    this.ActiveReservedParking = false;
    this.ActivePowerBackup = false; 
      this.checkoutForm.get('basicInfo.PgName').setValue('null'); 
    
      this.checkoutForm.get('basicInfo.ToatalBed').setValue(0);
   
      this.checkoutForm.get('basicInfo.PgFor').setValue('null');
  
   
      this.checkoutForm.get('basicInfo.PgSuitedFor').setValue('null');
   
      this.checkoutForm.get('basicInfo.MealAvalable').setValue('null');
    
      this.checkoutForm.get('basicInfo.NoticePeriod').setValue(0);
    
      this.checkoutForm.get('basicInfo.LockPeriod').setValue(0);
    
      this.checkoutForm.get('basicInfo.CommonArea').setValue('null');
    
      this.checkoutForm.get('basicInfo.PropertyManageBy').setValue('null');
    
      this.checkoutForm.get('basicInfo.PropertyManageStay').setValue('null');
   
      this.checkoutForm.get('basicInfo.NonVegAllowed').setValue('null');
    
      this.checkoutForm.get('basicInfo.OppositeSex').setValue('null');
    
      this.checkoutForm.get('basicInfo.AnyTimeAllowed').setValue('null');
    
      this.checkoutForm.get('basicInfo.VisitorAllowed').setValue('null');
    
      this.checkoutForm.get('basicInfo.GardianAllowed').setValue('null');
    
      this.checkoutForm.get('basicInfo.DrinkingAllowed').setValue('null');
    
      this.checkoutForm.get('basicInfo.SmokingAllowed').setValue('null'); 
  }
    
  Rent() { 
    this.rentTypetxt='Monthly Rent';
    this.ActivePG = false;
    this.ActiveSell = false;
    this.ActiveRent = true;
    this.checkoutForm.get('basicInfo.WantTo').setValue('Rent');  
    this.checkoutForm.get('basicInfo.propertadyAge').setValue(null);
    this.Apartments=false;
    this.IndependantHouses=false;
    this.IndependentFloors=false;
    this.Villas=false;
    this.progress = '5px';
    this.progressText = '10';
    this.checkoutForm.get('basicInfo.bhk').setValue(null);
    this.Active1BHK=false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;

    this.checkoutForm.get('basicInfo.bathroom').setValue(null);
this.ActiveOneBathroom=false;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false;
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false;

    this.checkoutForm.get('basicInfo.balconey').setValue(null);
    this.ActiveOneBalconey = false;
    this.ActiveTwoBalconey=false;
    this.ActiveThreeBalconey = false;
    this.ActiveFourBalconey = false;
    this.ActiveFiveBalconey = false;
    this.ActiveSixBalconey = false;
    this.ActiveSevenBalconey = false;
    this.ActiveEightBalconey=false;
    

    this.checkoutForm.get('basicInfo.furnishedType').setValue(null);
    this.ActiveFurnished=false;
    this.ActiveSemiFurnished=false;
    this.ActiveUnfurnished=false;

    this.checkoutForm.get('basicInfo.coverparking').setValue(null);
    this.ActiveCoverParking0 = false;
    this.ActiveCoverParking1 = false;
    this.ActiveCoverParking2 = false;
    this.ActiveCoverParking3 = false;
    this.ActiveCoverParking4 = false;
    this.ActiveCoverParking5 = false;
    this.ActiveCoverParking6 = false;
    this.ActiveCoverParking7 = false;
    this.ActiveCoverParking8=false;

    this.checkoutForm.get('basicInfo.openparking').setValue(null);
    this.ActiveOpenParking0=false;
    this.ActiveOpenParking1 = false;
    this.ActiveOpenParking2 = false;
    this.ActiveOpenParking3 = false;
    this.ActiveOpenParking4 = false;
    this.ActiveOpenParking5 = false;
    this.ActiveOpenParking6 = false;
    this.ActiveOpenParking7 = false;
    this.ActiveOpenParking8 = false;
    
    
    this.checkoutForm.get('basicInfo.teneandType').setValue(null);
    this.ActiveFamiliy=false;
    this.ActiveBeachlor=false;
    this.ActiveCompany=false;
    this.ActiveOther=false;

    this.checkoutForm.get('basicInfo.mothlyRent').setValue(null); 
    this.checkoutForm.get('basicInfo.mothlyRent1').setValue(0); 

   
      this.checkoutForm.get('basicInfo.TransactionType').setValue('null'); 
      this.ActiveNewbooking = false;
      this.ActiveResale = false; 

 
      this.checkoutForm.get('basicInfo.ConstructionType').setValue('null');
      this.ActiveReadyToMove = false;
      this.ActiveUnderConstruction = false; 
   
      this.checkoutForm.get('basicInfo.PossesionType').setValue('null');
      this.ActiveImmidiate = false;
    this.ActiveFurnished = false; 

    this.checkoutForm.get('basicInfo.buildUpArea').setValue(null);

    this.checkoutForm.get('basicInfo.SecurityDeposite').setValue(null);
    this.securityDepositeNo=false;
    this.securityDepositeYes=false;
    this.checkoutForm.get('basicInfo.SecurityDepositeAmt').setValue(null);


    if(this.userRole!='Broker'){
      this.checkoutForm.get('basicInfo.brokerage').setValue('NO');
      this.checkoutForm.get('basicInfo.brokerageAmt').setValue(0);
     }else{
      this.checkoutForm.get('basicInfo.brokerage').setValue(null);
      this.ChargeBrokerageYes = false;
      this.ChargeBrokerageNo = false;
      this.checkoutForm.get('basicInfo.brokerageAmt').setValue(null);
     }

   
      this.checkoutForm.get('basicInfo.MaintainesCharge').setValue(null);
   
      this.checkoutForm.get('basicInfo.PloatArea').setValue(0);
    
      this.checkoutForm.get('basicInfo.PlotPrice').setValue(100000);
    
      this.checkoutForm.get('basicInfo.AreaUnit').setValue('null');
    
      this.checkoutForm.get('basicInfo.Length').setValue('null');
    
      this.checkoutForm.get('basicInfo.Width').setValue('null');
     
      this.checkoutForm.get('basicInfo.WFR').setValue('null');
    this.monthlyRent = 0;
    this.rentinK='';
    this.isRentEnter=false;

    this.maintainceCharge = 0;
    this.maintainK='';

    this.builduparea = 0;
    this.areainK = '';
      //pg
    this.checkoutForm.get('basicInfo.RoomType').setValue('null');
    this.ActivePrivateRoom=false;
    this.ActiveDoubleRoom = false;
    this.ActiveTripleRoom = false;
    this.ActiveSharingRoom = false;
    this.checkoutForm.get('basicInfo.PGRent').setValue(0);
    this.checkoutForm.get('basicInfo.BedInRoom').setValue(0);
    this.checkoutForm.get('basicInfo.PgSecurityDeposite').setValue(0);
    this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue('null');
    this.ActiveCupboardRoom = false;
    this.ActiveTableChair = false;
    this.ActiveTv = false;
    this.ActiveAttachbalconey = false;
    this.ActiveAttachBathromm= false;
    this.ActiveMealInclude = false;
    this.checkoutForm.get('basicInfo.SecurityAmenities').setValue('null');
    
    

    this.ActiveCCTV = false;
    this.ActiveGatedCommunity = false;
    this.ActiveSecurity = false;
    this.ActiveBiometric = false;
    this.ActiveFridge = false;
    this.ActiveWashingMachine = false;
    this.ActiveMicrowave = false;
    this.ActiveWaterPurifier = false;
    this.ActiveTTTable = false;
    this.ActiveTV = false;
    this.ActiveCoffeeMachine = false;
    this.ActiveSnacksMachine = false;
    this.ActiveLaundry = false;
    this.ActiveHousekeeping = false;
    this.ActiveInternet = false;
    this.ActiveGym = false;
    this.ActiveLift= false;
    this.ActiveRegularWaterSupply = false;
    this.ActiveSwimmingPool = false;
    this.ActiveReservedParking = false;
    this.ActivePowerBackup = false; 

      this.checkoutForm.get('basicInfo.PgName').setValue('null');
    
      this.checkoutForm.get('basicInfo.ToatalBed').setValue(0);
    
      this.checkoutForm.get('basicInfo.PgFor').setValue('null');
   
      this.checkoutForm.get('basicInfo.PgSuitedFor').setValue('null');
   
      this.checkoutForm.get('basicInfo.MealAvalable').setValue('null');
 
      this.checkoutForm.get('basicInfo.NoticePeriod').setValue(0);
   
      this.checkoutForm.get('basicInfo.LockPeriod').setValue(0);
    
      this.checkoutForm.get('basicInfo.CommonArea').setValue('null');
    
      this.checkoutForm.get('basicInfo.PropertyManageBy').setValue('null');
    
      this.checkoutForm.get('basicInfo.PropertyManageStay').setValue('null');
   
      this.checkoutForm.get('basicInfo.NonVegAllowed').setValue('null');
   
      this.checkoutForm.get('basicInfo.OppositeSex').setValue('null');
    
      this.checkoutForm.get('basicInfo.AnyTimeAllowed').setValue('null');
   
      this.checkoutForm.get('basicInfo.VisitorAllowed').setValue('null');
    
      this.checkoutForm.get('basicInfo.GardianAllowed').setValue('null');
    
      this.checkoutForm.get('basicInfo.DrinkingAllowed').setValue('null');
   
      this.checkoutForm.get('basicInfo.SmokingAllowed').setValue('null');

  }

  PG() {
    this.rentTypetxt='Monthly Rent';
    this.ActiveRent = false;
    this.ActiveSell = false;
    this.ActivePG = true;
    this.BhkValue='';
    this.BhkValue='PG';
    this.PropertyTypeValue = '';
    this.progress = '5px';
    this.progressText = '10';
    this.checkoutForm.get('basicInfo.WantTo').setValue('PG'); 
    
      this.checkoutForm.get('basicInfo.TransactionType').setValue('null');
      this.ActiveNewbooking = false;
      this.ActiveResale = false;
    
      this.checkoutForm.get('basicInfo.ConstructionType').setValue('null');
      this.ActiveReadyToMove = false;
      this.ActiveUnderConstruction = false;
    
      this.checkoutForm.get('basicInfo.PossesionType').setValue('null');
      this.ActiveImmidiate = false;
      this.ActiveFurnished = false;
    
      this.checkoutForm.get('basicInfo.PloatArea').setValue(0);
    
      this.checkoutForm.get('basicInfo.PlotPrice').setValue(100000);
     
      this.checkoutForm.get('basicInfo.AreaUnit').setValue('null');
    
      this.checkoutForm.get('basicInfo.Length').setValue('null');
    
      this.checkoutForm.get('basicInfo.Width').setValue('null');
    
      this.checkoutForm.get('basicInfo.WFR').setValue('null');
    
      this.checkoutForm.get('basicInfo.propertytype').setValue('null');
     
    this.checkoutForm.get('basicInfo.propertadyAge').setValue(0);
    
      this.checkoutForm.get('basicInfo.bhk').setValue('null');
    
      this.checkoutForm.get('basicInfo.bathroom').setValue('null');
    
      this.checkoutForm.get('basicInfo.balconey').setValue('null');
    
      this.checkoutForm.get('basicInfo.furnishedType').setValue('null');
    
      this.checkoutForm.get('basicInfo.coverparking').setValue('null');
    
      this.checkoutForm.get('basicInfo.openparking').setValue('null');
     
      this.checkoutForm.get('basicInfo.teneandType').setValue('null');
    
      this.checkoutForm.get('basicInfo.AvalableFrom').setValue('null');
    
      this.checkoutForm.get('basicInfo.mothlyRent').setValue(0);
      this.checkoutForm.get('basicInfo.mothlyRent1').setValue(0); 

    
      this.checkoutForm.get('basicInfo.MaintainesCharge').setValue(0);
    
      this.checkoutForm.get('basicInfo.SecurityDeposite').setValue('null');
    
      this.checkoutForm.get('basicInfo.SecurityDepositeAmt').setValue('null');
     
      this.checkoutForm.get('basicInfo.brokerage').setValue('null');
    
      this.checkoutForm.get('basicInfo.brokerageAmt').setValue(0);
    
      this.checkoutForm.get('basicInfo.buildUpArea').setValue(0);
    
      this.checkoutForm.get('basicInfo.PgName').setValue(null);
   
      this.checkoutForm.get('basicInfo.ToatalBed').setValue(null);
    
      this.checkoutForm.get('basicInfo.PgFor').setValue(null);
      this.BoyPgYes = false;
      this.GirlPgYes = false;
   
      this.checkoutForm.get('basicInfo.PgSuitedFor').setValue(null);
      this.ActiveStudent=false;
      this.ActiveProfessionals=false;
    
      this.checkoutForm.get('basicInfo.MealAvalable').setValue(null);
      this.ActiveMealYes=false;
      this.ActiveMealNo=false;
    
      this.checkoutForm.get('basicInfo.NoticePeriod').setValue(null);

    
      this.checkoutForm.get('basicInfo.LockPeriod').setValue(null);
    
      this.checkoutForm.get('basicInfo.CommonArea').setValue(null);
      this.ActiveLivingRoom=false;
      this.ActiveKitchen=false;
      this.ActiveDining=false;
      this.ActiveStudyRoom=false;
      this.ActiveBreakout=false;
    
      this.checkoutForm.get('basicInfo.PropertyManageBy').setValue(null);
      this.ActiveLandlord=false;
      this.ActiveCaretaker=false;
      this.ActiveDedicated=false;
   
      this.checkoutForm.get('basicInfo.PropertyManageStay').setValue(null);
      this.ActiveStayNo=false;
      this.ActiveStayYes=false;
   
      this.checkoutForm.get('basicInfo.NonVegAllowed').setValue(null);
      this.ActiveNonVegNo=false;
      this.ActiveNonVegYes=false;
    
      this.checkoutForm.get('basicInfo.OppositeSex').setValue(null);
      this.ActiveOppoSexYes=false;
      this.ActiveOppoSexNo=false;
    
      this.checkoutForm.get('basicInfo.AnyTimeAllowed').setValue(null);
      this.ActiveTimeAllowedYes=false;
      this.ActiveTimeAllowedNo=false;
   
      this.checkoutForm.get('basicInfo.VisitorAllowed').setValue(null);
    this.ActiveAllowedNo = false;
    this.ActiveAllowedYes = false;
    
    this.checkoutForm.get('basicInfo.GardianAllowed').setValue(null);
    this.ActiveGuardianYes = false;
    this.ActiveGuardianNo = false;
    
      this.checkoutForm.get('basicInfo.DrinkingAllowed').setValue(null);
      this.ActiveDrinkingYes=false;
      this.ActiveDrinkingNo=false;
    
      this.checkoutForm.get('basicInfo.SmokingAllowed').setValue(null);
      this.ActiveSmokingYes=false;
      this.ActiveSmokingNo=false;
      this.checkoutForm.get('basicInfo.MealOffering').setValue(null);
      this.ActiveBreakfast = false;
      this.ActiveLunch = false;
      this.ActiveDinner = false;
   
      this.checkoutForm.get('basicInfo.SecurityDepositeAmt').setValue(null);
     
    this.checkoutForm.get('basicInfo.RoomType').setValue(null);
    this.ActivePrivateRoom = false;
    this.ActiveDoubleRoom = false;
    this.ActiveTripleRoom = false;
    this.ActiveSharingRoom = false;
    this.checkoutForm.get('basicInfo.PGRent').setValue(null);
    this.checkoutForm.get('basicInfo.BedInRoom').setValue(null);
    this.checkoutForm.get('basicInfo.PgSecurityDeposite').setValue(null);
    this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(null);
    this.ActiveCupboardRoom = false;
    this.ActiveTableChair = false;
    this.ActiveTv = false;
    this.ActiveAttachbalconey = false;
    this.ActiveAttachBathromm = false;
    this.ActiveMealInclude = false;
    this.checkoutForm.get('basicInfo.SecurityAmenities').setValue(null);
    this.Facility='';
    this.Amenties='';


    this.ActiveCCTV = false;
    this.ActiveGatedCommunity = false;
    this.ActiveSecurity = false;
    this.ActiveBiometric = false;
    this.ActiveFridge = false;
    this.ActiveWashingMachine = false;
    this.ActiveMicrowave = false;
    this.ActiveWaterPurifier = false;
    this.ActiveTTTable = false;
    this.ActiveTV = false;
    this.ActiveCoffeeMachine = false;
    this.ActiveSnacksMachine = false;
    this.ActiveLaundry = false;
    this.ActiveHousekeeping = false;
    this.ActiveInternet = false;
    this.ActiveGym = false;
    this.ActiveLift = false;
    this.ActiveRegularWaterSupply = false;
    this.ActiveSwimmingPool = false;
    this.ActiveReservedParking = false;
    this.ActivePowerBackup = false; 

    this.monthlyRent = 0;
    this.rentinK = '';
    this.isRentEnter = false;

    this.maintainceCharge = 0;
    this.maintainK = '';

    this.builduparea = 0;
    this.areainK = '';
  }
 
  RK() {
    this.BhkValue = '1 RK';
    this.ActiveRK = true;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false;
    this.checkoutForm.get('basicInfo.bhk').setValue('1 RK');
    this.progress = '30px';
    this.progressText = '30';
 
  }
  OneBHK() {
    this.BhkValue = '1 BHK';
    this.ActiveRK = false;
    this.Active1BHK = true;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active4BHK = false; 
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.Active3PlusBHK = false;
    this.checkoutForm.get('basicInfo.bhk').setValue('1 BHK');
    this.progress = '30px';
    this.progressText = '30'; 
  }
  TwoBHK() {
    this.BhkValue = '2 BHK';
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = true;
    this.Active4BHK = false;
    this.Active3BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.Active3PlusBHK = false;
    this.checkoutForm.get('basicInfo.bhk').setValue('2 BHK');
    this.progress = '30px';
    this.progressText = '30';
    
  
  }
  ThreeBHK() {
    this.BhkValue = '3 BHK';
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.Active3BHK = true;
    this.Active3PlusBHK = false;
    this.checkoutForm.get('basicInfo.bhk').setValue('3 BHK');
    this.progress = '30px';
    this.progressText = '30';
 
  }

  BHKPlus() {
    this.PlusBhk = true;

  }
  FourBHK() {
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.Active4BHK = true;
    this.checkoutForm.get('basicInfo.bhk').setValue('4 BHK');
    this.progress = '30px';
    this.progressText = '30';
 
  }
  FiveBHK(){
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false; 
      this.Active4BHK = false;  
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.Active5BHK = true;
    this.checkoutForm.get('basicInfo.bhk').setValue('5 BHK');
    this.progress = '30px';
    this.progressText = '30';
 
  }

  SixBHK() {
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.Active6BHK = true;
    this.checkoutForm.get('basicInfo.bhk').setValue('6 BHK');
    this.progress = '30px';
    this.progressText = '30';
   
  }
  SevenBHK() {
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.Active7BHK = true;
    this.checkoutForm.get('basicInfo.bhk').setValue('7 BHK');
    this.progress = '30px';
    this.progressText = '30';
 
  }
  EightBHK() {
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = true;
    this.Active9BHK = false;
    this.Active10BHK = false;
    this.checkoutForm.get('basicInfo.bhk').setValue('8 BHK');
    this.progress = '30px';
    this.progressText = '30';
    
  }
  NineBHK() {
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = true;
    this.Active10BHK = false;
    this.checkoutForm.get('basicInfo.bhk').setValue('9 BHK');
    this.progress = '30px';
    this.progressText = '30';
   
  }
  TenBHK() {
    this.ActiveRK = false;
    this.Active1BHK = false;
    this.Active2BHK = false;
    this.Active3BHK = false;
    this.Active3PlusBHK = false;
    this.Active4BHK = false;
    this.Active5BHK = false;
    this.Active6BHK = false;
    this.Active7BHK = false;
    this.Active8BHK = false;
    this.Active9BHK = false;
    this.Active10BHK = true;
    this.checkoutForm.get('basicInfo.bhk').setValue('10 BHK');
    this.progress = '30px';
    this.progressText = '30';
  }

  Apartment() {
    this.BhkValue = '';
    this.PropertyTypeValue = 'Apartment';
    if (this.BhkValue == 'Property Type')
      this.BhkValue = '';
    if (this.checkoutForm.get('basicInfo.propertytype').value == null) {
      this.progress = '20px';
      this.progressText = '20';
      this.progress1 = '20px';
      this.progressText1 = '20';
    }
    if (this.checkoutForm.get('basicInfo.propertytype').value == null) {
      this.progress = '20px';
      this.progressText = '20';
      this.progress1 = '20px';
      this.progressText1 = '20';
    }
    this.Apartments = true;
    this.IndependantHouses = false;
    this.IndependentFloors = false;
    this.Villas = false;
    this.Plotss = false;
    this.checkoutForm.get('basicInfo.propertytype').setValue('Apartment'); 
  }
  Villa() {
    this.BhkValue = '';
    if (this.BhkValue == 'Property Type')
      this.BhkValue = '';
    if (this.checkoutForm.get('basicInfo.propertytype').value == null) {
      this.progress = '20px';
      this.progressText = '20';
      this.progress1 = '20px';
      this.progressText1 = '20';
    }
    this.PropertyTypeValue = 'Villa';
    this.Apartments = false;
    this.IndependantHouses = false;
    this.IndependentFloors = false;
    this.Villas = true;
    this.Plotss = false;
    this.checkoutForm.get('basicInfo.propertytype').setValue('Villa');
    
  }
  IndependanceHouse() {
    this.BhkValue = '';
    if (this.checkoutForm.get('basicInfo.propertytype').value == null) {
      this.progress = '20px';
      this.progressText = '20';
      this.progress1 = '20px';
      this.progressText1 = '20';
    }
    if (this.BhkValue == 'Property Type')
      this.BhkValue = '';
    this.PropertyTypeValue = 'Independent House';
    this.Apartments = false;
    this.IndependantHouses = true;
    this.IndependentFloors = false;
    this.Villas = false;
    this.Plotss = false;
    this.checkoutForm.get('basicInfo.propertytype').setValue('Independent House');
    
  }
  IndependanceFloor() {
    this.BhkValue = '';
    if (this.BhkValue == 'Property Type')
      this.BhkValue = '';
    if (this.checkoutForm.get('basicInfo.propertytype').value == null) {
      this.progress = '20px';
      this.progressText = '20';
      this.progress1 = '20px';
      this.progressText1 = '20';
    }
    this.PropertyTypeValue = 'Independent Floor';
    this.Apartments = false;
    this.IndependantHouses = false;
    this.IndependentFloors = true;
    this.Villas = false;
    this.Plotss = false;
    this.checkoutForm.get('basicInfo.propertytype').setValue('Independent Floor');
   
  } 
  Submit(){
    this.FinalSaving=true;
    
     this.checkoutForm.get('basicInfo.CommonArea').setValue(this.CommonAreas.substring(0,this.CommonAreas.length-1));
     this.checkoutForm.get('basicInfo.FacilitiesOffered').setValue(this.Facility.substring(0, this.Facility.length-1));
   
   
    if (this.imgs.length == 0) {
      this.cityServices.postDummyImg(this.userName, this.randomId).subscribe(() => {
      });
    }
    if (this.imgs.length != 0 && this.checkoutForm.get('PhotosInfo.cover').value == null) {
      this.toastr.warning("Please select cover image");
      return;
    }
    if (this.checkoutForm.get('basicInfo.mothlyRent').value == 0) {
      this.checkoutForm.get('basicInfo.mothlyRent').setValue(this.checkoutForm.get('basicInfo.mothlyRent1').value);
      this.FinalPrice=this.checkoutForm.get('basicInfo.mothlyRent').value;
    }
    
    if(this.ActiveRent==true){
      this.checkoutForm.get('basicInfo.PlotPrice').setValue(0);
      this.FinalPrice=this.checkoutForm.get('basicInfo.mothlyRent').value;
    }
    if(this.ActiveSell==true && this.Plotss==true){ 
      this.FinalPrice=this.checkoutForm.get('basicInfo.PlotPrice').value;
    }
    if(this.ActivePG==true){ 
      this.FinalPrice=this.checkoutForm.get('basicInfo.PGRent').value;
    }
    const create=this.finalSubmit();
    this.services.postdata(create).subscribe(() => {  
      this.toastr.success("Data Saved! Property Will Review and Update shortly"); 
      this.checkoutForm.reset();
      localStorage.setItem("frompost","true");
      this._router.navigate(['/UserEdit',this.userId]);
      this.FinalSaving=false;
    })
  } 
 
  private finalSubmit() {
    return {
      id: 0,
      basicDetailId: this.checkoutForm.get('basicInfo').value,
      locationId: this.checkoutForm.get('AddressInfo').value, 
      userId:this.propertyIds,
      isConfirmed: false,
      isDecline: false,
      price:this.FinalPrice,
      uniqueID:this.randomId
    };
  }
    createCheckoutForm() {
      this.checkoutForm = this.fb.group({
        basicInfo: this.fb.group({
          WantTo: [null, Validators.required],
          propertytype: [null, Validators.required],
          propertadyAge: [null, Validators.required],
          bhk: [null, Validators.required],
          bathroom: [null, Validators.required],
          balconey: [null, Validators.required],
          furnishedType: [null, Validators.required],
          coverparking: [null, Validators.required],
          openparking: [null, Validators.required],
          teneandType: [null, Validators.required],
          AvalableFrom: [null],
          mothlyRent: [null,Validators.required],
          mothlyRent1: [null,Validators.required],
          SecurityDeposite: [null, Validators.required],
          SecurityDepositeAmt: [null],
          brokerage: [null,Validators.required],
          brokerageAmt: [null],
          buildUpArea: [null, Validators.required],
          CarpetArea: [null],
          MaintainesCharge: [null, Validators.required],
          TransactionType: [null, Validators.required],
          ConstructionType: [null, Validators.required],
          PossesionType: [null, Validators.required],
          PloatArea: [null, Validators.required],
          PlotPrice: [null,Validators.required],
          AreaUnit: [null, Validators.required],
          FloorRange: [null],
          Length: [null],
          Width: [null],
          WFR: [null],

          // PG FIELS
          RoomType: [null, Validators.required],
          PGRent: [null, Validators.required],
          BedInRoom: [null],
          PgSecurityDeposite: [null, Validators.required],
          FacilitiesOffered: [null, Validators.required],
          SecurityAmenities: [null, Validators.required],
          AllowedTime: [null],
          PgName: [null],
          ToatalBed: [null, Validators.required],
          PgFor: [null, Validators.required],
          PgSuitedFor: [null, Validators.required],
          MealAvalable: [null, Validators.required],
          MealOffering: [null],
          NoticePeriod: [null, Validators.required],
          LockPeriod: [null, Validators.required],
          CommonArea: [null, Validators.required],
          PropertyManageBy: [null, Validators.required],
          PropertyManageStay: [null, Validators.required],
          NonVegAllowed: [null, Validators.required],
          OppositeSex: [null, Validators.required],
          AnyTimeAllowed: [null, Validators.required],
          VisitorAllowed: [null, Validators.required],
          GardianAllowed: [null, Validators.required],
          DrinkingAllowed: [null, Validators.required],
          SmokingAllowed: [null, Validators.required]
        }),
        AddressInfo: this.fb.group({
          City: [null, Validators.required],
          Project: [null],
          Locality: [null, Validators.required],
          SectorNo: [null],
          PlotNo: [null],
          PocketNo: [null]
        }),
        PhotosInfo: this.fb.group({
          Url: [null],
          tag: [null],
          cover: [null],
          UniqueId: [null]
        }),
      });
    }
    transform(number: any, args?: any): any {
      if (isNaN(number)) return null; // will only work value is a number
      if (number === null) return null;
      if (number === 0) return null;
      let abs = Math.abs(parseInt(number));
      const rounder = Math.pow(10, 2);
      const isNegative = number < 0; // will also work for Negetive numbers
      let key = '';

      const powers = [
        { key: 'Cr', value: Math.pow(10, 7) },
        { key: 'Lacs', value: Math.pow(10, 5) },
        { key: 'K',  value: 1000 }
      ];

      for (let i = 0; i < powers.length; i++) {
        let reduced = abs / powers[i].value;
        reduced = Math.round(reduced * rounder) / rounder;
        if (reduced >= 1) {
          abs = Number(reduced);
          key = powers[i].key;
          break;
        }
      }
      return (isNegative ? '-' : '') + abs + key;
    }
    transformsuser(value: any) {
      if (value) {
        let num: any = Number(value);
        if (num) {
          if ((num = num.toString()).length > 9) { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
          const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
          if (!n) { return ''; }
          let str = '';
          str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
          str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
          str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
          str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
          str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
            (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
              this.a[n[5][1]]) + '' : '';

          this.InWords = str.trim().toUpperCase() + ' RUPEES ONLY';
          return str;
        } else {
          this.InWords = "";
          return '';
        }
      } else {
        this.InWords = "";
      }
    }
}
