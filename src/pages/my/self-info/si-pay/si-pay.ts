import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController,Events,Keyboard } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
import {TradeService} from '../../../trade/tradeService';
import {SiDrawpasswordPage} from '../../self-info/si-drawpassword/si-drawpassword';
import {RechargePage} from '../../recharge/recharge';
import {TradePage} from '../../../trade/trade';
@Component({
	selector: 'page-si-pay',
	templateUrl: 'si-pay.html',
})
export class SiPayPage {
	  //屏幕分辨比
      passwordForm: any;
      private subData:any=[];
      constructor(
          private navCtrl: NavController,
          private navParams: NavParams,
          private formBuilder: FormBuilder,
          private myService:myService,
          private events:Events,
          private globalData:GlobalData,
          private tradeService: TradeService,
          private keyboard: Keyboard,
          private alertCtrl: AlertController
          ) {
            this.subData=navParams.get('data');
          	this.passwordForm = this.formBuilder.group({
                 drawpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]*")]]
          });
      }
  
      ionViewWillEnter() {
          if(!this.globalData.isMentionPassword){
            this.alertCtrl.create({
				title: '请先设置支付密码',
				buttons: [
				  {
					text: '取消',
					role: 'cancel',
					handler: () => {
					}
				  },
				  {
					text: '设置',
					handler: () => {
						this.navCtrl.push(SiDrawpasswordPage)
					}
				  }
				]
			  }).present();
			return;
		}
      }
      //支付
      resetPassword(val){
          this.subData.mentionPassword=val.drawpassword;
          this.tradeService.subscription(this.subData)
          .subscribe(res => {
              if(res.success=='true'){
                  this.alertCtrl.create({
                  title: '申购成功',
                  subTitle: '',
                  buttons: [
                    {
                      text: '确定',
                      role: 'cancel',
                      handler: () => {
						this.navCtrl.pop();
						this.events.publish('buy:success');
						this.events.publish('refresh');
                      }
                    }
                  ]
                }).present();
              }else if(res.errorMsg=='可用资金不足'){
                  this.alertCtrl.create({
                      title: res.errorMsg,
                      subTitle: '',
                      buttons: [
                        {
                          text: '取消',
                          role: 'cancel',
                          handler: () => {
                          }
                        },
                        {
                          text: '充值',
                          handler: () => {
                              this.navCtrl.push(RechargePage)
                          }
                        }
                      ]
                    }).present();
              }else{
				this.subData.mentionPassword='';
				this.passwordForm = this.formBuilder.group({
					drawpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]*")]]
			 	});
                this.alertCtrl.create({
                    title: res.errorMsg,
                    subTitle: '',
                    buttons: [{text: '确定'}]
                    }).present();
              }
          });
      }
}