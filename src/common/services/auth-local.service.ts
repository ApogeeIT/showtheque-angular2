import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthLocalService extends AuthService {

    private _user?: User;

    constructor() {
        super();
        this._isAuthenticated = new BehaviorSubject(undefined);
        this.localLogin();
    }

    login(login: string, passsword: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.localLogin();
            resolve(this._user);
        });
    }

    logout(): void {
        this._user = undefined;
        this._isAuthenticated.next(undefined);
    }

    private localLogin() {
        this._user = new User();
        this._user.name = 'local user';
        this._isAuthenticated.next(this._user);
    }
}