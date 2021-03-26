import { Injectable } from "@angular/core";
import { NativeAudio } from "@ionic-native/native-audio";
import { SettingsService } from "./settings.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class SoundsService {

    sounds: sound[] = [
        { sId: 'bird', name: 'Bird', uri: 'assets/sound/bird.mp3' },
    ]

    constructor(
        public nativeAudio: NativeAudio,
        public settings: SettingsService,
        public alertCtrl: AlertController
    ) {

    }

    preloadAllSound() {
        for (let i = 0; i < this.sounds.length; i++) {
            this.nativeAudio.preloadSimple(this.sounds[i].sId, this.sounds[i].uri).then(success => {
                console.log(success);
                /*alert('success');*/
            }, err => {
                /*alert('error');
                alert(err);*/
                console.log(err);
            });
        }
    }

    preload(sId, url) {
        this.nativeAudio.preloadSimple(sId, url).then(success => {

        }, err => {
            console.log(err);
        });
    }

    playSound(sId) {
        this.nativeAudio.play(sId, () => {
            console.log('sound is done playing');
        })
    }

    getSounds() {
        return this.sounds;
    }

    stopSound(sId) {
        this.nativeAudio.stop(sId).then(success => {
            console.log(success);
        }, err => {
            console.log(err);
        })
    }
}

export class sound {
    sId: string;
    name: string;
    uri: string;
}
