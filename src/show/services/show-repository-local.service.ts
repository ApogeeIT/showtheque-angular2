import { ShowRepositoryService } from './show-repository.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Show } from '../models/show'

@Injectable()
export class ShowRepositoryLocalService extends ShowRepositoryService {

    private _shows: Show[];

    constructor(private _http: Http) {
        super();
    }

    public getShows(): Observable<Show[]> {

        var obs = new Observable<Show[]>((observer: Observer<Show[]>) => {

            if (this._shows) {
                observer.next(this._shows);
            } else {
                this._http.get('api/shows.js')
                    .map((res: Response) => <Show[]>res.json().entities)
                    .catch(this.error)
                    .subscribe(shows => {
                        this._shows = shows;
                        observer.next(this._shows);
                    });
            }

        });

        return obs;

    }

    public deleteShow(id: number): Promise<Show> {

        let promise = new Promise((resolve, reject) => {

            this.getShows().subscribe((shows: Show[]) => {
                let idx = shows.findIndex(s => s.id == id);
                let show: Show; // tslint
                if (idx >= 0) {
                    show = shows[idx];
                    shows.splice(idx, 1);
                    resolve(show);
                } else {
                    reject();
                }
            }, err => reject(err));

        });

        return promise;

    }

    public getShow(id: number): Promise<Show> {
        return new Promise((resolve, reject) => {
            this.getShows().subscribe(
                shows => resolve(shows.find(s => s.id == id)),
                err => reject(err))
        });
    }

    public saveShow(show: Show): Promise<Show> {
        return new Promise((resolve, reject) => {

            this.getShows().subscribe(shows => {

                if (show.id) {
                    let idx = shows.findIndex(s => s.id == show.id);
                    shows.splice(idx, 1, show);
                } else {
                    show.id = shows.reduce<any>((a, b) => { return { id: Math.max(a.id, +b.id) } }, { id: 0 }).id + 1;
                    shows.push(show);
                }
                resolve(show);
            }, err => reject(err))

        });
    }

    private error(error: Response) {
        console.log(error);
        return Observable.throw("Request error");
    }

}