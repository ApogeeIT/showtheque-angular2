import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../common/services/message.service';
import { Show } from '../models/show';
import { ShowRepositoryService } from '../services/show-repository.service';

@Component({
    moduleId: module.id,
    selector: 'sta-show-list',
    templateUrl: 'show-list.component.html'
})
export class ShowListComponent implements OnInit {

    shows: Show[];

    constructor(private _showRepo: ShowRepositoryService,
        private _msgService: MessageService) {

    }

    ngOnInit() {
        this._showRepo.getShows().subscribe(
            (shows: Show[]) => this.shows = shows,
            (err) => this._msgService.showErrorMessage('Error'));
    }

    deleteShow(id: number) {
        this._showRepo.deleteShow(id).then(
            () => this._msgService.showSuccessMessage('Item deleted'),
            (err) => this._msgService.showErrorMessage('Error')
        );
    }

}
