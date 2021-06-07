import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { environment } from 'src/environments/environment';
import { AdminRegisterService } from '../Services/AdminRegister/adminRegister.service';
import { PostService } from '../Services/Post.service';
import { Images } from '../Shared/Model/Images';
import * as _ from 'underscore'; 
import {PropertyEditService} from './../Services/PropertyEdit.service';
import { SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-EditProperty',
  templateUrl: './EditProperty.component.html',
  styleUrls: ['./EditProperty.component.scss']
})
export class EditPropertyComponent implements OnInit {
  tabhome:boolean;
  tablead:boolean;
  bsConfig: Partial<BsDatepickerConfig>;
  today: Date;
  myDateValue: Date; 
  colorTheme = 'theme-orange';
editProperty:any;
id:number;
basicdetailId:number;
ActiveBI:string='active'; 
ActivePhoto: string =''; 
ActiveRK: boolean = false;
Active1BHK: boolean = false;
Active2BHK: boolean = false;
Active3BHK: boolean = false;
Active4BHK: boolean = false;
Active5BHK: boolean = false;
Active6BHK: boolean = false;
Active7BHK: boolean = false;
Active8BHK: boolean = false;
Active9BHK: boolean = false;
Active10BHK: boolean = false;
Active3PlusBHK: boolean = false;
PlusBhk: boolean = false;

ActiveZeroBathroom: boolean = false;
ActiveOneBathroom: boolean = false;
ActiveTwoBathroom: boolean = false;
ActiveThreeBathroom: boolean = false;
ActiveFourBathroom: boolean = false;
ActiveFiveBathroom: boolean = false;
ActiveSixBathroom: boolean = false;
ActiveSevenBathroom: boolean = false;
ActiveEightBathroom: boolean = false;

ActiveThreePlusBathroom: boolean = false;
PlusBathroom: boolean = false;
//PG VARIABLES
BoyPgYes: boolean = false;
GirlPgYes: boolean = false;
BothPgYes: boolean = false;
ActiveProfessionals:boolean=false;
ActiveStudent:boolean=false;
ActiveMealYes:boolean=false;
isMealOffering:boolean=false;
ActiveMealNo: boolean = false;

ActiveBreakfast: boolean = false;
ActiveLunch: boolean = false;
ActiveDinner: boolean = false;

ActiveLivingRoom:boolean=false;
ActiveKitchen:boolean=false;
ActiveDining:boolean=false;
ActiveStudyRoom:boolean=false;
ActiveBreakout:boolean=false;
ActiveLandlord: boolean = false;
ActiveCaretaker: boolean = false;
ActiveDedicated: boolean = false;
ActiveStayYes: boolean = false;
ActiveStayNo: boolean = false;
ActiveNonVegYes: boolean = false;
ActiveNonVegNo: boolean = false;
ActiveOppoSexYes:boolean=false;
ActiveOppoSexNo:boolean=false;
ActiveTimeAllowedYes: boolean = false;
ActiveTimeAllowedNo: boolean = false;
ActiveAllowedYes: boolean = false;
ActiveAllowedNo: boolean = false;
ActiveGuardianYes: boolean = false;
ActiveGuardianNo: boolean = false;
ActiveDrinkingYes: boolean = false;
ActiveDrinkingNo: boolean = false;
ActiveSmokingYes: boolean = false;
ActiveSmokingNo: boolean = false; 
CommonAreas:string=' ';
MealOff: string = ' ';
ActiveZeroBalconey: boolean = false;
ActiveOneBalconey: boolean = false;
ActiveTwoBalconey: boolean = false;
ActiveThreeBalconey: boolean = false;
ActiveFourBalconey: boolean = false;
ActiveFiveBalconey: boolean = false;
ActiveSixBalconey: boolean = false;
ActiveSevenBalconey: boolean = false;
ActiveEightBalconey: boolean = false;
ActiveThreePlusBalconey: boolean = false;
BalconeyPlus:boolean=false;

ActiveFurnished: boolean = false;
ActiveSemiFurnished: boolean = false;
ActiveUnfurnished: boolean = false;

ActiveCoverParking0: boolean = false;
ActiveCoverParking1: boolean = false;
ActiveCoverParking2: boolean = false;
ActiveCoverParking3: boolean = false;
ActiveCoverParking4: boolean = false;
ActiveCoverParking5: boolean = false;
ActiveCoverParking6: boolean = false;
ActiveCoverParking7: boolean = false;
ActiveCoverParking8: boolean = false;
cp4:boolean=false;

ActiveOpenParking0: boolean = false;
ActiveOpenParking1: boolean = false;
ActiveOpenParking2: boolean = false;
ActiveOpenParking3: boolean = false;
ActiveOpenParking4: boolean = false;
ActiveOpenParking5: boolean = false;
ActiveOpenParking6: boolean = false;
ActiveOpenParking7: boolean = false;
ActiveOpenParking8: boolean = false;
OpenParkingPlus:boolean=false;

ActiveFamiliy: boolean = false;
ActiveBeachlor: boolean = false;
ActiveCompany: boolean = false;
ActiveOther: boolean = false;

securityDepositeYes: boolean = false;
securityDepositeNo: boolean = false;
DepositeYes: boolean = false;
DepositeNo: boolean = false;

ChargeBrokerageYes: boolean = false;
ChargeBrokerageNo: boolean = false;

ActiveNewbooking: boolean = false;
ActiveResale: boolean = false;

ActiveReadyToMove: boolean = false;
ActiveUnderConstruction: boolean = false; 

Proptype:string;
editactivebathroom:string;
editactivebalcony:string;
editactivecoverparking:string;
editactiveopenparking:string;
editactiveteanentType:string;
editactivesecurityDepo:string;
editActiveconstructionstatus:string;
editactiveteanentTypearray:string[]=[];
editactivebrokrage:string;
editactivetransactiontype:string;
editactivepossesionType:string;
editactivepgfor:string;
editactivemealavalable:string;
editactivesutablefor:string;
editactivemealoffering:string;
editactivemealofferingarray:string[]=[];
editactivepgfacility:string[]=[];
editactivepgfacilitys:string;

editactivepgcommons:string[]=[];
editactivepgcommon:string;
editactiveroomtype:string;
editactivepropertyManagedBy:string;
editactivestay:string;
editactivenonveg:string;
editactiveoppsex:string;
editactivevisitor:string;
editactivegaurdian:string;
editactivedrinking:string;
editactivesmoking:string;
brokregeinK: string;
propAge:number;
maintainceCharge: string = '0';
maintainK: string;
sucurityCharge: number = 0;
brokrageCharge: number = 0;
securityinK: string;
monthlyRent: number=0;
plotNo:string;
plotArea:number;
selectedSq:string;
lengthplot:number;
wfr:number;
widthplot:number;
buildUpArea:string='0';
carpetArea:string='0';
rentinK:string;
FurnishedTypeValue: string = '';
baseUrl = environment.ApiUrl; 
uploader: FileUploader;
hasBaseDropZoneOver: boolean;
hasAnotherDropZoneOver: boolean;
response: string;
randomId:number;
userName:string;
urls=[];
fileName:string[]=[];
iShowImg:string='none';
imgs:Images[]=[];
url;
names;
userRole:string;
userId:string; 
propertyIds:string;
currentMainPhotoId:number;
currentMain: Images;
ActiveImmidiate: boolean = false;
ActiveInFuture: boolean = false;
@Output() getMemberPhotoChange = new EventEmitter<string>();
options: Options = {
  floor: 0,
  ceil: 10,
  step: 1,
  showTicks: true,
  showTicksValues: true,
  getPointerColor: (value: number): string => {
    if (value <= 3) {
      return 'tomato';
    }
    
    if (value >= 5) {
      return 'tomato';
    }
    return 'tomato';
  }
};
//PG
pgname:string;
totalbeds:number;
ActivePrivateRoom: boolean = false;
ActiveDoubleRoom: boolean = false;
ActiveTripleRoom: boolean = false;
ActiveSharingRoom: boolean = false;
ActiveCupboardRoom: boolean = false;
ActiveTableChair: boolean = false;
ActiveTv: boolean = false;
ActiveAttachbalconey: boolean = false;
ActiveAttachBathromm: boolean = false;
ActiveMealInclude: boolean = false;
BedInRoom:number;
pgsecurityinK: string;
np:number;
lp:number;
  constructor(private _editProperty:PropertyEditService,
    private userprofileServices: AdminRegisterService,private authService: SocialAuthService,
    private toastr: ToastrService,
    private _route:ActivatedRoute,private _router: Router,private services: PostService) { 
  this.id = this._route.snapshot.params['id'];
  
  }
  loadUserProfile(){
    this.userprofileServices.GetUserProfile().subscribe((data:any)=>{
      this.names = data.fullName;
      this.userRole=data.roleId; 
    })
  }
  aa(val){
    this.BedInRoom=val;
  }
  Lead(userId){
    this._router.navigateByUrl(`/UserEdit/${userId}`);
      localStorage.setItem("lead", "true");
  }
  ngOnInit() { 
    this.tabhome=true;
    this.loadUserProfile();
    this.url= localStorage.getItem("url");
    this.names= localStorage.getItem("name");
     this.userId = localStorage.getItem("userId");
    this.userName= localStorage.getItem("username");
    this.propertyIds= localStorage.getItem("propertyId"); 
     if (this.url == 'null') {
       this.url = './../../assets/img/kisspng-user-logo-information-service-design-5ba34f88a0c3a6.5907352915374293846585.jpg';
     }
    if(this.names==null){
      this.loadUserProfile();
    } 
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers:false }); 
    this.today = new Date();
    this._editProperty.getEditProperty(this.id).subscribe((data: any) => {
      this.editProperty = data; 
      console.log(this.editProperty);
      //If Rent
      if (this.editProperty.all.basicDetailId.wantTo == 'Rent') {
        this.Proptype = 'Rent';
        this.basicdetailId = this.editProperty.all.basicDetailId.id;
        this.editactivebathroom = this.editProperty.all.basicDetailId.bathroom;
        this.propAge = this.editProperty.all.basicDetailId.propertadyAge;
        this.editactivebalcony = this.editProperty.all.basicDetailId.balconey;
        this.FurnishedTypeValue=this.editProperty.all.basicDetailId.furnishedType;
        this.editactivecoverparking=this.editProperty.all.basicDetailId.coverParking;
        this.editactiveopenparking=this.editProperty.all.basicDetailId.openParking;
        this.editactiveteanentType=this.editProperty.all.basicDetailId.teneandType;
        this.editactivesecurityDepo=this.editProperty.all.basicDetailId.securityDeposite;
        this.maintainceCharge=this.editProperty.all.basicDetailId.maintainescharge.toString().replace(/,/g, '');
        this.monthlyRent=this.editProperty.all.basicDetailId.mothlyRent.toString().replace(/,/g, '');
        this.sucurityCharge=this.editProperty.all.basicDetailId.securityDepositeAmt.toString().replace(/,/g, '');
        this.buildUpArea=this.editProperty.all.basicDetailId.buildUpArea.toString().replace(/,/g, '');
        this.maintainK = this.transform(this.maintainceCharge.toString().replace(/,/g, ''));
        this.rentinK= this.transform(this.monthlyRent.toString().replace(/,/g, ''));
        this.securityinK=this.transform(this.sucurityCharge.toString().replace(/,/g, ''));
        this.myDateValue=new Date(this.editProperty.all.basicDetailId.avalableFrom);
        this.randomId=this.editProperty.imgs[0].uniqueID;
        this.imgs=this.editProperty.imgs;
        if (this.imgs.length > 0) {
          this.iShowImg = 'block';
        }
        if(localStorage.getItem("role")=='Admin'){
          this._router.navigateByUrl('/');
        } else{ 
            this.initializeUploader();  
        }
        //bathroom
        switch (this.editactivebathroom) {
          case "0":
            this.Bathroom0()
            break;
          case "1":
            this.Bathroom1()
            break;
          case "2":
            this.Bathroom2()
            break;
          case "3":
            this.Bathroom3()
            break;
          case "4":
            this.Bathroom4();
            this.BathroomPlus();
            break;
          case "5":
            this.Bathroom5();
            this.BathroomPlus();
            break;
          case "6":
            this.Bathroom6();
            this.BathroomPlus();
            break;
          case "7":
            this.Bathroom7();
            this.BathroomPlus();
            break;
          case "8":
            this.Bathroom8();
            this.BathroomPlus();
            break;
          default:
            break;
        }
        //balcony
        switch (this.editactivebalcony) {
          case "0":
            this.Balconey0();
            break;
          case "1":
            this.Balconey1();
            break;
          case "2":
            this.Balconey2();
            break;
          case "3":
            this.Balconey3();
            break;
          case "4":
            this.Balconey4();
            this.BalconeyPluss();
            break;
          case "5":
            this.Balconey5();
            this.BalconeyPluss();
            break;
          case "6":
            this.Balconey6();
            this.BalconeyPluss();
            break;
          case "7":
            this.Balconey7();
            this.BalconeyPluss();
            break;
          case "8":
            this.Balconey8();
            this.BalconeyPluss();
            break;
          default:
            break;
        }
        //Furnished Type
        switch (this.FurnishedTypeValue) {
            case "Semi Furnished":
              this.SemiFurnished();
              break;
            case "Fully Furnished":
              this.Furnished();
              break;
            case "Unfurnished":
              this.Unfurnished();
              break;
            
            default:
              break;
        }
        //cover parking
        switch (this.editactivecoverparking) {
          case "0 Cover Parking":
            this.CoverParkingZero();
            break;
          case "1 Cover Parking":
            this.CoverParkingOne();
            break;
          case "2 Cover Parking":
            this.CoverParkingTwo();
            break;
          case "3 Cover Parking":
            this.CoverParkingThree();
            break;
          case "4 Cover Parking":
            this.CoverParkingFour();
            this.CoverPlus();
            break;
          case "5 Cover Parking":
            this.CoverParkingFive();
            this.CoverPlus();
            break;
          case "6 Cover Parking":
            this.CoverParkingSix();
            this.CoverPlus();
            break;
          case "7 Cover Parking":
            this.CoverParkingSeven();
            this.CoverPlus();
            break;
          case "8 Cover Parking":
            this.CoverParkingEight();
            this.CoverPlus();
            break;
          default:
            break;
        }
        //open Parking
        switch (this.editactiveopenparking) {
          case "0 Open Parking":
            this.OpenParkingZero();
            break;
          case "1 Open Parking":
            this.OpenParkingOne();
            break;
          case "2 Open Parking":
            this.OpenParkingTwo();
            break;
          case "3 Open Parking":
            this.OpenParkingThree();
            break;
          case "4 Open Parking":
            this.OpenParkingFour();
            this.OpenParkingPluss();
            break;
          case "5 Open Parking": 
            this.OpenParkingFive();
            this.OpenParkingPluss();
            break;
          case "6 Open Parking": 
            this.OpenParkingSix();
            this.OpenParkingPluss();
            break;
          case "7 Open Parking":
            this.OpenParkingSeven();
            this.OpenParkingPluss();
            break;
          case "8 Open Parking":
            this.OpenParkingEight();
            this.OpenParkingPluss();
            break;
          default:
            break;
        }
         //Teanent Parking
         switch (this.editactiveteanentType) {
           
          case "Bachelors":
            this.Beachelor();
            break;
          case "Family":
            this.Family();
            break;
          case "Company":
            this.Company();
            break;
          case "Other":
            this.Other();
            break; 
          case "Bachelors,Family":
            this.Family();
            this.Beachelor();
            break;
            case "Family,Bachelors":
              this.Family();
              this.Beachelor();
              break;
           case "Family,Company":
             this.Family();
             this.Company()
             break;
             case "Company,Family":
              this.Family();
              this.Company()
              break;
           case "Bachelors,Company":
             this.Beachelor();
             this.Company();
             break;
             case "Company,Bachelors":
              this.Beachelor();
              this.Company();
              break;
             case "Family,Bachelors,Company":
              this.Family();
              this.Company();
              this.Beachelor();
              break;
           case "Family,Company,Bachelors":
             this.Family();
             this.Company();
             this.Beachelor();
             break;
                
           case "Bachelors,Family,Company":
             this.Family();
             this.Company();
             this.Beachelor();
             break;
           case "Bachelors,Company,Family":
             this.Family();
             this.Company();
             this.Beachelor();
             break;
             case "Company,Bachelors,Family":
              this.Family();
              this.Company();
              this.Beachelor();
              break;
              case "Company,Family,Bachelors":
                this.Family();
                this.Company();
                this.Beachelor();
                break;
               
           case "Other":
             this.Other();
             break;
          default:
            break;
         }
          //Teanent Parking
        switch (this.editactivesecurityDepo) {
          case "YES":
            this.securityDepositeYess();
            break;
          case "NO":
            this.securityDepositeNoo();
            break;
          default:
            break;
        }
      }
       //If only Sell 
       if (this.editProperty.all.basicDetailId.wantTo == 'Sell' && this.editProperty.all.basicDetailId.propertyType!='Plot') {
        this.Proptype = 'Sell';
        this.basicdetailId = this.editProperty.all.basicDetailId.id;
        this.editactivebathroom = this.editProperty.all.basicDetailId.bathroom;
        this.propAge = this.editProperty.all.basicDetailId.propertadyAge;
        this.editactivebalcony = this.editProperty.all.basicDetailId.balconey;
        this.FurnishedTypeValue=this.editProperty.all.basicDetailId.furnishedType;
        this.editactivecoverparking=this.editProperty.all.basicDetailId.coverParking;
        this.editactiveopenparking=this.editProperty.all.basicDetailId.openParking;
        this.editactiveteanentType=this.editProperty.all.basicDetailId.teneandType;
        this.editactivebrokrage=this.editProperty.all.basicDetailId.brokerage;
        this.editActiveconstructionstatus=this.editProperty.all.basicDetailId.constructionType;
        this.buildUpArea=this.editProperty.all.basicDetailId.buildUpArea.toString().replace(/,/g, '');
        this.brokrageCharge=this.editProperty.all.basicDetailId.brokerageAmt.toString().replace(/,/g, '');
        this.monthlyRent=this.editProperty.all.basicDetailId.mothlyRent.toString().replace(/,/g, '');
        this.editactivetransactiontype=this.editProperty.all.basicDetailId.transactionType;
        this.carpetArea=this.editProperty.all.basicDetailId.carpetArea;
        if(this.carpetArea=='null'){
          this.carpetArea='0';
        }
        this.rentinK= this.transform(this.monthlyRent.toString().replace(/,/g, ''));
        this.randomId=this.editProperty.imgs[0].uniqueID;
        this.imgs=this.editProperty.imgs;
        if (this.imgs.length > 0) {
          this.iShowImg = 'block';
        }
        if(localStorage.getItem("role")=='Admin'){
          this._router.navigateByUrl('/');
        } else{ 
            this.initializeUploader();
        }
        //bathroom
        switch (this.editactivebathroom) {
          case "0":
            this.Bathroom0()
            break;
          case "1":
            this.Bathroom1()
            break;
          case "2":
            this.Bathroom2()
            break;
          case "3":
            this.Bathroom3()
            break;
          case "4":
            this.Bathroom4();
            this.BathroomPlus();
            break;
          case "5":
            this.Bathroom5();
            this.BathroomPlus();
            break;
          case "6":
            this.Bathroom6();
            this.BathroomPlus();
            break;
          case "7":
            this.Bathroom7();
            this.BathroomPlus();
            break;
          case "8":
            this.Bathroom8();
            this.BathroomPlus();
            break;
          default:
            break;
        }
        //balcony
        switch (this.editactivebalcony) {
          case "0":
            this.Balconey0();
            break;
          case "1":
            this.Balconey1();
            break;
          case "2":
            this.Balconey2();
            break;
          case "3":
            this.Balconey3();
            break;
          case "4":
            this.Balconey4();
            this.BalconeyPluss();
            break;
          case "5":
            this.Balconey5();
            this.BalconeyPluss();
            break;
          case "6":
            this.Balconey6();
            this.BalconeyPluss();
            break;
          case "7":
            this.Balconey7();
            this.BalconeyPluss();
            break;
          case "8":
            this.Balconey8();
            this.BalconeyPluss();
            break;
          default:
            break;
        }
        //Furnished Type
        switch (this.FurnishedTypeValue) {
            case "Semi Furnished":
              this.SemiFurnished();
              break;
            case "Fully Furnished":
              this.Furnished();
              break;
            case "Unfurnished":
              this.Unfurnished();
              break;
            
            default:
              break;
        }
        //cover parking
        switch (this.editactivecoverparking) {
          case "0 Cover Parking":
            this.CoverParkingZero();
            break;
          case "1 Cover Parking":
            this.CoverParkingOne();
            break;
          case "2 Cover Parking":
            this.CoverParkingTwo();
            break;
          case "3 Cover Parking":
            this.CoverParkingThree();
            break;
          case "4 Cover Parking":
            this.CoverParkingFour();
            this.CoverPlus();
            break;
          case "5 Cover Parking":
            this.CoverParkingFive();
            this.CoverPlus();
            break;
          case "6 Cover Parking":
            this.CoverParkingSix();
            this.CoverPlus();
            break;
          case "7 Cover Parking":
            this.CoverParkingSeven();
            this.CoverPlus();
            break;
          case "8 Cover Parking":
            this.CoverParkingEight();
            this.CoverPlus();
            break;
          default:
            break;
        }
        //open Parking
        switch (this.editactiveopenparking) {
          case "0 Open Parking":
            this.OpenParkingZero();
            break;
          case "1 Open Parking":
            this.OpenParkingOne();
            break;
          case "2 Open Parking":
            this.OpenParkingTwo();
            break;
          case "3 Open Parking":
            this.OpenParkingThree();
            break;
          case "4 Open Parking":
            this.OpenParkingFour();
            this.OpenParkingPluss();
            break;
          case "5 Open Parking": 
            this.OpenParkingFive();
            this.OpenParkingPluss();
            break;
          case "6 Open Parking": 
            this.OpenParkingSix();
            this.OpenParkingPluss();
            break;
          case "7 Open Parking":
            this.OpenParkingSeven();
            this.OpenParkingPluss();
            break;
          case "8 Open Parking":
            this.OpenParkingEight();
            this.OpenParkingPluss();
            break;
          default:
            break;
        }
        //brockrage
        switch (this.editactivebrokrage) {
          case "YES":
            this.BrokerageYes();
            break;
          case "NO":
            this.BrokerageNo();
            break;
          default:
            break;
        }
         
         //transaction type
         switch (this.editactivetransactiontype) {
           case "Allocy":
             this.Allocy()
             break;
           case "Resale":
             this.Resale();
             break;
           default:
             break;
         }
         //construction type
         switch (this.editActiveconstructionstatus) {
          case "Ready To Move":
            this.ReadyToMove();
            break;
          case "Under Construction":
            this.UnderConstruction();
            break;
          default:
            break;
        }
      }
      //Plot
      if (this.editProperty.all.basicDetailId.wantTo == 'Sell' && this.editProperty.all.basicDetailId.propertyType=='Plot'){
        this.Proptype = 'Plot';
        this.basicdetailId = this.editProperty.all.basicDetailId.id;
        this.editactivetransactiontype=this.editProperty.all.basicDetailId.transactionType;
        this.editactivepossesionType=this.editProperty.all.basicDetailId.possesionType;
        this.carpetArea=this.editProperty.all.basicDetailId.carpetArea;
        this.monthlyRent=this.editProperty.all.basicDetailId.plotPrice.toString().replace(/,/g, '');
        this.buildUpArea=this.editProperty.all.basicDetailId.buildUpArea.toString().replace(/,/g, '');
        this.plotNo=this.editProperty.all.basicDetailId.floorRange;
        this.plotArea=this.editProperty.all.basicDetailId.ploatArea;
        this.selectedSq=this.editProperty.all.basicDetailId.areaUnit;
        this.widthplot=this.editProperty.all.basicDetailId.width;
        this.lengthplot=this.editProperty.all.basicDetailId.length;
        this.wfr=this.editProperty.all.basicDetailId.wfr;
        this.rentinK= this.transform(this.monthlyRent.toString().replace(/,/g, ''));

        if(this.carpetArea=='null'){
          this.carpetArea='0';
        }
        this.randomId=this.editProperty.imgs[0].uniqueID;
        this.imgs=this.editProperty.imgs;
        if (this.imgs.length > 0) {
          this.iShowImg = 'block';
        }
        if(localStorage.getItem("role")=='Admin'){
          this._router.navigateByUrl('/');
        } else{ 
            this.initializeUploader();
        }
          //transaction type
          switch (this.editactivetransactiontype) {
            case "Allocy":
              this.Allocy()
              break;
            case "Resale":
              this.Resale();
              break;
            default:
              break;
          }
           //possesion type
           switch (this.editactivepossesionType) {
            case "Free Hold":
              this.Infuture();
              break;
            case "Lease Hold":
              this.Immidiate();
              break;
            default:
              break;
          }
      }
       //PG
       if (this.editProperty.all.basicDetailId.wantTo == 'PG'){
        this.Proptype = 'PG';
        this.basicdetailId = this.editProperty.all.basicDetailId.id;
         this.pgname=this.editProperty.all.basicDetailId.pgName;
        this.totalbeds=this.editProperty.all.basicDetailId.toatalBed;
        this.editactivepgfor=this.editProperty.all.basicDetailId.pgFor;
        this.editactivemealavalable=this.editProperty.all.basicDetailId.mealAvalable;
        this.editactivesutablefor=this.editProperty.all.basicDetailId.pgSuitedFor;
        this.editactivemealoffering=this.editProperty.all.basicDetailId.pgSuitedFor;
        this.editactiveroomtype=this.editProperty.all.basicDetailId.roomType;
        this.BedInRoom=this.editProperty.all.basicDetailId.bedInRoom;
        this.monthlyRent=this.editProperty.all.basicDetailId.pgRent;
        this.editactivesecurityDepo=this.editProperty.all.basicDetailId.pgSecurityDeposite;
        this.editactivepgfacilitys=this.editProperty.all.basicDetailId.facilitiesOffered;
        
        this.editactivepgcommon=this.editProperty.all.basicDetailId.commonArea;
        this.editactivepropertyManagedBy=this.editProperty.all.basicDetailId.propertyManageBy;
        this.editactivestay=this.editProperty.all.basicDetailId.propertyManageStay;
        this.editactivenonveg=this.editProperty.all.basicDetailId.nonVegAllowed;
        this.editactiveoppsex=this.editProperty.all.basicDetailId.oppositeSex;
        this.editactivevisitor=this.editProperty.all.basicDetailId.visitorAllowed;
        this.editactivegaurdian=this.editProperty.all.basicDetailId.gardianAllowed;
        this.editactivedrinking=this.editProperty.all.basicDetailId.drinkingAllowed;
        this.editactivesmoking=this.editProperty.all.basicDetailId.smokingAllowed;
        this.np=this.editProperty.all.basicDetailId.noticePeriod;
        this.lp=this.editProperty.all.basicDetailId.lockPeriod;
        this.pgsecurityinK=this.transform(this.editactivesecurityDepo.toString().replace(/,/g, ''));
        this.rentinK= this.transform(this.monthlyRent.toString().replace(/,/g, ''));
        this.randomId=this.editProperty.imgs[0].uniqueID;
        this.imgs=this.editProperty.imgs;
        if (this.imgs.length > 0) {
          this.iShowImg = 'block';
        }
        if(localStorage.getItem("role")=='Admin'){
          this._router.navigateByUrl('/');
        } else{ 
            this.initializeUploader();
        }
           //pgfor
           switch (this.editactivepgfor) {
            case "Boys":
              this.BoyPG();
              break;
            case "Girls":
              this.GirlPG();
              break;
              case "Boys, Girls":
                this.BothPG();
                break;
            default:
              break;
          }
           //pg meal avalable
           switch (this.editactivemealavalable) {
            case "Yes":
              this.MealYes();
              break;
            case "No":
              this.MealNo();
              break;
             
            default:
              break;
          }
           //pg sutable for
           switch (this.editactivesutablefor) {
            case "Professionals":
              this.Professionals();
              break;
            case "Student":
              this.Student();
              break;
            default:
              break;
          }
           //pg room type
         switch (this.editactiveroomtype) {
           case "Private Room":
             this.PrivateRoom();
             break;
           case "Double Room":
             this.DoubleRoom();
             break;
           case "Triple Room":
             this.TripleRoom();
             break;
           case "sharing Room":
             this.sharingRoom();
             break; 
           default:
             break;
         }
           //pg prop managedby
           switch (this.editactivepropertyManagedBy) {
            case "Landlord":
              this.Landlord();
              break;
            case "Caretaker":
              this.Caretaker();
              break;
            case "Dedicated":
              this.Dedicated();
              break; 
            default:
              break;
          }
          //pg prop stay
          switch (this.editactivestay) {
            case "Yes":
              this.StayYes();
              break;
            case "No":
              this.StayNo();
              break; 
            default:
              break;
          }
           //pg nonveg
           switch (this.editactivenonveg) {
            case "Yes":
              this.NonVegYes();
              break;
            case "No":
              this.NonVegNo();
              break; 
            default:
              break;
          }
            //pg nonveg
            switch (this.editactiveoppsex) {
              case "Yes":
                this.OppoSexYes();
                break;
              case "No":
                this.OppoSexNo();
                break; 
              default:
                break;
            }
            //pg visitor
            switch (this.editactivevisitor) {
              case "Yes":
                this.VisitorYes();
                break;
              case "No":
                this.VisitorNo();
                break; 
              default:
                break;
            }
              //pg visitor
              switch (this.editactivegaurdian) {
                case "Yes":
                  this.GuardianYes();
                  break;
                case "No":
                  this.GuardianNo();
                  break; 
                default:
                  break;
              }
               //pg drinking
               switch (this.editactivedrinking) {
                case "Yes":
                  this.DrinkingYes();
                  break;
                case "No":
                  this.DrinkingNo();
                  break; 
                default:
                  break;
              }

                //pg smoking
                switch (this.editactivesmoking) {
                  case "Yes":
                    this.SmokingYes();
                    break;
                  case "No":
                    this.SmokingNo();
                    break; 
                  default:
                    break;
                }
              
            //pg facility
            
              var d=this.editactivepgfacilitys.split(",");  
              d.forEach(element => { 
                if(element=='Personal Cupboard'){
                 this.ActiveCupboardRoom=true;
                 this.editactivepgfacility.push('Personal Cupboard');
                 // this.PersonalCupboard();
                }
                if(element=='Table Chair'){
                  this.ActiveTableChair=true;
                  this.editactivepgfacility.push('Table Chair');
                 // this.TableChair();
               }
               if(element=='Tv'){
                 this.ActiveTv=true;
                 this.editactivepgfacility.push('TV in Room');
                 // this.TV();
               }
               if(element=='Attched Balcony'){
                 this.ActiveAttachbalconey=true;
                 this.editactivepgfacility.push('Attched Balcony');
                 // this.Attachbalconey();
               }
               if(element=='Attach Bathroom'){
                 this.ActiveAttachBathromm=true;
                 this.editactivepgfacility.push('Attach Bathroom');
                 // this.AttachBathroom();
               }
               if(element=='Meal Include'){
                 this.ActiveMealInclude=true;
                 this.editactivepgfacility.push('Meal Include');
                  //this.MealInclude();
               }
              }); 
             
           //common area
        var k=this.editactivepgcommon.split(",");
        k.forEach(element => { 
          if(element=='Living Room'){
           this.ActiveLivingRoom=true;
           this.editactivepgcommons.push('Living Room');
          }
          if(element=='Kitchen'){
            this.ActiveKitchen=true;
            this.editactivepgcommons.push('Kitchen');
         }
         if(element=='Dining'){
           this.ActiveDining=true;
           this.editactivepgcommons.push('Dining');
         }
         if(element=='StudyRoom'){
           this.ActiveStudyRoom=true;
           this.editactivepgcommons.push('StudyRoom');
         }
         if(element=='Breakout'){
           this.ActiveBreakout=true;
           this.editactivepgcommons.push('Breakout');
         }
         
        });
      }
    })
  }
  RedirectToDash(userId) {
    this._router.navigateByUrl(`/UserEdit/${userId}`);
    localStorage.setItem("dash", "true");
  }
  BasicInfo() {
    this.ActiveBI = 'active'; 
    this.ActivePhoto='';
  } 
  Photo(){
    this.ActiveBI = ''; 
    this.ActivePhoto = 'active';
  }
  Allocy() {
    this.editactivetransactiontype='Allocy';
    this.ActiveNewbooking = true;
    this.ActiveResale = false;
    
  }
  Resale() {
    this.editactivetransactiontype='Resale';
    this.ActiveNewbooking = false;
    this.ActiveResale = true;
   
  }
  Logout() {
    localStorage.clear();
    this.authService.signOut();
    this._router.navigateByUrl('/'); 
    this.toastr.success("Logout successful");
  }
  //PG
  NP($event) {
    this.np = $event.target.value;
  }
  LP($event){
    this.lp = $event.target.value;
  }
  
  SmokingYes() {
    this.ActiveSmokingYes = true;
    this.ActiveSmokingNo = false;
    this.editactivesmoking='Yes';
  }
  
  SmokingNo(){
    this.ActiveSmokingYes =false;
    this.ActiveSmokingNo = true;
    this.editactivesmoking='No';
  }
  DrinkingYes(){
    this.ActiveDrinkingYes=true;
    this.ActiveDrinkingNo = false;
    this.editactivedrinking='Yes';
  }
  DrinkingNo(){
    this.ActiveDrinkingYes = false;
    this.ActiveDrinkingNo = true;
    this.editactivedrinking='No';
  }
  GuardianYes(){
    this.ActiveGuardianYes=true;
    this.ActiveGuardianNo=false;
    this.editactivegaurdian='Yes';
  }
  GuardianNo(){
    this.ActiveGuardianYes = false;
    this.ActiveGuardianNo = true;
    this.editactivegaurdian='No';
  }
  VisitorYes(){
    this.editactivevisitor='Yes';
    this.ActiveAllowedYes=true;
    this.ActiveAllowedNo = false;
  }
  VisitorNo(){
    this.editactivevisitor='No';
    this.ActiveAllowedYes = false;
    this.ActiveAllowedNo = true;
  }
  OppoSexYes(){
    this.editactiveoppsex='Yes';
    this.ActiveOppoSexYes=true;
    this.ActiveOppoSexNo = false;
  }
  OppoSexNo(){
    this.editactiveoppsex='No';
    this.ActiveOppoSexYes = false;
    this.ActiveOppoSexNo = true;
  }
  NonVegYes(){
    this.editactivenonveg='Yes';
    this.ActiveNonVegYes=true;
    this.ActiveNonVegNo= false;
  }
  NonVegNo() {
    this.editactivenonveg='No';
    this.ActiveNonVegYes = false;
    this.ActiveNonVegNo = true;
  }
  StayYes(){
    this.ActiveStayYes=true;
    this.ActiveStayNo=false;
    this.editactivestay='Yes';
  }
  StayNo(){
    this.ActiveStayYes = false;
    this.ActiveStayNo = true;
    this.editactivestay='No';
  }
  Landlord(){
    this.ActiveLandlord=true;
    this.ActiveCaretaker=false;
    this.ActiveDedicated=false;
    this.editactivepropertyManagedBy='Landlord';
  }
  Caretaker(){
    this.ActiveLandlord = false;
    this.ActiveCaretaker = true;
    this.ActiveDedicated = false;
    this.editactivepropertyManagedBy='Caretaker'; 

  }
  Dedicated(){
    this.ActiveLandlord = false;
    this.ActiveCaretaker = false;
    this.ActiveDedicated = true;
    this.editactivepropertyManagedBy='Dedicated'; 
  }
  LivingRoom() {
    this.ActiveLivingRoom = !this.ActiveLivingRoom;
    if(this.ActiveLivingRoom==true){
      this.editactivepgcommons.push('Living Room');
    }
    if(this.ActiveLivingRoom==false){
     let i= this.editactivepgcommons.indexOf('Living Room');
     this.editactivepgcommons.splice(i,1);
    }
     
  }
  Kitchen() {
    this.ActiveKitchen = !this.ActiveKitchen;
    if(this.ActiveKitchen==true){
      this.editactivepgcommons.push('Kitchen');
    }
    if(this.ActiveKitchen==false){
     let i= this.editactivepgcommons.indexOf('Kitchen');
     this.editactivepgcommons.splice(i,1);
    } 
  }
  Dining() {
    this.ActiveDining = !this.ActiveDining;
    if(this.ActiveDining==true){
      this.editactivepgcommons.push('Dining');
    }
    if(this.ActiveDining==false){
     let i= this.editactivepgcommons.indexOf('Dining');
     this.editactivepgcommons.splice(i,1);
    }  
  }
  StudyRoom() {
    this.ActiveStudyRoom = !this.ActiveStudyRoom;
    if(this.ActiveStudyRoom==true){
      this.editactivepgcommons.push('StudyRoom');
    }
    if(this.ActiveStudyRoom==false){
     let i= this.editactivepgcommons.indexOf('StudyRoom');
     this.editactivepgcommons.splice(i,1);
    }
  }
  Breakout() {
    this.ActiveBreakout = !this.ActiveBreakout;
    if(this.ActiveBreakout==true){
      this.editactivepgcommons.push('Breakout');
    }
    if(this.ActiveBreakout==false){
     let i= this.editactivepgcommons.indexOf('Breakout');
     this.editactivepgcommons.splice(i,1);
    } 
  }
  PersonalCupboard(){
    this.ActiveCupboardRoom = !this.ActiveCupboardRoom;
   if(this.ActiveCupboardRoom==true){
    this.editactivepgfacility.push('Personal Cupboard');
   }
   if(this.ActiveCupboardRoom==false){
     let i=this.editactivepgfacility.indexOf('Personal Cupboard');
     this.editactivepgfacility.splice(i,1);
  }
  }
  TableChair(){
    this.ActiveTableChair = !this.ActiveTableChair;
    if(this.ActiveTableChair==true){
      this.editactivepgfacility.push('Table Chair');
     }
     if(this.ActiveTableChair==false){
       let i=this.editactivepgfacility.indexOf('Table Chair');
       this.editactivepgfacility.splice(i,1);
  }
}
  TV() {
    this.ActiveTv = !this.ActiveTv;
    if (this.ActiveTv == true) {
      this.editactivepgfacility.push('Tv');
    }
    if (this.ActiveTv == false) {
      let i = this.editactivepgfacility.indexOf('Tv');
      this.editactivepgfacility.splice(i, 1);
    }
  }
  Attachbalconey(){
    this.ActiveAttachbalconey = !this.ActiveAttachbalconey; 
    if(this.ActiveAttachbalconey==true){
      this.editactivepgfacility.push('Attach balconey');
     }
     if(this.ActiveAttachbalconey==false){
       let i=this.editactivepgfacility.indexOf('Attach balconey');
       this.editactivepgfacility.splice(i,1);
  } 
  }
  AttachBathroom(){
    this.ActiveAttachBathromm = !this.ActiveAttachBathromm;
    if(this.ActiveAttachBathromm==true){
      this.editactivepgfacility.push('Attach Bathroom');
     }
     if(this.ActiveAttachBathromm==false){
       let i=this.editactivepgfacility.indexOf('Attach Bathroom');
       this.editactivepgfacility.splice(i,1);
  }  
  }
  MealInclude(){
    this.ActiveMealInclude = !this.ActiveMealInclude;
    if(this.ActiveAttachBathromm==true){
      this.editactivepgfacility.push('Meal Include');
     }
     if(this.ActiveAttachBathromm==false){
       let i=this.editactivepgfacility.indexOf('Meal Include');
       this.editactivepgfacility.splice(i,1);
  }
  }

  PrivateRoom(){
    this.editactiveroomtype='Private Room';
    this.ActivePrivateRoom = true;
    this.ActiveDoubleRoom= false;
    this.ActiveTripleRoom = false;
    this.ActiveSharingRoom = false;
  }
  DoubleRoom(){
    this.editactiveroomtype='Double Room';
    this.ActivePrivateRoom = false;
    this.ActiveDoubleRoom = true;
    this.ActiveTripleRoom = false;
    this.ActiveSharingRoom = false;
  }
  TripleRoom() {
    this.editactiveroomtype='Triple Room';
    this.ActivePrivateRoom = false;
    this.ActiveDoubleRoom = false;
    this.ActiveTripleRoom = true;
    this.ActiveSharingRoom = false;
  }
  sharingRoom() {
    this.editactiveroomtype='sharing Room';
    this.ActivePrivateRoom = false;
    this.ActiveDoubleRoom = false;
    this.ActiveTripleRoom = false;
    this.ActiveSharingRoom = true;
  }
  Breakfast() {
    this.ActiveBreakfast = !this.ActiveBreakfast;
    if(this.ActiveBreakfast==true){
      this.editactivemealofferingarray.push('Breakfast');
    }
    if(this.ActiveBreakfast==false){
      let i=this.editactivemealofferingarray.indexOf('Breakfast');
      this.editactivemealofferingarray.splice(i,1);
    }
   
  }
  Lunch() { 
    this.ActiveLunch = !this.ActiveLunch;  
    if(this.ActiveLunch==true){
      this.editactivemealofferingarray.push('Lunch');
    }
    if(this.ActiveLunch==false){
      let i=this.editactivemealofferingarray.indexOf('Lunch');
      this.editactivemealofferingarray.splice(i,1);
    }
  }
  Dinner() { 
    this.ActiveDinner = !this.ActiveDinner; 
    if(this.ActiveDinner==true){
      this.editactivemealofferingarray.push('Dinner');
    }
    if(this.ActiveDinner==false){
      let i=this.editactivemealofferingarray.indexOf('Dinner');
      this.editactivemealofferingarray.splice(i,1);
    }
  }
  Professionals(){
    this.editactivesutablefor='Professionals';
    this.ActiveProfessionals = !this.ActiveProfessionals;
  }
  Student() { 
    this.editactivesutablefor='Student';
    this.ActiveStudent = !this.ActiveStudent;
  } 
  PGName($event){
    this.pgname=$event.target.value;
  }
  TotalBed($event){
    this.totalbeds=$event.target.value;
  }

  BoyPG() {
    this.editactivepgfor='Boys';
    this.BoyPgYes = true;
    this.GirlPgYes = false; 
    this.BothPgYes = false; 
  }
  GirlPG() {
    this.editactivepgfor='Girls';
    this.BoyPgYes = false;
    this.GirlPgYes = true;
    this.BothPgYes = false; 
  }
  BothPG() {
    this.editactivepgfor='Boys, Girls';
    this.BoyPgYes = false;
    this.GirlPgYes = false;
    this.BothPgYes=true;
  } 
  MealYes(){
    this.editactivemealavalable='Yes';
    this.ActiveMealYes = true;
    this.ActiveMealNo = false; 
    this.isMealOffering=true;
  }
  MealNo(){
    this.editactivemealavalable='No';
    this.ActiveMealYes = false;
    this.ActiveMealNo = true; 
    this.isMealOffering = false;
  }
  PgRent($event){  
    this.monthlyRent = $event.target.value;
    this.rentinK = this.transform(this.monthlyRent.toString().replace(/,/g, ''));
     
  }
  AgeofProp($event){
    this.propAge=$event.target.value;
  }
  maintainCharge($event) { 
    this.maintainceCharge = $event.target.value;
    if (parseInt(this.maintainceCharge.toString().replace(/,/g, '')) > 9900000){ 
      this.maintainK='';
      return;
    }  
    this.maintainK = this.transform(this.maintainceCharge.toString().replace(/,/g, ''));
  }
  Areaunit($event){
    this.selectedSq=$event.target.value;
  }
  MonthRent($event){ 
    this.monthlyRent = $event.target.value;
    if (this.monthlyRent > 9900000) {
      this.monthlyRent = null; 
      this.rentinK = '';
      this.toastr.info("Monthly Rent Should not be greater than 99 Lakh");
      return;
    }
    this.rentinK = this.transform(this.monthlyRent.toString().replace(/,/g, ''));
  }
  PlotNo($event){
    this.plotNo=$event.target.value;
  }
  PlotArea($event){
    this.plotArea=$event.target.value;
  }
  PlotPrice($event){   
    this.monthlyRent=$event.target.value;
    if (parseInt(this.monthlyRent.toString().replace(/,/g, '')) > 990000000){
      this.monthlyRent = null;
       
      this.rentinK = '';
      this.toastr.info("Plot Price Should not be greater than 99 Cr");
      return;
    } 
    
  this.rentinK=this.transform(this.monthlyRent.toString().replace(/,/g, ''));
  }
  PGSecurityDepo($event) {
    this.editactivesecurityDepo = $event.target.value;
    this.pgsecurityinK = this.transform(this.editactivesecurityDepo);
  }
  WFR($event){
    this.wfr=$event.target.value;
  }
  SecurityDepo($event){ 
    this.sucurityCharge = $event.target.value; 
    if (parseInt(this.sucurityCharge.toString().replace(/,/g, '')) > 990000000) {
      this.sucurityCharge = null;
      
      this.securityinK = '';
      this.toastr.info("Security charge Should not be greater than 99 Cr");
      return;
    }
    this.securityinK = this.transform(this.sucurityCharge.toString().replace(/,/g, ''));
  }
  BuildUpArea($event) {
    this.buildUpArea = $event.target.value;
  } 
  CarpetArea($event){
this.carpetArea=$event.target.value;
  }
  Furnished() {
    this.FurnishedTypeValue = 'Fully Furnished';
    this.ActiveFurnished = true;
    this.ActiveSemiFurnished = false;
    this.ActiveUnfurnished = false;  
  }
  Unfurnished() {
    this.FurnishedTypeValue = 'Unfurnished';
    this.ActiveFurnished = false;
    this.ActiveSemiFurnished = false;
    this.ActiveUnfurnished = true; 
  }
  SemiFurnished() {
    this.FurnishedTypeValue = 'Semi Furnished';
    this.ActiveFurnished = false;
    this.ActiveSemiFurnished = true;
    this.ActiveUnfurnished = false;  
  }
  Immidiate() {
    this.editactivepossesionType='Lease Hold'
    this.ActiveImmidiate = true;
    this.ActiveInFuture = false;
  }
  Infuture() {
    this.editactivepossesionType='Free Hold';
    this.ActiveImmidiate = false;
    this.ActiveInFuture = true;
  }
  ReadyToMove() {
    this.editActiveconstructionstatus='Ready To Move';
    this.ActiveReadyToMove = true;
    this.ActiveUnderConstruction = false; 
  }
  UnderConstruction() {
    this.editActiveconstructionstatus='Under Construction';
    this.ActiveReadyToMove = false;
    this.ActiveUnderConstruction = true; 
  }
  Family() {
    this.editactiveteanentType= 'Family';
    this.ActiveFamiliy = !this.ActiveFamiliy;
    if(this.ActiveFamiliy==true){
      this.editactiveteanentTypearray.push('Family');
    }
    if(this.ActiveFamiliy==false){
      let i= this.editactiveteanentTypearray.indexOf('Family');
      this.editactiveteanentTypearray.splice(i,1);
    }
    this.ActiveOther = false;
  }
  Beachelor() { 
    this.editactiveteanentType='Bachelors';
    this.ActiveOther = false;
    this.ActiveBeachlor = !this.ActiveBeachlor; 
    if(this.ActiveBeachlor==true){
      this.editactiveteanentTypearray.push('Bachelors');
    }
    if(this.ActiveBeachlor==false){
      let i= this.editactiveteanentTypearray.indexOf('Bachelors');
      this.editactiveteanentTypearray.splice(i,1);
    }
  }
  Company() { 
    this.editactiveteanentType='Company';
    this.ActiveOther=false;
    this.ActiveCompany = !this.ActiveCompany;
    if(this.ActiveCompany==true){
      this.editactiveteanentTypearray.push('Company');
    }
    if(this.ActiveCompany==false){
      let i= this.editactiveteanentTypearray.indexOf('Company');
      this.editactiveteanentTypearray.splice(i,1);
    }
  }
  Other() {
    this.editactiveteanentType='Other';
    this.ActiveOther = !this.ActiveOther;
    if (this.ActiveOther == true) {
      this.editactiveteanentTypearray.push('Other');
      this.ActiveFamiliy = true;
      this.ActiveBeachlor = true;
      this.ActiveCompany = true;
    } else {
      this.editactiveteanentTypearray.splice(0, 4);
      this.ActiveFamiliy = false;
      this.ActiveBeachlor = false;
      this.ActiveCompany = false;
    }
  }

  BrokerageYes() {
    this.ChargeBrokerageYes = true; 
    this.ChargeBrokerageNo = false;
    this.editactivebrokrage='YES';
  }
  BrokerageNo() {
    this.ChargeBrokerageNo = true;
    this.ChargeBrokerageYes = false; 
    this.editactivebrokrage='NO';
  }
  BrokageAmt($event) {
    this.brokrageCharge = $event.target.value;
    if (parseInt(this.brokrageCharge.toString().replace(/,/g, '')) > 9900000) {
      this.monthlyRent = null;
      
      this.brokregeinK = '';
      this.toastr.info("Brokerage Amount Should not be greater than 99 Lakh");
      return;
    } 
    this.brokregeinK = this.transform(this.brokrageCharge.toString().replace(/,/g, ''));
  }
  Bathroom0() {
    this.editactivebathroom="0";
    this.ActiveZeroBathroom = true;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false;
    this.ActiveThreePlusBathroom = false;
   
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
  }
  Bathroom1() {
    this.editactivebathroom="1";
    this.ActiveZeroBathroom = false; 
    this.ActiveOneBathroom = true;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false; 
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveThreePlusBathroom = false;
  }
  Bathroom2() {
    this.editactivebathroom="2";
    this.ActiveZeroBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveTwoBathroom = true;
    this.ActiveThreeBathroom = false;
    this.ActiveThreePlusBathroom = false;
  }
  Bathroom3() { 
    this.editactivebathroom="3";
    this.ActiveZeroBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false; 
    this.ActiveFourBathroom = false;
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveThreeBathroom = true;
    this.ActiveThreePlusBathroom = false;
  }
  Bathroom4() {
    this.editactivebathroom="4";
    this.ActiveZeroBathroom = false;
    this.ActiveOneBathroom = false;
    this.ActiveTwoBathroom = false;
    this.ActiveThreeBathroom = false;
  
    this.ActiveFiveBathroom = false;
    this.ActiveSixBathroom = false;
    this.ActiveSevenBathroom = false;
    this.ActiveEightBathroom = false; 
    this.ActiveFourBathroom = true;
  }
    Bathroom5() {
      this.editactivebathroom="5";
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
     
      this.ActiveSixBathroom = false;
      this.ActiveSevenBathroom = false;
      this.ActiveEightBathroom = false; 
      this.ActiveFiveBathroom = true;
    }
    Bathroom6() { 
      this.editactivebathroom="6";
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
      this.ActiveFiveBathroom = false; 
      this.ActiveSevenBathroom = false;
      this.ActiveEightBathroom = false;
      this.ActiveSixBathroom = true; 
    }
    Bathroom7() { 
      this.editactivebathroom="7";
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
      this.ActiveFiveBathroom = false;
      this.ActiveSixBathroom = false;
      this.ActiveEightBathroom = false;
      this.ActiveSevenBathroom = true; 
    }
    Bathroom8() { 
      this.editactivebathroom="8";
      this.ActiveZeroBathroom = false;
      this.ActiveOneBathroom = false;
      this.ActiveTwoBathroom = false;
      this.ActiveThreeBathroom = false;
      this.ActiveFourBathroom = false;
      this.ActiveFiveBathroom = false;
      this.ActiveSixBathroom = false;
      this.ActiveSevenBathroom = false;
      this.ActiveEightBathroom = true; 
    } 
    BathroomPlus() {
      this.PlusBathroom = true;
    }

    Balconey0() {
      this.editactivebalcony="0";
      this.ActiveZeroBalconey = true;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = false;
      this.ActiveThreeBalconey = false;
      this.ActiveThreePlusBalconey = false; 
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = false;
      this.ActiveSevenBalconey = false;
      this.ActiveEightBalconey = false; 
    }
    Balconey1() {
      this.editactivebalcony="1";
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = true;
      this.ActiveTwoBalconey = false;
      this.ActiveThreeBalconey = false;
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = false;
      this.ActiveSevenBalconey = false;
      this.ActiveEightBalconey = false; 
      this.ActiveThreePlusBalconey = false; 
    }
    Balconey2() {
      this.editactivebalcony="2";
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = true;
      this.ActiveThreeBalconey = false;
      this.ActiveThreePlusBalconey = false;
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = false;
      this.ActiveSevenBalconey = false;
      this.ActiveEightBalconey = false; 
    }
    Balconey3() {
      this.editactivebalcony="3";
      this.ActiveZeroBalconey = false;
      this.ActiveOneBalconey = false;
      this.ActiveTwoBalconey = false;
      this.ActiveFourBalconey = false;
      this.ActiveFiveBalconey = false;
      this.ActiveSixBalconey = false;
      this.ActiveSevenBalconey = false;
      this.ActiveEightBalconey = false;
      
      this.ActiveThreeBalconey = true;
      this.ActiveThreePlusBalconey = false; 
    }
      Balconey4() {
        this.editactivebalcony="4";
        this.ActiveZeroBalconey = false;
        this.ActiveOneBalconey = false;
        this.ActiveTwoBalconey = false;
        this.ActiveThreeBalconey = false;
        this.ActiveFourBalconey = true;
        this.ActiveFiveBalconey = false;
        this.ActiveSixBalconey = false;
        this.ActiveEightBalconey = false;
        
        this.ActiveSevenBalconey = false; 
      } 
      BalconeyPluss() {
        this.BalconeyPlus = true;
      }
      Balconey5() {
        this.editactivebalcony="5";
        this.ActiveZeroBalconey = false;
        this.ActiveOneBalconey = false;
        this.ActiveTwoBalconey = false;
        this.ActiveThreeBalconey = false;
        this.ActiveFourBalconey = false;
        this.ActiveFiveBalconey = true;
        this.ActiveSixBalconey = false;
        this.ActiveEightBalconey = false;
        
        this.ActiveSevenBalconey = false;
        this.ActiveThreePlusBalconey = true; 
      } 
      Balconey6() {
        this.editactivebalcony="6";
        this.ActiveZeroBalconey = false;
        this.ActiveOneBalconey = false;
        this.ActiveTwoBalconey = false;
        this.ActiveThreeBalconey = false;
        this.ActiveFourBalconey = false;
        this.ActiveFiveBalconey = false;
        this.ActiveSixBalconey = true;
        this.ActiveEightBalconey = false;
        
        this.ActiveSevenBalconey = false;
        this.ActiveThreePlusBalconey = true;
      } 
      Balconey7() {
        this.editactivebalcony="7";
        this.ActiveZeroBalconey = false;
        this.ActiveOneBalconey = false;
        this.ActiveTwoBalconey = false;
        this.ActiveThreeBalconey = false;
        this.ActiveFourBalconey = false;
        this.ActiveFiveBalconey = false;
        this.ActiveSixBalconey = false;
        this.ActiveEightBalconey = false;
        
        this.ActiveSevenBalconey = true;
        this.ActiveThreePlusBalconey = true; 
      } 
      Balconey8() {
        this.editactivebalcony="8";
        this.ActiveZeroBalconey = false;
        this.ActiveOneBalconey = false;
        this.ActiveTwoBalconey = false;
        this.ActiveThreeBalconey = false;
        this.ActiveFourBalconey = false;
        this.ActiveFiveBalconey = false;
        this.ActiveSixBalconey = false;
        this.ActiveSevenBalconey = false;
        
        this.ActiveEightBalconey = true;
        this.ActiveThreePlusBalconey = true; 
      } 

      CoverParkingZero() { 
        this.editactivecoverparking="0 Cover Parking";
        this.ActiveCoverParking0 = true;
        this.ActiveCoverParking1 = false;
        this.ActiveCoverParking2 = false;
        this.ActiveCoverParking3 = false;
        this.ActiveCoverParking4 = false;
        this.ActiveCoverParking5 = false;
        this.ActiveCoverParking6 = false;
        this.ActiveCoverParking7 = false;
        this.ActiveCoverParking8 = false; 
      }
      CoverParkingOne() { 
        this.editactivecoverparking="1 Cover Parking";
        this.ActiveCoverParking0 = false;
        this.ActiveCoverParking1 = true;
        this.ActiveCoverParking2 = false;
        this.ActiveCoverParking3 = false;
        this.ActiveCoverParking4 = false;
        this.ActiveCoverParking5 = false;
        this.ActiveCoverParking6 = false;
        this.ActiveCoverParking7 = false;
        this.ActiveCoverParking8 = false; 
      }
      CoverParkingTwo() { 
        this.editactivecoverparking="2 Cover Parking";
        this.ActiveCoverParking0 = false;
        this.ActiveCoverParking1 = false;
        this.ActiveCoverParking2 = true;
        this.ActiveCoverParking3 = false;
        this.ActiveCoverParking4 = false;
        this.ActiveCoverParking5 = false;
        this.ActiveCoverParking6 = false;
        this.ActiveCoverParking7 = false;
        this.ActiveCoverParking8 = false; 
      }
      CoverParkingThree() { 
        this.editactivecoverparking="3 Cover Parking";
        this.ActiveCoverParking0 = false;
        this.ActiveCoverParking1 = false;
        this.ActiveCoverParking2 = false;
        this.ActiveCoverParking3 = true;
        this.ActiveCoverParking4 = false;
        this.ActiveCoverParking5 = false;
        this.ActiveCoverParking6 = false;
        this.ActiveCoverParking7 = false;
        this.ActiveCoverParking8 = false; 
      }
      CoverParkingFour() { 
        this.editactivecoverparking="4 Cover Parking";
        this.ActiveCoverParking0 = false;
        this.ActiveCoverParking1 = false;
        this.ActiveCoverParking2 = false;
        this.ActiveCoverParking3 = false;
        this.ActiveCoverParking4 = true;
        this.ActiveCoverParking5 = false;
        this.ActiveCoverParking6 = false;
        this.ActiveCoverParking7 = false;
        this.ActiveCoverParking8 = false; 
      }
      CoverParkingFive() { 
          this.editactivecoverparking="5 Cover Parking";
          this.ActiveCoverParking0 = false;
          this.ActiveCoverParking1 = false;
          this.ActiveCoverParking2 = false;
          this.ActiveCoverParking3 = false;
          this.ActiveCoverParking4 = false;
          this.ActiveCoverParking5 = true;
          this.ActiveCoverParking6 = false;
          this.ActiveCoverParking7 = false;
          this.ActiveCoverParking8 = false; 
        }
        CoverParkingSix() { 
          this.editactivecoverparking="6 Cover Parking";
          this.ActiveCoverParking0 = false;
          this.ActiveCoverParking1 = false;
          this.ActiveCoverParking2 = false;
          this.ActiveCoverParking3 = false;
          this.ActiveCoverParking4 = false;
          this.ActiveCoverParking5 = false;
          this.ActiveCoverParking6 = true;
          this.ActiveCoverParking7 = false;
          this.ActiveCoverParking8 = false; 
        }
        CoverParkingSeven() { 
          this.editactivecoverparking="7 Cover Parking";
          this.ActiveCoverParking0 = false;
          this.ActiveCoverParking1 = false;
          this.ActiveCoverParking2 = false;
          this.ActiveCoverParking3 = false;
          this.ActiveCoverParking4 = false;
          this.ActiveCoverParking5 = false;
          this.ActiveCoverParking6 = false;
          this.ActiveCoverParking7 = true;
          this.ActiveCoverParking8 = false; 
        }
        CoverParkingEight() { 
          this.editactivecoverparking="8 Cover Parking";
          this.ActiveCoverParking0 = false;
          this.ActiveCoverParking1 = false;
          this.ActiveCoverParking2 = false;
          this.ActiveCoverParking3 = false;
          this.ActiveCoverParking4 = false;
          this.ActiveCoverParking5 = false;
          this.ActiveCoverParking6 = false;
          this.ActiveCoverParking7 = false;
          this.ActiveCoverParking8 = true; 
        } 
        CoverPlus(){
          this.cp4=true;
        }
        OpenParkingZero() { 
          this.editactiveopenparking="0 Open Parking";
          this.ActiveOpenParking0 = true;
          this.ActiveOpenParking1 = false;
          this.ActiveOpenParking2 = false;
          this.ActiveOpenParking3 = false;
          this.ActiveOpenParking4 = false;
          this.ActiveOpenParking5 = false;
          this.ActiveOpenParking6 = false;
          this.ActiveOpenParking7 = false;
          this.ActiveOpenParking8 = false; 
        }
        OpenParkingOne() { 
          this.editactiveopenparking="1 Open Parking";
          this.ActiveOpenParking0 = false;
          this.ActiveOpenParking1 = true;
          this.ActiveOpenParking2 = false;
          this.ActiveOpenParking3 = false;
          this.ActiveOpenParking4 = false;
          this.ActiveOpenParking5 = false;
          this.ActiveOpenParking6 = false;
          this.ActiveOpenParking7 = false;
          this.ActiveOpenParking8 = false; 
        }
        OpenParkingTwo() { 
          this.editactiveopenparking="2 Open Parking";
          this.ActiveOpenParking0 = false;
          this.ActiveOpenParking1 = false;
          this.ActiveOpenParking2 = true;
          this.ActiveOpenParking3 = false;
          this.ActiveOpenParking4 = false;
          this.ActiveOpenParking5 = false;
          this.ActiveOpenParking6 = false;
          this.ActiveOpenParking7 = false;
          this.ActiveOpenParking8 = false; 
        }
        OpenParkingThree() {
          this.editactiveopenparking="3 Open Parking";
          this.ActiveOpenParking0 = false;
          this.ActiveOpenParking1 = false;
          this.ActiveOpenParking2 = false;
          this.ActiveOpenParking3 = true;
          this.ActiveOpenParking4 = false;
          this.ActiveOpenParking5 = false;
          this.ActiveOpenParking6 = false;
          this.ActiveOpenParking7 = false;
          this.ActiveOpenParking8 = false; 
        }
        OpenParkingFour() {
          this.editactiveopenparking="4 Open Parking";
          this.ActiveOpenParking0 = false;
          this.ActiveOpenParking1 = false;
          this.ActiveOpenParking2 = false;
          this.ActiveOpenParking3 = false;
          this.ActiveOpenParking4 = true;
          this.ActiveOpenParking5 = false;
          this.ActiveOpenParking6 = false;
          this.ActiveOpenParking7 = false;
          this.ActiveOpenParking8 = false; 
        }
          OpenParkingFive() {
            this.editactiveopenparking="5 Open Parking";
            this.ActiveOpenParking0 = false;
            this.ActiveOpenParking1 = false;
            this.ActiveOpenParking2 = false;
            this.ActiveOpenParking3 = false;
            this.ActiveOpenParking4 = false;
            this.ActiveOpenParking5 = true;
            this.ActiveOpenParking6 = false;
            this.ActiveOpenParking7 = false;
            this.ActiveOpenParking8 = false; 
          }
          OpenParkingSix() {
            this.editactiveopenparking="6 Open Parking";
            this.ActiveOpenParking0 = false;
            this.ActiveOpenParking1 = false;
            this.ActiveOpenParking2 = false;
            this.ActiveOpenParking3 = false;
            this.ActiveOpenParking4 = false;
            this.ActiveOpenParking5 = false;
            this.ActiveOpenParking6 = true;
            this.ActiveOpenParking7 = false;
            this.ActiveOpenParking8 = false; 
          }
          OpenParkingSeven() { 
            this.editactiveopenparking="7 Open Parking";
            this.ActiveOpenParking0 = false;
            this.ActiveOpenParking1 = false;
            this.ActiveOpenParking2 = false;
            this.ActiveOpenParking3 = false;
            this.ActiveOpenParking4 = false;
            this.ActiveOpenParking5 = false;
            this.ActiveOpenParking6 = false;
            this.ActiveOpenParking7 = true;
            this.ActiveOpenParking8 = false; 
          }
          OpenParkingEight() {
            this.editactiveopenparking="8 Open Parking";
            this.ActiveOpenParking0 = false;
            this.ActiveOpenParking1 = false;
            this.ActiveOpenParking2 = false;
            this.ActiveOpenParking3 = false;
            this.ActiveOpenParking4 = false;
            this.ActiveOpenParking5 = false;
            this.ActiveOpenParking6 = false;
            this.ActiveOpenParking7 = false;
            this.ActiveOpenParking8 = true; 
          }
          
          OpenParkingPluss(){ 
          this.OpenParkingPlus=true;
        }
        
  securityDepositeYess() {
    this.editactivesecurityDepo='YES';
    this.DepositeYes = true;
    this.securityDepositeYes = true;
    this.securityDepositeNo = false; 
  }

  securityDepositeNoo() {
    this.editactivesecurityDepo='NO';
    this.DepositeYes = false;
    this.securityDepositeYes = false;
    this.securityDepositeNo = true; 
    this.sucurityCharge=0;
  }

    SaveBasic(){  
      if(this.maintainceCharge=='' || parseInt(this.maintainceCharge)==0)
      return this.toastr.warning('Please enter valid maintaince charge');

      if(this.monthlyRent==null || this.monthlyRent<=0)
      return this.toastr.warning('Please enter valid monthly rent charge');

      if(this.buildUpArea=='' || parseInt(this.buildUpArea)<=0)
      return this.toastr.warning('Please enter valid buildup area charge');

      if(this.propAge==null || this.propAge<=0)
      return this.toastr.warning('Please enter valid buildup area charge');

      this._editProperty.EditProperty(this.basicdetailId,this.propAge.toString(),this.editactivebathroom,
      this.editactivebalcony,this.FurnishedTypeValue,this.editactivecoverparking,this.editactiveopenparking,
      this.maintainceCharge,this.editactiveteanentTypearray.toString(),this.monthlyRent.toString(),
      this.editactivesecurityDepo,this.sucurityCharge.toString(),this.myDateValue,this.buildUpArea)
      .subscribe((data:any)=>{
        this.toastr.success('Updated','Rent Detail Updated');
      })
    }
    SaveBasicSell(){
      if(this.propAge==null || this.propAge<=0)
      return this.toastr.warning('Please enter valid buildup area charge');

      if(this.monthlyRent==null || this.monthlyRent<=0)
      return this.toastr.warning('Please enter valid monthly rent charge');

      if(this.buildUpArea=='' || parseInt(this.buildUpArea)<=0)
      return this.toastr.warning('Please enter valid buildup area charge');

      this._editProperty.EditPropertySell(this.basicdetailId,this.propAge.toString(),this.editactivebathroom,
      this.editactivebalcony,this.FurnishedTypeValue,this.editactivecoverparking,this.editactiveopenparking,
      this.editActiveconstructionstatus,this.editactivebrokrage,this.brokrageCharge,this.monthlyRent.toString(),
      this.buildUpArea,this.carpetArea,this.editactivetransactiontype)
      .subscribe((data:any)=>{
        this.toastr.success('Updated','Sell Detail Updated');
      })
    }
    SaveBasicPlot(){ 
      if(this.monthlyRent==null || this.monthlyRent<=0)
      return this.toastr.warning('Please enter valid plot price'); 
      if(this.monthlyRent< 100000)
      return this.toastr.warning('Plot price should be grater than 1 Lac'); 

      if(this.plotArea==null || this.plotArea==0)
      return this.toastr.warning('Please enter valid plot area'); 

      if(this.buildUpArea=='' || parseInt(this.buildUpArea)<=0)
      return this.toastr.warning('Please enter valid buildup area charge');

      this._editProperty.EditPropertyPlot(this.basicdetailId,this.editactivetransactiontype,this.editactivepossesionType,this.monthlyRent,this.plotNo,this.plotArea,this.selectedSq,this.lengthplot,this.widthplot,this.wfr,this.buildUpArea,this.carpetArea)
      .subscribe((data:any)=>{
       this.toastr.success('Updated','Plot Detail Updated');
      })
    }
    SaveBasicPG(){ 
      if(this.totalbeds<=0 || this.totalbeds==null)
      return this.toastr.warning('Please enter valid bed number');
      if(this.monthlyRent==null || this.monthlyRent<=0)
      return this.toastr.warning('Please enter valid monthly rent charge');
      if(this.editactivesecurityDepo=='' ||parseInt(this.editactivesecurityDepo)<=0)
      return this.toastr.warning('Please enter valid Security deposite amount');
      this._editProperty.EditPropertyPG(this.basicdetailId,this.pgname,this.totalbeds,this.editactivepgfor,this.editactivemealavalable,this.editactivesutablefor.toString(),this.editactiveroomtype,this.BedInRoom,this.monthlyRent.toString(),this.editactivesecurityDepo,this.editactivepgfacility.toString(),this.np,this.lp,this.editactivepgcommons.toString(),this.editactivepropertyManagedBy.toString(),this.editactivestay,this.editactivenonveg,this.editactiveoppsex,this.editactivevisitor,this.editactivegaurdian,this.editactivedrinking,this.editactivesmoking)
      .subscribe((data:any)=>{
       this.toastr.success('Updated','PG Detail Updated');
      })
    }
    PhotoSubmit(){
    this.toastr.success('Updated','Image Updated Successfully');
    }
    initializeUploader() { 
      this.uploader = new FileUploader({
        url: this.baseUrl + 'Photo/' + this.userName + '/' + this.randomId, 
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true, 
        allowedFileType: ['image'],
        autoUpload: false,
        removeAfterUpload: true,
        maxFileSize: 10 * 1024 * 1024
      });
    
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          const res: Images = JSON.parse(response);  
          this.imgs.push(res);   
          this.iShowImg='block'; 
          }
          
        };
      
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.toastr.info("Only image file allowed.");
      }
    }
      setMainPhoto(photo: any) { 
        this.services.setMainPhoto(this.randomId, photo.id).subscribe(() => {
          this.currentMain = _.findWhere(this.imgs, { cover: true });
          for (let index = 0; index < this.imgs.length; index++) {
            this.imgs[index].cover = false; 
          }
        
          photo.cover = true; 
          
          this.getMemberPhotoChange.emit(photo.url);
          this.services.changeMemberPhoto(photo.url);
         this.currentMainPhotoId=  photo.id;
        //  this.services.photoUrl = photo.url;
       //   localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }, error => {
         // this.alertify.error(error);
        });
    }
      setTagPhotos($event,photo: any) { 
        photo.tag=$event.target.value; 
        this.services.setTagPhoto(this.userId, photo.id,photo.tag).subscribe(() => {
      
        }, error => {
          // this.alertify.error(error);
        });
      }
      deletePhotos(id: number) {  
          this.services.deletePhoto(this.userId, id).subscribe(() => {
            this.imgs.splice(_.findIndex(this.imgs, { id: id }), 1);
  
            if(id==this.currentMainPhotoId){ 
            }
           if(this.imgs.length==0){
             
             this.iShowImg = 'none';  
           } 
     
          }, error => { 
          }) 
      }
    transform(number: any, args?: any): any {
      if (isNaN(number)) return null; // will only work value is a number
      if (number === null) return null;
      if (number === 0) return null;
      let abs = Math.abs(parseInt(number));
      const rounder = Math.pow(10, 2);
      const isNegative = number < 0; // will also work for Negetive numbers
      let key = '';

      const powers = [
        { key: 'Cr', value: Math.pow(10, 7) },
        { key: 'Lacs', value: Math.pow(10, 5) },
        { key: 'K',  value: 1000 }
      ];

      for (let i = 0; i < powers.length; i++) {
        let reduced = abs / powers[i].value;
        reduced = Math.round(reduced * rounder) / rounder;
        if (reduced >= 1) {
          abs = Number(reduced);
          key = powers[i].key;
          break;
        }
      }
      return (isNegative ? '-' : '') + abs + key;
    }
}
