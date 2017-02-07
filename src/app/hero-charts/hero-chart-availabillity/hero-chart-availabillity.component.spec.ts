/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeroChartAvailabillityComponent } from './hero-chart-availabillity.component';

describe('HeroChartAvailabillityComponent', () => {
  let component: HeroChartAvailabillityComponent;
  let fixture: ComponentFixture<HeroChartAvailabillityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroChartAvailabillityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroChartAvailabillityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
