import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../User';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class StorageService {
    public User: User;
    public uid: string;
    public userInfo: Observable<any[]>;
    url: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';
    
    constructor(private afd: AngularFireDatabase, private afa: AngularFireAuth, private http: HttpClient, public afs: AngularFirestore) 
    { }
    
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
        return this.http.get(this.url + "random?limitLicense=true&number=10", {
            headers: new HttpHeaders().set('X-Mashape-Key', 'tM5qhvbLgOmshXF6C08zcPSGG80vp1z3sj9jsnF0zNHLYcu6A8'),
        });
    }
    sendGetRequestRecipeByID(ID): Observable<any> {
        return this.http.get(this.url + ID + "/information?includeNutrition=false", {
            headers: new HttpHeaders().set('X-Mashape-Key', 'tM5qhvbLgOmshXF6C08zcPSGG80vp1z3sj9jsnF0zNHLYcu6A8'),
        });
    }
}