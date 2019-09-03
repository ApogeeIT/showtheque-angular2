import { LOCATION_INITIALIZED } from '@angular/common';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthFirebaseService } from './common/services/auth-firebase.service';
import { AuthService } from './common/services/auth.service';
import { InitAppService } from './common/services/init-app.service';
import { LocalStorageService } from './common/services/local-storage.service';
import { MessageService } from './common/services/message.service';
import { HomeModule } from './home/home.module';
import { ShowRepositoryFirebaseService } from './show/services/show-repository-firebase.service';
import { ShowRepositoryService } from './show/services/show-repository.service';
import { ShowModule } from './show/show.module';
import { AuthLocalService } from './common/services/auth-local.service';
import { ShowRepositoryLocalService } from './show/services/show-repository-local.service';

export function initAppFactory(init: InitAppService, injector: Injector) {
    return () => new Promise<any>((resolve: any) => {
        const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
        locationInitialized.then(() => {
            init.initApplication().then(resolve, (e) => {
                console.log(e);
                const router = injector.get(Router);
                router.navigateByUrl('/error');
                resolve();
            });
        }, resolve);
    });
}

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [BrowserModule, HttpClientModule, HomeModule, ShowModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent],
    providers: [
        InitAppService,
        // { provide: APP_INITIALIZER, useFactory: initAppFactory, deps: [InitAppService, Injector], multi: true },
        // { provide: ShowRepositoryService, useClass: ShowRepositoryFirebaseService },
        // { provide: AuthService, useClass: AuthFirebaseService },
        { provide: ShowRepositoryService, useClass: ShowRepositoryLocalService },
        { provide: AuthService, useClass: AuthLocalService },
        MessageService,
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        toastr.options.positionClass = 'toast-bottom-right';
    }
}
