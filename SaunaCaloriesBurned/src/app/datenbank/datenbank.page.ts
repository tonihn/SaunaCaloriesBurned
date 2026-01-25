import { Component, OnInit } from '@angular/core';
import { SpeicherService } from '../speicher.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-datenbank',
  templateUrl: './datenbank.page.html',
  styleUrls: ['./datenbank.page.scss'],
  standalone: false,
})
export class DatenbankPage implements OnInit {

  public anzahlEintraege : Promise<number> = Promise.resolve(0);
  public eintraege : Promise<any[]> = Promise.resolve([]);

  constructor( private speicherService: SpeicherService,
              private alertCtrl: AlertController
  ) { }

  private holeDatenVonSpeicherService(): void{
    this.anzahlEintraege = this.speicherService.getAnzahlEintraege();
    this.eintraege = this.speicherService.getAlleEintraege();
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

  ionViewWillEnter(){
    this.holeDatenVonSpeicherService();
  }
  
  ngOnInit() {
  }
}
