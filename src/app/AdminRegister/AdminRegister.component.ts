import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminRegister} from './../Shared/Model/Auth/Admin/AdminRegister';
import { AdminRegisterService} from './../Services/AdminRegister/adminRegister.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-AdminRegister',
  templateUrl: './AdminRegister.component.html',
  styleUrls: ['./AdminRegister.component.css']
})
export class AdminRegisterComponent implements OnInit {
  registerFields: FormGroup;
  authRegister: AdminRegister;
  public btnLoader: boolean;
  role:string;
  constructor(private fb: FormBuilder, private adminServices: AdminRegisterService, private _router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.createRegisterAdmin();
  }
   
  createRegisterAdmin() {
    this.role = 'Admin';
    this.registerFields = this.fb.group({
      Email: ['', Validators.required],
      PhoneNo: ['', Validators.required],
      FullName: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    })
  } 
  navigateToAdmin() {
    if (localStorage.getItem('token')!=null){
      return this._router.navigateByUrl('/adminpanel');
    }else{
      return this._router.navigateByUrl('/adminlogin');
    } 
  }
  register() {
    this.btnLoader = true;
    if (this.registerFields.valid) {
      this.authRegister = Object.assign({}, this.registerFields.value);
      this.adminServices.register(this.authRegister,this.role).subscribe(() => {
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
