import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { GlobalData } from "../../../providers/GlobalData";
import {SiDrawpasswordPage} from "../self-info/si-drawpassword/si-drawpassword"
import {SiLoginpasswordPage} from "../self-info/si-loginpassword/si-loginpassword"
@Component({
	selector: 'page-change-password',
	templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
    private siLoginpasswordPage:any=SiLoginpasswordPage;
    private siDrawpasswordPage:any=SiDrawpasswordPage;
    private passwordState:boolean;
	constructor(
		private navCtrl: NavController, 
		private globalData: GlobalData,
		private events: Events,
		private alertCtrl: AlertController,
		private navParams: NavParams) {
        this.passwordState=globalData.isMentionPassword;
	}
}
