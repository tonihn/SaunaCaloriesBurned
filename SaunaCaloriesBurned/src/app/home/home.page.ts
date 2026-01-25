import { Component } from '@angular/core';
import { SpeicherService } from '../speicher.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  public eingabeMinuten : string = "";
  public ergebnisKalorien : number = 0.0;
  public ergebnis : number = 0;

  constructor(private alertController: AlertController, 
              private toastController: ToastController,
              private navCtrl: NavController,
              private speicherService: SpeicherService
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

      let eingabeMinutenNumber : number = Number(this.eingabeMinuten);

      if (eingabeMinutenNumber <= 0.0){
        await this.zeigeDialog("Minuten-Wert darf nicht kleiner-gleich Null sein.");
        return;
      }

      // Kalorien berechnen: (Zeit in Minuten / 60) × 500
      this.ergebnisKalorien = (eingabeMinutenNumber / 60) * 500;
      
      // Runde auf 2 Dezimalstellen
      this.ergebnis = this.kommastellenAbschnieden(this.ergebnisKalorien, 2);
      
      // Speichern
      this.speicherService.speichereErgebnis(eingabeMinutenNumber, this.ergebnisKalorien);
      
      this.navigateToErgebnis();
  }

  onLoeschButton(){
    this.eingabeMinuten = "";
    this.ergebnisKalorien = 0.0;
    this.ergebnis = 0;
  }

  kommastellenAbschnieden(zahl: number, nachkommastellen: number): number {
    const faktor = Math.pow(10, nachkommastellen);
    return Math.round(zahl * faktor) / faktor;
  }

  navigateToErgebnis() {
    const navigationTarget = `/ergebnis?minuten=${this.eingabeMinuten}&kalorien=${this.ergebnis}`;
    this.navCtrl.navigateForward(navigationTarget);
  }
}


