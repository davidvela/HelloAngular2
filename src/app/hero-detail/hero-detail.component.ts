import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params}    from '@angular/router'; 
import {Location}                   from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Hero   }       from '../shared/hero';
import { HeroService }  from '../shared/hero.service';

enum SkillDiagramState { BUBBLE, TABLE}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  
  @Input()  hero: Hero;
  labelToggle: string;
  public labelToggleBubbles: "Bubbles";
  public labelToggleTable: "Table";
  states = SkillDiagramState;
  state: SkillDiagramState;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute, 
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero ); 
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.update(this.hero)
    .then(() => this.goBack());

  }

  onToggleGroupChange(buttonToggleChangeEvent: any) {
    switch (buttonToggleChangeEvent.value) {
      case "bubbles": {
        this.labelToggle = this.labelToggleBubbles;
        this.state = SkillDiagramState.BUBBLE;
        break;
      }
      case "table": {
        this.labelToggle = this.labelToggleTable;
        this.state = SkillDiagramState.TABLE;
        break;
      }
    }
  }

}
