import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../User';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class StorageService {
    public uid: string = '';
    url: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/';
    firebaseURL:string='https://the-cookbook.firebaseio.com/';

    constructor(private db: AngularFireDatabase, private afa: AngularFireAuth, private http: HttpClient) {
        this.GetUID();
    }

    GetUserInfo(): Observable<any> {
        return this.http.get("https://the-cookbook.firebaseio.com/users/" + this.uid + ".json")
    }
    RemoveShoppingListItem() {

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
    sendPostRequestNewUser(postData:any,user:string)
    {   
        this.http.patch(this.firebaseURL+"users/"+user+".json",postData).subscribe(res => {
            console.log(res);
          });
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
}