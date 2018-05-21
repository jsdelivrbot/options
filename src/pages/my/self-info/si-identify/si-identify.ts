import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-si-identify',
	templateUrl: 'si-identify.html',
})
export class SiIdentifyPage {

	passwordForm: any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private myservice: myService,
		private globaldata: GlobalData,
		private loadingCtrl: LoadingController ,
		private alertCtrl: AlertController
		
	) {
		this.passwordForm = this.formBuilder.group({
			name: ['', [Validators.required]],// 第一个参数是默认值, Validators.minLength(4)
			verify: ['', [Validators.required,Validators.pattern(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)]],
    	});
	}

	ionViewDidLoad() {
	}
	//实名认证
	nameVerify(val){
		this.myservice.nameVerify(this.globaldata.userId,val)
			.subscribe(res => {
				if(res.success=="true"){
					if(res.data){
						this.globaldata.authState=true;
						let toast = this.loadingCtrl.create({
							spinner: 'hide',
							content: `
								<div class="self_load">
									<img src="./assets/images/my/my_attestation_popup_icon@3x.png"/>
									<p class="p1">认证成功</p>
									<p class="p2">您可以进行更多操作</p>
								</div>
							`,
							duration: 1500
						  }).present();
					}else{
						let toast = this.loadingCtrl.create({
							spinner: 'hide',
							content: `
								<div class="self_load">
									<img src="./assets/images/my/Group4@3x.png"/>
									<p class="p1">${res.errorMsg}</p>
								</div>
							`,
							duration: 1500
							}).present();
					}
					
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
