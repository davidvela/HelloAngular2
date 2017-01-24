import { Injectable } from '@angular/core';

import { Hero       } from './hero'
import { HEROES     } from './mock-heroes';


@Injectable() //Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
export class HeroService {

 /* getHeroes(): Hero[] {
        return HEROES;
    } 
*/

    getHeroes(): Promise<Hero[]> { //async call 
        return Promise.resolve(HEROES);        
    }
    
    getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

}