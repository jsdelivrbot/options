import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Events} from 'ionic-angular';
import {TradeService} from '../../tradeService';
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-settlement',
	templateUrl: 'settlement.html',
})
export class SettlementPage {
	private dpr=sessionStorage.dpr;
	private noData:boolean=false;
	private data:any;
	private showline:boolean=false;
	private pageIndex:number=1;//页面初始index
	private pageSize:number=8;//每页数据量
	private total:number;//结算盈亏
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private tradeService: TradeService,
		private globaldata: GlobalData,
		private events: Events,
		private alertCtrl: AlertController
	) {
		
	}
	ionViewDidLoad(){
		if(!this.globaldata.authState){
			this.noData=true;
			return
		}
		this.getData(this.pageIndex,this.pageSize)
		this.events.subscribe('refresh', (val)=>{
			this.pageIndex=1;
			this.pageSize=8;
			this.noData=false;
			this.showline=false;
			this.data=[];
			if(!this.globaldata.authState){
				this.noData=true;
				return
			}
			this.globaldata.showLoading=false;
			this.getData(1,8)
		})
	}
	getData(pageIndex,pageSize){
		this.tradeService.tradeRecord(pageIndex,pageSize,3)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length==0){
					this.noData=true;
					return;
				}else{
					this.noData=false;
				}
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
	 //下拉刷新
	 doRefresh(refresher) {
		this.globaldata.showLoading=false;
		this.tradeService.tradeRecord(1,this.pageIndex*this.pageSize,3)
		.subscribe(res => {
			if(res.success=="true"){
				refresher.complete();
				if(res.data.length==0){
					this.noData=true;
				}else{
					this.noData=false;
				}
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
      //上拉加载
    doInfinite(infiniteScroll){
		this.globaldata.showLoading=false;
		this.pageIndex++;
        this.tradeService.tradeRecord(this.pageIndex,this.pageSize,3)
		.subscribe(res => {
			if(res.success=="true"){
                infiniteScroll.complete();
                if(res.data.length==0){
					infiniteScroll.enable(false);
					this.showline=true;
                    return;
                }
                //数组合并
				this.data=[...this.data,...res.data];
                  
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
