import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Tabs  } from 'ionic-angular';
import{ MdAllComponent } from "./md-all/md-all"
import{ MdRrechargedrawComponent } from "./md-rechargedraw/md-rechargedraw"
import{ MdSpreadrewardComponent } from "./md-spreadreward/md-spreadreward"
import{ MdTradedetailComponent } from "./md-tradedetail/md-tradedetail"
/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-money-detail',
    templateUrl: 'money-detail.html',
})
export class MoneyDetailPage {
    @ViewChild('subTabs') tabs: Tabs;
	private tab1Root:any= MdAllComponent;
	private tab2Root:any = MdRrechargedrawComponent;
	private tab3Root:any = MdSpreadrewardComponent;
	private tab4Root:any=MdTradedetailComponent;
    //数据类型0为全部，1为充值提现，2为交易明细，3为推广佣金
    constructor(
        private navCtrl: NavController, 
        private navParams: NavParams) {
        
    }

    ionViewDidLoad() {
      
    }
   
}
