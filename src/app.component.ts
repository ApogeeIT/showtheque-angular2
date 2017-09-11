import { Router } from '@angular/router';
import { User } from './common/model/user';
import { AuthService } from './common/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sta-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    user?: User;

    constructor(private _auth: AuthService, private _router: Router) {
        this._auth.onAuthenticatedChange().subscribe(user => {
            this.user = this._auth.getUser();
        })
    }

    ngOnInit() {
        
    }
    
    logout() {
        this._auth.logout();
        this._router.navigateByUrl('/home');
    }
}