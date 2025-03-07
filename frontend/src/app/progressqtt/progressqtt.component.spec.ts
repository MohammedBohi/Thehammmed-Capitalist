import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressqttComponent } from './progressqtt.component';

describe('ProgressqttComponent', () => {
  let component: ProgressqttComponent;
  let fixture: ComponentFixture<ProgressqttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressqttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
