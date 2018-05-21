import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,ModalController,Events} from 'ionic-angular';
import {SearchModalPage} from './searchModal/searchModal';
import {InquiryModalPage} from './inquiryModal/inquiryModal';
import {TradeService} from '../tradeService';
import {GlobalData} from "../../../providers/GlobalData";
import { LoginPage } from '../../login/login';
import { SiIdentifyPage } from '../../my/self-info/si-identify/si-identify';
@Component({
	selector: 'page-subscription',
	templateUrl: 'subscription.html',
})
export class SubscriptionPage {
	private dpr=sessionStorage.dpr;
	private choose1:string;
	private selfSet:string;
	private selfSetValue:number;
	private price:number;
	private M_stock:any;
	private M_stockData:any;
	private M_num:number;
	private constr1Data:any=[];
	private constr2Data:any=[];
	private canType:boolean=true;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private modalCtrl: ModalController,
		private events: Events,
		private globalData: GlobalData,
		private tradeService: TradeService,
		private alertCtrl: AlertController
	) {
		
	}
	ionViewDidEnter(){
		document.title='申购';
	}
	ionViewDidLoad(){
		this.getDurations();
		this.Principals();
		this.getSelfPrin();
	}
	clickOne(val){
		this.choose1=val;
	}
	clickTwo(val){
		this.M_num=val;
	}
	//获取行权周期构造
	getDurations(){
		this.tradeService.getDurations()
		.subscribe(res => {
			console.log('res1',res)
			if(res.success=='true'){
				this.constr1Data=res.data;
				this.choose1=res.data[0].refValue;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取名利本金构造
	Principals(){
		this.tradeService.Principals()
		.subscribe(res => {
			console.log('res2',res)
			if(res.success=='true'){
				this.constr2Data=res.data;
				this.selfSet='自定义金额'+res.data[0].refText+'起';
				this.selfSetValue=Number(res.data[0].refValue);
				this.M_num=this.constr2Data[0].refValue;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取名义本金状态
	getSelfPrin(){
		this.tradeService.getSelfPrin()
		.subscribe(res => {
			if(res.success=='true'){
				this.canType=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	openModal(){
		let modal=this.modalCtrl.create(SearchModalPage);
		modal.present();
		modal.onDidDismiss(data => {
			console.log(data);
			if(!data)return;
			this.M_stockData=data;
			this.M_stock=data.stockName+'    '+data.stockCode;
			this.tradeService.getPrice(data.stockCode)
			.subscribe(res => {
				if(res.success=='true'){
					this.price=res.data.exercisePrice;
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
						}).present();
				}
			});
		});
	}
	inquiry(){
		if(!this.globalData.userId){
			this.alertCtrl.create({
				title: '请先登录',
				buttons: [
				  {
					text: '取消',
					role: 'cancel',
					handler: () => {
					}
				  },
				  {
					text: '登录',
					handler: () => {
						this.modalCtrl.create(LoginPage).present();
					}
				  }
				]
			  }).present();
			return
		}
		if(!this.globalData.authState){
			this.alertCtrl.create({
				title: '请实名认证',
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
						this.navCtrl.push(SiIdentifyPage)
					}
				  }
				]
			  }).present();
			return
		}
		if(this.M_num<this.selfSetValue){
			this.alertCtrl.create({
				title:this.selfSet,
				subTitle: '',
				buttons: [{text: '确定'}]
				}).present();
			return
		}
			this.tradeService.inquiry({
				stockCode:this.M_stockData.stockCode,
				duration:this.choose1,
				principal:this.M_num,
				stockName:this.M_stockData.stockName
			})
			.subscribe(res => {
				if(res.success=='true'){
					res.data.stockName=this.M_stockData.stockName;
					console.log('data',res.data)
					this.modalCtrl.create(InquiryModalPage,{data:res.data}).present();
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
						}).present();
				}
			});
	}
}