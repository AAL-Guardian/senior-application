import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationQuestionComponent } from './medication-question.component';

describe('MedicationQuestionComponent', () => {
  let component: MedicationQuestionComponent;
  let fixture: ComponentFixture<MedicationQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
