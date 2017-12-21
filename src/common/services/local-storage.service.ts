import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    public saveData(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public getData<T>(key: string): T | undefined {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
    }
}
