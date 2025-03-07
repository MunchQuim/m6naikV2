import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoConverseComponent } from './logo-converse.component';

describe('LogoConverseComponent', () => {
  let component: LogoConverseComponent;
  let fixture: ComponentFixture<LogoConverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoConverseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoConverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
