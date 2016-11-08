import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';

const homeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    }
];

@NgModule({
    imports:[CommonModule, RouterModule.forChild(homeRoutes)],
    declarations:[HomeComponent]
})
export class HomeModule{}