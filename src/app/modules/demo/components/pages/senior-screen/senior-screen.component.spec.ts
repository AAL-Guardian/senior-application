import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorScreenComponent } from './senior-screen.component';

describe('SeniorScreenComponent', () => {
  let component: SeniorScreenComponent;
  let fixture: ComponentFixture<SeniorScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeniorScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
