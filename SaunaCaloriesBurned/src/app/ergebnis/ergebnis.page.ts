import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.page.html',
  styleUrls: ['./ergebnis.page.scss'],
  standalone: false,
})
export class ErgebnisPage implements OnInit {
  public eingabeMinuten: number = 0;
  public ergebnisKalorien: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.eingabeMinuten = parseFloat(params['ergebnis']) || 0;
      this.ergebnisKalorien = parseFloat(params['ergebnisKalorien']) || 0;
    });
  }
}
