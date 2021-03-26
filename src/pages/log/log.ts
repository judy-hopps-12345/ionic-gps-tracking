import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validate } from '../../services/validate.service';
import { Api } from '../../services/api.service';
import { SettingsService } from '../../services/settings.service';
import { HomePage } from '../home/home';
import { NotifyService } from '../../services/notify.service';
import { GeoService } from '../../services/geo.service';

@Component({
  selector: 'page-log',
  templateUrl: 'log.html'
})
export class LogPage {
  constructor(
    public navCtrl: NavController,
    public api: Api,
    public setting: SettingsService,
    public notify: NotifyService,
    public geoService: GeoService,
  ) {

  }
}