import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckUrlComponent } from './check-url.component';

describe('CheckUrlComponent', () => {
  let component: CheckUrlComponent;
  let fixture: ComponentFixture<CheckUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
