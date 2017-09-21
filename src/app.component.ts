import { RouterConfigLoader } from '@angular/router/src/router_config_loader';
import { InitAppService } from './common/services/init-app.service';
import { Router } from '@angular/router';
import { User } from './common/model/user';
import { AuthService } from './common/services/auth.service';
import { Component, Injector, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sta-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    _auth:AuthService;
    _router:Router;
    init = false;
    user?: User;

    constructor(init: InitAppService, injector: Injector) {
        if(init.isInit()) {
            this._auth = injector.get(AuthService);
            this._router = injector.get(Router);
            this.init = true;
            this._auth.onAuthenticatedChange().subscribe(user => {
                this.user = this._auth.getUser();
            })
        }
    }

    ngOnInit() {

    }
    
    logout() {
        this._auth.logout();
        this._router.navigateByUrl('/home');
    }
}