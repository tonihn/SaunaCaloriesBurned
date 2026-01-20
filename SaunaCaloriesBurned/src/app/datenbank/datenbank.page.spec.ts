import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatenbankPage } from './datenbank.page';

describe('DatenbankPage', () => {
  let component: DatenbankPage;
  let fixture: ComponentFixture<DatenbankPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatenbankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
