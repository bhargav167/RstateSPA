import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AdminRegisterService } from 'src/app/Services/AdminRegister/adminRegister.service';
import { LoginOtpService } from 'src/app/Services/AuthServices/LoginOtp.service';
import { EmailSenderService } from 'src/app/Services/EmailServices/emailSender.service';
import { IUpdateProfile } from 'src/app/Shared/Model/IUpdateProfile';
import { IUrl } from 'src/app/Shared/Model/IUrl';
import { EmailBody } from 'src/app/Shared/Model/UserContact/EmailBody';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ProfileEditService} from '../../Services/Profile/profileEdit.service';
@Component({
  selector: 'app-EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['./EditProfile.component.scss']
})
export class EditProfileComponent implements OnInit {
  ProfileActive:boolean=true;
  LeadsActive:boolean=false;
  PropertyActive:boolean=false;
  activecolor0: string = 'black';
  activecolor:string='tomato';
  activecolor1: string = 'black';
  userId: string;
  userName: string;
  fullname: string;
  email:string;
  phoneNo:string;
  url:any;
  formModel: any = {
    FullName: '',
    Email: ''
  }
 public btnLoader:boolean=false;
  baseUrl = environment.ApiUrl;
  uploader: FileUploader;
  brockerActive:boolean;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  updateData:IUpdateProfile;
  emailData:boolean=false;
  propertyId:string;
  EmailContact: FormGroup;
  mailBody: EmailBody;
  otpValue:number;
  invalidGst:boolean;
  imgurl:IUrl;
  isLogin:boolean;
  constructor(private _router: Router, 
    private fb: FormBuilder,
    private profileUpdate: ProfileEditService,
    private toast:ToastrService,
    private eamilSender:EmailSenderService,
    private otpServices: LoginOtpService,
    private _http:HttpClient,
    private userprofileServices: AdminRegisterService) {
      let token=localStorage.getItem('token');
      this._http.post(environment.ApiUrl+'ApplicationManager/tokenMatch/'+token,{}).subscribe((data:boolean)=>{
        this.isLogin=data;
        if(this.isLogin==false){
          localStorage.clear();
          _router.navigateByUrl('/');
        }
       
     })
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("name");
    this.url = localStorage.getItem("url"); 
   
    this.email = localStorage.getItem("email");
    this.propertyId= localStorage.getItem("propertyId");
    if (this.url == 'null') {
      this.url = '../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';
    }
   }
  ngOnInit() {
    this.loadPropertyOwnerDetail();
    this.GetEditData(this.userId);
    this.initializeUploader();
    this.createEmailForm();
    if (localStorage.getItem("dash") == "true" ||  localStorage.getItem("frompost")=="true") {
      this.Property();
      localStorage.removeItem("dash");
      localStorage.removeItem("frompost");
    } 
    if (localStorage.getItem("lead") == "true" ||  localStorage.getItem("frompost")=="true") {
      this.Leads();
      localStorage.removeItem("dash");
      localStorage.removeItem("lead");
      localStorage.removeItem("frompost");
    } 
  }
  createEmailForm() {
    this.EmailContact = this.fb.group({
      useremail: ['', Validators.required],
      owneremail: ['', Validators.required],
      mailBody: ['', Validators.required]
    })
  } 
  emailChange($event){
    if ($event.target.value!=this.email){
      this.updateData.confirmEmail = false;
    }
    if ($event.target.value == this.email) {
      this.updateData.confirmEmail = true;
    }
  }
  PhoneChange($event) { 
    if ($event.target.value != this.phoneNo) {
      this.updateData.confirmMobile = false;
    }
    if ($event.target.value == this.phoneNo) {
      this.updateData.confirmMobile = true;
    }
  }
  VerifyEmail(){
    this.EmailContact.get('useremail').setValue(this.updateData.email);
    this.EmailContact.get('owneremail').setValue('bhargav.kshitiz55kk@gmail.com');
    this.EmailContact.get('mailBody').setValue(`http://spacing.in/ConfirmedEmail/${this.updateData.email}/${this.userId}`);
    this.mailBody = Object.assign({}, this.EmailContact.value); 
    this.eamilSender.sendmail(this.mailBody).subscribe(()=>{
      localStorage.setItem("changeMail",this.updateData.email);  
      this.toast.info('Email verification link send to your mail address');
    },err=>{
      this.toast.error('This Email already exist');
    });
  }
  SendOtp(MobNo: string) {
    this.otpValue = 0;
    this.otpServices.SendOtp(MobNo).subscribe((data: number) => {
      this.otpValue = data;
      console.log(this.otpValue);
      Swal.fire({
        icon:'info',
        text: "Enter your Otp",
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: 'green'
      }).then((result) => {
        if (result.value==this.otpValue) {
          this.otpServices.confirmPhoneFromEdit(this.phoneNo, this.updateData.mobileNo).subscribe((data:string)=>{
            Swal.fire('Your Phone number is now verified');
            this.updateData.mobileNo=data;
            this.updateData.confirmMobile=true;
          },err=>{
            console.log(err);
            this.toast.error('Opps! This phone number already exist');
          }) 
        }else{
          Swal.fire('Youe Otp is incorrect');
        }
      });
    })
  }
  VerifyPhone() {
    this.SendOtp(this.updateData.mobileNo);
  }
  Leads(){
    this.activecolor0='tomato';
    this.activecolor1='black';
    this.activecolor='black';
    this.ProfileActive=false;
    this.LeadsActive=true;
    this.PropertyActive=false;
  }
  EditPro(){
    this.activecolor='tomato';
    this.activecolor1='black';
    this.activecolor0='black';
    this.LeadsActive=false;
    this.ProfileActive=true;
    this.PropertyActive=false;
  }
  Property(){
    this.activecolor = 'black';
    this.activecolor0='black';
    this.activecolor1 = 'tomato';
    this.ProfileActive = false;
    this.LeadsActive=false;
    this.PropertyActive = true;
  }
  initializeUploader() { 
    this.uploader = new FileUploader({
      url: this.baseUrl + 'ProfileManagment/upload/'+this.userId,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; 
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {  
        this.url=response.toString();
        this.imgurl=<IUrl>this.url;
      };
    }
    this.uploader.onErrorItem = (item, response, status, headers) => {
    }
  }
  
  Upload(){
      this.profileUpdate.GetPropImg(this.userId).subscribe((data: any) => {
        this.url = data.imagUrl;  
        localStorage.setItem("url", this.url);
      })

     }
  CheckGstValidation($event){
    var gstinformat = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
    if (gstinformat.test($event.target.value)) {
      this.invalidGst=false;
      return true;
    } else {
  this.invalidGst=true;
      this.updateData.gstNo='';
    }
  }
  GstUppercase($event){
    let gstcase=$event.target.value.toUpperCase();
    this.updateData.gstNo=gstcase;
  }
  GetEditData(userId:string){ 
    this.profileUpdate.EditData(userId).subscribe((data:IUpdateProfile) => {
     this.updateData=data;
    
      if (this.updateData.roles[0] == 'Broker' || this.updateData.roles[0] == 'Builder')
      this.brockerActive=true;

      
     this.email=this.updateData.email;
     this.phoneNo=this.updateData.mobileNo;
      let isnum = /^\d+$/.test(this.updateData.userName);
      let isnum1 = /^\d+$/.test(this.updateData.email);
     if(isnum==true){
       this.updateData.userName = '';
    
     }
      if (isnum1 == true) {
         this.updateData.email = '';
      }
      if (this.updateData == null) {
        this.emailData = true;
        this.PropertyActive=true;
        this.activecolor1='tomato';
      }
    })
  }
  Logout() {
    localStorage.clear();
    return this._router.navigateByUrl('/');
  }
  SaveChanges(){
   if(this.imgurl!=undefined){
      this.profileUpdate.postUserImg(this.userId,this.imgurl).subscribe(()=>{
      this.Upload();
    });
    this.invalidGst=false;
   }
  
    this.updateData.email=this.email;
    this.updateData.mobileNo=this.phoneNo;
    this.btnLoader=true; 
     this.profileUpdate.UPdateProfile(this.updateData).subscribe((data)=>{
    this.toast.success('Profile Updated');
       this.GetEditData(this.userId);
       this.btnLoader=false;
     },err=>{
         console.log(err);
     })
  }
  loadPropertyOwnerDetail() { 
    this.userprofileServices.GetOwnerDetail(this.userName).subscribe((data: any) => {
      this.formModel.FullName=data.fullName;
      this.formModel.Email=data.email;
      this.fullname = data.fullName;
      this.userName=data.email;
    })
  }
}
