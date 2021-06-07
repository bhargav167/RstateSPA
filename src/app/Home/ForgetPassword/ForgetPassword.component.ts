import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginOtpService } from 'src/app/Services/AuthServices/LoginOtp.service';
import {ForgetPasswordService} from './../../Services/AuthServices/ForgetPassword.service';
@Component({
  selector: 'app-ForgetPassword',
  templateUrl: './ForgetPassword.component.html',
  styleUrls: ['./ForgetPassword.component.css']
})
export class ForgetPasswordComponent implements OnInit {
activeotpForm:boolean;
activeotp1Form:boolean;
activepasswordForm:boolean;
final:boolean;
queryValue:string;
otpValue:number;
otpNumber:number;
password:string;
rePassword:string;
  constructor(private route: ActivatedRoute,
    private _router:Router,
    private toastr: ToastrService,
    private forgetpassServices:ForgetPasswordService,
    private otpServices: LoginOtpService) { }

  ngOnInit() { 
    this.final=false;
    this.activeotpForm=true;
    this.route.queryParams
    .subscribe(params => {
      this.queryValue = params.credentials;
      if(this.queryValue==undefined || this.queryValue==null){
        this._router.navigate(['/']);
        return;
      }
     
    }
  );
  }
  SendOtp() {
    this.otpValue=0;
    this.otpServices.SendOtp(this.queryValue).subscribe((data:number) => { 
      this.otpValue=data;
      console.log(this.otpValue);
    })
  }
  OTP($event){
    if(!isNaN($event.target.value)){
      this.otpNumber = $event.target.value;
    }else{
      this.toastr.info('Please Enter Valid Otp');
      return;
    }
  }
  VerifyOTP(){ 
    this.otpServices.VerifyOtp(this.otpNumber,this.otpValue).subscribe((data:boolean)=>{  
      if(data==true){
      this.activepasswordForm=true;
      this.activeotpForm=false;
      this.activeotp1Form=false;
         } else{
           this.toastr.info('Enter otp is incorrect');
      }
    })
  }
  onSubmit1() {
    this.activeotp1Form = true;
    this.activeotpForm=false;
    this.SendOtp();
  }
  Password($event){
    this.password=$event.target.value;
  }
  Password1($event){
    this.rePassword=$event.target.value;
  }
  SaveChanges(){
    if(this.password===this.rePassword){
      this.forgetpassServices.UpdatePassword(this.queryValue,this.rePassword).subscribe(()=>{
        this.toastr.success('Password changed successfully');
        this.final=true;
        this.activeotp1Form=false;
        this.activeotpForm=false;
        this.activepasswordForm=false;
      },err=>{
        console.log(err);
      });
   
    }else{
      this.toastr.error('Password Mismatch. Please retype password');
    }
    }
}
