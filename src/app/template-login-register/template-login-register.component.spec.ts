import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLoginRegisterComponent } from './template-login-register.component';

describe('TemplateLoginRegisterComponent', () => {
  let component: TemplateLoginRegisterComponent;
  let fixture: ComponentFixture<TemplateLoginRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateLoginRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
