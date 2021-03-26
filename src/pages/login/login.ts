import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validate } from '../../services/validate.service';
import { Api } from '../../services/api.service';
import { SettingsService } from '../../services/settings.service';
import { HomePage } from '../home/home';
import { NotifyService } from '../../services/notify.service';
import { GeoService } from '../../services/geo.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public validate: Validate,
    public api: Api,
    public setting: SettingsService,
    public notify: NotifyService,
    public geoService: GeoService,
    private iab: InAppBrowser
  ) {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      userPass: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
  }

  login() {
    if (this.form.valid) {
      const formData = new FormData();

      for (let key in this.form.value) {
        formData.append(key, this.form.value[key]);
      }


      this.notify.showLoading();

      this.api.login(formData).subscribe(res => {
        if (res.message == 'PASS') {
          this.setting.setStorage('user', res);

          this.geoService.startSending();

          this.navCtrl.setRoot(HomePage);


        } else {
          this.setting.setStorage('user', false);

          this.notify.showNotification('Invalid credentical');
        }

        this.notify.closeLoading();
      })
    } else {
      this.validate.validateAllFormFields(this.form);
    }
  }

  goLink1() {
    console.log('click');
    let browser = this.iab.create('https://alacasacr.com/es/restablecer');
    browser.show();
  }

  goLink2() {
    console.log('click');
    let browser = this.iab.create('https://alacasacr.com/es/subscribir');
    browser.show();
  }
}
