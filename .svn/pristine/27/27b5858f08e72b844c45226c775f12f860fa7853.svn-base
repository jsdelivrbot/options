import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { Utils } from '../../../providers/Utils';
import { GlobalData } from "../../../providers/GlobalData";
import { newsService } from "../newsService";
@Component({
	selector: 'news-info',
	templateUrl: 'news-info.html',
})
export class NewsInfoComponent {
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private showit:boolean=false;
	private data=[];
	private showline:boolean=false;
	private pageIndex:number=1;//页面初始index
	private pageSize:number=8;//每页数据量
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private newsservice: newsService,
		private globaldata: GlobalData,
		private alertCtrl: AlertController,
		private events: Events,
	) {
		//console.log(Utils.dateFormat(new Date(),'HH:mm:ss'))
	}
	ionViewDidLoad() {
		this.newsservice.getNews(this.pageIndex,this.pageSize,1)
		.subscribe(res => {
			console.log(res)
			if(res.success=="true"){
				if(res.data.data.length==0){
					this.showit=true;
					//发布公告badge事件
					this.events.publish('notice:total',0);
					return;
				}
				//发布公告badge事件
				this.events.publish('notice:total',res.data.totalRecord);
				res.data.data.forEach((value,index,arr) => {
					let tempdate=new Date(Date.parse(value.addTime.replace(/-/g,"/")));
					let temp={
						id:value.id,
						cover:value.cover,
						title:value.title,
						m_d:Utils.dateFormat(tempdate,'yyyy-MM-dd'),
						month:Utils.dateFormat(tempdate,'MM月'),
						day:Utils.dateFormat(tempdate,'dd'),
						sec:Utils.dateFormat(tempdate,'HH:mm:ss')
					}
					this.data.forEach((val,index,arr)=>{
						if(val.m_d==temp.m_d){
							temp.month='';
							temp.day='';
						}
					})
					this.data.push(temp);

				});
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
		this.newsservice.getNews(1,this.pageIndex*this.pageSize,1)
		.subscribe(res => {
			if(res.success=="true"){
				refresher.complete();
				if(res.data.data.length==0){
					this.showit=true;
					return;
				}
				res.data.data.forEach((value,index,arr) => {
					let tempdate=new Date(Date.parse(value.addTime.replace(/-/g,"/")));
					let temp={
						id:value.id,
						cover:value.cover,
						title:value.title,
						m_d:Utils.dateFormat(tempdate,'yyyy-MM-dd'),
						month:Utils.dateFormat(tempdate,'MM月'),
						day:Utils.dateFormat(tempdate,'dd'),
						sec:Utils.dateFormat(tempdate,'HH:mm:ss')
					}
					this.data.forEach((val,index,arr)=>{
						if(val.m_d==temp.m_d){
							temp.month='';
							temp.day='';
						}
					})
					this.data.push(temp);

				});
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
        this.newsservice.getNews(this.pageIndex,this.pageSize,1)
		.subscribe(res => {
			if(res.success=="true"){
                infiniteScroll.complete();
                if(res.data.data.length==0){
					infiniteScroll.enable(false);
					this.showline=true;
                    return;
				}
				res.data.data.forEach((value,index,arr) => {
					let tempdate=new Date(Date.parse(value.addTime.replace(/-/g,"/")));
					let temp={
						id:value.id,
						cover:value.cover,
						title:value.title,
						m_d:Utils.dateFormat(tempdate,'yyyy-MM-dd'),
						month:Utils.dateFormat(tempdate,'MM月'),
						day:Utils.dateFormat(tempdate,'dd'),
						sec:Utils.dateFormat(tempdate,'HH:mm:ss')
					}
					this.data.forEach((val,index,arr)=>{
						if(val.m_d==temp.m_d){
							temp.month='';
							temp.day='';
						}
					})
					this.data.push(temp);
				});
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
