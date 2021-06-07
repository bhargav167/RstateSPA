import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { ProfileEditService } from '../Services/Profile/profileEdit.service';

@Component({
  selector: 'app-UploadImges',
  templateUrl: './UploadImges.component.html',
  styleUrls: ['./UploadImges.component.css']
})
export class UploadImgesComponent implements OnInit {

  uploader: FileUploader;
  baseUrl = environment.ApiUrl;
  adminId:string;
  @Output() 
  url: EventEmitter<string>=new EventEmitter<string>();
  constructor(private profileUpdate: ProfileEditService) { this.adminId = localStorage.getItem("userId");}

  ngOnInit() {
    this.initializeUploaderForProfile();
  }
  initializeUploaderForProfile() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'ProfileManagment/upload/' +this.adminId,
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
    this.url.emit(response);
    }
    this.uploader.onErrorItem = (item, response, status, headers) => {
    }
  } 
}
