import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  userData: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.authService.getUserProfile()
      .subscribe((response) => {
        console.log(response);
        this.userData = response;
      }, err => {
        // console.log(err);
      });
  }

}
