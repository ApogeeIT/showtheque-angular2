import { Component, Input } from '@angular/core';


import { Episode } from '../models/episode';

@Component({
    selector: 'episode',
    templateUrl: './app/show/directives/episode.directive.html'
})
export class EpisodeDirective {

    @Input()
    episode:Episode;

}