/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User | null = null;

  constructor(private menu: MenuController, private authService: AuthService) { 
    this.menu.enable(true);
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.authService.user().then(user => {
      this.user = user || null;
    }).catch(error => {
      console.error('Error fetching user:', error);
    });
  }
}