import { Component,ViewChild } from '@angular/core';
import { TradePage } from '../trade/trade';
import {IonicPage,Tabs,ModalController,Events,App,NavController,AlertController} from "ionic-angular";
// import { NewsPage } from '../news/news';
import { MyPage } from '../my/my';
import { TrackPage } from '../track/track';
import { LivePage } from '../live/live';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import {GlobalData} from "../../providers/GlobalData";
import { modalMock } from "../../animations/fly-in";
import { SocketService } from '../../providers/SocketService';
import{SOCKET_SERVE_URL_Trade} from '../../assets/config/config';
import { SubscriptionPage } from '../trade/subscription/subscription';
import { SiIdentifyPage } from '../my/self-info/si-identify/si-identify';

@Component({
    selector: 'page-Tabs',
	templateUrl: 'tabs.html',
	animations:[modalMock]
})
export class TabsPage {
	@ViewChild('mainTabs') tabs: Tabs;
	private tab1Root:any= HomePage;
	private tab2Root:any = SubscriptionPage;
	private tab3Root:any = TradePage;
	private tab4Root:any = MyPage;
	constructor(
		private globalData: GlobalData,
		private app:App,
		private events: Events,
		private alertCtrl: AlertController,
		private navCtrl: NavController,
		private modalCtrl: ModalController,
		private ws: SocketService,
	) {
		events.subscribe('user:login', (val)=>{
			// this.ws.tradeSocket=SOCKET_SERVE_URL_Trade+'Transfer?name='+this.globalData.childAccountNo+'&type=2&token='+this.globalData.token;
			this.tab3Root=TradePage;
		})
		events.subscribe('user:logout', ()=>{
			this.tab3Root='';
		})
		events.subscribe('trade', ()=>{
			this.tabs.select(1);
		})
		events.subscribe('buy:success',()=>{
			this.tabs.select(2);
		})
	}

	ionViewDidLoad() {
		function getQueryVariable(variable){
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
            }
            return(false);
		}
		if(getQueryVariable('callback')=='mobile'||getQueryVariable('refereeCode')){
			this.tabs.select(3);
		}
		if(this.globalData.userId){
			this.tab3Root=TradePage;
		}else{
			this.tab3Root='';
		}
	}
	tabchange(event){
		//如果未登录则弹出登录modal
		if(event.tabTitle=="交易"){
			if(!this.globalData.userId){
				this.alertCtrl.create({
					title: '请先登录',
					buttons: [
					  {
						text: '取消',
						role: 'cancel',
						handler: () => {
						}
					  },
					  {
						text: '登录',
						handler: () => {
							this.modalCtrl.create(LoginPage).present();
						}
					  }
					]
				  }).present();
			}else if(!this.globalData.authState){
				// this.alertCtrl.create({
				// 	title: '请实名认证',
				// 	buttons: [
				// 	  {
				// 		text: '取消',
				// 		role: 'cancel',
				// 		handler: () => {
				// 		}
				// 	  },
				// 	  {
				// 		text: '认证',
				// 		handler: () => {
				// 			this.navCtrl.push(SiIdentifyPage)
				// 		}
				// 	  }
				// 	]
				//   }).present();
			}
		}
	}
}
