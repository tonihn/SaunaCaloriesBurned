import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeicherService } from '../speicher.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.page.html',
  styleUrls: ['./ergebnis.page.scss'],
  standalone: false,
})
export class ErgebnisPage implements OnInit {
  public eingabeMinuten: number = 0;
  public ergebnisKalorien: number = 0;
  public gewichtsverlust: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private speicherService: SpeicherService,
              private toastController: ToastController) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.eingabeMinuten = parseFloat(params['minuten']) || 0;
      this.ergebnisKalorien = parseFloat(params['kalorien']) || 0;
      
      // Gewichtsverlust berechnen: kalorien / 7700
      this.gewichtsverlust = this.ergebnisKalorien / 7700;
      this.gewichtsverlust = Math.round(this.gewichtsverlust * 10000) / 10000; // 4 Dezimalstellen
    });
  }

  async onSpeichernButton() {
    await this.speicherService.speichereErgebnis(
      this.eingabeMinuten,
      this.ergebnisKalorien,
      this.gewichtsverlust
    );
    
    const toast = await this.toastController.create({
      message: 'Ergebnis gespeichert!',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }
}
