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

  public anzahlEintraege : number = 0;
  public eintraege : any[] = [];

  constructor( private speicherService: SpeicherService,
              private alertCtrl: AlertController
  ) { }

  private holeDatenVonSpeicherService(): void{
    this.eintraege = this.speicherService.getAlleEintraege();
    this.anzahlEintraege = this.eintraege.length;
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

  ionViewWillEnter(){
    this.holeDatenVonSpeicherService();
  }
  
  ngOnInit() {
  }
}
