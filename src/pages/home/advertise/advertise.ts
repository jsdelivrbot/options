import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
	selector: 'page-advertise',
	templateUrl: 'advertise.html',
})
export class AdvertisePage {
    //屏幕分辨比
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
	) {
	
	}
	ionViewDidLoad(){
        let temp:any=document.getElementById('ad_iframe');
        temp.src=this.navParams.get('url');
    }
}
