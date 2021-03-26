/**
 * Created by ApolloYr on 1/28/2018.
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { SettingsService } from './settings.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map'
import { NotifyService } from "./notify.service";

@Injectable()
export class Api {
    constructor(private http: HttpClient,
        public settings: SettingsService,
        public notify: NotifyService
    ) {
    }

    createAuthorizationHeader() {
        return new HttpHeaders();
    }

    get(url, data?) {
        let headers = this.createAuthorizationHeader();

        return this.http.get(this.settings.apiUrl + url, {
            headers: headers,
            params: data
        }).map(res => res).catch((error: any) => this.handleError(this, error));
    }

    post(url, data) {
        let headers = this.createAuthorizationHeader();

        return this.http.post(this.settings.apiUrl + url, data, {
            headers
        }).map(res => res).catch((error: any) => this.handleError(this, error));
    }

    put(url, data) {
        let headers = this.createAuthorizationHeader();

        return this.http.put(this.settings.apiUrl + url, data, {
            headers: headers
        }).map(res => res).catch((error: any) => this.handleError(this, error));
    }

    handleError(_parent, error: any) {
        if ((error.status == 401 || error.status == 400) && error.url && !error.url.endsWith('/login')) {

        } else if (error.status == 500) {
        }

        return Observable.throw(error);
    }


    login(data) {
        return this.post('/data/app_login_verify.php', data);
    }

    checkToken(token) {
        return this.get('/data/app_login_token.php?Token=' + token);
    }

    sendLocation(data) {
        return this.get('/data/driverv2.php', data);
    }

    acceptNewJob(data) {
        return this.get('/data/driver_job_accept.php', data);
    }

    rejectNewJob(data) {
        return this.get('/data/driver_job_reject.php', data);
    }
}
