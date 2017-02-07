/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeroChartBubble2Component } from './hero-chart-bubble2.component';

describe('HeroChartBubble2Component', () => {
  let component: HeroChartBubble2Component;
  let fixture: ComponentFixture<HeroChartBubble2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroChartBubble2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroChartBubble2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
