import { ErrorComponent } from './components/error.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';

let homeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'error',
        component : ErrorComponent
    }
];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(homeRoutes)],
    declarations: [HomeComponent, ErrorComponent]
})
export class HomeModule { }