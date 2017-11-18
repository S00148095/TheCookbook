import { ToastsManager } from 'ng2-toastr';
import { Injectable, ViewContainerRef } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth,public toastr: ToastsManager){
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Successfully registered!');
      })      
      .catch(err => {this.ShowWarning(err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Succesfully logged in!');
      })
      .catch(err => {this.ShowWarning(err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  ShowWarning(output:string) {
    this.toastr.warning(output);
  }
}