import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  demo: any;

  constructor(public authService: AuthService, private alertify: AlertifyService,
              private route: Router) { }

  ngOnInit() {
  }

  login() {
  this.authService.login(this.model).subscribe(next => {
    this.alertify.success('Logged in successfully');
  }, error => {
    this.alertify.error('Wrong Username or Password');
  }, () => {
    this.route.navigate(['/members']);
  });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    this.model = {};
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.route.navigate(['/home']);
  }
}
