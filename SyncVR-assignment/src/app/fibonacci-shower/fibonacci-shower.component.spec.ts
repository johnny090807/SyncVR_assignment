import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibonacciShowerComponent } from './fibonacci-shower.component';

describe('FibonacciShowerComponent', () => {
  let component: FibonacciShowerComponent;
  let fixture: ComponentFixture<FibonacciShowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibonacciShowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibonacciShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
