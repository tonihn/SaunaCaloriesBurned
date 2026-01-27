import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {
  private STORAGE_KEY = 'saunaErgebnisse';
  private _storage!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
  }

  // Ergebnis speichern
  async speichereErgebnis(
    minuten: number,
    kalorien: number,
    gewichtsverlust?: number,
    minutenDE?: string,
    kalorienDE?: string,
    gewichtsverlustDE?: string,
    kommentar?: string
  ): Promise<void> {

    const ergebnisse = await this.getAlleEintraege();

    ergebnisse.push({
      id: Date.now().toString(),
      minuten: minuten,
      kalorien: kalorien,
      gewichtsverlust: gewichtsverlust || 0,
      minutenDE: minutenDE || '',
      kalorienDE: kalorienDE || '',
      gewichtsverlustDE: gewichtsverlustDE || '',
      kommentar: kommentar || '',
      datum: new Date().toLocaleString()
    });

    await this._storage.set(this.STORAGE_KEY, ergebnisse);
  }

  // Alle Einträge holen
  async getAlleEintraege(): Promise<any[]> {
    const data = await this._storage.get(this.STORAGE_KEY);
    return data ? data : [];
  }

  // Einen Eintrag löschen
  async loescheEintrag(id: string): Promise<void> {
    let ergebnisse = await this.getAlleEintraege();
    ergebnisse = ergebnisse.filter((e: any) => e.id !== id);
    await this._storage.set(this.STORAGE_KEY, ergebnisse);
  }

  // Alle Einträge löschen
  async loescheAlleEintraege(): Promise<void> {
    await this._storage.remove(this.STORAGE_KEY);
  }
}
