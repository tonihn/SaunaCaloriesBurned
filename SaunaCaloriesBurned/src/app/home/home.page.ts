import { Component } from '@angular/core';

import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  public eingabeMinuten : string = "";
  public eingabeKalorienProStunde : string = "";
  public ergebnisKalorien : number = 0.0;
  public ergebnis : number = 0;

  constructor(private alertController: AlertController, 
              private toastController: ToastController,
              private navCtrl: NavController
  ) {}

  async zeigeToast(nachricht: string){
    const toast =
      await this.toastController.create({message : nachricht, duration : 2000});
    await toast.present();
  }

  async zeigeDialog(nachricht: string){
    const meinAlert = await this.alertController.create({header : "Fehler", message : nachricht, buttons : [ "Ok"]});
    await meinAlert.present();
  }

  async onBerechnenButton(){
      if (this.eingabeMinuten == null || this.eingabeMinuten.length == 0) {
        await this.zeigeDialog("Bitte Minuten-Wert eingeben!");
        return;
      } 
      if (this.eingabeKalorienProStunde == null || this.eingabeKalorienProStunde.length == 0) {
        await this.zeigeDialog("Bitte Kalorien pro Stunde eingeben!");
        return;
      }

      let eingabeMinutenNumber : number = Number(this.eingabeMinuten);
      let kalorienProStunde : number = Number(this.eingabeKalorienProStunde);

      this.eingabeMinuten = this.kommastellenAbschneiden(eingabeMinutenNumber, 2).toString();
      this.eingabeKalorienProStunde = this.kommastellenAbschneiden(kalorienProStunde, 2).toString();

      // Validierungen

      if (eingabeMinutenNumber <= 0.0){
        await this.zeigeDialog("Minuten-Wert muss größer als Null sein.");
        return;
      }
      if (eingabeMinutenNumber > 60.0){
        await this.zeigeDialog("Minuten-Wert darf nicht größer als 60 sein.");
        return;
      }
      if (kalorienProStunde < 400.0){
        await this.zeigeDialog("Kalorien pro Stunde müssen größer als 400 sein.");
        return;
      }
      if (kalorienProStunde > 600.0){
        await this.zeigeDialog("Kalorien pro Stunde dürfen nicht größer als 600 sein.");
        return;
      }

      // Kalorien berechnen: (Zeit in Minuten / 60) × Kalorien pro Stunde
      this.ergebnisKalorien = (eingabeMinutenNumber / 60) * kalorienProStunde;
      
      // Runde auf 2 Dezimalstellen
      this.ergebnis = this.kommastellenAbschneiden(this.ergebnisKalorien, 2);
      
      
      this.navigateToErgebnis();
  }

  onLoeschButton(){
    this.eingabeMinuten = "";
    this.eingabeKalorienProStunde = "";
    this.ergebnisKalorien = 0.0;
    this.ergebnis = 0;
  }

  kommastellenAbschneiden(zahl: number, nachkommastellen: number): number {
    const faktor = Math.pow(10, nachkommastellen);
    return Math.round(zahl * faktor) / faktor;
  }

  navigateToErgebnis() {
    const navigationTarget = `/ergebnis?minuten=${this.eingabeMinuten}&kalorien=${this.ergebnis}`;
    this.navCtrl.navigateForward(navigationTarget);
  }
}


