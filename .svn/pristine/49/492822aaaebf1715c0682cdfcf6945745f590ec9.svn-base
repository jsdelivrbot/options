import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'md-spreadreward',
	templateUrl: 'md-spreadreward.html',
})
export class MdSpreadrewardComponent {
	private data:any;
	private showline:boolean=false;
	private pageIndex:number=1;//页面初始index
	private pageSize:number=8;//每页数据量
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private myservice: myService,
		private globaldata: GlobalData,
		private alertCtrl: AlertController,
	) {
		
	}
	ionViewDidLoad() {
		this.myservice.getAllDetail(this.globaldata.userId,this.pageIndex,this.pageSize,3)
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
		this.myservice.getAllDetail(this.globaldata.userId,1,this.pageIndex*this.pageSize,3)
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
        this.myservice.getAllDetail(this.globaldata.userId,this.pageIndex,this.pageSize,3)
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
