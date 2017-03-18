import { Component, OnInit } from '@angular/core';

import { Hero   }              from '../shared/hero';
import { HeroService }         from '../shared/hero.service';


@Component({
  moduleId: module.id, // module relative loading 
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }


  //force the reload 
  /*
  <button (click)="doSomething()">Do something</button>

    import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
    constructor(private employeeService: EmployeeService, private ref: ChangeDetectorRef) {

  public doSomething(){
    this.ref.detectChanges();
  }
*/

}
