import { Component, Input } from '@angular/core';

import { Episode } from '../models/episode';

@Component({
    moduleId: module.id,
    selector: 'sta-episode',
    templateUrl: 'episode.directive.html'
})
export class EpisodeComponent {

    @Input() episode: Episode;

}
