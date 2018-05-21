import { Component } from '@angular/core';
import { NavController, NavParams,Events,AlertController } from 'ionic-angular';
import { GlobalData } from "../../../../providers/GlobalData";
import { myService } from "../../myService";
@Component({
	selector: 'page-bank',
	templateUrl: 'bank.html',
})
export class BankPage {
	private money:number;
	private name:string;
	private canPay:boolean=true;
	constructor(
		private navCtrl: NavController,
		 private navParams: NavParams,
		 private globalData:GlobalData,
		 private events:Events,
		 private myService:myService,
		 private alertCtrl:AlertController,
		) {
		this.money=navParams.data;
		this.name=globalData.realName;
	}

	ionViewDidLoad() {
		this.myService.getBank()
			.subscribe(res => {
				if(res.success=="true"){
					if(res.data.bankCardNumber==null)
					this.canPay=false;
				}else{
					this.canPay=false;
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
						}).present();
				}
			})
	}
	sub(){
		if(!this.canPay){
			this.alertCtrl.create({
				title: '暂不支持此付款方式',
				subTitle: '',
				buttons: [{text: '确定'}]
				}).present();
			return;
		}
		this.myService.offLinePay(String(this.money),'银行卡',this.name,'')
		.subscribe(res => {
			if(res.success=="true"){
				this.events.publish('goOrDetail',{
					id:res.data,
					showTab:'银行卡'
				})
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		})
	}
	orderRecoder(){
		this.events.publish('goOrRecord')
	}
}
