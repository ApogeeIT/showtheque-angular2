import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class AuthService {

    protected _user?: User;

    protected _isAuthenticated: BehaviorSubject<boolean | undefined> = new BehaviorSubject(undefined);

    public getUser(): User | undefined {
        return this._user;
    }

    public onAuthenticatedChange(): BehaviorSubject<boolean | undefined> {
        return this._isAuthenticated;
    }

    public abstract login(login: string, passsword: string): Promise<any>;

    public abstract logout(): void;
}
