import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeproductsComponent } from './upgradeproducts.component';

describe('UpgradeproductsComponent', () => {
  let component: UpgradeproductsComponent;
  let fixture: ComponentFixture<UpgradeproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradeproductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradeproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
