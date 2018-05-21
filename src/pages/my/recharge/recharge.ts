import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { myService } from "../myService";
import { GlobalData } from "../../../providers/GlobalData";
import {APP_PAY} from '../../../assets/config/config';
import {OnlineRechargePage} from '../online-recharge/online-recharge';
import { SbAddcardPage } from '../self-info/si-bankcard/sb-addcard/sb-addcard';
@Component({
	selector: 'page-recharge',
	templateUrl: 'recharge.html',
})
export class RechargePage {
	passwordForm: any;
	private pay_type:string='kuaijie';
	private moneyamount:number;
	private constr2Data=[5000,8000,10000];
	// private selfSet:string;
	private tradeType:number=1;
	private bankTypa:number;
	private choose_bankCode:string;
	private choose_bankNo:string;
	private choose_bank:any;
	//屏幕分辨比
	public dpr:string=sessionStorage.dpr;
	private bankData:any=[];
	// private showNext:boolean=false;
	private formData:any=[];
	private payTypeData:any=[];
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private alertCtrl: AlertController,
		private myservice: myService,
		private globaldata: GlobalData,
	) {
		if(navParams.get('rechargeType')){
			this.alertCtrl.create({
				title: '充值成功',
				subTitle: '',
				buttons: [{text: '确定'}]
			}).present();
		}
	}
	ionViewWillEnter() {
		this.getBanks();
		// this.moneyamount=this.constr2Data[0];
		// this.selfSet='自定义金额'+this.constr2Data[0]+'元起';
	}
	ionViewDidLoad(){
		this.myservice.getPayTypes()
		.subscribe(res => {
			if(res.success=="true"){
				console.log(res.data)
				this.payTypeData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				}).present();
			}
		})
	}
	//选择金额数值
	choose(val){
		this.moneyamount=val;
	}
	//获取银行列表
	getBanks(){
		this.myservice.getBankCard(this.globaldata.userId)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length!=0){
					this.bankData=res.data;
					this.choose_bank=res.data[0].bankCardNumber2;
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
	//选择支付类型
	chooseType(){
		switch(this.pay_type){
			case 'kuaijie':
				this.tradeType=1;
				break;
			case 'online':
				this.tradeType=2;
				break;
			default :
				this.tradeType=3;
				break;
		}
	}
	//选择银行
	chooseBank(){
		console.log(this.choose_bank)
	}
	sub(){
		if(isNaN(Number(this.moneyamount))||Number(this.moneyamount)<=0){
			this.alertCtrl.create({
				title: '请输入正确的金额',
				subTitle: '',
				buttons: [{text: '确定'}]
				}).present();
			return
		}
		this.bankData.forEach(value=>{
			if(value.bankCardNumber2==this.choose_bank){
				this.choose_bankCode=value.bankCode
				this.choose_bankNo=value.bankCardNumber2
			}
		})
		if(this.tradeType==1||this.tradeType==3){
			if(this.bankData.length==0){
				this.alertCtrl.create({
					title: '请先绑定银行卡',
					subTitle: '',
					buttons: [ {
						text: '取消',
						role: 'cancel',
						handler: () => {
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
			if(this.pay_type=='kuaijie'){
				this.myservice.Payment(this.moneyamount,1)
				.subscribe(res => {
					if(res.success=="true"){
						// this.showNext=true;
						// this.formData=res.data;
						window.location.href=`/recharge.html?hostPath=${res.data.hostPath}&encryp=${res.data.encryp}&url=${res.data.url}&bankCode=${this.choose_bankCode}&bankcardNo=${this.choose_bankNo}`
					}else{
						this.alertCtrl.create({
							title: res.errorMsg,
							subTitle: '',
							buttons: [{text: '确定'}]
						}).present();
					}
				})
			}
			//新支付通道newPay1
			if(this.pay_type=='shande'){
				this.myservice.newPay1(this.moneyamount,2,'0'+this.choose_bankCode+'0000')
				.subscribe(res => {
					if(res.success=="true"){
						// this.showNext=true;
						// this.formData=res.data;
						window.location.href=`newPay1/recharge.html?${res.data.substring(12)}`;
					}else{
						this.alertCtrl.create({
							title: res.errorMsg,
							subTitle: '',
							buttons: [{text: '确定'}]
						}).present();
					}
				})
			}
			//新支付通道newPay2
			if(this.pay_type=='huanxun'){
				this.myservice.newPay2(this.moneyamount,1,'1'+this.choose_bankCode)
				.subscribe(res => {
					if(res.success=="true"){
						localStorage.newPay2=JSON.stringify(res.data);
						window.location.href=`newPay2/recharge.html`;
					}else{
						this.alertCtrl.create({
							title: res.errorMsg,
							subTitle: '',
							buttons: [{text: '确定'}]
						}).present();
					}
				})
			}
			
		}else if(this.tradeType==2){
			this.navCtrl.push(OnlineRechargePage,{
				money:this.moneyamount
			});
		}
		
	}
}
