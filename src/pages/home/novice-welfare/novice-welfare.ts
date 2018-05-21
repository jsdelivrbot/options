import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
	selector: 'page-novice-welfare',
	templateUrl: 'novice-welfare.html',
})
export class NoviceWelfarePage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	constructor(private navCtrl: NavController, private navParams: NavParams
	) {
	}

	ionViewDidLoad() {
	}
	
}
