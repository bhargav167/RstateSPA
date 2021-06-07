import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { PostPropertiesComponent } from './PostProperties/PostProperties.component'; 
import { ViewDetailsComponent } from './ViewDetails/ViewDetails.component';
import { AdminPanelComponent } from './AdminPanel/AdminPanel.component';
import { AdminRegisterComponent } from './AdminRegister/AdminRegister.component';
import { AuthGaurd } from './Auth/Auth.guard';
import { AdminLoginComponent } from './AdminLogin/AdminLogin.component';
import { UserAuthRegistrationComponent } from './UserAuthRegistration/UserAuthRegistration.component';
import { UserAuthLoginComponent } from './UserAuthLogin/UserAuthLogin.component';
import { UserDashComponent } from './UserDash/UserDash.component';
import { HomeLoanComponent } from './HomeLoan/HomeLoan.component';
import { EditProfileComponent} from './User/EditProfile/EditProfile.component';
import { EditPropertyComponent} from './EditProperty/EditProperty.component';
import { VerifyEmailPageComponent} from './User/EditProfile/VerifyEmailPage/VerifyEmailPage.component';
import {ForgetPasswordComponent} from './../app/Home/ForgetPassword/ForgetPassword.component';
import { SearchResultComponent } from './SearchResult/SearchResult.component';
 const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'my-listings',
   component: PostPropertiesComponent,
   canActivate: [AuthGaurd],
    data: { permittedRoles: ['User'] }
  },
  {
    path: 'UserEdit/:id',
    component: EditProfileComponent,
    canActivate: [AuthGaurd],
    data: { permittedRoles: ['User'] }
  },
  {
    path: 'UserPropertyEdit/:id',
    component: EditPropertyComponent
  },
  { path: 'UserRegistration', component: UserAuthRegistrationComponent }, 
  { path: 'UserLogin', component: UserAuthLoginComponent }, 
  { path: 'homeloan', component: HomeLoanComponent }, 
  { path: 'forgotpassword', component: ForgetPasswordComponent }, 
  {
    path: 'adminpanel', component: AdminPanelComponent,
    canActivate: [AuthGaurd],
    data: { permittedRoles: ['Admin'] }
  },
  {
    path: 'adminregister',
    component: AdminRegisterComponent,
    canActivate: [AuthGaurd],
    data: { permittedRoles: ['Admin'] }
  },
  { path: 'view/:id', component: ViewDetailsComponent },
  { path: 'ConfirmedEmail/:email/:uid', component: VerifyEmailPageComponent },
  { path: 'searches/:location/:propType', component: SearchResultComponent },

  {
    path: 'mydashboard', component: UserDashComponent, canActivate: [AuthGaurd],
    data: { permittedRoles: ['User'] } },
  { path: '**', redirectTo:'',pathMatch:'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
