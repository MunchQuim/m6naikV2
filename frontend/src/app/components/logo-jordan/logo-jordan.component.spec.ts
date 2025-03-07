import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoJordanComponent } from './logo-jordan.component';

describe('LogoJordanComponent', () => {
  let component: LogoJordanComponent;
  let fixture: ComponentFixture<LogoJordanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoJordanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoJordanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
