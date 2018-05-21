import { Component } from '@angular/core';
import { NavController, NavParams,Events,AlertController} from 'ionic-angular';
import { myService } from "../../../my/myService";
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'component-coupon-modal',
	templateUrl: 'coupon-modal.html',
})
export class CouponModalComponent {
    private Index_but:number=-1;
    private datas:any=[];
    private coupon:any=null;
    private lastCoupon:any=null;//打开modal传入的优惠券
    constructor(
		private navCtrl: NavController, 
        private navParams: NavParams,
        private myservice: myService,
		private events: Events,
        private globalData: GlobalData,
        private alertCtrl: AlertController,
	) {
        this.lastCoupon=navParams.get('lastCoupon');
	}
    ionViewDidLoad(){
        this.myservice.getCoupon(this.globalData.userId)
        .subscribe(res => {
            console.log('优惠券',res)
            if(res.success=="true"){
                if(res.data==null)return;
                if(res.data.length!=0)this.datas=res.data;
                if(!this.lastCoupon)return;
                res.data.forEach((value,index,arr)=>{
                    if(value.id==this.lastCoupon.id){
                        this.Index_but=index;
                    }
                })
                this.coupon=this.lastCoupon;
            }else{
                this.alertCtrl.create({
                    title: res.errorMsg,
                    subTitle: '',
                    buttons: [{text: '确定'}]
                  }).present();
            }
        })
    }   
    //关闭modal
    closeCouponModal(){
        this.events.publish('closeCouponModal',this.coupon);
    }
    //选择优惠券
    choose(val,value){
        if(this.Index_but==val){//二次选择则是未选中
            this.Index_but=-1;
            this.coupon=null;
        }else{
            this.Index_but=val;
            this.coupon=value;
        }
    }
}