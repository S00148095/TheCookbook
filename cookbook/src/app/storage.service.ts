import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../User';

@Injectable()
export class StorageService {
    public User: User;
    public uid: string;

    constructor(public afd: AngularFireDatabase, public af: AngularFireAuth) { }
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
}