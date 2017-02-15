import { Component, OnInit } from '@angular/core';

import { ShowRepository } from '../services/show-repository.service';
import { MessageService } from '../../common/services/message.service';

import { Show } from '../models/show';

import { BaseDecorator } from '../../common/components/base-decorator.component';

@Component({
    moduleId: module.id,
    selector: 'sta-show-list',
    templateUrl: 'show-list.component.html'
})
export class ShowListComponent implements OnInit {

    shows: Show[];

    constructor(private _showRepo: ShowRepository,
                private _msgService: MessageService){

    }


    ngOnInit(){
        this._showRepo.getShows().subscribe((shows:Show[]) => this.shows=shows );
    }

    deleteShow(id:number) {
        this._showRepo.deleteShow(id).then(
            () => this._msgService.showSuccessMessage('Item deleted'),
            () => this._msgService.showErrorMessage('Error !')
        );
    }

}