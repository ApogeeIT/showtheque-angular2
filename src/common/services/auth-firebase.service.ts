import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'firebase';

@Injectable()
export class AuthFirebaseService extends AuthService {

    private _user?: firebase.UserInfo;

    constructor() {
        super();
        this._isAuthenticated = new BehaviorSubject(undefined);
        firebase.auth().onAuthStateChanged((user: firebase.UserInfo) => {
            this._user = user;
            if (user) {
                this._isAuthenticated.next({ id: user.uid, name: user.displayName, email: user.email });
            } else {
                this._isAuthenticated.next(undefined);
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
        this._isAuthenticated.next(undefined);
    }
}