import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Speicher {
  constructor(private storage: Storage) { 
    this.storage.create();
  }
  
}
