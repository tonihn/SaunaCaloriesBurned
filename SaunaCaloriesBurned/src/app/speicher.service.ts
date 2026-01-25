import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {
  private storageKey = 'saunaErgebnisse';

  constructor() { }

  async speichereErgebnis(minuten: number, kalorien: number): Promise<void> {
    const ergebnisse = this.getAlleEintraege();
    (await ergebnisse).push({
      minuten: minuten,
      kalorien: kalorien,
      datum: new Date().toLocaleString()
    });
    localStorage.setItem(this.storageKey, JSON.stringify(ergebnisse));
  }

  async getAlleEintraege(): Promise<any[]> {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async getAnzahlEintraege(): Promise<number> {
    const eintraege = await this.getAlleEintraege();
    return eintraege.length;
  }

  loescheAlleEintraege(): void {
    localStorage.removeItem(this.storageKey);
  }

  loescheEintrag(id: string): void {
    let ergebnisse = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    ergebnisse = ergebnisse.filter((e: any) => e.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(ergebnisse));
  }
}
