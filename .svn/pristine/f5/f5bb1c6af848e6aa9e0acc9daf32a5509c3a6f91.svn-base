import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,AlertController,ModalController } from 'ionic-angular';
import { SiBankcardPage } from './si-bankcard/si-bankcard';
import { SiDrawpasswordPage } from './si-drawpassword/si-drawpassword';
import { SiIdentifyPage } from './si-identify/si-identify';
import { SiLoginpasswordPage } from './si-loginpassword/si-loginpassword';
import { SiPhonePage } from './si-phone/si-phone';
import { GlobalData } from "../../../providers/GlobalData";
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
	selector: 'page-self-info',
	templateUrl: 'self-info.html',
})
export class SelfInfoPage {

	constructor(
		private navCtrl: NavController,
		private alertCtrl: AlertController,
		private navParams: NavParams,
		private events: Events,
		private storage: Storage,
		private modalCtrl: ModalController,
		private globalData: GlobalData
		) {
	}

	ionViewDidLoad() {
	}
	//登出
	logout(){
		this.alertCtrl.create({
			title: '确定退出？',
			subTitle: '',
			buttons: [ 
				{
					text: '取消',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: '确定',
					handler: () => {
						this.events.publish('user:logout');
						this.globalData.token=null;
						this.globalData.refreshToken=null;
						this.globalData.userId=null;
						this.globalData.funds =0.00;
						this.globalData.capital =0.00;
						this.globalData.authState =null;
						this.globalData.account =null;
						this.globalData.isMentionPassword =null;
						this.globalData.isBankCard  =null;
						this.globalData.cardCount=null;
						this.globalData.realName=null;
						this.globalData.simulateAccount=null;
						this.storage.set('userInfo',null);
						// this.ws.tradeSocket.close(true,false)
						this.alertCtrl.create({
							title: '退出成功',
							subTitle: '',
							buttons: [ {
								text: '确定',
								role: 'cancel',
								handler: () => {
									this.events.publish('user:logout');
									this.navCtrl.pop();
								}
							  }]
						  }).present();
					}

				}
			]
		  }).present();
	}
	gochildpage(val){
		switch(val){
			case '实名认证':
				!this.globalData.authState&&this.navCtrl.push(SiIdentifyPage);
				break;
			case '手机号码':
				this.navCtrl.push(SiPhonePage);
				break;
			case '登录密码':
				this.navCtrl.push(SiLoginpasswordPage);
				break;
			case '提现密码':
				this.navCtrl.push(SiDrawpasswordPage);
				break;
			case '我的银行卡':
				if(!this.globalData.authState){
					this.alertCtrl.create({
						title: '请先实名认证',
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
								this.navCtrl.push(SiIdentifyPage);
							}
						  }
						]
					  }).present();
					return;
				}
				this.navCtrl.push(SiBankcardPage);
				break;
		}
	}
}
