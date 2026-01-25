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
  public eingabeKalorien : string = "";
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
        this.zeigeDialog("Bitte Minuten-Wert eingeben!");
        return;
      }

      let eingabeMinutenNumber : number = Number(this.eingabeMinuten)
      if (eingabeMinutenNumber <= 0.0){
        await this.zeigeDialog("Minuten-Wert darf nicht kleiner-gleich Null sein.");
        return;
      }
      
      // Hier: Kalorien berechnen und zur Ergebnis-Seite navigieren
      this.ergebnisKalorien = eingabeMinutenNumber * 4.5; // Beispiel: 4.5 Kalorien pro Minute
      this.navigateToErgebnis();
  }

  onLoeschButton(){
    this.eingabeMinuten = "";
  }

  kommastellenAbschnieden(zahl: number, nachkommastellen: number): number{
    let faktor = Math.pow(10, nachkommastellen);
    let zahlMalFaktor = zahl * faktor;
    let zahlAbgeschnitten = 0.0;

    if (zahlMalFaktor < 0){
      zahlAbgeschnitten = Math.ceil(zahlMalFaktor);
    }
    else {
      zahlAbgeschnitten = Math.floor(zahlMalFaktor);
    }
    return zahlAbgeschnitten / faktor;
  }
navigateToErgebnis() {
  this.ergebnis = this.kommastellenAbschnieden(this.ergebnisKalorien, 2);
  let navigationTarget = "/ergebnis?ergebnis=${this.ergebnis}&ergebnisKalorien=${this.ergebnisKalorien}";
  this.navCtrl.navigateForward(navigationTarget);
}
}


