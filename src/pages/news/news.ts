import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Tabs,Events  } from 'ionic-angular';
import { NewsCrudeComponent } from './news-crude/news-crude';
import { NewsGoldComponent } from './news-gold/news-gold';
import { NewsInfoComponent } from './news-info/news-info';
import { NewsNoticeComponent } from './news-notice/news-notice';
import {Storage} from '@ionic/storage';
import { SocketService } from '../../providers/SocketService';
import { NewsDetailPage } from './news-detail/news-detail';

@IonicPage()
@Component({
	selector: 'page-news',
	templateUrl: 'news.html',
})
export class NewsPage {
	@ViewChild('infoTabs') tabs: Tabs;
	private tab1Root:any= NewsInfoComponent;
	private tab2Root:any = NewsCrudeComponent;
	private tab3Root:any = NewsGoldComponent;
	private tab4Root:any=NewsNoticeComponent;
	//badge数值
	private badge:number=null;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
		private storage: Storage,
		private ws: SocketService,
	) {
		//订阅跳转
		events.subscribe('goNextPage', (value)=>{
			this.navCtrl.push(NewsDetailPage,{
				id:value.id
			});  
		});
		// storage.set('read-data',null);
		//订阅notice个数事件 用于初始化
		events.subscribe('notice:total', ((value)=>{
			storage.get('read-data').then((val) => {
				if(val==null){
					this.badge=value;	
				}else{
					this.badge=value-val.length;
				}
				if(value==0){
					this.badge=null;
				}
				this.badge=this.badge==0?null:this.badge;
			})
			
		}));
		//订阅点击阅读事件
		events.subscribe('notice:read', ((val)=>{
			storage.get('read-data').then((val1)=>{
				if(val1==null){//第一次阅读
					let temp=[{
						id:val,
						state:true
					}]
					storage.set('read-data',temp);
				}else{//非第一次阅读
					let temp1=false;
					val1.forEach((val2,index2,arr2)=>{
						if(val2.id==val){
							this.badge!=null&&this.badge++;
							temp1=true;
						}
					})
					if(!temp1){
						val1.push({
							id:val,
							state:true
						})
						storage.set('read-data',val1);
					}
					
				}
				if(this.badge!=null){
					if(this.badge<=1)
						this.badge=null;
					else
						this.badge--
				}
			})
		}))
	}

	ionViewDidLoad() {

	}
}
