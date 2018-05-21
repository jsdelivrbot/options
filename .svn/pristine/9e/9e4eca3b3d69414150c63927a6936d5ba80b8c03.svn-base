import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { GlobalData } from "../../../providers/GlobalData";
import { myService } from "../myService";
import { Storage } from '@ionic/storage';
import { CustomerServicePage } from '../../home/customer-service/customer-service';
import { AboutUsPage } from './about-us/about-us';
import { FeedBackPage } from './feedBack/feedBack';
import { SocketService } from '../../../providers/SocketService';
@Component({
	selector: 'page-set',
	templateUrl: 'set.html',
})
export class SetPage {
	private customerServicePage:any=CustomerServicePage;
	private aboutUsPage:any=AboutUsPage;
	private feedBackPage:any=FeedBackPage;
	constructor(
		private navCtrl: NavController, 
		private myservice: myService,
		private globalData: GlobalData,
		private storage: Storage,
		private events: Events,
		private ws: SocketService,
		private alertCtrl: AlertController,
		private navParams: NavParams) {
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
						this.globalData.userId=null;
						this.globalData.childAccountNo=null;
						this.globalData.nickname =null;
						this.globalData.funds =0.00;
						this.globalData.portrait =null;
						this.globalData.authState =null;
						this.globalData.account =null;
						this.globalData.isMentionPassword =null;
						this.globalData.isBankCard =null;
						this.globalData.cardCount=0;
						this.storage.set('userInfo',null);
						this.ws.tradeSocket.close(true,false)
						this.alertCtrl.create({
							title: '退出成功',
							subTitle: '',
							buttons: [ {
								text: '确定',
								role: 'cancel',
								handler: () => {
									this.events.publish('user:logout');
								}
							  }]
						  }).present();
					}

				}
			]
		  }).present();
	}
}
