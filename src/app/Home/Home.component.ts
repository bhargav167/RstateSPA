import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../Services/Post.service';  
import { ISave } from '../Shared/Model/ISave';
import { All } from '../Shared/Model/All'; 
import { Lightbox } from 'ngx-lightbox'; 
import { AdminManageFieldsService } from '../Services/AdminManageFields.service';
import { PropertyConfig } from '../Shared/Model/PropertyConfiguration/PropertyConfig';
import { PaginatedResult, Pagination } from '../Shared/Model/Pagination';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService} from './../Services/Home/home.service';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import Swal from 'sweetalert2'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserContact} from './../Shared/Model/UserContact/IUserContact';
import { EmailSenderService} from './../Services/EmailServices/emailSender.service';
import { EmailBody} from './../Shared/Model/UserContact/EmailBody';
import { LoginOtpService} from '../Services/AuthServices/LoginOtp.service';
import { AdminRegister } from '../Shared/Model/Auth/Admin/AdminRegister';
import { AdminService } from '../Services/Admin.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from "rxjs/operators"; 
import { Observable, Subject,of,fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const APIKEY = "e8067b53";

const PARAMS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});
 @Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})

export class HomeComponent implements OnInit {
   propertyConfig:PropertyConfig;
   pagination: Pagination; 
   userParams: any = {};
   currentPage: number = 1;
   itemsPerPage: number = 6;
  Alldetais: All;
   detais:All;
  displayToUser:All;
  isShow = 'block';
  searchval:string; 
  otherProperty:ISave[];
  imageObject = [];
  amenties:string[]=[];
  signupactive:boolean=false;
  thumb = ''; 
  location:string='Delhi';
  locality: string = 'All'; 
  sectors: string = 'All'; 
  pgFor:string='PG For';
  country: any;
  url;
  names;
  email:string;
  ownerimageUrl:string;
  hideemail:string;
  hideuserPhone: string;
  userPhone: string;
  userId: string;
  uniqueId:number;
  userContact: IUserContact; 
  SlideOptions = { items: 1, dots: false, nav: true };
  CarouselOptions = {
    items: 3, dots: false, nav: true,
    mouseDrag: true, pullDrag: true
  };
  isLogin: boolean = false;
  isDetailLoading: boolean = true;
  imgLoaded: boolean = false;
  amentiesloded: boolean = false;
  selected: boolean = true;
  IshomeLoading:boolean=true;
  public btnLoader: boolean;
  public btnLoader1: boolean;
  public btnLoader2: boolean;
  city: any;
  sector: any;
  keyword = 'citynName';
  keyword1 = 'localityName';
  keyword2 = 'sectorName';
  SellerContact:FormGroup;
  EmailContact: FormGroup;
  mailBody: EmailBody;
  phoneNo: string;
  registerFields: FormGroup;
   role: string=''; 
  authRegister: AdminRegister;
  emailEnter:boolean = false;
  passwordEnter:boolean=false;
   loginTab:boolean=true;
   resTab: boolean = false;
  loginModal:FormGroup;
   fullname: string;
   isPhoneLoginFailed:boolean=false;
   isEmailLoginFailed: boolean = false;
   isPasswordLoginFailed:boolean=false;
   FromPhoneLogin:boolean=false;
   DefaultPropImages: string;
   @Input() loginUser;
   otpValue:number;
   otpNumber:number;
   SecurityAmenities=new Array();
   AmentiesList: any= {
     CCTV: false,
     GatedCommunity: false,
     Security: false,
     Microwave: false,
     WaterPurifier: false,
     TTTable: false,
     Fridge:false,
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
     Biometric:false
   };
   timeLeft: number = 10;
   interval;
   resendActive:boolean;
   propertytoload:string='All';
   FirstLogin:boolean=false;
   signUpRole:boolean=false;
   getotp:boolean=true;
   gototp:boolean=false;
   rentOrSell:string='All';
   hidesearchlist:boolean=false;
   //Email Variable
   propIds:number;
   propImgUrl:string;
   EmailpropType:string;
   htmlBody:string;
   @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;
   public clients: Observable<any[]>;
   public ClientName = '';
   public flag: boolean = true; 
   isLogins:boolean;
   constructor(private services: PostService,
     private httpClient: HttpClient,
     private fb: FormBuilder,
     private homeServices: HomeService, private authService: SocialAuthService, private userprofileServices: AdminRegisterService,
     private adminservices: AdminService, private emailServices: EmailSenderService, private otpServices: LoginOtpService,
     private _router: Router,private _http:HttpClient, private _lightbox: Lightbox, private toastr: ToastrService,
    private  adminmanage: AdminManageFieldsService) {
      let token=localStorage.getItem('token');
      this._http.post(environment.ApiUrl+'ApplicationManager/tokenMatch/'+token,{}).subscribe((data:boolean)=>{
        this.isLogins=data;
        if(this.isLogin==false){
          localStorage.clear();
          _router.navigateByUrl('/');
        }
       
     })
  

      if (localStorage.getItem('role') == 'SuperAdmin') {
      _router.navigateByUrl('/adminpanel');
      return;
      }
         if (localStorage.getItem('role') != null) {
       this.isLogin = true;
       this.fullname = localStorage.getItem("name");
     }

   }
   ActiveTabowner() {
     this.role = 'Owner';
   }
   ActiveTabbroker() {
     this.role = 'Broker';
   }
   ActiveTabbuilder() {
     this.role = 'Builder';
   }

   RedirectToDash(userId){
     this._router.navigateByUrl(`/UserEdit/${userId}`);
     localStorage.setItem("dash","true");
   }
   loadDefaultPropImages() {
     this.adminservices.GetDefaultPropertyImg().subscribe((data: any) => {
       this.DefaultPropImages = data.url;
     })
   }
    //Registrations
   createRegisterAdmin() {
     this.registerFields = this.fb.group({
      Email: [''],
      PhoneNo: [''],
      FullName: ['', Validators.required],
      Password: ['', Validators.required],
      userId: [''],
      ConfirmPassword: ['', Validators.required]
     }, { validator: this.passwordMatchValidator })
   }
   passwordMatchValidator(g: FormGroup) {
     return g.get('Password').value === g.get('ConfirmPassword').value ? null : { 'mismatch': true };
   }
   registerUser(){ 
     if(this.role==''){
       this.toastr.show('Please Select Role first');
       return;
     }
     if (this.registerFields.get('Email').value == '' && this.registerFields.get('PhoneNo').value == ''){
       this.toastr.info('Please enter email or Phone No..');
       return;
     }
     this.btnLoader2 = true;
     if (this.registerFields.valid) {
       this.authRegister = Object.assign({}, this.registerFields.value);
       this.authRegister.userId = this.authRegister.PhoneNo;
       this.registerFields.get('userId').setValue(this.authRegister.Email);
       this.userprofileServices.register(this.authRegister, this.role).subscribe((data) => {
         this.toastr.success('Registration Done!', 'Data Saved');
         this.registerFields.reset();
         this.btnLoader2 = false;
         this.createRegisterAdmin();
       }, error => {
         this.toastr.error('Registration Failed!', 'User already exist whith this identity', error);
         this.btnLoader2 = false;
       }, () => {
       });
     }
   }
OtpTimer(){ 
  this.timeLeft = 60;
  setInterval(() => {
    if (this.timeLeft > 0) { 
      this.timeLeft--;
      this.resendActive=false;
    } else {
     this.resendActive=true;
    }
  }, 1000);
}
   Resend() {
     this.SendOtp(this.phoneNo);
     this.OtpTimer();
   }
   ActiveTab(){
     this.loginTab=true;
     this.resTab=false;
     this.signUpRole = false;
     this.isEmailLoginFailed=false;
   }
   ActiveTab2() {
     this.loginTab = false;
     this.resTab = true;
     this.signUpRole=true;
   }
   ActiveTab2FromHere(){
     this.loginTab = false;
     this.resTab = true;
     this.registerFields.get('Email').setValue(this.phoneNo);
     this.isEmailLoginFailed = false;
   }
   PhoneOrEmail($event) {
     this.phoneNo = $event.target.value;
     this.loginModal.get('UserName').setValue(this.phoneNo);
   }
   SendOtp(MobNo: string) {
     this.otpValue=0;
     this.otpServices.SendOtp(MobNo).subscribe((data:number) => { 
       this.otpValue=data;
       console.log(this.otpValue);
     })
   }
   VerifyOTP(otp:number){ 
     this.otpServices.VerifyOtp(otp,this.otpValue).subscribe((data:boolean)=>{  
       if(data==true){ 
          
         this.otpServices.otpLogin(this.phoneNo,this.role).subscribe((res: any) => {
           localStorage.setItem("token", res.token);
           localStorage.setItem("role", res.selectedRole);
           localStorage.setItem("userId", res.id);
           localStorage.setItem("username", res.userName);
           localStorage.setItem("propertyId", res.userId);
           localStorage.setItem("url", res.imagUrl);
           localStorage.setItem("name", res.userName);
              this.toastr.success("Login Successful");
              this.otpServices.confirmPhone(this.phoneNo).subscribe((data)=>{
                if (localStorage.getItem("ToListing") == "post") {
                  this._router.navigateByUrl('/my-listings');
                } else {
                  window.location.reload();
                }
              })
           }, err => {
             this.btnLoader1 = false;
             this.registerFields.get('PhoneNo').setValue(this.phoneNo);
             //RegisterWithPhone only 
             this.registerFields.get('Email').setValue(this.phoneNo);
             this.registerFields.get('userId').setValue(this.phoneNo);
             this.registerFields.get('FullName').setValue(this.phoneNo);
             this.registerFields.get('Password').setValue(this.phoneNo); 
             this.userprofileServices.register(this.registerFields.value, this.role).subscribe(() => {
               this.loginModal.get('UserName').setValue(this.phoneNo);
               this.loginModal.get('Password').setValue(this.phoneNo);
              this.userprofileServices.loginByPhone1(this.loginModal.value).subscribe((res: any) => {
                localStorage.setItem("propertyId", res.userId);
                localStorage.setItem("url", res.imagUrl);
                 localStorage.setItem("token", res.token);
                 localStorage.setItem("role", res.selectedRole);
                 localStorage.setItem("userId", res.id);
                 localStorage.setItem("username", res.userName);
                 localStorage.setItem("name", res.userName);

                 if (localStorage.getItem("ToListing") == "post") {
                   this._router.navigateByUrl('/my-listings');
                 } else {
                   window.location.reload();
                 }
               }, err => {
                 this.isPasswordLoginFailed = true;
                 this.btnLoader1 = false;
               })

               this.registerFields.reset();
               this.btnLoader2 = false;
               this.createRegisterAdmin();
             }, error => {
               this.toastr.error('Registration Failed!', 'Problem in saving Data', error);
               this.btnLoader2 = false;
             }, () => {
             });

           })
       } else{
         this.toastr.error("Opps! Please enter correct OTP");
         this.btnLoader1 = false;
       }
     })
   }
   OTP($event){
     if(!isNaN($event.target.value)){
       this.otpNumber = $event.target.value;
       if(this.otpNumber.toString().length==6){
         this.login();
       }
     }else{
       this.toastr.info('Please Enter Valid Otp');
       return;
     }
   }
   GenerateOtp(){
     this.getotp=false;
    this.SendOtp(this.phoneNo);
    this.gototp=true;
    this.OtpTimer();
   }
   CheckLogin(){ 
     if (!this.phoneNo.includes('@')) {
       this.FromPhoneLogin=true;
       this.getotp=true;
       
       this.userprofileServices.checklogin(this.phoneNo).subscribe((res: any) => {
         if (res == 200) {
          this.emailEnter = false;
           this.passwordEnter = true;
         
         } else {
           this.FirstLogin=true;
           this.emailEnter=false;
         }
       }
         , err => {
           this.isPhoneLoginFailed=true;  
         })  
     } else {  
       this.FromPhoneLogin=false; 
       this.userprofileServices.checkloginMail(this.phoneNo).subscribe((res: any) => { 
         if (res == 200) {
           this.emailEnter = false;
           this.passwordEnter = true;
         } else {  
         }
       },err=>{  
           this.isEmailLoginFailed = true;
       }) 
     }
     this.isPhoneLoginFailed = false;
     this.isEmailLoginFailed=false;  
    }
   RoleSelected(){
     this.FirstLogin =false;
     this.emailEnter = false;
     this.passwordEnter=true;
     this.SendOtp(this.phoneNo);
   }
   signInWithGoogle(): void {
     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
       .then(x => {
         this.loginUser = x; 
         this.registerFields.get('Email').setValue(x.email);
       
         this.registerFields.get('FullName').setValue(x.firstName + ' ' + x.lastName);
         this.registerFields.get('userId').setValue(x.email);
         this.registerFields.get('PhoneNo').setValue('***');
         this.registerFields.get('Password').setValue("test");
         this.registerFields.get('ConfirmPassword').setValue("test");
         localStorage.setItem("url", x.photoUrl);
         localStorage.setItem("propertyId", x.id);
         localStorage.setItem("name", x.name);
         localStorage.setItem("token", x.idToken);
         localStorage.setItem("role", "User");
         localStorage.setItem("email", x.email);
         localStorage.setItem("userId", x.id);
         localStorage.setItem("username", x.email); 
         this.authRegister = Object.assign({}, this.registerFields.value);  
         this.userprofileServices.register(this.authRegister, this.role).subscribe(() => {
           this.toastr.success('Registration Done!', 'Data Saved'); 
           this.registerFields.reset();
           this.btnLoader2 = false;
           this.createRegisterAdmin();
         }, error => {
         //  this.toastr.error('Registration Failed!', 'Problem in saving Data', error);
           this.btnLoader2 = false;
         }, () => {
         });

         if (localStorage.getItem("ToListing") == "post") { 
           window.location.href = "/my-listings";
           this.toastr.success("Login Successful");
           
         } else {  
           window.location.href="/"; 
           this.toastr.success("Login Successful");
           
         }
       });
   }
   createRegisterUserByEmail() {
     this.registerFields = this.fb.group({
       UserName: ['', Validators.required],
       Email: ['', Validators.required],
       FullName: ['', Validators.required],
       PhoneNo: [''],
       userId: ['', Validators.required],
       Password: ['@@Testdemo123'],
       ConfirmPassword: ['@@Testdemo123']
     })
   }
   createLoginForm() { 
     this.loginModal = this.fb.group({
       UserName: ['', Validators.required],
       Password: ['']
     })
   }
   LoginModal(){
     this.createLoginForm();
     this.emailEnter=true;
   }
   BackLogin(){
     this.emailEnter = true;
     this.passwordEnter = false;
   }
   CloseModal(){
     this.role='';
     this.signUpRole=false;
     this.emailEnter=false;
     this.passwordEnter=false;
     this.loginTab=true;
     this.resTab=false;
     this.isPhoneLoginFailed = false;
     this.isEmailLoginFailed = false; 
     this.isPasswordLoginFailed=false;
   }
   login() {  
     this.btnLoader1=true;
     if (!this.phoneNo.includes('@')) {  
       this.LoginByPhone();
     } else {
       this.LoginByEmail();
     }
   } 
   Password($event){
     this.loginModal.get('Password').setValue($event.target.value);
   }
   LoginByPhone() {
     if(this.otpNumber!=null){
       this.VerifyOTP(this.otpNumber);
       return;
     }else{
       this.loginModal.get('UserName').setValue(this.phoneNo);
       this.userprofileServices.loginByPhone1(this.loginModal.value).subscribe((res: any) => {
         localStorage.setItem("propertyId", res.userId);
         localStorage.setItem("url", res.imagUrl);
         localStorage.setItem("token", res.token);
         localStorage.setItem("role", res.selectedRole);
         localStorage.setItem("userId", res.id);
         localStorage.setItem("username", res.userName);
         localStorage.setItem("name", res.userName);
        
         this.toastr.success("Login Successful");
         if (localStorage.getItem("ToListing") == "post") {
           this._router.navigateByUrl('/my-listings');
         } else {
           window.location.reload();
         }
       }, err => {
           this.isPasswordLoginFailed=true; 
         this.btnLoader1 = false;
       })
      this.isPasswordLoginFailed=false;
     }
  }
   LoginByEmail() { 
     this.userprofileServices.loginByPhone(this.loginModal.value).subscribe((res: any) => {
       localStorage.setItem("propertyId", res.userId);
       localStorage.setItem("token", res.token);
       localStorage.setItem("role", res.selectedRole);
       localStorage.setItem("userId", res.id);
       localStorage.setItem("username", res.userName);
       localStorage.setItem("name", res.userName); 
       localStorage.setItem("url", res.imagUrl);
      
       this.toastr.success("Login Successful");
       if (localStorage.getItem("ToListing") == "post") {
         this._router.navigateByUrl('/my-listings');
       } else {
         window.location.reload();
       }
     }, err => {
         this.isPasswordLoginFailed = true; 
       this.btnLoader1 = false;
     })
     this.isPasswordLoginFailed = false; 
    }

    searchGetCall(term: string) {
      if (term === '') {
        return of([]);
      }
      return this.httpClient.get(environment.ApiUrl + 'SerchFilter/SearchBy/'+term);
    }
    SearchbyBtn(){
      if(this.searchval===undefined)
      return;
      this._router.navigateByUrl('/searches/'+this.searchval+'/'+this.rentOrSell);
    }
  ngOnInit() { 
    this.fireSearchlist();
    this.role = '';
  //  this.loadActiveProperty();
    //this.load();
    this.createContactForm();
    this.createEmailForm();
    this.createRegisterUserByEmail();
    this.createRegisterAdmin(); 
    this.url = localStorage.getItem("url");
    this.names = localStorage.getItem("name");
    this.email = localStorage.getItem("email"); 
    this.userId = localStorage.getItem("userId"); 
    if (this.url == 'null') {
      this.url = './../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';
    }
    if (this.names != null) {
      this.loadUserProfile();
    } 
  this.loginModal.reset(); 
   
  } 
  fireSearchlist(){
   
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > -1)

      // Time in milliseconds between key events
      , debounceTime(0)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      
      this.searchGetCall(text).subscribe((res) => {
        this.city=res; 
       this.hidesearchlist=true;
      }, (err) => { 
        console.log('error', err);
      });
    }); 
  }
  Hideemail(str){
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  } 
  censorEmail(email:string) {
  var arr = email.split("@");
    return this.Hideemail(arr[0]) + "@" + this.Hideemail(arr[1]);
}  

   createContactForm() { 
     this.SellerContact = this.fb.group({
       name: ['', Validators.required],
       email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
       phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
       uniqueID: [''],
       ownerId: ['']
     })
   }  
   createEmailForm() {
     this.EmailContact = this.fb.group({
       useremail: ['', Validators.required],
       owneremail: ['', Validators.required],
       mailBody: ['', Validators.required]
     })
   } 
   GetDetails(i) { 
     this.isDetailLoading=true;
   //  this.url = './../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';
     this.createContactForm(); 
     this.imageObject = [];
     this.SecurityAmenities=[]; 
     this.ResetAmenties();
     this.isShow = 'none';
     this.thumb = '';
     this.services.ViewDetails(i).subscribe((data: All) => {
       this.detais = data;
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
         this.loadPropertyOwnerDetail();
         return;
       }
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
       this.uniqueId = this.detais.all[0].uniqueID;
       this.propImgUrl= this.detais.imgs[0].url;
     this.EmailpropType=  this.detais.all[0].basicDetailId.propertyType;
       this.SellerContact.get('uniqueID').setValue(this.uniqueId);
       this.SellerContact.get('ownerId').setValue(this.userId);
       this.amentiesloded = true;
       this.loadPropertyOwnerDetail();  
     })
   } 
   GetImage(uniqueID:number){
     this.imageObject = [];
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
         this.imageObject.push(album);
         
       });
       this.imgLoaded = true; 
       this.open(0);
     }) 
   }
   PostUserContact(){
     if (this.SellerContact.valid) {
       this.btnLoader = true;
       this.userContact = Object.assign({}, this.SellerContact.value);
       this.homeServices.postUserContacts(this.userContact).subscribe((data:IUserContact)=>{
         this.propIds=data.uniqueID;
         this.htmlBody = `
         <html lang="en">
         <head>    
             <meta content="text/html; charset=utf-8"" http-equiv=""Content-Type">
             <title>
                 Upcoming topics
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
             <p class="post-header"> <a href="http://localhost:4200/view/${this.propIds}">${this.EmailpropType}</a> </p>
            
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
          this.SendMail(this.mailBody);
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
             location.reload();
           })
         } 
       })
      }
   }

   SendMail(mail:EmailBody){
     this.emailServices.sendmail(mail).subscribe((data: EmailBody) => {
     })
   }
   loadPropertyOwnerDetail() {
    this.email=null;
    this.names =null;
    this.userPhone = null;
    this.ownerimageUrl=null;
    this.hideemail=null;
     this.userprofileServices.GetOwnerDetail(this.userId).subscribe((data: any) => {
      this.email=data.email;
       this.names = data.fullName.replace(/\d(?=\d{4})/g, "*");
       this.userPhone = data.phoneNumber;
       this.hideuserPhone = data.phoneNumber.replace(/\d(?=\d{4})/g, "*");
       if(this.email.includes('@')){
        this.hideemail = this.censorEmail(this.email);
       }else{
         this.email='';
       } 
       this.ownerimageUrl = data.imagUrl;
      
       if (this.ownerimageUrl == null)
         this.ownerimageUrl = '../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg'

     })
   }
   load() { 
     this.IshomeLoading=true;
      this.services.allLocality(6).subscribe((data) => {
       this.city = data;
     })
    this.services.getDataHome(this.currentPage, this.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination; 
      this.IshomeLoading=false;  
      this.loadDefaultPropImages();
    })
  }
   loadUserProfile() {
     this.userprofileServices.GetUserProfile().subscribe((data: any) => { 
       this.names = data.fullName;
       this.fullname = data.fullName;
       this.email = data.email;
     })
   }

   Logout(){
     localStorage.clear();
     this.authService.signOut();
     this._router.navigateByUrl('/');
     this.toastr.success("Logout successful");
     this.isLogin=false;
   }
   RentOrSell(){
     this.rentOrSell='Rent';
   }
   RentOrSell1(){
     this.rentOrSell='Sell';
   }
   RentOrSell2(){
    this.rentOrSell='Pg';
  }
   Search(value:string){ 
     
 this._router.navigateByUrl('/searches/'+value+'/'+this.rentOrSell);
   
   }
   SearchPG(){
     
     if (this.location == 'All' && this.pgFor == 'PG For'){
       this.LoadByPG();
     }
     if (this.location == 'All' && this.pgFor != 'PG For') {
       this.LoadByPGForOnly();
     }
     if (this.location != 'All' && this.pgFor == 'PG For') {
       this.LoadByPGAddress();
     }
     if (this.location != 'All' && this.pgFor != 'PG For') {
      this.LoadByPGFor();
     }
     
   }
   LoadByAddress(value:string){
     this.IshomeLoading = true;
     this.homeServices.AllPropertyByAddress(value,this.rentOrSell, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
       this.Alldetais = res.result;
       this.pagination = res.pagination;
       this.IshomeLoading = false;
     })
   }
   LoadByLocality() { 
     this.IshomeLoading = true;
     this.homeServices.AllPropertyByLocality(this.locality,this.rentOrSell, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
       this.Alldetais = res.result;
       this.pagination = res.pagination;
       this.IshomeLoading = false;
     })
   }
   LoadBySector() { 
    this.IshomeLoading = true;
    this.homeServices.AllPropertyBySector(this.sectors,this.rentOrSell, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      this.IshomeLoading = false;
    })
  }
   LoadByPGAddress() { 
     this.IshomeLoading = true;
     this.homeServices.AllPropertyByPGAddress(this.location, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
       this.Alldetais = res.result;
       this.pagination = res.pagination;
       this.IshomeLoading = false;
     })
   }
   LoadByPG() {
     this.IshomeLoading = true;
     this.homeServices.AllPropertyByPG(this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
       this.Alldetais = res.result;
       this.pagination = res.pagination;
       this.IshomeLoading = false;
     })
   }
   LoadByPGForOnly(){
     this.IshomeLoading = true;
     this.homeServices.AllPropertyByPgForOnly(this.pgFor, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
       this.Alldetais = res.result;
       this.pagination = res.pagination;
       this.IshomeLoading = false;
     })
   }
   LoadByPGFor() { 
     this.IshomeLoading = true;
     this.homeServices.AllPropertyByPgFor(this.pgFor,this.location, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
       this.Alldetais = res.result;
       this.pagination = res.pagination;
       this.IshomeLoading = false;
     })
   }
  //  LoadByType() {
  //    this.IshomeLoading = true;
  //    this.homeServices.AllPropertyByType(this.propType,this.rentOrSell, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
  //      this.Alldetais = res.result;
  //      this.pagination = res.pagination;
  //      this.IshomeLoading = false;
  //    })
  //  }
  //  LoadByApartment(type) {
  //   window.scrollTo({
  //     top: 547,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  //   this.IshomeLoading = true;
  //   this.homeServices.AllPropertyByType(type,this.rentOrSell, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
  //     this.Alldetais = res.result;
  //     this.pagination = res.pagination;
  //     this.IshomeLoading = false;
  //   })
  // }
  LoadByBoysPG(gender){
    window.scrollTo({
      top: 547,
      left: 0,
      behavior: 'smooth'
    });
    this.IshomeLoading = true;
    this.homeServices.AllPropertyByPgForOnly(gender, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      this.IshomeLoading = false;
    })
  }
  LoadAllPg(){
    window.scrollTo({
      top: 547,
      left: 0,
      behavior: 'smooth'
    });
    this.IshomeLoading = true;
    this.homeServices.AllPropertyByPG(this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
      this.Alldetais = res.result;
      this.pagination = res.pagination;
      this.IshomeLoading = false;
    })
  }
  //  LoadByTypeAndAddress() {
  //    this.IshomeLoading = true;
  //    this.homeServices.AllPropertyByTypeAndAddress(this.propType,this.location,this.rentOrSell, this.currentPage, this.itemsPerPage).subscribe((res: PaginatedResult<All>) => {
  //      this.Alldetais = res.result;
  //      this.pagination = res.pagination;
  //      this.IshomeLoading = false;
  //    })
  //  }
   pageChanged(event: any): void {
     this.currentPage = event.page; 
     window.scrollTo({
       top: 747,
       left: 0,
       behavior: 'smooth'
     });
     if (this.location == 'All' && this.locality=='All') { 
       this.load();
     }
     if (this.location != 'All' && this.locality=='All') {
      // this.LoadByAddress();
     }
     
    
     if(this.locality!='All' && this.sectors=='All'){
       this.LoadByLocality();
     }
     if(this.sectors!='All'){
       this.LoadBySector();
     }
   }
  modalDismiss() {
    this.isShow = 'block'; 
    this.imgLoaded=false;  
  }
   selectEvent(item) { 
    this.location= item.citynName;
     this.services.allLocality(6).subscribe((data) => {
       this.city = data;
     }) 
   }
   selectEvent1(item) { 
    this.locality = item.localityName; 
    this.services.allSector(item.id).subscribe((data) => {
      this.sector= data; 
    }) 
   }
   selectEvent2(item) {  
    this.sector = item.sectorName;   
   }
    
   GetPgForData($event){
     this.pgFor = $event.target.value; 
   }
  open(index: number) {  
    this._lightbox.open(this.imageObject, index, { showImageNumberLabel: true,
      positionFromTop: '80px',
      centerVertically: true});
  }
   navToListining(){
     this.createLoginForm();
     if (localStorage.getItem('role') == 'User') {
       this._router.navigateByUrl('/my-listings'); 
     }else{
       this.emailEnter=true;
       localStorage.setItem("ToListing","post");
     }
   }
  close(): void { 
    this._lightbox.close(); 
  } 
   loadActiveProperty() {
     this.adminmanage.GetCurrentFieldStatus().subscribe((data: PropertyConfig) => {
       this.propertyConfig = data;
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

// Phone Validation
PhoneNoValidation($event){
  let phoneNo=$event.target.value;
  if(isNaN(phoneNo)){
     this.toastr.info('Please Enter valid phone Number');
     this.SellerContact.get('phoneNumber').setValue(null);
     return;
  }
}
}



