import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../User';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class StorageService {
    public User: User;
    public uid: string = '';
    url: string = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/';

    public userList: AngularFireList<User[]>;
    public userInfo: AngularFireObject<User>;
    private basePath: string = '/users';

    constructor(private db: AngularFireDatabase, private afa: AngularFireAuth, private http: HttpClient) {
    }

    GetUserList(query = {}):AngularFireList<User[]> {
        this.userList = this.db.list(this.basePath ,
            query => query
        );
        return this.userList
    }

    GetUserInfo(key: string): AngularFireObject<User>{
        const userPath = '${this.basePath}/${uid}';
        this.userInfo = this.db.object(userPath)
        return this.userInfo
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
        console.log(this.url + "food/ingredients/autocomplete?metaInformation=false&number=10&query=" + value);
        return this.http.get(this.url + "food/ingredients/autocomplete?metaInformation=false&number=10&query=" + value, {
            headers: new HttpHeaders().set('X-Mashape-Key', 'tM5qhvbLgOmshXF6C08zcPSGG80vp1z3sj9jsnF0zNHLYcu6A8'),
        });
    }
}