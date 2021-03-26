import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../services/api.service';
import { SettingsService } from '../../services/settings.service';
import { LoginPage } from '../login/login';
import { GeoService } from '../../services/geo.service';
import { LogPage } from '../log/log';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user = '';

  constructor(
    public navCtrl: NavController,
    public api: Api,
    public setting: SettingsService,
    public geoService: GeoService
  ) {

  }

  ionViewDidLoad() {
    this.user = this.setting.getStorage('user')
    console.log(this.user);
  }

  sendTest() {

    let date = new Date();
    console.log(date.toISOString());

    this.api.sendLocation({
      Lat: 20.3186884,
      Long: 85.8030883,
      device_date: date.toISOString(),
      Version: '1.0',
      Token: this.user['Token']
    }).subscribe(res => {
      console.log(res);
    })
  }

  logout() {
    this.setting.setStorage('user', false);
    this.geoService.stopSending();
    this.navCtrl.setRoot(LoginPage);
  }

  goToLog() {
    this.navCtrl.push(LogPage);
  }
}
