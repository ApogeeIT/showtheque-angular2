import { platformBrowser } from '@angular/platform-browser';
import * as factory from '../app/aot/src/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
enableProdMode();
platformBrowser().bootstrapModuleFactory(factory.AppModuleNgFactory);