import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events,ModalController } from 'ionic-angular';
import {LiveDetailPage} from './live-detail/live-detail';
import {RecordDetailPage} from './record-detail/record-detail';
import { NativeService } from '../../providers/NativeService';
import { GlobalData } from '../../providers/GlobalData';
import { LiveService } from './liveService';
import { IMAGE_IP } from '../../assets/config/config';
import {SOCKET_SERVE_URL_Live} from '../../assets/config/config' ;
import { SocketService } from '../../providers/SocketService';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPage } from '../login/login';
declare let hivideo;
//declare let zymedia
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-live',
    templateUrl: 'live.html',
})
export class LivePage {
    private dpr=sessionStorage.dpr;
	private noData:boolean=false;
    private btn:any;
    private liveData:any=[];
    private liveUrl:any;
    private pageIndex:number=1;//页面初始index
    private pageSize:number=8;//每页数据量
    private showline:boolean=false;
    private imgIp:string=IMAGE_IP;
    private living:any;
    private video:any;
    private isMobile:boolean;
    private livingData:any;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private nativeService: NativeService,
        private liveService: LiveService,
        private alertCtrl: AlertController,
        private globalData: GlobalData,
        private ws: SocketService,
        private modalCtrl: ModalController,
        // private iab: InAppBrowser
    ) {
    }
    //首次加载页面
    ionViewDidLoad() {
        this.getVideoList();
        // this.getLiving();
        this.living=document.getElementById('living');
    }
    ionViewWillLeave(){
    }
    ionViewWillEnter(){
        this.isMobile=this.nativeService.isMobile();
    }
    //打开浏览器
    openBrowser(){
        if(this.nativeService.isMobile()){
            if(this.globalData.childAccountNo){
                let tempurl='http://47.97.60.28:8010/?childAccountNo='+this.globalData.childAccountNo+'&nickname='+this.globalData.nickname;
                // const browser = this.iab.create(tempurl,'_system');
            }else{
                this.modalCtrl.create(LoginPage).present();
            }
        }else{
            this.navCtrl.push(LiveDetailPage)
        }
    }
    //进入下页面
    goNextPage(val,value){
        switch(val){
            case 'record':
                this.navCtrl.push(RecordDetailPage,{
                    type:val,
                    id:value
                })
                break;
        }
        
    }
    //获取视频详情
    // getLiving(){
    //     this.liveService.getLiving(5)
    //     .subscribe(res => {
	// 		if(res.success=='true'){
    //             this.liveUrl=res.data.url;
    //             console.log('this.liveUrl',this.liveUrl)
    //             this.livingData=res.data;
	// 		}else{
	// 			this.alertCtrl.create({
	// 				title: res.errorMsg,
	// 				subTitle: '',
	// 				buttons: [{text: '确定'}]
	// 				}).present();
	// 		}
	// 	});
    // }
    //获取视频列表
    getVideoList(){
        this.liveService.getVideoList(this.pageIndex,this.pageSize)
        .subscribe(res => {
			if(res.success=='true'){
                this.liveData=res.data.data;
                if(this.liveData.length==0){
                    this.noData=true;
                }else{
                    this.noData=false;
                }
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});

    }
     //上拉加载
     doInfinite(infiniteScroll){
		this.globalData.showLoading=false;
		this.pageIndex++;
        this.liveService.getVideoList(this.pageIndex,this.pageSize)
		.subscribe(res => {
			if(res.success=="true"){
                infiniteScroll.complete();
                if(res.data.data.length==0){
					infiniteScroll.enable(false);
					this.showline=true;
                    return;
                }
                //数组合并
				this.liveData=[...this.liveData,...res.data.data];
                  
			}else{
                this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
            }
        })	
    }	
}
