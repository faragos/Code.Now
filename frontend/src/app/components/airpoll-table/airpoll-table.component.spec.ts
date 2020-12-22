import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirpollTableComponent } from './airpoll-table.component';

describe('AirpollTableComponent', () => {
  let component: AirpollTableComponent;
  let fixture: ComponentFixture<AirpollTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirpollTableComponent ]
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
});
