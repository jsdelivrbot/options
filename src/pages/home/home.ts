import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,Events } from 'ionic-angular';
import { HomeService } from './homeService';
import { NativeService } from '../../providers/NativeService';
// import { PromotionPage } from '../my/promotion/promotion';
// import { NoviceWelfarePage } from './novice-welfare/novice-welfare';
import { NoviceSchoolPage } from './novice-school/novice-school';
import { NoviceDetailPage } from './novice-detail/novice-detail';
// import { CustomerServicePage } from './customer-service/customer-service';
import { IMAGE_IP } from '../../assets/config/config';
// import { ProductPage } from '../trade/product/product';
import { SocketService } from '../../providers/SocketService';
import { GlobalData } from "../../providers/GlobalData";
import { LoginPage } from '../login/login';
import {WechatPlugin} from '../../providers/WechatPlugin';
import { ThumbnailComponent } from '../../component/thumbnail/thumbnail';
import { NewsNoticeComponent } from '../news/news-notice/news-notice';
import { NewsGoldComponent } from '../news/news-gold/news-gold';
import { NewsDetailPage } from '../news/news-detail/news-detail';
import { newsService } from "../news/newsService";
import {TrackService} from '../track/trackService';
import { myService } from "../my/myService";
import { fade,flyTop } from '../../animations/fly-in';
import {nameReplace} from"../../pipes/nameReplace";
import {SOCKET_SERVE_URL_Home,SOCKET_SERVE_URL_Quotes} from"../../assets/config/config";
import { AdvertisePage } from './advertise/advertise';
@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	animations: [fade,flyTop]
})
export class HomePage {
	tabs:string='tabs1';
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	//图片ip
	private imgIp:string=IMAGE_IP;
	//banner数据
	private bannerdata:any=[];
	private noticeData:any=[];
	private tradeData:any=[];
	private rankData:any=[];
	private exponData:any=[	
		{
			changeExtent:null,
			changeRate:null,
			nowPrice:null,
			stockName:null
		},
		{
			changeExtent:null,
			changeRate:null,
			nowPrice:null,
			stockName:null
		},
		{
			changeExtent:null,
			changeRate:null,
			nowPrice:null,
			stockName:null
		}
	];
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private homeservice: HomeService,
		private app: App,
		private globalData: GlobalData,
		private events: Events,
		private myservice: myService,
		private alertCtrl: AlertController,
		private modalCtrl: ModalController,
		private nativeService: NativeService,
		private newsService: newsService,
		private trackService: TrackService,
		private ws:SocketService
	) {
		events.subscribe('user:reLogin',()=>{//订阅刷新token失效重新登陆
			this.modalCtrl.create(LoginPage).present();
		})
	}
	ionViewDidLoad() {	
		this.ws.socket=SOCKET_SERVE_URL_Home+'Chat?name=client';
		this.getBanner();
		this.getNotice();
		this.getIncomeRankings();
		if(this.globalData.userId){
			//获取账户信息
			this.myservice.getUserInfo(this.globalData.userId)
			.subscribe(res => {
				if(res.success=="true"){
					// this.globalData.token=res.data.accessToken;
					// this.globalData.refreshToken=res.data.refreshToken;
					this.globalData.userId=res.data.id;
					this.globalData.funds =res.data.funds ;
					this.globalData.capital =res.data.capital;
					this.globalData.authState =res.data.authState ;
					this.globalData.account =res.data.phoneMob ;
					this.globalData.isMentionPassword =res.data.isMentionPassword ;
					this.globalData.isBankCard  =res.data.isBankCard ;
					this.globalData.cardCount=res.data.cardCount;
					this.globalData.realName=res.data.realName;
					this.globalData.simulateAccount=res.data.phoneMob.length==8?true:false;
					this.events.publish('refresh');
					this.events.publish('home:changeTitle');
				}
			})
		}
		this.events.subscribe('homeSocket',(msg)=>{
			let tempdata=JSON.parse(msg.data);
			if(tempdata.type==1){//行情数据
				this.exponData=JSON.parse(tempdata.data)
			}
			if(tempdata.type==2){//交易数据
				let tempdata2=JSON.parse(tempdata.data);
				if(this.tradeData.length==0){
					this.tradeData=tempdata2;
					return
				}
				this.tradeData.unshift(tempdata2);
				while(this.tradeData.length>5){
					this.tradeData.pop();
				}
			}
		})
		
	}
	 //即将离开页面
	ionViewWillLeave(){
		this.nativeService.statusBarStyleDefault(false);
	}
	//每次进入页面
	ionViewWillEnter(){
		// this.getTracks();
		this.nativeService.statusBarStyleDefault(true);
		document.title='期权';
	}
	//进入下一页
	goNextPage(val,value){
		switch(val){
			case 'school':
				this.navCtrl.push(NoviceSchoolPage);
				break;
			case 'openUrl':
				// if(this.nativeService.isMobile()){
				// 	this.nativeService.openUrlByBrowser(value)
				// }else{
				// 	window.open(value)
				// }
				break;
			case 'notice':
				this.navCtrl.push(NewsNoticeComponent);
				break;
			case 'info':
				this.navCtrl.push(NewsGoldComponent);
				break;
			case 'detail':
				this.navCtrl.push(NewsDetailPage,{
					id:value
				});
				break;
			case 'trade':
				this.events.publish('trade');
				break;
			case 'newBee':
				this.navCtrl.push(NoviceDetailPage,{
					id:1,
					title:'新手看过来'
				});
				break;
			case 'advertise':
				this.navCtrl.push(AdvertisePage,{
					url:value,
				});
				break;
			
		}
	}
	//获取首页轮播图
	getBanner(){
		this.homeservice.getBanner()
		.subscribe(res => {
			if(res.success=='true'){
				this.bannerdata=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
	//获取公告
	getNotice(){
		this.newsService.getNews(1,100,4)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.data.length==0)return;
				res.data.data.forEach((value)=>{
					value.show=false;
				})
				this.noticeData=res.data.data;
				let len=this.noticeData.length;
				let index=0;
				this.noticeData[0].show=true;
				setInterval(()=>{
					this.noticeData.forEach((value)=>{
						if(value.show)value.show=false;
					})
					setTimeout(()=>{
						if(index==len)index=0;
						this.noticeData[index].show=true;
					},1500)
					index++;
				},6000)
			}else{
                this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
            }
		})		
	}
	//获取询价排行榜
	getIncomeRankings(){
		this.globalData.showLoading=false;
		this.homeservice.getIncomeRankings()
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length==0)return;
				this.rankData=res.data;
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
