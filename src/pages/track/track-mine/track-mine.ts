import { Component} from '@angular/core';
import { NavController, NavParams,AlertController,Events  } from 'ionic-angular';
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-track-mine',
    templateUrl: 'track-mine.html',
})
export class TrackMinePage {
    private dpr=sessionStorage.dpr;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController
    ) {
    }
    //首次加载页面
    ionViewDidLoad() {
    }
    //停止跟单
    stopTrack(){
        this.alertCtrl.create({
            message: '确定要停止跟单吗？',
            buttons: [
              {
                text: '取消',
                handler: () => {
                  console.log('取消');
                }
              },
              {
                text: '确定',
                handler: () => {
                  console.log('确定');
                }
              }
            ]
          }).present();
    }
}
