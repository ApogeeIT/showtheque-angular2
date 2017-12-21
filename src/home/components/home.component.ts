import { Component } from '@angular/core';

import { User } from '../../common/model/user';
import { AuthService } from '../../common/services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'sta-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent {

    user?: User;

    constructor(private _auth: AuthService) {
        this._auth.onAuthenticatedChange().subscribe(user => {
            this.user = this._auth.getUser();
        });
    }

    loginUser({ login, password }: { login: string, password: string }) {
        this._auth.login(login, password);
    }
}
