import { App } from 'ionic-angular';  
import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { ThumbnailComponent } from '../../../component/thumbnail/thumbnail';
import { GlobalData } from "../../../providers/GlobalData";
import { newsService } from "../newsService";
import {Storage} from '@ionic/storage';
import { NewsDetailPage } from '../news-detail/news-detail';
@Component({
	selector: 'news-notice',
	templateUrl: 'news-notice.html',
})
export class NewsNoticeComponent {
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
		private events: Events,
		private newsservice: newsService,
		private globaldata: GlobalData,
		private alertCtrl: AlertController,
		private storage: Storage,
	) {

	}
	ionViewDidLoad() {
		this.newsservice.getNews(this.pageIndex,this.pageSize,4)
		.subscribe(res => {
			console.log(res)
			if(res.success=="true"){
				if(res.data.data.length==0)return;
				res.data.data.forEach((value,index)=>{
					res.data.data[index].state=false;
				})
				//对数据id进行标记
				this.storage.get('read-data').then((val)=>{
					res.data.data.forEach((value,index)=>{
						if(val!=null){
							val.forEach((value1,index1)=>{
								if(value.id==value1.id){
									res.data.data[index].state=true;
								}
							})
						}else{
							res.data.data[index].state=false;
						}
					})
					this.data=res.data.data;
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
	//跳转下一个页面
	onRoute(val){
		//发布阅读事件+id
		// this.events.publish('notice:read',val);
		this.data.forEach((value,index)=>{
			if(value.id==val){
				this.data[index].state=true;
			}
		})
		this.storage.get('read-data').then((val1)=>{
			if(val1==null){//第一次阅读
				let temp=[{
					id:val,
					state:true
				}]
				this.storage.set('read-data',temp);
			}else{//非第一次阅读
				let temp1=false;
				val1.forEach((val2,index2,arr2)=>{
					if(val2.id==val){
						temp1=true;
					}
				})
				if(!temp1){
					val1.push({
						id:val,
						state:true
					})
					this.storage.set('read-data',val1);
				}
				
			}
		})
		this.navCtrl.push(NewsDetailPage,{
			id:val,
			name:'公告'
		})
		// this.events.publish('goNextPage',{
		// 	id:val,
		// 	name:'公告'
		// });
	
	}
    //下拉刷新
    doRefresh(refresher) {
		this.globaldata.showLoading=false;
		this.newsservice.getNews(1,this.pageIndex*this.pageSize,4)
		.subscribe(res => {
			if(res.success=="true"){
				refresher.complete();
				if(res.data.data.length==0)return;
				//对数据id进行标记
				this.storage.get('read-data').then((val)=>{
					res.data.data.forEach((value,index)=>{
						res.data.data[index].state=false;
					})
					res.data.data.forEach((value,index)=>{
						if(val!=null){
							val.forEach((value1,index1)=>{
								if(value.id==value1.id){
									res.data.data[index].state=true;
								}
							})
						}else{
							res.data.data[index].state=false;
						}
					})
					this.data=res.data.data;
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
      //上拉加载
    doInfinite(infiniteScroll){
		this.globaldata.showLoading=false;
		this.pageIndex++;
        this.newsservice.getNews(this.pageIndex,this.pageSize,4)
		.subscribe(res => {
			if(res.success=="true"){
                infiniteScroll.complete();
                if(res.data.data.length==0){
					infiniteScroll.enable(false);
					this.showline=true;
                    return;
				}
				//对数据id进行标记
				this.storage.get('read-data').then((val)=>{
					res.data.data.forEach((value,index)=>{
						res.data.data[index].state=false;
					})
					res.data.data.forEach((value,index)=>{
						if(val!=null){
							val.forEach((value1,index1)=>{
								if(value.id==value1.id){
									res.data.data[index].state=true;
								}
							})
						}else{
							res.data.data[index].state=false;
						}
					})
                	//数组合并
					this.data=[...this.data,...res.data.data];
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
}
