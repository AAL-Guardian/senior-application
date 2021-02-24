import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperBodyComponent } from './wrapper-body.component';

describe('WrapperBodyComponent', () => {
  let component: WrapperBodyComponent;
  let fixture: ComponentFixture<WrapperBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
