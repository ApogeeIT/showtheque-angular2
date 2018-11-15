import { Injectable } from '@angular/core';

import { UserInfo } from '@firebase/auth-types';
import { firebase } from '@firebase/app';
import '@firebase/auth';

@Injectable()
export class InitAppService {

    _init = false;

    public initApplication(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const config = {
                apiKey: 'AIzaSyAyYahTPGf7dTpDqi3TwwohdzAvHvxkH2Q',
                authDomain: 'showtheque.firebaseapp.com',
                databaseURL: 'https://showtheque.firebaseio.com',
                projectId: 'showtheque',
                storageBucket: 'showtheque.appspot.com',
                messagingSenderId: '596286926001'
            };
            try {
                firebase.initializeApp(config);
                const unsubscribe = firebase.auth().onAuthStateChanged((user: UserInfo) => {
                    this._init = true;
                    resolve();
                    unsubscribe();
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    public isInit() {
        return this._init;
    }
}
