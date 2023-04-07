import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricConstatComponent } from './historic-constat.component';

describe('HistoricConstatComponent', () => {
  let component: HistoricConstatComponent;
  let fixture: ComponentFixture<HistoricConstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricConstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
