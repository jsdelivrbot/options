import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { GlobalData } from "../../../../providers/GlobalData";
import { myService } from "../../myService";
import {InAppBrowser} from '@ionic-native/in-app-browser';
@Component({
	selector: 'page-or-detail',
	templateUrl: 'or-detail.html',
})
export class OrDetailPage {
	showTab:string;
	isSigned:boolean=false;
	data1:any=[];//支付宝
	data2:any=[];//银行卡
	_url:string;
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private myService: myService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private inAppBrowser: InAppBrowser,
		private globalData:GlobalData) {
			this.showTab=navParams.get('showTab');
	}

	ionViewDidLoad() {
		if(this.navParams.get('showTab')=='支付宝'){
			this.myService.getZhiFuBao()
			.subscribe(res => {
				if(res.success=="true"){
					this.data1=res.data;
					this._url=res.data.alipayQRcodeText;
					if (/MicroMessenger/i.test(navigator.userAgent)) {
						// window.location.href=;
						// window.open(`/weixin.html?hostPath=${res.data.alipayQRcodeText}`)
					} else {
						let temp:any=document.getElementById('payIframe');
						temp.src=res.data.alipayQRcodeText;
						// window.location.href=res.data.alipayQRcodeText;
					}
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
						}).present();
				}
			})
		}else{
			this.myService.getBank()
			.subscribe(res => {
				if(res.success=="true"){
					this.data2=res.data;
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
						}).present();
				}
			})
		}
	}
	openZFB(){
		// window.location.href='https://ds.alipay.com/?from=mobilecodec&scheme=alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2FFKX01720NY0TXTSYNTZO05%3F_s%3Dweb-other';
		// window.open(`/weixin.html?hostPath=${this._url}`);
		this.inAppBrowser.create(`/weixin.html?hostPath=${this._url}`, '_system');
	}
	sub(){
		this.myService.signStatus(this.navParams.get('id'))
		.subscribe(res => {
			if(res.success=="true"){
				this.toastCtrl.create({
					message: '标记成功',
					duration: 1500,
					position: 'top'
				}).present();
				this.isSigned=true;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		})
	}
}
