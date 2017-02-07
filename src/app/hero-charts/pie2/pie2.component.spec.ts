/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pie2Component } from './pie2.component';

describe('Pie2Component', () => {
  let component: Pie2Component;
  let fixture: ComponentFixture<Pie2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pie2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pie2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
