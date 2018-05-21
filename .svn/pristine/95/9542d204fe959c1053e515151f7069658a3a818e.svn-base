import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ActionSheetController } from 'ionic-angular';
import { SbAddcardPage } from './sb-addcard/sb-addcard';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
import { flyIn } from '../../../../animations/fly-in';
@Component({
	selector: 'page-si-bankcard',
	templateUrl: 'si-bankcard.html',
	animations: [flyIn]
})
export class SiBankcardPage {
	private dpr:string=sessionStorage.dpr;
	private data:any=[];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private myservice: myService,
		private globalData: GlobalData,
		private actionSheetCtrl: ActionSheetController,
		private alertCtrl: AlertController,
		) {
		
	}

	ionViewWillEnter() {
		//获取银行卡
		this.myservice.getBankCard(this.globalData.userId)
		.subscribe(res => {
			if(res.success=="true"){
				this.data=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
			}
		})
	}
	ionViewWillLeave() {
		this.data=[];
	}		
	//添加银行卡
	addcard(){
		this.data.length<4&&this.navCtrl.push(SbAddcardPage)
	}
	//解绑银行卡的actionsheet
	delCard(val){
		const actionSheet = this.actionSheetCtrl.create({
			buttons: [
			  {
				text: '解绑此银行卡',
				handler: () => {
					this.myservice.delBankCard(this.globalData.userId,val)
					.subscribe(res => {
						if(res.success=="true"){
							let temparr=[];
							this.data.forEach((value,index,arr)=>{
								if(value.id!=val){
									temparr.push(value)
								}
							})
							this.data=temparr;
							this.globalData.cardCount--;
							this.alertCtrl.create({
								title: '解绑成功',
								subTitle: '',
								buttons: [{text: '确定'}]
							  }).present();
						}else{
							this.alertCtrl.create({
								title: res.errorMsg,
								subTitle: '',
								buttons: [{text: '确定'}]
							  }).present();
						}
					})
				}
			  },
			  {
				text: '取消',
				role: 'cancel',
			  }
			]
		}).present();
	}
}
