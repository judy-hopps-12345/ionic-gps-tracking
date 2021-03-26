import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SettingsService } from '../services/settings.service';
import { Api } from '../services/api.service';
import { GeoService } from '../services/geo.service';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SoundsService } from '../services/sounds.service';
import { NewJobPage } from '../pages/newjob/newjob';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public setting: SettingsService,
    public api: Api,
    public geoService: GeoService,
    private backgroundMode: BackgroundMode,
    public soundService: SoundsService,
    public event: Events,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      if (this.setting.environment == 'product') {
        this.soundService.preloadAllSound();   /// load all app sounds;
      }
      this.backgroundMode.enable();

      this.geoService.trackLocation();   //// track location 


      this.event.subscribe('newjob', data => {
        this.nav.push(NewJobPage, { 'job': data });
      })

      this.verifyLogged();

      splashScreen.hide();
    });
  }

  verifyLogged() {
    if (!this.setting.getStorage('user')) {
      this.rootPage = LoginPage;
    } else {
      let user = this.setting.getStorage('user');

      console.log(user);

      if (user.Token) {
        this.api.checkToken(user.Token).subscribe(res => {
          if (res.message == 'PASS') {
            this.rootPage = HomePage;

            this.geoService.startSending();
          } else {
            this.setting.setStorage('user', false);
            this.rootPage = LoginPage;
          }
        })
      } else {
        this.setting.setStorage('user', false);
        this.rootPage = LoginPage;
      }
    }
  }
}

