import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform, 
              private menuController: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
    });
  }

  menuSchliessen() {
    this.menuController.close();
  }
}