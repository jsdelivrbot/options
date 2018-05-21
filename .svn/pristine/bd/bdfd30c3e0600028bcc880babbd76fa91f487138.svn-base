import { App } from 'ionic-angular';  
import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { ThumbnailComponent } from '../../../component/thumbnail/thumbnail';
import { NewsDetailPage } from '../news-detail/news-detail';
import { GlobalData } from "../../../providers/GlobalData";
import { newsService } from "../newsService";
@Component({
	selector: 'news-crude',
	templateUrl: 'news-crude.html',
})
export class NewsCrudeComponent {
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private data:any;
	private showline:boolean=false;
	private pageIndex:number=1;//页面初始index
	private pageSize:number=8;//每页数据量
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private app: App,
		private newsservice: newsService,
		private events: Events,
		private globaldata: GlobalData,
		private alertCtrl: AlertController,
	) {
	}
	ionViewDidLoad() {
		this.newsservice.getNews(this.pageIndex,this.pageSize,2)
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
	//跳转下一个页面
	onRoute(val){
		this.events.publish('goNextPage',{
			id:val,
			name:'原油'
		}); 
	}
    //下拉刷新
    doRefresh(refresher) {
		this.globaldata.showLoading=false;
		this.newsservice.getNews(1,this.pageIndex*this.pageSize,2)
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
        this.newsservice.getNews(this.pageIndex,this.pageSize,2)
		.subscribe(res => {
			console.log(this.pageIndex,res)
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