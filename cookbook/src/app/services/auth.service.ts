import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Injectable, ViewContainerRef } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  isAuth:boolean;

  constructor(private firebaseAuth: AngularFireAuth, public toastr: ToastsManager, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  isAuthenticated(): boolean {
    this.firebaseAuth.authState.subscribe((resp) => {
      if (resp != null) {
        if (resp.uid) {
          this.isAuth = true;
        }
      }
      else this.isAuth = false;
    });
    return this.isAuth;
  }

  canActivate(): boolean {
    const isAuth = this.isAuthenticated();
    if (!isAuth) {
      this.router.navigateByUrl('/login')
    }
    return isAuth;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Successfully registered!');
      })
      .catch(err => {
        this.ShowWarning(err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Succesfully logged in!');
      })
      .catch(err => {
        this.ShowWarning(err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  ShowWarning(output: string) {
    this.toastr.warning(output);
  }
}