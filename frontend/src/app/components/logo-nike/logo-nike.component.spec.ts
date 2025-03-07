import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNikeComponent } from './logo-nike.component';

describe('LogoNikeComponent', () => {
  let component: LogoNikeComponent;
  let fixture: ComponentFixture<LogoNikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoNikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoNikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
