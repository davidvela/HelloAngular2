import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-extensions';


import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroService  }   from './shared/hero.service';
import { HeroGermanyDataService  }   from './shared/hero-germanydata.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

import { AppRoutingModule }     from './app-routing.module';
//    //"angular-in-memory-web-api": "0.0.21",
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './shared/in-memory-data.service';
import { PieComponent } from './hero-charts/pie/pie.component';
import { HeroChartMapComponent } from './hero-charts/hero-chart-map/hero-chart-map.component';
import { HeroChartBubbleComponent } from './hero-charts/hero-chart-bubble/hero-chart-bubble.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent,
    PieComponent,
    HeroChartMapComponent,
    HeroChartBubbleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule 
  ],
  providers: [ HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
