import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DatenbankPageRoutingModule } from './datenbank-routing.module';

import { DatenbankPage } from './datenbank.page';
import { SpeicherService } from '../speicher.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DatenbankPageRoutingModule
  ],
  declarations: [DatenbankPage],
  providers: [SpeicherService]
})
export class DatenbankPageModule { }
