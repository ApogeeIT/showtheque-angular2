import { AuthFirebaseService } from './common/services/auth-firebase.service';
import { ShowRepositoryLocalService } from './show/services/show-repository-local.service';
import { ShowRepositoryService } from './show/services/show-repository.service';
import { AuthLocalService } from './common/services/auth-local.service';
import { InitAppService } from './common/services/init-app.service';
import { AuthService } from './common/services/auth.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HttpModule } from '@angular/http';

import { MessageService } from './common/services/message.service';

import { HomeModule } from './home/home.module';
import { ShowModule } from './show/show.module';

import { AppComponent } from './app.component';
import { ShowRepositoryFirebaseService } from './show/services/show-repository-firebase.service';

export function initAppFactory(init: InitAppService) {
    return function () {
        return init.initApplication();
    };
}

let appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [BrowserModule, HttpModule, HomeModule, ShowModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent],
    providers: [
        InitAppService,
        { provide: APP_INITIALIZER, useFactory: initAppFactory, deps: [InitAppService], multi: true },
        { provide: ShowRepositoryService, useClass: ShowRepositoryFirebaseService },
        { provide: AuthService, useClass: AuthFirebaseService },
        //{ provide: ShowRepositoryService, useClass: ShowRepositoryLocalService },
        //{ provide: AuthService, useClass: AuthLocalService },
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        toastr.options.positionClass = "toast-bottom-right";
    }
}