import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/Post.service';

@Component({
  selector: 'app-HomeLoan',
  templateUrl: './HomeLoan.component.html',
  styleUrls: ['./HomeLoan.component.css']
})
export class HomeLoanComponent implements OnInit {
  city: any;
  keyword = 'citynName';
  country: any;  
  location: string = 'All';
  constructor(private services: PostService) {
    
   }

  ngOnInit() {
    this.services.allCity().subscribe((data) => {
      this.country = data; 
    })
  }
  selectEvent(item) {
    this.location = item.citynName;
    this.services.allLocality(item.id).subscribe((data) => {
      this.city = data;
    })
  }
}
