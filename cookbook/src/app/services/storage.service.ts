import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../User';

@Injectable()
export class StorageService {
    public User: User;
    public uid: string;
    public userInfo: Observable<any[]>;

    constructor(public afd: AngularFireDatabase, public af: AngularFireAuth, public afs: AngularFirestore) { }
    GetUser(): User {
        if (this.uid != null) {
            //this.User = this.afd.object('/' + this.uid).map()
        }
        return this.User
    }
    GetUID() {
        this.af.authState.subscribe((resp) => {
            if (resp != null) {
                if (resp.uid) {
                    this.uid = resp.uid;
                }
            }
        });
    }

    GetUserInfo() {
        this.userInfo = this.afs.collection('the-cookbook', ref => ref.where('UserID', '==', this.uid))
    }
}