import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthFirebaseService extends AuthService {

    private _fuser?: firebase.UserInfo;

    constructor() {
        super();
        this._isAuthenticated = new BehaviorSubject(undefined);

        firebase.auth().onAuthStateChanged((user: firebase.UserInfo) => {
            this._fuser = user;
            if (user) {
                this._user = { id: user.uid, name: user.displayName, email: user.email };
                this._isAuthenticated.next(true);
            } else {
                this._isAuthenticated.next(false);
            }
        });
    }

    login(login: string, passsword: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(login, passsword).then((user: firebase.UserInfo) => {
                resolve(user);
            }, err => {
                reject(err);
            });
        });
    }

    logout(): void {
        firebase.auth().signOut();
        this._user = undefined;
        this._isAuthenticated.next(false);
    }
}