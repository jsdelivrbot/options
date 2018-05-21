import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { GlobalData } from "../../../../providers/GlobalData";
import { myService } from "../../myService";
@Component({
	selector: 'page-or-inRecord',
	templateUrl: 'or-inRecord.html',
})
export class OrInRecordPage {
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private data:any;
	private showline:boolean=false;
	private pageIndex:number=1;//页面初始index
	private pageSize:number=8;//每页数据量
	constructor(
		private navCtrl: NavController,
		 private navParams: NavParams,
		 private alertCtrl: AlertController,
		 private myService: myService,
		 private globalData:GlobalData) {
	}

	ionViewDidLoad() {
		this.myService.getInRecord(this.pageIndex,this.pageSize)
		.subscribe(res => {
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
	//标记订单
	sub(id){
		this.myService.signStatus(id)
		.subscribe(res => {
			if(res.success=="true"){
				this.myService.getInRecord(1,this.pageIndex*this.pageSize)
				.subscribe(res => {
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
		this.globalData.showLoading=false;
		this.myService.getInRecord(1,this.pageIndex*this.pageSize)
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
		this.globalData.showLoading=false;
		this.pageIndex++;
        this.myService.getInRecord(this.pageIndex,this.pageSize)
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
