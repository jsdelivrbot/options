import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-si-setdp',
	templateUrl: 'si-setdp.html',
})
export class SiSetdpPage {
	  //屏幕分辨比
      passwordForm: any;
      constructor(
          private navCtrl: NavController,
          private navParams: NavParams,
          private formBuilder: FormBuilder,
          private myService:myService,
          private globalData:GlobalData,
          private alertCtrl: AlertController
          ) {
          this.passwordForm = this.formBuilder.group({
                 drawpassword: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("[0-9]*")]]
          });
      }
  
      ionViewDidLoad() {
      }
      //设置提现密码
      resetPassword(val){
          this.myService.setDrawPassword(this.globalData.account,val)
          .subscribe(res => {
              if(res.success=='true'){
                  this.alertCtrl.create({
                      title: '密码设置成功！',
                      subTitle: '',
                      buttons: [
                          {
                              text: '确定',
                              role: 'cancel',
                              handler: () => {
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
