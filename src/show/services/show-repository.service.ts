import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Show } from '../models/show'

@Injectable()
export abstract class ShowRepositoryService {
    public abstract getShows(): Observable<Show[]>;
    public abstract deleteShow(id: number): Promise<Show>;
    public abstract getShow(id: number): Promise<Show>;
    public abstract  saveShow(show: Show): Promise<Show>;
}