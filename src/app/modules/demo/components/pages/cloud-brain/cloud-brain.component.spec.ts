import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudBrainComponent } from './cloud-brain.component';

describe('CloudBrainComponent', () => {
  let component: CloudBrainComponent;
  let fixture: ComponentFixture<CloudBrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudBrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudBrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
