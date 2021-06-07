import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component'; 
import { CdkStepperModule} from '@angular/cdk/stepper'; 
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; 
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker'; 
import { FileUploadModule } from 'ng2-file-upload'; 
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewDetailsComponent } from './ViewDetails/ViewDetails.component'; 
 import { ChartsModule } from 'ng2-charts';
 
import { LightboxModule } from 'ngx-lightbox';
import { AdminPanelComponent } from './AdminPanel/AdminPanel.component';  
import {ShortNumberPipe} from './Shared/pipes/ShortNumber.pipe'; 
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AdminRegisterComponent } from './AdminRegister/AdminRegister.component';
import { AdminLoginComponent } from './AdminLogin/AdminLogin.component';
import { AdminRegisterService } from './Services/AdminRegister/adminRegister.service';
import { AuthGaurd } from './Auth/Auth.guard';
import { UserAuthRegistrationComponent } from './UserAuthRegistration/UserAuthRegistration.component';
import { UserAuthLoginComponent } from './UserAuthLogin/UserAuthLogin.component';
import { AuthInterceptor} from './Services/AuthServices/Auth.Insecptors';
import { SocialLoginModule } from 'angularx-social-login';
import { SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { UserDashComponent } from './UserDash/UserDash.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete'; 
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { HomeLoanComponent } from './HomeLoan/HomeLoan.component';
import { PostPropertiesModule} from './PostProperties/PostProperties.module';
import { PostPropertiesComponent } from './PostProperties/PostProperties.component';
import { RouterModule } from '@angular/router';
import { EditProfileComponent } from './User/EditProfile/EditProfile.component';
import { UploadImgesComponent } from './UploadImges/UploadImges.component';
import { AdminListComponent } from './AdminList/AdminList.component';
import { Ng5SliderModule } from 'ng5-slider';
import { OwnerListComponent} from './RoleWiseList/ownerList/ownerList.component';
import { BrokerListComponent } from './RoleWiseList/BrokerList/BrokerList.component';
import { BuilderListComponent } from './RoleWiseList/BuilderList/BuilderList.component';
import { ForgetPasswordComponent } from './Home/ForgetPassword/ForgetPassword.component';
import { SearchResultComponent } from './SearchResult/SearchResult.component';
import { DecimalMask } from './Shared/directives/DecimalMask.directive';
import { LeadsComponent } from './Leads/Leads.component'; 
import { OwlModule } from 'ngx-owl-carousel'; 
import { EditPropertyComponent } from './EditProperty/EditProperty.component';
@NgModule({
   declarations: [											
      AppComponent,
      HomeComponent,
      AdminPanelComponent,
      ViewDetailsComponent,
      ShortNumberPipe,
      AdminRegisterComponent,
      AdminLoginComponent,
      UserAuthRegistrationComponent,
      UserAuthLoginComponent,
      UserDashComponent,
      PostPropertiesComponent,
      HomeLoanComponent,
      EditProfileComponent,
      UploadImgesComponent,
      AdminListComponent,
      OwnerListComponent,
      BrokerListComponent,
      BuilderListComponent,
      ForgetPasswordComponent,
      SearchResultComponent,
      DecimalMask,
      LeadsComponent,
      EditPropertyComponent
   ],
   imports: [ 
      BrowserModule,
      AppRoutingModule,
      CdkStepperModule,
      PostPropertiesModule,
      BrowserAnimationsModule,
      ReactiveFormsModule, 
      RouterModule, 
      FormsModule, 
      Ng5SliderModule,
      OwlModule,
      BsDatepickerModule.forRoot(),
       SocialLoginModule,
      DatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      SweetAlert2Module.forRoot(),
      SocialLoginModule,
      NgxShimmerLoadingModule,
      AutocompleteLibModule, 
      ChartsModule, 
      FormsModule,
      HttpClientModule,  
      ModalModule.forRoot(),
      BrowserModule,
      LightboxModule,
      ToastrModule.forRoot(),
      FileUploadModule ,SweetAlert2Module
   ],
   exports: [
      CdkStepperModule,
      ReactiveFormsModule,
      FormsModule,NgForm
   ], 
   providers: [
      AuthGaurd, AdminRegisterService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: AuthInterceptor,
         multi: true
      },
      {
         provide: 'SocialAuthServiceConfig',
         useValue: {
            autoLogin: false,
            providers: [
               {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                     '623793391827-avtueu90m2otb919k1asp3bmsu552c97.apps.googleusercontent.com'
                  ),
               }
            ],
         } as SocialAuthServiceConfig,
      }
   ],

   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
