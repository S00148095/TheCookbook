import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Username: any;
  uid: string;
  email: string;
  password: string;
  emailConfirm: string;
  passwordConfirm: string;
  ingredients: any[];
  bannedIngredients: string[] = [];
  bannedIngredientsTest: string[] = [];
  test: string = "";
  login:boolean;

  constructor(public firebaseAuth: AngularFireAuth,public authService: AuthService, private router: Router, public af: AngularFireAuth, public toastr: ToastsManager, vcr: ViewContainerRef, private service: StorageService) {
      this.toastr.setRootViewContainerRef(vcr);//sets the view container for the toasts to appear in
    }
  Signup() {//creates a new user if all the details are filled in correctly, otherwise shows a notification of what they did wrong
      if (this.email && this.emailConfirm && this.password && this.passwordConfirm && this.Username) {
        if (this.email == this.emailConfirm) {
          if (this.password == this.passwordConfirm) {
            this.authService.signup(this.email, this.password,this.Username,this.bannedIngredients);            
            this.email = this.password = this.emailConfirm = this.passwordConfirm = '';//resets the fields       
          }
          else this.authService.ShowWarning("Your passwords do not match, please try again.");
        }
        else this.authService.ShowWarning("Your emails do not match, please try again.");
      }
      else this.authService.ShowWarning("Please fill out all mandatory fields.");
    }
  Login() {//sends a request to log the user in if they have filled in the fields
      if (this.email && this.password) {
        this.authService.login(this.email, this.password);
        this.email = this.password = this.emailConfirm = this.passwordConfirm = '';
      }
      else this.authService.ShowWarning("Please fill out all fields.");
    }
  getAutocomplete() {//requests autocomplete feilds from the API
      this.service.sendGetRequestAutocomplete(this.test)
        .subscribe(res => {
          this.ingredients = res;//shows the response
        });
    }
  checkLength() {//resets the list if there is nothing in the input, and hides the dropdown if there is nothing in it
      if (this.test == "") {
        this.ingredients = [];
      }
      if (this.ingredients.length > 0) {
        return true;
      }
      else return false
    }
  AddIngredient(ingredient) {//adds an ingredien to the list of banned ingredients for that user and resets the input
      this.bannedIngredientsTest = this.bannedIngredients;
      this.bannedIngredientsTest.push(ingredient);
      this.bannedIngredients = this.bannedIngredientsTest;
      this.test = "";
      this.ingredients = [];
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
  public ngOnInit(): void {
    this.service.updateTitle("Login - The Cookbook");//updates the title
    this.CheckUser();
    }
  }


