import { Component ,ViewChild } from '@angular/core';
import {Platform, IonicApp, Nav,App, Keyboard, ToastController,ModalController,Events } from 'ionic-angular';
import {NativeService} from "../providers/NativeService";
import {GlobalData} from "../providers/GlobalData";
import {TabsPage} from '../pages/tabs/tabs';
import {Helper} from "../providers/Helper";
import {UserInfo} from "../model/UserInfo";
import {LoginPage} from "../pages/login/login";
import {Storage} from '@ionic/storage';

@Component({
	selector: 'page-App',
  	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild('myNav') nav: Nav;
	rootPage:any;
	backButtonPressed: boolean = false;
	
	constructor(
		private platform: Platform,
		private keyboard: Keyboard,
		private ionicApp: IonicApp,
		private storage: Storage,
		private helper: Helper,
		private globalData: GlobalData,
		private toastCtrl: ToastController,	
		private app: App,  
		private modalCtrl: ModalController,
		private events: Events,
		private nativeService: NativeService
	) {
		platform.ready().then(() => {
			// this.helper.initJpush();//初始化极光推送
			//登录
			this.storage.get('userInfo').then((userInfo: UserInfo) => {
				if (userInfo) {
					//发布登录事件
					this.globalData.account = userInfo.account;
					this.globalData.userId = userInfo.userId;
					this.globalData.token = userInfo.token;
					this.globalData.refreshToken = userInfo.refreshToken;
					events.publish('user:login', userInfo);
					//设置标签
					// this.helper.setTags();
					//设置别名
					// this.helper.setAlias(userInfo.userId);
				} else {
					//发布未登录事件
					this.events.publish('user:logout');
				}
				this.rootPage=TabsPage
			});
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.nativeService.statusBarStyleDefault(true);
      		this.nativeService.splashScreenHide();
  			this.registerBackButtonAction();//注册返回按键事件
			this.assertNetwork();//检测网络
			// this.helper.assertUpgrade().subscribe(res => {//检测app是否升级
		    //     res.update && this.nativeService.downloadApp();
			// })
			localStorage.color='white';//k线图主题色
		});
	}
	assertNetwork() {
		if (!this.nativeService.isConnecting()) {
			this.toastCtrl.create({
				message: '未检测到网络,请连接网络',
				showCloseButton: true,
				closeButtonText: '确定',
				position: 'top'
			}).present();
		}
  	}
  	registerBackButtonAction() {
		if (!this.nativeService.isAndroid()) {
		  return;
		}
		this.platform.registerBackButtonAction(() => {
		  if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
			this.keyboard.close();
			return;
		  }
		  //点击返回按钮隐藏toast或loading或Overlay
		  this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive();
		  //隐藏modal
		  let activePortal = this.ionicApp._modalPortal.getActive();
		  if (activePortal) {
			activePortal.dismiss();
			return;
		  }
		  //页面返回
		  let activeVC = this.nav.getActive();
		  let tabs = activeVC.instance.tabs;
		  let activeNav = tabs.getSelected();
		  return activeNav.canGoBack() ? activeNav.pop() : this.showExit();//this.showExit()
		}, 10);
	}
    //双击退出提示框
	showExit() {
		if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
			this.platform.exitApp();
		} else {
			this.nativeService.showToast('再按一次退出应用');
			this.backButtonPressed = true;
			setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
				this.backButtonPressed = false;
			}, 2000)
		}
	}
}