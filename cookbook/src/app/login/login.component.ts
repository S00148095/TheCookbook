import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageService } from '../services/storage.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  emailConfirm: string;
  passwordConfirm: string;
  ingredients:any[];
  test:string="";

  constructor(public authService: AuthService, private router: Router, public af: AngularFireAuth, public toastr: ToastsManager, vcr: ViewContainerRef,private service: StorageService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  Signup() {
    if (this.email && this.emailConfirm && this.password && this.passwordConfirm) {
      if (this.email == this.emailConfirm) {
        if (this.password == this.passwordConfirm) {
          this.authService.signup(this.email, this.password);
          this.email = this.password = this.emailConfirm = this.passwordConfirm = '';
        }
        else this.authService.ShowWarning("Your passwords do not match, please try again.");
      }
      else this.authService.ShowWarning("Your emails do not match, please try again.");
    }
    else this.authService.ShowWarning("Please fill out all mandatory fields.");
  }
  Login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password);
      this.email = this.password = this.emailConfirm = this.passwordConfirm = '';
    }
    else this.authService.ShowWarning("Please fill out all fields.");
  }
  getAutocomplete()
  {
    this.service.sendGetRequestAutocomplete(this.test)
      .subscribe(res => {
        this.ingredients=res;
      });
  }

  public ngOnInit(): void {
    this.af.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.router.navigate(['../dashboard']);
        }
      }
    });
  }
}


