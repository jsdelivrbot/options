import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Clipboard } from '@ionic-native/clipboard';
import { AlertController } from 'ionic-angular';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
import { WithdrawPage } from "../../withdraw/withdraw";
// import { IonicImageViewerModule } from 'ionic-img-viewer';
@Component({
	selector: 'promote-details',
    templateUrl: 'promote-details.html',
})
export class PromoteDetailsComponent {
	private dpr=sessionStorage.dpr;
	private data:any=[];
	private levelData:any=[];
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		// private clipboard: Clipboard,
		private myservice: myService,
		private globalData: GlobalData,
		private alertCtrl: AlertController) {
	}

	ionViewDidLoad() {
		this.getPrmote();
		this.getLevelDetail();
	}
	//关闭preview回调
	closeview(){

	}
	//进入提现页面
	gowithdraw(){
		this.navCtrl.push(WithdrawPage)
	}
	//获取推广员级别
	getLevelDetail(){
		this.myservice.getLevelDetail()
		.subscribe(res => {
			if(res.success=="true"){
				this.levelData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
			}
		})
	}
	//获取推广数据
	getPrmote(){
		this.myservice.getPromoteData(this.globalData.userId)
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
	//复制操作
	// copy(val){
	// 	if(!this.showit)return;
	// 	this.clipboard.copy('Hello world').then(
	// 		(resolve: string) => {
	// 			this.alertCtrl.create({
	// 				title: '复制成功',
	// 				subTitle: '',
	// 				buttons: ['确定']
	// 			  }).present();
	// 		 },
	// 		 (reject: string) => {
	// 			this.alertCtrl.create({
	// 				title: '复制失败',
	// 				subTitle: '请重新复制',
	// 				buttons: ['确定']
	// 			  }).present();
	// 		 }
	// 	   );
		
	// }
}
