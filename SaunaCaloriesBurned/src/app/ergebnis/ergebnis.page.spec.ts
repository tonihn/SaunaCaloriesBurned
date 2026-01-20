import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErgebnisPage } from './ergebnis.page';

describe('ErgebnisPage', () => {
  let component: ErgebnisPage;
  let fixture: ComponentFixture<ErgebnisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErgebnisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
