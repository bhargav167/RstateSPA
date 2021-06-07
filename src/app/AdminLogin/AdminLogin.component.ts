import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
@Component({
  selector: 'app-AdminLogin',
  templateUrl: './AdminLogin.component.html',
  styleUrls: ['./AdminLogin.component.css']
})
export class AdminLoginComponent implements OnInit { 
  selectedRole: string = 'Admin'; 
  public btnLoader: boolean;
  formModel: any = {
    UserName: '',
    Password: ''
  }
  phoneNo: string; 
  constructor(private _authServices: AdminRegisterService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.btnLoader = false; 
  }  
  CheckLogin(form: NgForm) {
    if (!form.value.UserName.includes('@')) {
      this._authServices.checkAdminlogin(form.value.UserName).subscribe((res: any) => {
        if (res == 200) { 
          this.btnLoader = true;
          this._authServices.loginByPhone1(form.value).subscribe((res: any) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.roles[0]);
            localStorage.setItem("userId", res.id);
            this._router.navigateByUrl('/adminpanel');
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

        } else { 

        }
      }
        , err => { 
          this.toastr.warning("Phone does not exit! Please SignUp first.");
          return;
        })

    } else {
      this._authServices.checkAdminloginMail(form.value.UserName).subscribe((res: any) => { 
        if (res == 200) { 
          this.btnLoader = true;
          this._authServices.loginByPhone(form.value).subscribe((res: any) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.id);
            localStorage.setItem("role", res.roles[0]);
            localStorage.setItem("url", res.imagUrl);
            this._router.navigateByUrl('/adminpanel');
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

        } else {
         
        }
      }, err => { 
          this.toastr.warning("Email does not exit! Please SignUp first..");
          return;
      })
    } 
  }
   
}
