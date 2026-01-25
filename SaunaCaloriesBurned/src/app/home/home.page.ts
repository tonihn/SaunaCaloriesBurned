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
  public eingabeKalorienProStunde : string = "";
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
      let kalorienProStunde : number = this.eingabeKalorienProStunde.length > 0 ? Number(this.eingabeKalorienProStunde) : 500;

      if (eingabeMinutenNumber <= 0.0){
        await this.zeigeDialog("Minuten-Wert muss größer als Null sein.");
        return;
      }
      if (eingabeMinutenNumber > 60.0){
        await this.zeigeDialog("Minuten-Wert darf nicht größer als 60 sein.");
        return;
      }
      if (kalorienProStunde <= 0.0){
        await this.zeigeDialog("Kalorien pro Stunde müssen größer als Null sein.");
        return;
      }

      // Kalorien berechnen: (Zeit in Minuten / 60) × Kalorien pro Stunde
      this.ergebnisKalorien = (eingabeMinutenNumber / 60) * kalorienProStunde;
      
      // Runde auf 2 Dezimalstellen
      this.ergebnis = this.kommastellenAbschnieden(this.ergebnisKalorien, 2);
      
      // Speichern
      
      
      this.navigateToErgebnis();
  }

  onLoeschButton(){
    this.eingabeMinuten = "";
    this.eingabeKalorienProStunde = "";
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


