import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { FresetPage } from '../find-reset/freset';
import { LoginService } from '../LoginService';
import {AlertController} from "ionic-angular";
@Component({
	selector: 'page-register',
	templateUrl: 'fverify.html',
})
export class FverifyPage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private verifystate:string="获取验证码";
	private submitstate:boolean=false;//获取验证码状态控制
	private timing:number=60;//计时
	passwordForm: any;
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private loginservice:LoginService,
		private alertCtrl: AlertController
		) {
		this.passwordForm = this.formBuilder.group({
			account: ['', [Validators.required,Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")]],// 第一个参数是默认值, Validators.minLength(4)
			verify: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    	});
	}

	ionViewDidLoad() {
	}
	//获取验证码
	getVerifyCode(phone){
		this.submitstate=true;
		this.loginservice.getVerifyCode(phone)
			.subscribe(res => {
				if(res.success=='true'){
					//验证码计时控制
					var inter=setInterval(()=>{
						this.timing--;
						this.verifystate='重新发送'+this.timing+'s';
						if(this.timing<=0)clearinter();
					},1000)
					var clearinter=(()=>{
						clearInterval(inter);
						this.verifystate='获取验证码';
						this.submitstate=false;
						this.timing=60;
					})
				}else{
					this.alertCtrl.create({
						title: res.errorMsg,
						subTitle: '',
						buttons: [{text: '确定'}]
					  }).present();
					this.submitstate=false;
				}
			});
	}
    //进入重置密码页
    nextstep(val){
		this.loginservice.confirmCode(val)
			.subscribe(res => {
				if(res.success=='true'){
					this.navCtrl.push(FresetPage,{
						account:val.account
					});
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
