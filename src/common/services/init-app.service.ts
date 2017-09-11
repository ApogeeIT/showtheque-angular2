import { Injectable } from '@angular/core';
import 'firebase';

@Injectable()
export class InitAppService {

    public initApplication(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let config = {

            };
            firebase.initializeApp(config);
            resolve();
        });
    }

}
