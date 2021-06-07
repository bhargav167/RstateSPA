import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { SocialAuthService } from 'angularx-social-login'; 
import { GoogleLoginProvider} from 'angularx-social-login';
import { AdminRegister } from '../Shared/Model/Auth/Admin/AdminRegister';

@Component({
  selector: 'app-UserAuthLogin',
  templateUrl: './UserAuthLogin.component.html',
  styleUrls: ['./UserAuthLogin.component.css']
})
export class UserAuthLoginComponent implements OnInit {
  selectedRole: string = 'User';
  registerFields: FormGroup;
  phoneNo:string;
 @Input() loginUser;
  public btnLoader: boolean; 
  formModel: any = {
    UserName: '',
    Password: ''
  }
  authRegister: AdminRegister;
  ExternalformModel: AdminRegister;
  constructor(private _authServices: AdminRegisterService, 
    private _router: Router, 
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.btnLoader = false;
    this.createRegisterUserByEmail()
  }
  createRegisterUserByEmail() {
    this.selectedRole= 'User';
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
  register() {
    this.btnLoader = true; 
    if (this.registerFields.valid) { 
      this.authRegister = Object.assign({}, this.registerFields.value);  
      this._authServices.register(this.authRegister, this.selectedRole).subscribe(() => { 
      
        this.registerFields.reset(); 
        this.createRegisterUserByEmail();
        this.btnLoader = false;
        if (this.phoneNo != undefined) {
          this._authServices.loginByPhone(this.phoneNo).subscribe((res: any) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.selectedRole);
            localStorage.setItem("userId", res.id);
            localStorage.setItem("username", res.userName);
            localStorage.setItem("name", res.userName);
            localStorage.setItem("url", './../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg');
            this.toastr.success("Login Successful");
            if (localStorage.getItem("ToListing") == "post") {
              this._router.navigateByUrl('/my-listings');
            } else {
              this._router.navigateByUrl('/');
            }
          },
            err => {
              if (err.status == 400) {
                this.toastr.error("Opps! Incorrect UserName & Password");
                this.btnLoader = false;
              }
              if (err.status == 401) {
                this.toastr.error("Opps! You Are Not Authorized For This Role.");
                this.btnLoader = false;
              }
            })
        }
      }, error => { 
        this.btnLoader = false;
      }, () => {
      });
    
    }
  }
  signInWithGoogle(): void { 
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(x => {
        this.loginUser = x;
      this.registerFields.get('UserName').setValue(x.lastName); 
      this.registerFields.get('Email').setValue(x.email); 
      this.registerFields.get('FullName').setValue(x.firstName +' '+x.lastName); 
      this.registerFields.get('userId').setValue(x.id); 
      this.registerFields.get('PhoneNo').setValue("***"); 
        localStorage.setItem("url", x.photoUrl);
        localStorage.setItem("name", x.name); 
        localStorage.setItem("token", x.idToken);
        localStorage.setItem("role", "User"); 
        localStorage.setItem("email", x.email); 
        localStorage.setItem("userId", x.id);
        localStorage.setItem("username", x.id);
        this.register();
        if (localStorage.getItem("ToListing") == "post") {
          this._router.navigateByUrl('/my-listings');
          this.toastr.success("Login Successful");
        } else {
          this._router.navigateByUrl('/');
          this.toastr.success("Login Successful");
        }
      }); 
  }
  Phone($event) {
    this.phoneNo = $event.target.value;
  }
  LoginByPhone(){
    this.registerFields.get('UserName').setValue(this.phoneNo);
    this.registerFields.get('Email').setValue(this.phoneNo);
    this.registerFields.get('FullName').setValue(this.phoneNo);
    this.registerFields.get('userId').setValue(this.phoneNo);
    this.registerFields.get('PhoneNo').setValue(this.phoneNo);
    this.register();
        }
  login(form: NgForm) {
    if(this.phoneNo!=undefined){
      this.LoginByPhone();
    }else{
      this.btnLoader = true;
      this._authServices.login(form.value, this.selectedRole).subscribe((res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.selectedRole);
        localStorage.setItem("userId", res.id);
        localStorage.setItem("username", res.userName);
        localStorage.setItem("name", res.userName);
        localStorage.setItem("url", './../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg');
        this.toastr.success("Login Successful");
        if (localStorage.getItem("ToListing") == "post") {
          this._router.navigateByUrl('/my-listings');
        } else {
          this._router.navigateByUrl('/');
        }
      },
        err => {
          if (err.status == 400) {
            this.toastr.error("Opps! Incorrect UserName & Password");
            this.btnLoader = false;
          }
          if (err.status == 401) {
            this.toastr.error("Opps! You Are Not Authorized For This Role.");
            this.btnLoader = false;
          }
        })

    } 
      } 
}
