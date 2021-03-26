import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Api } from '../../services/api.service';
import { SettingsService } from '../../services/settings.service';
import { HomePage } from '../home/home';
import { NotifyService } from '../../services/notify.service';
import { GeoService } from '../../services/geo.service';

@Component({
  selector: 'page-newjob',
  templateUrl: 'newjob.html'
})
export class NewJobPage {

  public jobInfo = '';

  constructor(
    public navCtrl: NavController,
    public api: Api,
    public setting: SettingsService,
    public notify: NotifyService,
    public geoService: GeoService,
    public param: NavParams,
    public events: Events
  ) {
    this.jobInfo = this.param.get('job');

    this.events.subscribe('closeNewJobScreen', data => {
      this.navCtrl.pop();
    })
  }

  accept() {
    let user = this.setting.getStorage('user');

    this.api.acceptNewJob({
      DJID: this.jobInfo['DJID'],
      Token: user['Token']
    }).subscribe(res => {
      if (res.message == 'PASS') {
        this.notify.showNotification('successfully accepted');
      }
    })

    this.navCtrl.pop();
  }

  reject() {
    //this.events.publish('closeNewJobScreen');
    let user = this.setting.getStorage('user');

    this.api.rejectNewJob({
      DJID: this.jobInfo['DJID'],
      Token: user['Token']
    }).subscribe(res => {
      if (res.message == 'PASS') {
        this.notify.showNotification('successfully rejected');
      }
    })

    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    this.events.unsubscribe('closeNewJobScreen');
    this.geoService.jobOpen = 0;
  }
}