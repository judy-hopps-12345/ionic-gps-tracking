/**
 * Created by ApolloYr on 11/18/2017.
 */

import { NgModule } from '@angular/core';
import { Validate } from "./validate.service";
import { SettingsService } from "./settings.service";
import { NotifyService } from "./notify.service";
import { SoundsService } from "./sounds.service";
import { Api } from './api.service';
import { GeoService } from './geo.service';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        Validate,
        SettingsService,
        NotifyService,
        SoundsService,
        Api,
        GeoService,
    ],
    exports: []
})
export class ServicesModule {

}
