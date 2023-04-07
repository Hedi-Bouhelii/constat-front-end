import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatFormComponent } from './constat-form.component';

describe('ConstatFormComponent', () => {
  let component: ConstatFormComponent;
  let fixture: ComponentFixture<ConstatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstatFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
