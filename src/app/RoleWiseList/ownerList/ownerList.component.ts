import { Component, OnInit } from '@angular/core';
import { AdminManageFieldsService } from '../../Services/AdminManageFields.service';
import Swal from 'sweetalert2'; 
import { EditOBB } from './../../Shared/Model/EditOBB';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ownerList',
  templateUrl: './ownerList.component.html',
  styleUrls: ['./ownerList.component.css']
})
export class OwnerListComponent implements OnInit {
  all: any[];
  owner:any;
  owneredit:EditOBB;
  registerOwner: FormGroup;
  constructor(private adminServices: AdminManageFieldsService,
    private _toster:ToastrService,
    private fb: FormBuilder) {  
    this.createRegisterowner();
    this.loadOwnerList();}

  ngOnInit() {
  }
  createRegisterowner() {
    this.registerOwner = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      img: [''],
    })
  } 
  loadOwnerList() {
    this.adminServices.GetOwnerList().subscribe((data: any[]) => {
      this.all = data;
    })
  }
  View(id) { 
    this.adminServices.GetOwner(id).subscribe((data) => {
      this.owner = data; 
      this.registerOwner.get('id').setValue(id);
      this.registerOwner.get('name').setValue(this.owner.fullName);
      this.registerOwner.get('email').setValue(this.owner.email);
      this.registerOwner.get('phone').setValue(this.owner.phoneNumber);
      this.registerOwner.get('img').setValue(this.owner.imagUrl);
    })
  }
  Edit(){
    this.owneredit = Object.assign({}, this.registerOwner.value);
    this.adminServices.UpdateOwner(this.owneredit.id,this.owneredit).subscribe((data:EditOBB)=>{
      this._toster.success("Done",'Owner detail updated');
     this.loadOwnerList();
    })
  }
  DeleteOwner(id) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure to delete this owners?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed == true) {
        this.adminServices.DeleteOwner(id).subscribe((data: any) => {
          this.loadOwnerList();
        })
      }
    })
  } 
}
