import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeangelsComponent } from './upgradeangels.component';

describe('UpgradeangelsComponent', () => {
  let component: UpgradeangelsComponent;
  let fixture: ComponentFixture<UpgradeangelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradeangelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeangelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
