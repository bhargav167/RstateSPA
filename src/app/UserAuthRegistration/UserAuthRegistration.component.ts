import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { AdminRegister } from '../Shared/Model/Auth/Admin/AdminRegister';

@Component({
  selector: 'app-UserAuthRegistration',
  templateUrl: './UserAuthRegistration.component.html',
  styleUrls: ['./UserAuthRegistration.component.css']
})
export class UserAuthRegistrationComponent implements OnInit {
  registerFields: FormGroup;
  authRegister: AdminRegister;
  public btnLoader: boolean;
  role: string;
  constructor(private fb: FormBuilder, private adminServices: AdminRegisterService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.createRegisterAdmin();
  }
  createRegisterAdmin() {
    this.role = 'User';
    this.registerFields = this.fb.group({ 
      Email: ['', Validators.required],
      PhoneNo: ['', Validators.required],
      FullName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      userId:['']
    })
  }
  navigateToAdmin() {
    if (localStorage.getItem('token') != null) {
      return this._router.navigateByUrl('/adminpanel');
    } else {
      return this._router.navigateByUrl('/adminlogin');
    } 
  }
  register() {
    this.btnLoader = true; 
    if (this.registerFields.valid) {
      this.authRegister = Object.assign({}, this.registerFields.value);
      this.authRegister.userId=this.authRegister.PhoneNo;
      this.registerFields.get('userId').setValue(this.authRegister.Email);
      this.adminServices.register(this.authRegister, this.role).subscribe(() => {
        this.toastr.success('Registration Done!', 'Data Saved');
        this.registerFields.reset();
        this.btnLoader = false;
        this.createRegisterAdmin();
      }, error => {
        this.toastr.error('Registration Failed!', 'Problem in saving Data', error);
        this.btnLoader = false;
      }, () => {
      });

    }
  }
}
