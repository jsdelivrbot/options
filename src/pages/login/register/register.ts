import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../LoginService';
import {AlertController} from "ionic-angular";
import { NoviceDetailPage } from '../../home/novice-detail/novice-detail';
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {
	private verifystate:string='获取验证码';
	private submitstate:boolean=false;//获取验证码状态控制
	private timing:number=60;//计时
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private show=true;//同意协议
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
			password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
			confirmpassword:['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
			verify: ['', [Validators.required,Validators.maxLength(4),Validators.minLength(4)]],
			assetunit: ['', [Validators.pattern("^[0-9]*$")]],
			recommend:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(6),Validators.minLength(6)]],
    	});
	}

	ionViewDidLoad() {
		if(this.navParams.get('refereeCode')){
			this.passwordForm = this.formBuilder.group({
				account: ['', [Validators.required,Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")]],// 第一个参数是默认值, Validators.minLength(4)
				password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
				confirmpassword:['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
				verify: ['', [Validators.required,Validators.maxLength(4),Validators.minLength(4)]],
				assetunit: ['', [Validators.pattern("^[0-9]*$")]],
				recommend:[this.navParams.get('refereeCode'),[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(6),Validators.minLength(6)]],
			});
		}
	}
	//同意协议标志
	agree(){
		this.show=!this.show;
	}
	goNextPage(){
		this.navCtrl.push(NoviceDetailPage,{
			id:3,
			title:'协议详情'
		});
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
	//注册
	register(val){
		val.assetunit=val.assetunit==''?0:val.assetunit;
		val.recommend=val.recommend==''?0:val.recommend;
		this.loginservice.register(val)
		.subscribe(res => {
			console.log(res)
			if(res.success=='true'){
				this.alertCtrl.create({
					title: '注册成功！',
					subTitle: '',
					buttons: [
						{
							text: '确定',
							role: 'cancel',
							handler: () => {
								this.navCtrl.pop();
							}
						  },
					]
				  }).present();
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
