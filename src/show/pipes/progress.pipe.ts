import { Pipe, PipeTransform } from '@angular/core';

import { Show } from '../models/show';

@Pipe({
    name: 'staProgress'
})
export class ProgressPipe implements PipeTransform {
    transform(show: Show):string {
        let episodes = !show.seasons ? [] :
            show.seasons.filter(s => s.episodes).map(s => s.episodes)
                .reduce((a, b) => [...a, ...b], []);

        return `${episodes.filter(e => e.view).length}/${episodes.length}`;
    }
}