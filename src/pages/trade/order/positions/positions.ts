import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Events} from 'ionic-angular';
import {TradeService} from '../../tradeService';
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-positions',
	templateUrl: 'positions.html',
})
export class PositionsPage {
	private dpr=sessionStorage.dpr;
	private noData:boolean=false;
	private data:any;
	private showline:boolean=false;
	private pageIndex:number=1;//页面初始index
	private pageSize:number=8;//每页数据量
	private total:number;//总盈亏
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
		this.tradeService.tradeRecord(pageIndex,pageSize,6)
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
	//行权判断
	exercise(val){
		this.tradeService.getPrice(val.stockCode)
			.subscribe(res => {
				if(res.success=='true'){
					let tempstr='确定行权？';
					if(res.data.exercisePrice<val.price){
						tempstr='当前价格低于买入价，您确定要行权“'+val.stockName+'”吗？'
						this.alertCtrl.create({
							title: tempstr,
							buttons: [
							  {
								text: '取消',
								role: 'cancel',
								handler: () => {
								}
							  },
							  {
								text: '确定',
								cssClass:'self_cancle_btn',
								handler: () => {
									this.doexercise(val);
								}
							  }
							]
						  }).present();
					}else{
						this.alertCtrl.create({
							title: tempstr,
							buttons: [
							  {
								text: '取消',
								role: 'cancel',
								cssClass:'self_cancle_btn',
								handler: () => {
								}
							  },
							  {
								text: '确定',
								handler: () => {
									this.doexercise(val);
								}
							  }
							]
						  }).present();
					}
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
						}).present();
				}
			});
	}
	//行权
	doexercise(val){
		this.tradeService.exercise(val.orderId)
		.subscribe(res => {
			if(res.success=="true"){
				this.alertCtrl.create({
					title: '行权成功',
					subTitle: '',
					buttons: [{text: '确定'}]
				}).present();
				this.getData(1,this.pageIndex*this.pageSize)
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
		this.tradeService.tradeRecord(1,this.pageIndex*this.pageSize,6)
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
        this.tradeService.tradeRecord(this.pageIndex,this.pageSize,6)
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