import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../User';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StorageService {
    public User: User;
    public uid: string;
    public userInfo: AngularFireList<any[]>;
    public user: any[];
    url: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/';
    
   constructor(private afd: AngularFireDatabase, private afa: AngularFireAuth, private http: HttpClient, public afs: AngularFirestore) {
        this.uid = "";
        this.userInfo = afd.list('users');
        //this.userInfo.valueChanges().subscribe(res => res.where('UserID', '==', this.uid));
     }
    GetUser(): User {
        if (this.uid != null) {
            //this.User = this.afd.object('/' + this.uid).map()
        }
        return this.User
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
    GetUserInfo() {
        let userInfo = this.afs.collection('the-cookbook', ref => ref.where('UserID', '==', this.uid))
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
       return this.http.get(this.url + "food/ingredients/autocomplete?metaInformation=false&number=10&query=" + value, {
            headers: new HttpHeaders().set('X-Mashape-Key', 'tM5qhvbLgOmshXF6C08zcPSGG80vp1z3sj9jsnF0zNHLYcu6A8'),
        });
    }
}