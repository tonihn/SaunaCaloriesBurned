import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {
  private storageKey = 'saunaErgebnisse';

  constructor() { }

  speichereErgebnis(minuten: number, kalorien: number, gewichtsverlust?: number): void {
    const ergebnisse = this.getAlleEintraege();
    
    ergebnisse.push({
      id: Date.now().toString(),
      minuten: minuten,
      kalorien: kalorien,
      gewichtsverlust: gewichtsverlust || 0,
      datum: new Date().toLocaleString()
    });
    
    localStorage.setItem(this.storageKey, JSON.stringify(ergebnisse));
  }

  getAlleEintraege(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  loescheEintrag(id: string): void {
    let ergebnisse = this.getAlleEintraege();
    ergebnisse = ergebnisse.filter((e: any) => e.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(ergebnisse));
  }

  loescheAlleEintraege(): void {
    localStorage.removeItem(this.storageKey);
  }
}
