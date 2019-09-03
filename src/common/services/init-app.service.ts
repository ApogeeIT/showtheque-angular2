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
                apiKey: '',
                authDomain: '',
                databaseURL: '',
                projectId: '',
                storageBucket: '',
                messagingSenderId: ''
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
