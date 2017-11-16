import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean;
  constructor(public af: AngularFireAuth, public authService: AuthService) {
    this.login = false;
  }

  CheckLogin(): boolean {
    return !this.login;
  }
  CheckLogOut(): boolean {
    return this.login;
  }
  Logout() {
    this.authService.logout();
    this.login=false;
  }
  CheckUser() {
    this.af.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.login = true;
        }
      }
    });
  }

  ngOnInit() {
    this.CheckUser();
  }

}
