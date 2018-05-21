import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-si-loginpassword',
	templateUrl: 'si-loginpassword.html',
})
export class SiLoginpasswordPage {
	passwordForm: any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private globaldata: GlobalData,
		private myservice: myService,
		private alertCtrl: AlertController
	) {
		this.passwordForm = this.formBuilder.group({
			oldpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],// 第一个参数是默认值, Validators.minLength(4)
			newpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
			confirmpassword: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20),Validators.pattern(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/)]],
    	});
	}

	ionViewDidLoad() {
	}
	//修改登录密码
	conformit(val){
		this.myservice.modifyLoginPassword(this.globaldata.userId,val)
		.subscribe(res => {
			console.log(res)
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
