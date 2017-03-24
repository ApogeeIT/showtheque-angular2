import { Router } from '@angular/router';
import { User } from '../../common/model/user';
import { AuthService } from '../../common/services/auth.service';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sta-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    user?: User;

    constructor(private _auth: AuthService, private _router: Router) {
        this._auth.onAuthenticatedChange().subscribe(user => {
            this.user = user;
        })
    }

    loginUser({login, password}) {
        this._auth.login(login, password);
    }
}