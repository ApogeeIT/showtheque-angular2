import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ShowRepository } from './services/show-repository.service';
import { ShowListComponent } from './components/show-list.component';
import { ShowEditComponent } from './components/show-edit.component';
import { EpisodeComponent } from './directives/episode.directive';
import { ProgressPipe } from './pipes/progress.pipe';

let showRoutes: Routes = [
    {
        path: 'shows',
        component: ShowListComponent
    },
    {
        path: 'show/:id',
        component: ShowEditComponent
    }
];

@NgModule({
    imports:[CommonModule, FormsModule, RouterModule.forChild(showRoutes)],
    declarations:[ShowListComponent, ShowEditComponent, EpisodeComponent, ProgressPipe],
    providers: [ShowRepository]
})
export class ShowModule{}