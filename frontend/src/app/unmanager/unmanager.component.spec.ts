import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmanagerComponent } from './unmanager.component';

describe('UnmanagerComponent', () => {
  let component: UnmanagerComponent;
  let fixture: ComponentFixture<UnmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
