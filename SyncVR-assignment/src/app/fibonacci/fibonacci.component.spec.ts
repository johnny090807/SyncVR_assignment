import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibbonaciComponent } from './fibonacci.component';

describe('FibbonaciComponent', () => {
  let component: FibbonaciComponent;
  let fixture: ComponentFixture<FibbonaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibbonaciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibbonaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
