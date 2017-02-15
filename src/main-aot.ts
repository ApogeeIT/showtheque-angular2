import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../app/aot/src/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);