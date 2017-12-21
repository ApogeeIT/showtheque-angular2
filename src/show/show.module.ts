import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ShowEditComponent } from './components/show-edit.component';
import { ShowListComponent } from './components/show-list.component';
import { EpisodeComponent } from './directives/episode.directive';
import { ProgressPipe } from './pipes/progress.pipe';

const showRoutes: Routes = [
    {
        path: 'shows',
        component: ShowListComponent
    },
    {
        path: 'show',
        component: ShowEditComponent
    },
    {
        path: 'show/:id',
        component: ShowEditComponent
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(showRoutes)],
    declarations: [ShowListComponent, ShowEditComponent, EpisodeComponent, ProgressPipe],
    providers: []
})
export class ShowModule { }
