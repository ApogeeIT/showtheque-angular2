import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HttpModule } from '@angular/http';

import { MessageService } from './common/services/message.service'; 

import { HomeModule } from './home/home.module';
import { ShowModule } from './show/show.module';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
    {
        path:'',
        redirectTo:'/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [BrowserModule, HttpModule, HomeModule, ShowModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent],
    providers:[MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}