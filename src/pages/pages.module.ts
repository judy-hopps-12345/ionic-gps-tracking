import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home/home";
import { LoginPage } from "./login/login";
import { LogPage } from "./log/log";
import { NewJobPage } from "./newjob/newjob";

/**
 * Created by Tall Prince on 2/6/2017.
 */
@NgModule({
    imports: [
        IonicModule,
        FormsModule,
    ],
    declarations: [
        HomePage,
        LoginPage,
        LogPage,
        NewJobPage
    ],
    entryComponents: [
        HomePage,
        LoginPage,
        LogPage,
        NewJobPage
    ],
    providers: [],
    exports: [
        HomePage,
        LoginPage,
        LogPage,
        NewJobPage
    ]
})
export class PagesModule {

}