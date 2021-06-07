import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminManageFieldsService } from 'src/app/Services/AdminManageFields.service';
import { EditOBB } from 'src/app/Shared/Model/EditOBB';
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-BrokerList',
  templateUrl: './BrokerList.component.html',
  styleUrls: ['./BrokerList.component.css']
})
export class BrokerListComponent implements OnInit {
  all: any[];
  owner:any; 
  owneredit:EditOBB;
  registerOwner: FormGroup;
  constructor(private adminServices: AdminManageFieldsService,
    private _toster:ToastrService,
    private fb: FormBuilder
    ) { this.createRegisterowner(); }

  ngOnInit() {
    this.loadBrokerList();
  }
  createRegisterowner() {
    this.registerOwner = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      img: [''],
      rerano: [''],
      gstno: [''],
      landlineno: [''],
      firmno: [''],
      location: ['']
    })
  } 
  loadBrokerList() {
    this.adminServices.GetBrokerList().subscribe((data: any[]) => {
      this.all = data; 
    })
  }
  
  View(id) {
    this.adminServices.GetBroker(id).subscribe((data) => {
      this.owner= data; 
      console.log(this.owner);
      this.registerOwner.get('id').setValue(id);
      this.registerOwner.get('name').setValue(this.owner.fullName);
      this.registerOwner.get('email').setValue(this.owner.email);
      this.registerOwner.get('phone').setValue(this.owner.phoneNumber);
      this.registerOwner.get('img').setValue(this.owner.imagUrl);
      this.registerOwner.get('rerano').setValue(this.owner.reraNo);
      this.registerOwner.get('gstno').setValue(this.owner.gstNo);
      this.registerOwner.get('landlineno').setValue(this.owner.landlineNo);
      this.registerOwner.get('firmno').setValue(this.owner.brokerFirm);
      this.registerOwner.get('location').setValue(this.owner.locations);
    })
  }
  Edit(){
    this.owneredit = Object.assign({}, this.registerOwner.value);
    this.adminServices.UpdateOwner(this.owneredit.id,this.owneredit).subscribe((data:EditOBB)=>{
      this._toster.success("Done",'Broker detail updated');
    this.loadBrokerList();
    })
  }
  DeleteOwner(id) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure to delete this Broker?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed == true) {
        this.adminServices.DeleteBroker(id).subscribe((data: any) => {
          this.loadBrokerList();
        })
      }
    })
  }
}
