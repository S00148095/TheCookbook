import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../User';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class StorageService {
    public uid: string = '';
    public userInfo: User;
    url: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/';
    firebaseURL: string = 'https://the-cookbook.firebaseio.com/';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    constructor(private db: AngularFireDatabase, private afa: AngularFireAuth, private http: HttpClient, private router: Router, private title: Title) {
        this.GetUID();
    }
    //Get's the user info on login
    GetUserInfo(): Observable<any> {
        return this.http.get(this.firebaseURL + "users/" + this.uid + ".json")
    }

    updateTitle(value) {
        this.title.setTitle(value);
    }

    LogOut() {
        this.uid = "";
        this.userInfo = null;
    }

    GetUID() {
        this.afa.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.uid = resp.uid;
                }
            }
        });
    }
    //On Creation of a new user
    sendPostRequestNewUser(postData: any, user: string) {
        this.http.patch(this.firebaseURL + "users/" + user + ".json", postData).subscribe(res => {
            console.log(res);
            this.router.navigate(['../dashboard']);
        });
    }
    //Updates the schedule for a user
    sendPostRequestUpdateSchedule(postData: Object) {
        this.http.patch(this.firebaseURL + "/users/" + this.uid + ".json",
            postData).subscribe(res => {
                console.log(res);
            }
        );
    }
    //Any updates to the shopping list
    UpdateShoppingList(shoppingList: Object): Observable<any> {
        return this.http.patch(this.firebaseURL + "/users/" + this.uid + "/ShoppingList.json",
            shoppingList,
            this.httpOptions
        );
    }
    //Changes done from no to yes
    MarkShoppingListItem(shoppingList, index) {
        return this.http.patch(this.firebaseURL + "/users/" + this.uid + "/ShoppingList/" + index + ".json",
            shoppingList,
            this.httpOptions
        );
    }
    //Allows the editing of items in shopping list
    EditShoppingListItem(shoppingList) {
        return this.http.patch(this.firebaseURL + "/users/" + this.uid + "/ShoppingList.json",
            shoppingList,
            this.httpOptions
        );
    }
    //Delete item from shopping list
    RemoveShoppingListItem(shoppingList): Observable<any> {
        return this.http.put(this.firebaseURL + "/users/" + this.uid + "/ShoppingList.json",
            shoppingList,
            this.httpOptions
        );
    }

    sendGetRequestRandomRecipes(): Observable<any> {
        return this.http.get(this.url + "recipes/" + "random?limitLicense=true&number=10", {
            headers: new HttpHeaders().set('X-Mashape-Key', 'tM5qhvbLgOmshXF6C08zcPSGG80vp1z3sj9jsnF0zNHLYcu6A8'),
        });
    }

    sendGetRequestRecipeByID(ID): Observable<any> {
        return this.http.get(this.url + "recipes/" + ID + "/information?includeNutrition=false", {
            headers: new HttpHeaders().set('X-Mashape-Key', 'tM5qhvbLgOmshXF6C08zcPSGG80vp1z3sj9jsnF0zNHLYcu6A8'),
        });
    }

    sendGetRequestAutocomplete(value): Observable<any> {
        return this.http.get(this.url + "food/ingredients/autocomplete?metaInformation=false&number=5&query=" + value, {
            headers: new HttpHeaders().set('X-Mashape-Key', 'tM5qhvbLgOmshXF6C08zcPSGG80vp1z3sj9jsnF0zNHLYcu6A8'),
        });
    }
    sendPostRequestUpdateScheduleAndShoppingList(postData) {
        this.http.patch(this.firebaseURL + "/users/" + this.uid + ".json", postData).subscribe(res => {
            this.router.navigate(['../schedule']);
        });
    }
}