import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminManageFieldsService } from '../Services/AdminManageFields.service';
import { AdminAccessProp } from '../Shared/Model/PropertyConfiguration/AdminAccessProp';

@Component({
  selector: 'app-AdminList',
  templateUrl: './AdminList.component.html',
  styleUrls: ['./AdminList.component.css']
})
export class AdminListComponent implements OnInit {
  all:any[];
  Adminemail:string;
  AdminUserId:string;
  ActiveSubAddress:boolean;
  isAdminActivePropLoaded: boolean = false;
  AdminpropertyConfig: AdminAccessProp;
  registerAdminFields: FormGroup;
  constructor(private adminServices: AdminManageFieldsService, 
    private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loadAdminList(); 
    this.createAdminManageFields();
  }
  createAdminManageFields() {
    this.registerAdminFields = this.fb.group({
      IsManageAddress: ['', Validators.required],
      IsManageFeild: ['', Validators.required],
      IsSetPropImg: ['', Validators.required],
      IsManageCity: ['', Validators.required],
      IsManageLocality: ['', Validators.required],
      IsManageSector: ['', Validators.required],
      IsManagePocket: ['', Validators.required]
    })
  }
  loadAdminList(){
    this.adminServices.GetAdminList().subscribe((data:any[])=>{
      this.all=data;
      console.log(this.all);
    })
  }
 
  ManageAdminField() {
    this.AdminpropertyConfig = this.registerAdminFields.value; 
    this.adminServices.postAdminConfig(this.AdminUserId, this.AdminpropertyConfig).subscribe((data) => {
      this.toastr.success("Admin Field Assign");
      this.loadActiveAdminProperty();
    })
  }
  GetAdminDetail(email, userId) {
    this.Adminemail = email;
    this.AdminUserId = userId;
    this.loadActiveAdminProperty();
  }

  loadActiveAdminProperty() {
    this.isAdminActivePropLoaded = true;
    this.adminServices.GetCurrentAdminFieldStatus(this.AdminUserId).subscribe((data: AdminAccessProp) => {
      this.AdminpropertyConfig = data;
       this.registerAdminFields.get('IsManageAddress').setValue(this.AdminpropertyConfig.isManageAddress);
       this.registerAdminFields.get('IsManageFeild').setValue(this.AdminpropertyConfig.isManageFeild);
       this.registerAdminFields.get('IsSetPropImg').setValue(this.AdminpropertyConfig.isSetPropImg);
      this.registerAdminFields.get('IsManageCity').setValue(this.AdminpropertyConfig.isManageCity);
      this.registerAdminFields.get('IsManageLocality').setValue(this.AdminpropertyConfig.isManageLocality);
      this.registerAdminFields.get('IsManageSector').setValue(this.AdminpropertyConfig.isManageSector);
      this.registerAdminFields.get('IsManagePocket').setValue(this.AdminpropertyConfig.isManagePocket);
      if (this.AdminpropertyConfig.isManageAddress == true) {
        this.ActiveSubAddress = true;

      } else {
        this.ActiveSubAddress = false;
      }
    })
  }
  //Toggle Admin Field
  PropAddressCheck() {
    this.AdminpropertyConfig.isManageAddress = !this.AdminpropertyConfig.isManageAddress;
    this.registerAdminFields.get('IsManageAddress').setValue(this.AdminpropertyConfig.isManageAddress);
    if(this.AdminpropertyConfig.isManageAddress==true){
      this.ActiveSubAddress=true;
      
    }else{
      this.ActiveSubAddress = false;
      this.registerAdminFields.get('IsManageCity').setValue(false);
      this.registerAdminFields.get('IsManageLocality').setValue(false);
      this.registerAdminFields.get('IsManageSector').setValue(false);
      this.registerAdminFields.get('IsManagePocket').setValue(false);
    }
  }
  PropFieldCheck() {
    this.AdminpropertyConfig.isManageFeild = !this.AdminpropertyConfig.isManageFeild;
    this.registerAdminFields.get('IsManageFeild').setValue(this.AdminpropertyConfig.isManageFeild);
  }
  PropImageCheck() {
    this.AdminpropertyConfig.isSetPropImg = !this.AdminpropertyConfig.isSetPropImg;
    this.registerAdminFields.get('IsSetPropImg').setValue(this.AdminpropertyConfig.isSetPropImg);
  }

  PropAddressCity() {
    this.AdminpropertyConfig.isManageCity = !this.AdminpropertyConfig.isManageCity;
    this.registerAdminFields.get('IsManageCity').setValue(this.AdminpropertyConfig.isManageCity);
  }
  PropAddressPocket(){
    this.AdminpropertyConfig.isManagePocket = !this.AdminpropertyConfig.isManagePocket;
    this.registerAdminFields.get('IsManagePocket').setValue(this.AdminpropertyConfig.isManagePocket);
  }
  PropAddressLocality() {
    this.AdminpropertyConfig.isManageLocality = !this.AdminpropertyConfig.isManageLocality;
    this.registerAdminFields.get('IsManageLocality').setValue(this.AdminpropertyConfig.isManageLocality);
  }
  PropAddressSector() {
    this.AdminpropertyConfig.isManageSector = !this.AdminpropertyConfig.isManageSector;
    this.registerAdminFields.get('IsManageSector').setValue(this.AdminpropertyConfig.isManageSector);
  }
}
