import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,Events } from 'ionic-angular';
import { GlobalData } from "../../../../providers/GlobalData";
import { NativeService } from '../../../../providers/NativeService';

@Component({
	selector: 'page-about-us',
	templateUrl: 'about-us.html',
})
export class AboutUsPage {
    private dpr:string=sessionStorage.dpr;
    private appName:any;
    private appNo:any;
	constructor(
		private navCtrl: NavController, 
		private nativeService: NativeService,
		private globalData: GlobalData,
		private events: Events,
		private alertCtrl: AlertController,
		private navParams: NavParams) {
            nativeService.getVersionNumber().subscribe(currentNo => {
                this.appNo=currentNo
            })
            nativeService.getAppName().subscribe(name => {
                this.appName=name
            })
	}
}
