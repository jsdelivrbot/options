import { Component, EventEmitter, Input } from '@angular/core';//, Output
import { NavController, NavParams } from 'ionic-angular';
import { IMAGE_IP } from "../../assets/config/config"
@Component({
	selector: 'thumb-nail',
	templateUrl: 'Thumbnail.html',
})
export class ThumbnailComponent {
	//图片ip
	private img_ip:string=IMAGE_IP;
	@Input() hero: any;
	// @Output() onRoute = new EventEmitter<boolean>();
	constructor(private navCtrl: NavController, private navParams: NavParams) {

	}

	ionViewDidLoad() {
	}
	//弹射路由点击事件
	// route(){
	// 	this.onRoute.emit();
	// }
}
