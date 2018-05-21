import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import {TradeService} from '../../tradeService';
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-back',
	templateUrl: 'back.html',
})
export class BackPage {
	private dpr=sessionStorage.dpr;
	private noData:boolean=false;
	private data:any;
	private showline:boolean=false;
	private pageIndex:number=1;//页面初始index
	private pageSize:number=8;//每页数据量
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private tradeService: TradeService,
		private globaldata: GlobalData,
		private alertCtrl: AlertController
	) {
		
	}
	ionViewDidLoad(){
		this.tradeService.tradeRecord(this.pageIndex,this.pageSize,3)
		.subscribe(res => {
			console.log(res)
			if(res.success=="true"){
				if(res.data.data.length==0)return;
				this.data=res.data.data;
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
				if(res.data.data.length==0)return;
				this.data=res.data.data;
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
                if(res.data.data.length==0){
					infiniteScroll.enable(false);
					this.showline=true;
                    return;
                }
                //数组合并
				this.data=[...this.data,...res.data.data];
                  
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
