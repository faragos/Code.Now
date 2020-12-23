import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AirpollTableComponent} from './airpoll-table.component';
import {FormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../../material.module';
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AirpollTableComponent', () => {
  let component: AirpollTableComponent;
  let fixture: ComponentFixture<AirpollTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        BrowserAnimationsModule,
        MatSortModule,
        FormsModule
      ],
      declarations: [AirpollTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirpollTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have country filter', () => {
    fixture = TestBed.createComponent(AirpollTableComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.country-selection').textContent).toContain(
        'Country'
    );
  });

  it('should have city filter', () => {
    fixture = TestBed.createComponent(AirpollTableComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.city-selection').textContent).toContain(
        'City'
    );
  });

  it('should have a reset filter button', () => {
    fixture = TestBed.createComponent(AirpollTableComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.reset-filter').textContent).toContain(
        'Reset Filter'
    );
  });
});
