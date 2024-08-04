import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
  ];

// Definisci e inizializza la proprietà labels
public labels: string[] = ['Label 1', 'Label 2', 'Label 3'];

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.getToken().then(() => {
        // App initialization logic here, if needed
      });
    });
  }

  async logout() {
    try {
      const data = await this.authService.logout().toPromise();
      this.alertService.presentToast(data.message);
      this.navCtrl.navigateRoot('/landing');
    } catch (error) {
      console.log(error);
    }
  }
}