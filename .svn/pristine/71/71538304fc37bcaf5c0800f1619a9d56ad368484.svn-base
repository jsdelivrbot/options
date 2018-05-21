import { Component } from '@angular/core';
import { NavController, NavParams,Events,AlertController } from 'ionic-angular';
import { NoviceDetailPage } from '../novice-detail/novice-detail';
import { NativeService } from '../../../providers/NativeService';
import { HomeService } from '../homeService';
declare let hivideo;
@Component({
	selector: 'page-novice-school',
	templateUrl: 'novice-school.html',
})
export class NoviceSchoolPage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private noviceData:any=[];
	private video:any;
	//内容页面标题
	// private tit_arr:string[]=['交易时间','充值和提现','手续费的收取','买涨买跌','建仓、持仓、平仓、爆仓','止盈止损','期货的好处','影响因素','K线快速入门'];	
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private events: Events,
		private nativeService: NativeService,
		private homeService: HomeService,
		private alertCtrl: AlertController,
	) {
	}
	ionViewDidLoad() {
		this.video=hivideo(document.getElementById('video'));
		this.getNoviceList();
	}
	goDetail(val){
		this.navCtrl.push(NoviceDetailPage,{
			id:val.id,
			title:val.title
		})
		
	}
	  //即将离开页面
	ionViewWillLeave(){
		this.nativeService.statusBarStyleDefault(false);
		this.video.pause();
		
	}
	//每次进入页面
	ionViewWillEnter(){
		this.nativeService.statusBarStyleDefault(true);
	}
	//返回
    goBack(){
        this.navCtrl.pop();
	}
	//获取列表
	getNoviceList(){
		this.homeService.getNoviceList()
		.subscribe(res => {
			if(res.success=='true'){
				this.noviceData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
	}
}
