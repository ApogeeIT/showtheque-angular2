import { User } from '../model/user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class AuthService {

    protected _isAuthenticated: BehaviorSubject<User>;

    public onAuthenticatedChange(): Subject<User> {
        return this._isAuthenticated;
    }

    public abstract login(login: string, passsword: string): Promise<any>;

    public abstract logout(): void ;
}