import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatenbankPage } from './datenbank.page';

const routes: Routes = [
  {
    path: '',
    component: DatenbankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatenbankPageRoutingModule {}
