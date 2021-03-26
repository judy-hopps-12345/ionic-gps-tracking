/**
 * Created by ApolloYr on 11/17/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

    private storagePrefix = 'credita_app_';

    public userInfo: any;
    public apiUrl = 'https://alacasacr.com';

    //public environment = 'development';
    public environment = 'product';

    constructor(

    ) {
        // User settings
        this.init();
    }

    init() {

    }

    clearUserSetting() {
        this.setStorage('user', false);
    }

    getStorage(key, defaultVal?) {
        return window.localStorage[this.storagePrefix + key] ?
            JSON.parse(window.localStorage[this.storagePrefix + key]) : defaultVal || false;
    }

    setStorage(key, val) {
        window.localStorage.setItem(this.storagePrefix + key, JSON.stringify(val));
    }
}

