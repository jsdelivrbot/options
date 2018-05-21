import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,IonicApp,Events,ModalController,ViewController} from 'ionic-angular';
import {GlobalData} from "../../../../providers/GlobalData";
import {Storage} from '@ionic/storage';
import { SiPayPage } from '../../../my/self-info/si-pay/si-pay';
import { LoginPage } from '../../../login/login';
import { NoviceDetailPage } from '../../../home/novice-detail/novice-detail';
import { SiIdentifyPage } from '../../../my/self-info/si-identify/si-identify';
@Component({
	selector: 'page-inquiryModal',
	templateUrl: 'inquiryModal.html',
})
export class InquiryModalPage {
    private dpr=sessionStorage.dpr;
    private subData:any=[];
    private tableDate:any=[];
	constructor(
		private navCtrl: NavController, 
        private navParams: NavParams,
        private ionicApp: IonicApp,
        private events: Events,
        private modalCtrl: ModalController,
        private viewCtrl: ViewController,
        private globalData: GlobalData,
		private alertCtrl: AlertController
	) {
		this.subData=navParams.get('data');
	}
	ionViewDidLoad(){
		this.events.subscribe('buy:success',()=>{
			this.viewCtrl.dismiss();
		})
	}
    closeModal(){
        this.viewCtrl.dismiss();
    }
    openBowser(){
		this.navCtrl.push(NoviceDetailPage,{
			id:4,
			title:'协议详情'
		});
	}
	doNothing(){}
	//申购
	pay(){
		if(!this.globalData.userId){
			this.modalCtrl.create(LoginPage).present();
			return;
		}
		if(!this.globalData.authState){
			this.alertCtrl.create({
				title: '请实名认证',
				buttons: [
				  {
					text: '取消',
					role: 'cancel',
					handler: () => {
					}
				  },
				  {
					text: '认证',
					handler: () => {
						this.navCtrl.push(SiIdentifyPage)
					}
				  }
				]
			  }).present();
			return;
		}
		this.navCtrl.push(SiPayPage,{
			data:this.subData
		});
		
	}
}
