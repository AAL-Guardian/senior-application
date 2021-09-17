import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeSettingComponent } from './volume-setting.component';

describe('VolumeSettingComponent', () => {
  let component: VolumeSettingComponent;
  let fixture: ComponentFixture<VolumeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
