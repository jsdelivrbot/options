import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import { myService } from "../../../myService";
import { GlobalData } from "../../../../../providers/GlobalData";
@Component({
	selector: 'page-sb-addcard',
	templateUrl: 'sb-addcard.html',
})
export class SbAddcardPage {
	private bankdata;
	private place;
	private choosedbank:string='';
	private branch :string='';
	private choosedplace:string='';
	passwordForm: any;
	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private formBuilder: FormBuilder,
		private myservice: myService,
		private globalData: GlobalData,
		private alertCtrl: AlertController
	) {
		this.passwordForm = this.formBuilder.group({
			banknumber:['',[Validators.required,Validators.minLength(16),Validators.maxLength(21)]],
    	});
		
		//空数据用于渲染
		this.place = [
			{
				options: [
					
				]
			},{
				options: [
					
				]
			},{
				options: [
					
				]
			}
		];
		this.bankdata = [
			{
				options: []
			}
		];
		myservice.getBanks()
		.subscribe(res => {
			if(res.success=="true"){
				if(!res.data)return;
				res.data.forEach((value,index,arr)=>{
					this.bankdata[0].options.push({
						text: value.bankName, value: value.bankCode
					})
				})
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
				}).present();
			}
		})
		myservice.getCityData()
		.subscribe(res => {
			let tempoptions=[];
			let tempoptions1=[];
			let tempoptions2=[];
			res.forEach((value,index,arr) => {
				//省数据
				tempoptions.push({
					text:value.name,
					value:value.name,
				})
				// 市数据
				value.children.forEach((value1,index1,arr1)=>{
					tempoptions1.push({
						text:value1.name,
						value:value1.name,
						parentVal:value.name
					})
					//区数据
					value1.children.forEach((value2,index2,arr2)=>{
						tempoptions2.push({
							text:value2.name,
							value:value2.name,
							parentVal:value1.name
						})
					})					
				})

			});
			
			this.place=[
				{
					options:tempoptions,
				},
				{
					options:tempoptions1
				},
				{
					options:tempoptions2
				}
			]
		})
		
	}
	ionViewDidLoad() {
	}
	//添加银行卡
	addCard(val){
		console.log(this.choosedbank)
		// bankCode ,bankCardNumber,branch,province,city
		this.myservice.addBankCard(this.choosedbank,val.banknumber,this.branch ,this.choosedplace,this.choosedplace)
		.subscribe(res => {
			if(res.success=="true"){
				this.globalData.isBankCard=true;
				this.globalData.cardCount++;
				if(this.navParams.get('shouldBack')){
					setTimeout(()=>{
						this.navCtrl.pop();
					},1000)
				}else{
					this.alertCtrl.create({
						title: '添加成功',
						subTitle: '',
						buttons: [{text: '确定'}]
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
