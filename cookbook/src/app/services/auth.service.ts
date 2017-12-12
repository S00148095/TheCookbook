import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Injectable, ViewContainerRef } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  isAuth: boolean;
  post: any;

  constructor(private firebaseAuth: AngularFireAuth, private afa: AngularFireAuth, public toastr: ToastsManager, private router: Router, private service: StorageService) {
    this.user = firebaseAuth.authState;
  }
  canActivate(): Observable<boolean> {
    return this.firebaseAuth.authState.map(authState => {
      if (!authState) this.router.navigate(['/login']);
      return !!authState;
    });
  }
  populatePost(uid, bannedIngredients, Username) {
    this.post = {
      "UserID": uid,
      "BannedFood": bannedIngredients,
      "Schedule": [],
      "ShoppingList": [],
      "UserName": Username
    }
    return this.post;
  }
  signup(email: string, password: string, Username: string, bannedIngredients: string[]) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.afa.authState.subscribe((resp) => {
          if (resp != null) {
            if (resp.uid) {
              this.service.sendPostRequestNewUser(this.populatePost(resp.uid, bannedIngredients, Username), resp.uid);
            }
          }
        });
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
        this.router.navigate(['/dashboard']);
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
  showSuccess(output: string) {
    this.toastr.success(output);
  }
  showDanger(output: string) {
    this.toastr.error(output);
  }
  showInfo(output: string) {
    this.toastr.info(output);
  }
}