import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Tabs,Events } from 'ionic-angular';
import{ BankPage } from "./bank/bank";
import{ ZhiFuBaoPage } from "./zhifubao/zhifubao";
import{OrDetailPage} from './or-detail/or-detail';
import {OrRecordPage} from '../online-recharge/or-record/or-record';
import { myService } from "../myService";
@Component({
	selector: 'page-online-recharge',
	templateUrl: 'online-recharge.html',
})
export class OnlineRechargePage {
	@ViewChild('thirTabs') tabs: Tabs;
	private tab1Root:any= ZhiFuBaoPage;
	private tab2Root:any = BankPage;
	private money:number;
	constructor(
		private navCtrl: NavController,
		 private navParams: NavParams,
		 private events:Events,
		 private myService:myService,
		) {
		this.money=navParams.get('money');
		events.subscribe('goOrDetail',(val)=>{
			this.navCtrl.push(OrDetailPage,{
				showTab:val.showTab,
				id:val.id
			})
		})
		events.subscribe('goOrRecord',(val)=>{
			this.navCtrl.push(OrRecordPage,{
				info:val
			})
		})
	}
	ionViewDidLoad() {
	}
	ionViewWillUnload(){
		this.events.unsubscribe('goOrDetail');
		this.events.unsubscribe('goOrRecord');
	}
}
