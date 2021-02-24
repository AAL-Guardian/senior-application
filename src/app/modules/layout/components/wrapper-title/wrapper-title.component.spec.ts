import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperTitleComponent } from './wrapper-title.component';

describe('WrapperTitleComponent', () => {
  let component: WrapperTitleComponent;
  let fixture: ComponentFixture<WrapperTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
