import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,IonicApp,Events } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { RegisterPage } from './register/register';
import { FverifyPage } from './find-verify/fverify';
import { LoginService } from './LoginService';
import {AlertController} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {GlobalData} from "../../providers/GlobalData";
@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private registerpage:any=RegisterPage;//注册页面
	private fverifypage:any=FverifyPage;//登录页面
	private showPicVerify:boolean=false;//登录页面
	private imgUrl:string;
	private hideClose:boolean;
	passwordForm: any;
	constructor(
		private navCtrl: NavController,
		private formBuilder: FormBuilder,
		private ionicApp: IonicApp,
		private loginservice:LoginService,
		private navParams: NavParams,
		private storage: Storage,
		private globalData: GlobalData,
		private events: Events,
		private alertCtrl: AlertController
	) {
		let preAccount=''	;
		if(localStorage.preAccount)preAccount=localStorage.preAccount;
		this.passwordForm = this.formBuilder.group({
			account: [preAccount, [Validators.required,Validators.pattern(/(^\d{8}$)|(^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$)/)]],// 第一个参数是默认值, Validators.minLength(4)
			password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
			verifyCode:['']
		});
		this.hideClose=navParams.get('hideClose');
	}	

	ionViewDidLoad() {
		if(localStorage.preLogin=='false'){
			let temp={
				account:localStorage.preAccount
			}
			this.refreshcode(temp)
		}
	}

	//登录
	login(val){
		localStorage.preAccount=val.account;
		if(localStorage.preLogin=='true'){
			val.verifyCode='';
		}
		this.loginservice.login(val)
		.subscribe(res => {
			if(res.success=='true'){
				localStorage.preLogin='true';
				//存储账户信息
				this.storage.set('userInfo',{
					account:val.account,
					token:res.data.accessToken,
					refreshToken:res.data.refreshToken,
					userId:res.data.id,
				})
				this.globalData.token=res.data.accessToken;
				this.globalData.refreshToken=res.data.refreshToken;
				this.globalData.userId=res.data.id;
				this.globalData.funds =res.data.funds ;
				this.globalData.capital =res.data.capital;
				this.globalData.authState =res.data.authState ;
				this.globalData.account =res.data.phoneMob ;
				this.globalData.isMentionPassword =res.data.isMentionPassword ;
				this.globalData.isBankCard  =res.data.isBankCard ;
				this.globalData.cardCount=res.data.cardCount;
				this.globalData.realName=res.data.realName;
				this.globalData.simulateAccount=res.data.phoneMob.length==8?true:false;
				this.events.publish('refresh');
				this.events.publish('home:changeTitle');
				this.events.publish('user:login');
				//关闭登录页面
				this.ionicApp._modalPortal.getActive().dismiss();
				// this.storage.get('userInfo').then((val) => {
				// 	console.log(val);
				//   });
			}else{
				localStorage.preLogin='false';
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				  }).present();
				this.refreshcode(val);
			}
		})
	}
	//获取验证码
	refreshcode(val){
		this.loginservice.getPicVerify(val.account)
		.subscribe(res => {
			if(res.success=='true'){
				this.imgUrl='data:image/png;base64,'+res.data;
				this.showPicVerify=true;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				}).present();
			}
		})
	}
	//关闭登陆modal
	closelogin(){
		this.ionicApp._modalPortal.getActive().dismiss();
	}
}
