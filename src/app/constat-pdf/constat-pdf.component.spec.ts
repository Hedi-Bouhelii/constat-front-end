import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstatPDFComponent } from './constat-pdf.component';

describe('ConstatPDFComponent', () => {
  let component: ConstatPDFComponent;
  let fixture: ComponentFixture<ConstatPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstatPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstatPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
