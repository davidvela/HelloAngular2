import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
//import{InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api'
import{InMemoryBackendService  } from 'angular-in-memory-web-api'


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
