import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Tabs } from 'ionic-angular';
import { MyUsersComponent } from './my-users/my-users';
import { PromoteDetailsComponent } from './promote-details/promote-details';

@Component({
	selector: 'page-promotion',
	templateUrl: 'promotion.html',
})
export class PromotionPage {
	@ViewChild('promotionTabs') tabs: Tabs;
	private tab1Root:any= PromoteDetailsComponent;
	private tab2Root:any = MyUsersComponent;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
	) {
	}

	ionViewDidLoad() {
	}
	
}
