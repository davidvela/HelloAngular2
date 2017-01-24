import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { Hero   }              from '../shared/hero';
import { HeroService }         from '../shared/hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';


@Component({
  moduleId: module.id,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [ HeroService]    

})
export class HeroesComponent implements OnInit {

  //hero = 'Windstorm';
  //hero : Hero = { id: 1, name: 'Windstorm'};
  selectedHero : Hero;
  heroes : Hero[]; 

  constructor(  private heroService: HeroService,
                private router: Router
  ) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
   getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then( heroes => this.heroes = heroes);
    //this.heroService.getHeroesSlowly().then( heroes => this.heroes = heroes);

}
  
  ngOnInit(): void {
    this.getHeroes();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id ])
  }

}
