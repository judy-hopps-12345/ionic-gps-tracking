/**
 * Created by ApolloYr on 1/29/2018.
 */
import { Injectable } from "@angular/core";
import { AlertController, ToastController, Toast, LoadingController, Loading } from "ionic-angular";

@Injectable()
export class NotifyService {

    toast: Toast = null;
    loading: Loading = null;

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
    ) {
    }

    showLoading() {
        this.loading ? this.loading.dismiss() : false;
        this.loading = this.loadingCtrl.create({
            duration: 30000,
            dismissOnPageChange: true,
        });
        this.loading.present();
    }

    closeLoading() {
        if (this.loading) this.loading.dismiss();
    }

    showNotification(data, duration?) {

        this.toast ? this.toast.dismiss() : false;
        this.toast = this.toastCtrl.create({
            message: data,
            duration: duration ? duration : 2000,
            position: 'top'
        })
        this.toast.present();
    }


}
