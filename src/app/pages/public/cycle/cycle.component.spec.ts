import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleComponent } from './cycle.component';

describe('CycleComponent', () => {
  let component: CycleComponent;
  let fixture: ComponentFixture<CycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
