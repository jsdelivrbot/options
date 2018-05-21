import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { newsService } from "../newsService";

@Component({
	selector: 'page-news-detail',
	templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
	private data:any='';
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private newsservice: newsService,
		private alertCtrl: AlertController,
	) {
		this.newsservice.getNewsDetail(navParams.get('id'))
		.subscribe(res => {
			console.log(res)
			if(res.success=="true"){
				this.data=res.data;
			}else{
                this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
            }
		})		
	}
	ionViewDidLoad() {
	}
}
