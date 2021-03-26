import { Injectable, NgZone } from '@angular/core';
import { SettingsService } from './settings.service';
import 'rxjs/add/operator/map'
import { Api } from './api.service';
import { NotifyService } from './notify.service';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Events } from 'ionic-angular';
import { SoundsService } from './sounds.service';

@Injectable()
export class GeoService {

  public newJob: any;
  public jobOpen = 0;

  lat: any;
  lng: any;

  clock: any = null;
  watch: any;

  locationList = [];
  type = '';

  constructor(
    public api: Api,
    public backGeo: BackgroundGeolocation,
    public geolocation: Geolocation,
    public notify: NotifyService,
    public setting: SettingsService,
    public zone: NgZone,
    //public navCtrl: NavController
    public event: Events,
    public sound: SoundsService
  ) {

  }

  startSending() {
    this.clock = setInterval(() => {

      //this.notify.showNotification('lat: ' + this.lat + ', long: ' + this.lng);

      if (this.lat && this.lng) {
        this.sendLocation();
      }
    }, 10000);
  }

  stopSending() {
    clearInterval(this.clock);
    this.clock = null;
  }

  trackLocation() {
    // let config = {
    //   desiredAccuracy: 0,
    //   stationaryRadius: 20,
    //   distanceFilter: 10,
    //   debug: false, //  enable this hear sounds for background-geolocation life-cycle.
    //   stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    //   fastestInterval: 5000,
    //   activitiesInterval: 10000
    // };

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      interval: 2000
    }

    this.backGeo.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.type = 'background';

        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });

    this.backGeo.start();

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      //console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {

        this.type = 'foreground';

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

    });

  }

  sendLocation() {

    let user = this.setting.getStorage('user');
    //console.log(user);

    let date = new Date();
    //console.log(date.toISOString());

    this.zone.run(() => {
      this.locationList.push({
        type: this.type,
        lat: this.lat,
        lng: this.lng
      });
    });

    this.api.sendLocation({
      Lat: this.lat,
      Long: this.lng,
      device_date: date.toISOString(),
      Version: '2.0',
      Token: user['Token']
    }).subscribe(res => {
      console.log(res);
      if (this.jobOpen == 0) {
        this.newJob = res;
        if (this.newJob.job == 1) {
          if (this.setting.environment == 'product') {
            this.sound.playSound('bird');
          }
          this.openNewJobPage();
        }
      } else if (this.jobOpen == 1) {
        this.newJob = res;
        if (this.newJob.job == 0) {
          this.event.publish('closeNewJobScreen');
        }
      }
    })
  }

  openNewJobPage() {
    this.jobOpen = 1;
    console.log('open job');

    this.event.publish('newjob', this.newJob);
  }
}