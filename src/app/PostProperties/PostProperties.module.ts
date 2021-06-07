import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from './../Shared/shared.module';
import { PostPropertiesRoutingModule} from './PostProperties-routing.module'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng5SliderModule } from 'ng5-slider';
 
 
 @NgModule({
  imports: [
    CommonModule,
     SharedModule,
     PostPropertiesRoutingModule,
     ReactiveFormsModule,
     FormsModule, 
     BrowserAnimationsModule,
     AutocompleteLibModule,
     FileUploadModule,
     BsDatepickerModule.forRoot(),
     Ng5SliderModule
  ],
    declarations: []
})

export class PostPropertiesModule { }
