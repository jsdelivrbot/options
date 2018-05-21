import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
import { LoginService } from '../../../login/LoginService';
@Component({
	selector: 'page-si-drawpassword',
	templateUrl: 'si-drawpassword.html',
})
export class SiDrawpasswordPage {
	private verifystate:string='获取验证码';
	private submitstate:boolean=false;//获取验证码状态控制
	private timing:number=60;//计时
	private passwordForm: any;
	private drawpasswordForm:any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private myservice: myService,
		private globaldata: GlobalData,
		private loginservice:LoginService,
		private alertCtrl: AlertController
	) {
		this.passwordForm = this.formBuilder.group({
			drawpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],// 第一个参数是默认值, Validators.minLength(4)
			confirmpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],
		});
		this.drawpasswordForm = this.formBuilder.group({
			password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],// 第一个参数是默认值, Validators.minLength(4)
			verify: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4),,Validators.pattern("[0-9]{4}")]],
			confirmpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],
    	});
	}

	ionViewDidLoad() {
	}
	//获取验证码
	getVerifyCode(){
		this.submitstate=true;
		this.loginservice.getVerifyCode(this.globaldata.account)
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
	//设置提现密码
	setDrawPassword(val){
		this.myservice.setDrawPassword(this.globaldata.userId,val)
		.subscribe(res => {
			if(res.success=="true"){
				this.alertCtrl.create({
					title: '设置成功',
					subTitle: '',
					buttons: [ {
						text: '确定',
						role: 'cancel',
						handler: () => {
							this.navCtrl.pop();
							this.globaldata.isMentionPassword=true;
						}
						}]
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
	//修改提现密码
	modifyDrawPassword(val){
	this.myservice.modifyDrawPassword(this.globaldata,val)
	.subscribe(res => {
		if(res.success=="true"){
			this.alertCtrl.create({
				title: '修改成功',
				subTitle: '',
				buttons: [ {
					text: '确定',
					role: 'cancel',
					handler: () => {
						this.navCtrl.pop();
					}
					}]
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
