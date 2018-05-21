import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { myService } from "../../myService";
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'my-users',
    templateUrl: 'my-users.html',
})
export class MyUsersComponent {
	private data:any;
	private showline:boolean=false;
	//屏幕分辨比
	private dpr:string=sessionStorage.dpr;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private myservice: myService,
		private globaldata: GlobalData,
		private alertCtrl: AlertController,
	) {
		
	}
	ionViewDidLoad() {
		this.myservice.getMyUser(this.globaldata.userId)
		.subscribe(res => {
			if(res.success=="true"){
				if(res.data.length==0)return;
				this.data=res.data;
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

