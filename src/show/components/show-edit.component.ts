import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ShowRepository } from '../services/show-repository.service';
import { MessageService } from '../../common/services/message.service';

import { Show } from '../models/show';
import { Season } from '../models/season';
import { Episode } from '../models/episode';

@Component({
    selector: 'show-edit',
    templateUrl: './app/show/components/show-edit.component.html'
})
export class ShowEditComponent implements OnInit {

    show: Show;

    constructor(private _showRepo: ShowRepository,
        private _route: ActivatedRoute,
        private _router: Router,
        private _msgService: MessageService) {

    }


    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            let id = +params['id'];
            if (id) {
                this._showRepo.getShow(id).then(
                    s => this.show = s
                );
            } else {
                this.show = new Show();
            }
        });
    }

    saveShow(showForm: NgForm) {
        if (showForm.valid) {
            this._showRepo.saveShow(this.show).then(
                () => {
                    this._msgService.showSuccessMessage('Saved')
                    this._router.navigate(['/shows']);
                },
                () => this._msgService.showErrorMessage('Error !')
            );
        }
    }

    addSeason() {
        if (this.show.seasons) {
            this.show.seasons.push(new Season(this.show.seasons.length + 1));
        } else {
            this.show.seasons = [new Season(1)];
        }
    }

    removeSeason() {
        if (this.show.seasons && this.show.seasons.length) {
            this.show.seasons.pop();
        }
    }

    addEpisode(season: Season) {
        if (season.episodes) {
            season.episodes.push(new Episode(season.episodes.length + 1));
        } else {
            season.episodes = [new Episode(1)];
        }
    }

    removeEpisode(season: Season) {
        if (season.episodes && season.episodes.length) {
            season.episodes.pop();
        }
    }
}