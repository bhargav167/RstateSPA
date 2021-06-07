import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileEditService } from 'src/app/Services/Profile/profileEdit.service'; 
import { EmailSenderService} from '../../../Services/EmailServices/emailSender.service';

@Component({
  selector: 'app-VerifyEmailPage',
  templateUrl: './VerifyEmailPage.component.html',
  styleUrls: ['./VerifyEmailPage.component.css']
})
export class VerifyEmailPageComponent implements OnInit {
userId:string; 
email:string;
  constructor(private emailServices: EmailSenderService, 
    private route: ActivatedRoute,
    private profileUpdate: ProfileEditService) {
      this.userId = this.route.snapshot.params['uid'];
      this.email = this.route.snapshot.params['email']; 
   }

  ngOnInit() { 
  this.emailServices.confirmmail(this.userId).subscribe((data)=>{
    this.profileUpdate.verifyEmail(this.userId, this.email).subscribe((data) => {
    }, err => {
    })
  })
  }
}
