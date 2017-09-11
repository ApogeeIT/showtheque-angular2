import { User } from '../model/user';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class AuthService {

    protected _user?: User;

    public getUser() : User | undefined{
        return this._user;
    }

    protected _isAuthenticated: Subject<boolean>;

    public onAuthenticatedChange(): Subject<boolean> {
        return this._isAuthenticated;
    }

    public abstract login(login: string, passsword: string): Promise<any>;

    public abstract logout(): void ;
}