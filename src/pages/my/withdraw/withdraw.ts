import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController,ModalController,Events  } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { myService } from "../myService";
import { GlobalData } from "../../../providers/GlobalData";
import { SbAddcardPage } from '../self-info/si-bankcard/sb-addcard/sb-addcard';
import { SiSetdpPage } from '../self-info/si-setdp/si-setdp';
import { SiDrawpasswordPage } from '../self-info/si-drawpassword/si-drawpassword';
import { SiIdentifyPage } from '../self-info/si-identify/si-identify';
@Component({
	selector: 'page-withdraw',
	templateUrl: 'withdraw.html',
})
export class WithdrawPage {
	private bank: string;
	private bankid:number;
    private money: string='';
	private password: string='';
	private bankdata:any;
	private actionsheetdata:any=[];
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private myservice: myService,
		private globalData: GlobalData,
		private alertCtrl: AlertController,
		private events: Events,
		private loadingCtrl: LoadingController ,
		private modalCtrl: ModalController,
		private actionSheetCtrl: ActionSheetController
		) {
	}
	ionViewWillEnter() {
		if(!this.globalData.authState){
			this.alertCtrl.create({
				title: '请先实名认证',
				subTitle: '',
				buttons: [ {
					text: '取消',
					role: 'cancel',
					handler: () => {
						this.navCtrl.pop();
					}
				  },
				  {
					text: '认证',
					handler: () => {
						this.navCtrl.push(SiIdentifyPage)
					}
				  }]
			  }).present();
			return;
		}
		if(this.globalData.cardCount==0){
			this.alertCtrl.create({
				title: '请先绑定银行卡',
				subTitle: '',
				buttons: [ {
					text: '取消',
					role: 'cancel',
					handler: () => {
						this.navCtrl.pop();
					}
				  },
				  {
					text: '确定',
					handler: () => {
						this.navCtrl.push(SbAddcardPage,{
							shouldBack:true
						})
					}
				  }]
			  }).present();
			  return
		}
		if(!this.globalData.isMentionPassword){
			this.alertCtrl.create({
				title: '请先设置提现密码',
				subTitle: '',
				buttons: [ {
					text: '取消',
					role: 'cancel',
					handler: () => {
						this.navCtrl.pop();
					}
				  },
				  {
					text: '确定',
					handler: () => {
						this.navCtrl.push(SiDrawpasswordPage)
					}
				  }]
			  }).present();
			  return
		}
		this.myservice.getBankCard(this.globalData.userId)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length!=0){
					this.bankdata=res.data;
					this.bank=this.bankdata[0].bank +this.bankdata[0].bankCardNumber;
					this.bankid=this.bankdata[0].id;
					console.log('this.bankdata',this.bankdata)
					this.bankdata.forEach((value, index, array)=>{
						this.actionsheetdata.push({
							text:value.bank+value.bankCardNumber,
							handler:()=>{
								this.bank=value.bank+value.bankCardNumber;
								this.bankid=value.id;
							}
						})
					})
					this.actionsheetdata.push({
						text: '取消',
						role: 'cancel',
						handler: () => {
						}
					})
				}
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		})
	}
	//选择银行卡
	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: '请选择银行卡',
			buttons:this.actionsheetdata
		});
		actionSheet.present();
	  }
	//提现
	withDraw(){
		if(isNaN(Number(this.money))||Number(this.money)<=0){
			this.alertCtrl.create({
				title: '请输入正确的金额',
				subTitle: '',
				buttons: [{text: '确定'}]
				}).present();
			return
		}
		this.myservice.withDraw(this.money,this.bankid,this.password)
		.subscribe(res => {
			if(res.success=='true'){
				let toast = this.loadingCtrl.create({
					spinner: 'hide',
					content: `
						<div class="self_load">
							<img src="./assets/images/my/my_withdraw_popup_1@3x.png"/>
							<p class="p1">提现申请已提交</p>
							<p class="p2">具体到账时间以银行为准</p>
						</div>
					`,
					duration: 1000
				  }).present();
				  this.globalData.funds-=Number(this.money);
				  setTimeout(()=>{
					  this.navCtrl.pop();
				  },1000)
			}else{
				let toast = this.loadingCtrl.create({
					spinner: 'hide',
					content: `
						<div class="self_load">
							<img src="./assets/images/my/Group4@3x.png"/>
							<p class="p1">${res.errorMsg}</p>
						</div>
					`,
					duration: 1000
					}).present();
			}
			
			
		})
	}
}