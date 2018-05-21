import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,ViewController ,Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {TradeService} from '../../tradeService';
import { GlobalData } from "../../../../providers/GlobalData";
@Component({
	selector: 'page-searchModal',
	templateUrl: 'searchModal.html',
})
export class SearchModalPage {
    private dpr=sessionStorage.dpr;
    private show1:boolean=false;
    private searCode:any;
    private searData:any=[];
    private hotData:any=[];
    private recordData:any=[];
    private tempStorage:string='searchRecord';
	constructor(
		private navCtrl: NavController, 
        private navParams: NavParams,
        private storage: Storage,
        private gobalData: GlobalData,
        private viewCtrl: ViewController,
        private events: Events,
        private tradeService: TradeService,
		private alertCtrl: AlertController
	) {
        if(this.gobalData.userId)this.tempStorage=String(this.gobalData.userId);
		storage.get(this.tempStorage).then(val=>{
            if(val){
                this.recordData=val;
            }
        })
	}
	ionViewDidLoad(){
        this.hotList();
    }
    //获取热门股票
    hotList(){
        this.tradeService.HotList()
        .subscribe(res => {
			if(res.success=='true'){
				this.hotData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
    }
    closeModal(){
        this.viewCtrl.dismiss();
    }
    getItems(val){
        this.show1=val.target.value?true:false;
        if(!val.target.value)return;
        this.gobalData.showLoading=false;
        this.tradeService.SearchList(val.target.value)
        .subscribe(res => {
			if(res.success=='true'){
				this.searData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
    }
    choose(val){
        let haveIt=false;
        this.recordData.forEach(element => {
            if(element.stockCode==val.stockCode){
                haveIt=true;
            }
        });
        if(!haveIt){
            this.recordData.unshift(val);
        }
        while(this.recordData.length>10){
            this.recordData.pop();
        }
        this.storage.set(this.tempStorage,this.recordData);
        this.viewCtrl.dismiss(val);
        
    }
    clearRecord(){
        this.recordData=[];
        this.storage.set(this.tempStorage,null)
    }
}
