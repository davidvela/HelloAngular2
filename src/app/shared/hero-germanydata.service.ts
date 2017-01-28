import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';



@Injectable() //Don't forget the parentheses! Neglecting them leads to an error that's difficult to diagnose.
export class HeroGermanyDataService {
    //private heroesUrl = 'api/germany'; // URL to web InMemoryWebApiModule
    //private headers = new Headers({'Content-Type': 'application/json'});
    private germany : Array<any>;

    constructor(private http:Http){
      //    http.request('dataBundesLander.json')
       //               .subscribe(response => this.germany = response.json())     ;
 
       // this.getJSON().subscribe(data => this.germany=data, error => console.log(error));

        this.germany = require("../../assets/dataBundesLander.json");


    }

    public getJSON(): Observable<any> {
         return this.http.get("./assets/dataBundesLander.json" )  //./file.json")
                         .map((res:any) => res.json())
                         .catch(this.handleError);
     }

    getGermanyData(): any {
        /*return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data as Hero[])
                .catch(this.handleError); */
        console.log(this.germany);
        return this.germany;
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
 /* getHeroes(): Hero[] {
        return HEROES;
    } 
    getHeroes(): Promise<Hero[]> { //async call 
        return Promise.resolve(HEROES);        
    }

        getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }


    constructor(private http:Http){}
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                .toPromise()
                .then(response => response.json().data as Hero[])
                .catch(this.handleError);
    }



  */


