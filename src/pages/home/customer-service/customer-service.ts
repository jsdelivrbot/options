import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { HomeService } from '../homeService';
import { NoviceDetailPage } from '../novice-detail/novice-detail';
@Component({
	selector: 'page-customer-service',
	templateUrl: 'customer-service.html',
})
export class CustomerServicePage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private listData:any=[];
	private phone:any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private alertCtrl: AlertController,
		private homeService: HomeService,
	) {
	}

	ionViewDidLoad() {
		this.homeService.getConText(5)
		.subscribe(res => {
			if(res.success=='true'){
				let str = res.data.html;
				var pattern = new RegExp('<p.*?>(.*?)<\/p>','i');
				this.phone=str.match(pattern)[1];
				let temp:any=document.getElementById('phone');
				temp.href='tel:'+this.phone;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		})
		this.homeService.getProblemsList()
		.subscribe(res => {
			if(res.success=='true'){
				if(!res.data)return;
				res.data.forEach((value,index,arr)=>{
					value.show=false;
				})
				this.listData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	showCont(val){
		val.show=!val.show;
	}
}
