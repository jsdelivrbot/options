import { Component} from '@angular/core';
import { NavController, NavParams,AlertController,Events,LoadingController } from 'ionic-angular';
import {TrackService} from '../trackService';
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-track-detail',
    templateUrl: 'track-detail.html',
})
export class TrackDetailPage {
    private dpr:string=sessionStorage.dpr;
    private chooseState:string='first';
    private showTip:boolean=false;
    private id:number;
    private data:any=[];
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private loadingCtrl: LoadingController ,
        private trackService: TrackService ,
        private alertCtrl: AlertController ,
    ) {
        this.id=navParams.get('id');
    }
    //首次加载页面
    ionViewDidLoad() {
    }
    //获取数据
    getTrackDetail(){
        this.trackService.getTrackDetail(this.id)
        .subscribe(res => {
            console.log('res',res)
			if(res.success=='true'){
				this.data=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
    }
    //选择状态更改
    choose(val){
        switch(val){
            case 'first':
                this.chooseState='first';
                break;
            case 'second':
                this.chooseState='second';
                break;
            case 'third':
                if(this.showTip==true){
                    this.showTip=false;
                }else{
                    this.showTip=true;
                }
                break;
        }
    }
    track(){
        let toast = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
                <div class="self_load">
                    <img src="assets/images/track/documentary_popup_icon_lack@3x.png"/>
                    <p class="p1">抱歉，您的账户可用资金不足</p>
                    <p class="p2">推荐您选择50万级牛人进行跟单</p>
                </div>
            `,
            duration: 1500
          }).present();
    }

}
