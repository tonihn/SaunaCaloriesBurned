import { Component } from '@angular/core';
import { SpeicherService } from '../speicher.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-datenbank',
  templateUrl: './datenbank.page.html',
  styleUrls: ['./datenbank.page.scss'],
  standalone: false,
})
export class DatenbankPage {

  public anzahlEintraege : Promise<number> = Promise.resolve(0);
  public eintraege : Promise<any[]> = Promise.resolve([]);

  constructor( private speicherService: SpeicherService,
              private alertCtrl: AlertController
  ) { }


  
  zahlInDeFormat(num: number, dezimalstellen: number): string {
    return num.toFixed(dezimalstellen).replace('.', ',');
  }

  ngOnInit() {
  }



  async ionViewWillEnter(){
    await this.holeDatenVonSpeicherService();
  }

  private async holeDatenVonSpeicherService(): Promise<void>{
    this.eintraege = this.speicherService.getAlleEintraege();
    this.anzahlEintraege = this.eintraege.then(e => e.length);
  }

  
  

  async loescheEintrag(id: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Bestätigung',
      message: 'Möchtest du diesen Eintrag wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          handler: () => {
            this.speicherService.loescheEintrag(id);
            this.holeDatenVonSpeicherService();
          }
        }
      ]
    });
    await alert.present();
  }

  

  async onAllesLoeschenButton(): Promise<void> {

    // 1. Prüfen, ob es überhaupt Einträge gibt
  if (!this.eintraege || (await this.eintraege).length === 0) {
    const infoAlert = await this.alertCtrl.create({
      header: 'Hinweis',
      message: 'Es gibt keine Einträge zum Löschen.',
      buttons: ['OK']
    });
    await infoAlert.present();
    return; // hier abbrechen, nichts zu löschen
  }
    // 2. Bestätigungsdialog anzeigen
    const alert = await this.alertCtrl.create({
      header: 'Bestätigung',
      message: 'Möchtest du wirklich ALLE Einträge löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Alle löschen',
          handler: () => {
            this.speicherService.loescheAlleEintraege();
            this.holeDatenVonSpeicherService();
          }
        }
      ]
    });
    await alert.present();
  }
}
