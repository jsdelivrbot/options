import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { UseRulesPage } from './use-rules/use-rules';
import { GlobalData } from "../../../providers/GlobalData";
import { myService } from "../myService";
@Component({
	selector: 'page-coupon',
	templateUrl: 'coupon.html',
})
export class CouponPage {
	private userules:any=UseRulesPage;
	private dpr:string=sessionStorage.dpr;
	private datas:string[];
	constructor(
		private navCtrl: NavController, 
		private myservice: myService,
		private globaldata: GlobalData,
		private alertCtrl: AlertController,
		private navParams: NavParams) {
			myservice.getCoupon(this.globaldata.userId)
			.subscribe(res => {
				if(res.success=="true"){
					if(res.data.length!=0)this.datas=res.data;
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
					  }).present();
				}
			})
	}

	ionViewDidLoad() {
	}
	
}
