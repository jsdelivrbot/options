import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../LoginService';
import {AlertController} from "ionic-angular";
@Component({
	selector: 'page-register',
	templateUrl: 'freset.html',
})
export class FresetPage {
    //屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	private account:string;
	passwordForm: any;
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private loginservice:LoginService,
		private alertCtrl: AlertController
		) {
		this.passwordForm = this.formBuilder.group({
			password: ['', [Validators.required,Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
		});
		this.account=navParams.get('account');
	}

	ionViewDidLoad() {
	}
    //重置密码
    resetPassword(val){
        this.loginservice.resetPassword(this.account,val)
		.subscribe(res => {
			if(res.success=='true'){
				this.alertCtrl.create({
					title: '密码重置成功！',
					subTitle: '',
					buttons: [
						{
							text: '确定',
							role: 'cancel',
							handler: () => {
								this.navCtrl.popToRoot();
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
