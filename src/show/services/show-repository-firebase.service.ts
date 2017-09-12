import { LocalStorageService } from '../../common/services/local-storage.service';
import { AuthService } from '../../common/services/auth.service';
import { ShowRepositoryService } from './show-repository.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Show } from '../models/show'

@Injectable()
export class ShowRepositoryFirebaseService extends ShowRepositoryService {

    private _shows: Show[] | undefined = undefined;

    private userRef: firebase.database.Reference;

    constructor(private _http: Http, private _auth: AuthService, private _storage: LocalStorageService) {
        super();
        this._auth.onAuthenticatedChange().subscribe(auth => {
            if (auth) {
                let user = this._auth.getUser();
                if (user) {
                    this.userRef = firebase.database().ref('/users/' + user.id);
                }
            }
        });
    }

    public getShows(): Observable<Show[]> {
        return new Observable<Show[]>((observer: Observer<Show[]>) => {

            // in memory
            if(this._shows !== undefined) {
                observer.next(this._shows.slice());
            }

            this.userRef.child('/shows').once('value').then((snapshot: firebase.database.DataSnapshot) => {
                let shows = [];

                snapshot.forEach((child: firebase.database.DataSnapshot) => {
                    shows.push(child.val())
                    return false;
                });
                if(this._shows === undefined){
                    observer.next(shows.slice());
                }
                this._shows=shows;
                this.updateStorage();
                
            }, err => {
                // dans le storage
                if(this._shows === undefined){
                    let shows = this._storage.getData<Show[]>('shows');
                    if(shows) {
                        this._shows = shows;
                        observer.next(this._shows);
                    }
                }
                observer.error(err);
            });

        });
    }

    public deleteShow(id: string): Promise<any> {

        return new Promise((resolve, reject) => {

            this.userRef.child('/shows/' + id).remove((err) => {
                if (err) {
                    reject(err)
                } else {
                    if(this._shows) {
                        let idx = this._shows.findIndex(s => s.id == id);
                        if (idx >= 0) {
                            this._shows.splice(idx, 1);
                            this.updateStorage();
                        }
                    }
                    resolve();
                }
            });

        });
    }

    public getShow(id: string): Promise<Show> {
        return new Promise((resolve, reject) => {
            this.getShows().subscribe(
                shows => {
                    resolve(shows.find(s => s.id === id));
                },
                err => {
                    reject(err);
                })
        });
    }

    public saveShow(show: Show): Promise<Show> {
        return new Promise((resolve, reject) => {

            let add = false;
            if (!show.id) {
                add = true;
                show.id = this.getId();
            }

            this.userRef.child('/shows/' + show.id).set(show, (err) => {
                if (err) {
                    reject();
                } else {
                    if (add) {
                        this._shows.push(show);
                    }
                    resolve(show);
                    this.updateStorage();
                }
            });
        });
    }

    private error(error: Response) {
        console.log(error);
        return Observable.throw("Request error");
    }

    private getId(): string {
        return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4)
                .toString(16)
        );
    }

    private getUserRef() {
        return firebase.database().ref('/users/' + this._auth.login)
    }

    private updateStorage(){
        this._storage.saveData('shows', this._shows)
    }

}