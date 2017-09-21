import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class InitAppService {

    _init = false;

    public initApplication(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let config = {

            };
            try {
                firebase.initializeApp(config);
                let unsubscribe = firebase.auth().onAuthStateChanged((user: firebase.UserInfo) => {
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
