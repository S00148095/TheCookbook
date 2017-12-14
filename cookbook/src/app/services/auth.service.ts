import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Injectable, ViewContainerRef } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { StorageService } from './storage.service';
//Large amounts of this service, especially signup and login: https://alligator.io/angular/firebase-authentication-angularfire2/
@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  isAuth: boolean;
  post: any;

  constructor(private firebaseAuth: AngularFireAuth, private afa: AngularFireAuth, public toastr: ToastsManager, private router: Router, private service: StorageService) {
    this.user = firebaseAuth.authState;
  }
  canActivate(): Observable<boolean> {//guards the routes, directing the user to the login page if not logged in
    return this.firebaseAuth.authState.map(authState => {
      if (!authState) this.router.navigate(['/login']);
      console.log('activate?', !!authState);
      return !!authState;
    });
    //canActivate: https://scotch.io/tutorials/protecting-angular-v2-routes-with-canactivatecanactivatechild-guards
  }
  populatePost(uid, bannedIngredients, Username) {//formats the data to JSON
    this.post = {
      "UserID": uid,
      "BannedFood": bannedIngredients,
      "Schedule": [],
      "ShoppingList": [],
      "UserName": Username
    }
    return this.post;
  }
  signup(email: string, password: string, Username: string, bannedIngredients: string[]) {//creates a new user, gets the user's newly generated UID and creates a new entry in the database
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)//creates a new user
      .then(value => {
        console.log('Successfully registered!');
        this.afa.authState.subscribe((resp) => {
          if (resp != null) {
            if (resp.uid) {
              this.service.sendPostRequestNewUser(this.populatePost(resp.uid, bannedIngredients, Username), resp.uid);//creates a new entry in the database
            }
          }
        });
      })
      .catch(err => {
        this.ShowWarning(err.message);
      });
  }
  login(email: string, password: string) {//logs the user in and navigates to dashboard
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Succesfully logged in!');
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        this.ShowWarning(err.message);
      });
  }
  logout() {//logs the user out
    this.firebaseAuth
      .auth
      .signOut();
  }
  //Toasts: https://www.npmjs.com/package/ng2-toastr
  ShowWarning(output: string) {//shows orange toast
    this.toastr.warning(output);
  }
  showSuccess(output: string) {//shows green toast
    this.toastr.success(output);
  }
  showDanger(output: string) {//shows red toast
    this.toastr.error(output);
  }
  showInfo(output: string) {//shows blue toast
    this.toastr.info(output);
  }
}