import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatenbankPageRoutingModule } from './datenbank-routing.module';

import { DatenbankPage } from './datenbank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatenbankPageRoutingModule
  ],
  declarations: [DatenbankPage]
})
export class DatenbankPageModule {}
