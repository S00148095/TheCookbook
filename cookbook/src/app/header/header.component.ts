import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean;
  constructor(public firebaseAuth: AngularFireAuth, public authService: AuthService, private router: Router, private service: StorageService) {
    this.login = false;
  }

  CheckLogin(): boolean {
    return !this.login;
  }
  CheckLogOut(): boolean {
    return this.login;
  }
  Logout() {//logs the user out, including clearing data from the service
    this.authService.logout();
    this.login=false;
    this.service.LogOut();
    this.router.navigateByUrl("../home");
  }
  CheckUser() {//checks if the user is logged in
    this.firebaseAuth.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.login = true;
        }
        else{this.login=false;}
      }
      else{this.login=false;}
    });
  }
//getting auth state: https://angularfirebase.com/snippets/angularfire2-version-4-authentication-service/
  ngOnInit() {
    this.CheckUser();
  }

}
