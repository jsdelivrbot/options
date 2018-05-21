import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams ,AlertController,Tabs,Events } from 'ionic-angular';
import { RechargePage } from "../my/recharge/recharge";
import { PositionsPage } from "./order/positions/positions";
import { SettlementPage } from "./order/settlement/settlement";
import { ProductPage } from "./product/product";
import { DelegationPage } from "./order/delegation/delegation";
import { BackPage } from "./order/back/back";
import { RefusePage } from "./order/refuse/refuse";
import { EffectivePage } from "./order/effective/effective";
import { GlobalData } from "../../providers/GlobalData";
@Component({
	selector: 'page-trade',
	templateUrl: 'trade.html',
})
export class TradePage {
	@ViewChild('subTabs') tabs: Tabs;
	private tab1Root:any= EffectivePage;
	private tab2Root:any = PositionsPage;
	private tab3Root:any = SettlementPage;
	private tab4Root:any = BackPage;
	private tab5Root:any = RefusePage;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
		private globalData: GlobalData,
		private alertCtrl: AlertController
	) {
		events.subscribe('buy:success',()=>{
			this.tabs.select(0);
		})
	}
	ionViewDidLoad(){
		this.events.subscribe('goNextPage', (val)=>{
			this.navCtrl.push(val.page,{
				buyState:val.buyState,
				type:val.type,
				code:val.code,
				way:val.way,
				contract:val.contract,
				codeName:val.codeName,
				nowPrice:val.nowPrice,
				tempSocketData:val.tempSocketData
			})
		})
	}
	//每次进入页面
	ionViewWillEnter(){
		document.title='交易';
	}
}