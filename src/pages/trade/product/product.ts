import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,Platform,ToastController,Events,ModalController } from 'ionic-angular';
import echarts from 'echarts';
import drawconfig from '../../../providers/DrawConfig';
import { RechargePage } from "../../my/recharge/recharge";
// import { OrderPage } from "../order/order";
import { PurchasePage } from "../purchase/purchase";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NativeService } from "../../../providers/NativeService";
import { TradeService } from "../tradeService";
import { SocketService } from '../../../providers/SocketService';
import { Utils } from '../../../providers/Utils';
import { NoviceDetailPage } from "../../home/novice-detail/novice-detail";
import { GlobalData } from "../../../providers/GlobalData";
import {SOCKET_SERVE_URL_Quotes} from '../../../assets/config/config' ;
import { LoginPage } from '../../login/login';
declare var screen:any;  
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})
export class ProductPage {
	////////////////////////////////////////////todo:低端机数字是否闪动////////////////////////////////////////////////////
	private tab:string='k1';//选项卡
	private dpr:string=sessionStorage.dpr;//屏幕分辨比
	private myChart:any;//画图canvas ID
	private myChart_land:any;//画图canvas ID
	private recharge:any=RechargePage;//充值页面
	private clickCount:number=0;//用于双击的点击次数临时统计
	private rotated:boolean=false;//转屏状态
	private codeName:string;//期货名字
	private code:string;//期货代码 
	private contract:string;//期货合约
	private isMobile:boolean;//是否真机
	private data:any=[];//画图数据
	private start:number=40;//1-起始百分比 
	private end:number=100;//结束百分比
	private quote;//涨跌
	private quoteRate;//涨跌幅
	private socketdata:any=[];//socket数据
	private httpState:boolean=false;//http数据状态初始化
	private type:number;//内外盘标识
	private way:number;//保单通道
	private isTradeTime:boolean;//是否是交易时间
	private hideTab:any=[];//隐藏tab	

	private tempHight2:number;//临时存储最高价格
	private tempFloor2:number;//临时存储最低价格
	constructor(
		private navCtrl: NavController,
		private platform: Platform, 
		private toastCtrl: ToastController, 
		private ws: SocketService, 
		private globalData: GlobalData, 
		private events: Events, 
		private navParams: NavParams,
		private nativeService: NativeService,
		private tradeService: TradeService,
		private screenOrientation: ScreenOrientation,
		private alertCtrl: AlertController,
		private modalCtrl: ModalController,
	) {
		this.codeName='期权';
		this.type=0;
		this.way=2;
		this.code='CL';
		this.contract='1803';
		this.isTradeTime=navParams.get('isTradeTime');
	}
	//首页进入页面获取数据
	ionViewDidLoad(){
		this.ws.socket=SOCKET_SERVE_URL_Quotes+'Chat';//打开行情socket
		this.hideTab=document.querySelectorAll('.tabbar');//获取tabbar元素
		this.ws.socket.send('{"Type":"Minute_Time","Sub":"1","FuturesCode":"'+this.code+this.contract+'"}');
		this.ws.socket.send('{"Type":"Home","Sub":"1","FuturesCode":"Home"}');
		// console.log(333333,Utils.dateFormat(new Date('2017-02-28 13:24:00'),'mm'))
		//交易socket
		this.isMobile=this.nativeService.isMobile();
		//绘图操作
		this.myChart=echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));
		//初始化获取分时线数据
		this.getCandle(1,'',0);
		this.events.subscribe('quotesSocketData:product',(msg)=>{
			let tempdata=JSON.parse(msg.data);
			if(tempdata.code=='01'){
				if(JSON.parse(tempdata.data).instrumentId!=this.code+this.contract)return;
				this.socketdata=JSON.parse(JSON.parse(msg.data).data);
				// console.log('quotesSocketData:product',this.socketdata)
				this.quote=Number(this.socketdata.nowPrice)-Number(this.socketdata.preClosePrice);
				this.quoteRate=this.quote/Number(this.socketdata.preClosePrice)*100;
				this.events.publish('nowPrice',this.socketdata);//推送现价
				if(!this.httpState)return;//如果没有获取到http数据则先不绘图
				switch(this.tab){
					//分时线
					case 'k1':
						if(this.data.length==0){
							this.data.push(this.socketdata);
						}else{
							let socketDate = new Date(this.socketdata.updateTime)
							let lastDate = new Date(this.data[this.data.length-1].updateTime)
							if(socketDate.getTime() < lastDate.getTime()){
								switch(Number(this.way)){
									case 1://ctp
										this.data[this.data.length-1].volume=Number(this.socketdata.volume)-Number(this.data[this.data.length-2].totalVolume);
										this.data[this.data.length-1].totalVolume=Number(this.socketdata.totalVolume);
										break;
									case 2://易盛
										this.data[this.data.length-1].volume=Number(this.data[this.data.length-1].volume)+Number(this.socketdata.volume);
										break;
									case 3://盈透
										break;
								}
								this.data[this.data.length-1].nowPrice=this.socketdata.nowPrice;
							}else{
								this.data.push(this.socketdata);
								this.data[this.data.length-1].volume=0;
								let m1= new Date(this.data[this.data.length-2].updateTime);
								let n1 = new Date(m1.getTime() + 1000 * 60);
								this.data[this.data.length-1].updateTime=Utils.dateFormat(n1,'yyyy/MM/dd HH:mm:ss');
							}

						} 
						break;
					//分k线
					default:
						if(this.tab=='k1')return;
						if(this.data.length==0){
							this.socketdata.openPrice=this.socketdata.nowPrice;
							this.socketdata.closePrice=this.socketdata.nowPrice;
							this.tempHight2=this.socketdata.nowPrice;
							this.tempFloor2=this.socketdata.nowPrice;
							this.socketdata.highPrice=this.tempHight2;
							this.socketdata.floorPrice=this.tempFloor2;
							this.data.push(this.socketdata);
						}else{
							let tempEqual:boolean=false;
							let socketDate = new Date(this.socketdata.updateTime)
							let lastDate = new Date(this.data[this.data.length-1].updateTime)
							if(socketDate.getTime() < lastDate.getTime()){
								tempEqual=true;
							}
							let dayEqual:boolean=true;//是同一交易日
							if(Number(this.way)==1){
								if(this.socketdata.tradeDate==this.data[this.data.length-1].tradeDate&&this.data[this.data.length-1].tradeDate==this.data[this.data.length-2].tradeDate){
									dayEqual=true;
								}else{
									dayEqual=false;
									tempEqual=false;
								}
							}
							if(tempEqual){
								switch(Number(this.way)){
									case 1://ctp
											this.data[this.data.length-1].volume=Number(this.socketdata.volume)-Number(this.data[this.data.length-2].totalVolume);
											this.data[this.data.length-1].totalVolume=Number(this.socketdata.totalVolume);
											if(localStorage.newFirst=='true'){
												this.data[this.data.length-1].volume=this.socketdata.volume;
												this.data[this.data.length-1].totalVolume=this.socketdata.volume;
											}
										break;
									case 2://易盛
										this.data[this.data.length-1].volume=Number(this.data[this.data.length-1].volume)+Number(this.socketdata.volume);
										break;
									case 3://盈透
										break;
								}
								this.data[this.data.length-1].closePrice=this.socketdata.nowPrice;
								this.socketdata.updateTime=this.data[this.data.length-1].updateTime;
								if(!this.tempHight2){
									this.tempHight2=this.socketdata.nowPrice>this.data[this.data.length-1].nowPrice?this.socketdata.nowPrice:this.data[this.data.length-1].nowPrice;
								}else{
									this.tempHight2=this.tempHight2>this.socketdata.nowPrice?(this.tempHight2>this.data[this.data.length-1].nowPrice?this.tempHight2:this.data[this.data.length-1].nowPrice):(this.socketdata.nowPrice>this.data[this.data.length-1].nowPrice?this.socketdata.nowPrice:this.data[this.data.length-1].nowPrice);
								}
								if(!this.tempFloor2){
									this.tempFloor2=this.socketdata.nowPrice<this.data[this.data.length-1].nowPrice?this.socketdata.nowPrice:this.data[this.data.length-1].nowPrice;
								}else{
									this.tempFloor2=this.tempFloor2<this.socketdata.nowPrice?(this.tempFloor2<this.data[this.data.length-1].nowPrice?this.tempFloor2:this.data[this.data.length-1].nowPrice):(this.socketdata.nowPrice<this.data[this.data.length-1].nowPrice?this.socketdata.nowPrice:this.data[this.data.length-1].nowPrice);
								}	
								this.data[this.data.length-1].highPrice=this.tempHight2;
								this.data[this.data.length-1].floorPrice=this.tempFloor2;
								
							}else{
								this.socketdata.openPrice=this.socketdata.nowPrice;
								this.socketdata.closePrice=this.socketdata.nowPrice;
								this.tempHight2=this.socketdata.nowPrice;
								this.tempFloor2=this.socketdata.nowPrice;
								this.socketdata.highPrice=this.tempHight2;
								this.socketdata.floorPrice=this.tempFloor2;
								// this.socketdata.updateTime=this.socketdata.updateTime.slice(0,17)+'00';
								this.data.push(this.socketdata);
								this.data[this.data.length-1].volume=0;
								
								if(Number(this.way)==1&&!dayEqual){//ctp不是同一交易日
									this.data[this.data.length-1].volume=this.socketdata.volume;
									this.data[this.data.length-1].totalVolume=this.socketdata.volume;
									localStorage.newFirst='true';
								}
								if(dayEqual){//当不是绘制新的第一根
									localStorage.newFirst='false';
								}
								let m = new Date(this.data[this.data.length-2].updateTime);
								switch(this.tab){
									case 'k2':
										let n2 = new Date(m.getTime() + 1000 * 60);
										this.data[this.data.length-1].updateTime=Utils.dateFormat(n2,'yyyy/MM/dd HH:mm:ss');
										// this.data[this.data.length-1].updateTime=this.data[this.data.length-1].updateTime.slice(0,17)+'00';
										break;
									case 'k3':
										let n3 = new Date(m.getTime() + 1000 * 60 * 5);
										this.data[this.data.length-1].updateTime=Utils.dateFormat(n3,'yyyy/MM/dd HH:mm:ss');
										break;
									case 'k4':
										let n4 = new Date(m.getTime() + 1000 * 60 * 15);
										this.data[this.data.length-1].updateTime=Utils.dateFormat(n4,'yyyy/MM/dd HH:mm:ss');
										break;
									case 'k5':
										let n5 = new Date(m.getTime() + 1000 * 60 * 60);
										this.data[this.data.length-1].updateTime=Utils.dateFormat(n5,'yyyy/MM/dd HH:mm:ss');
										break;
								}
							}
						} 
						break;
					
				}
				if(this.tab!='k1'){
					if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
						let copyData=[...this.data];//复制数组     
						while(copyData.length<40)
						{
							copyData.push('')
						}
						this.myChart.on('dataZoom', this.changePosition)
						this.start=0;
						this.end=100;
						this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
					}else{
						if(Number(localStorage.end)==100){
							// let _after=this.data.length;
							// console.log(localStorage.start+'****'+localStorage.end)
							this.myChart.on('dataZoom', this.changePosition)
							this.myChart.setOption(drawconfig._candle(this.data,Number(localStorage.start),100));
						}
						
					}
				}else{
					this.myChart.setOption(drawconfig._timeSharing(this.data));
				}
			}
			if(tempdata.code=='00'){
				this.globalData.isTradeTime=tempdata;
				tempdata.data.tradeTimes.forEach((value1,index1,arr1)=>{
					if(this.code+this.contract==value1.futuresCode){
						if(this.isTradeTime!=value1.isTradeTime)this.events.publish('isTradeTime',value1.isTradeTime);//推送交易状态
						this.isTradeTime=value1.isTradeTime;
					}
				})
			}
		})
	}
	//页面销毁
    // ionViewWillUnload(){
	// 	this.events.unsubscribe('quotesSocketData:product');
	// }
	//获取历史行情数据
	getCandle(days,endTime,minute){
		this.tradeService.getCandle(this.code+this.contract,endTime,days,minute,this.way)
		.subscribe(res => {
			if(res.success=="true"){
				console.log('历史行情',res)
				this.httpState=true;//已经读取到数据
				if(res.data==null){
					this.toastCtrl.create({
						message: '暂无历史数据',
						duration: 1500,
						position: 'top'
					  }).present();
					res.data=[];  
					return
				}else if(res.data.length==0){
					this.toastCtrl.create({
						message: '没有更多数据',
						duration: 1500,
						position: 'top'
					  }).present();
					  return
				}
				if(this.tab!='k1'){//非分时线
					let _before=this.data.length;
					this.data=[...res.data,...this.data];
					if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
						let copyData=[...this.data];//复制数组
						while(copyData.length<40)
						{
							copyData.push('')
						}
						this.myChart.on('dataZoom', this.changePosition)
						this.start=0;
						this.end=100;
						this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
					}else{
						let _after=this.data.length;
						this.start=(1-40/_after)*100;
						this.end=((this.end-100)*_before+100*_after)/_after;
						localStorage.start=this.start;
						localStorage.end=this.end;
						this.myChart.on('dataZoom', this.changePosition);
						this.myChart.setOption(drawconfig._candle(this.data,this.start,this.end));
					}
				}else{//分时线
					this.data=res.data;
					this.myChart.setOption(drawconfig._timeSharing(this.data));
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
	//活动开始结束位置改变
	changePosition(params){
		localStorage.start=params.batch[0].start;
		localStorage.end=params.batch[0].end;
	}
	//选项卡切换
	segmentChanged(val){
		if(this.tab==val.__value)return;
		//数据初始化
		this.data=[];
		this.start=40;
		this.end=100;
		this.httpState=false;
		this.tempHight2=null;
		this.tempFloor2=null;
		switch(val._value){
			case 'k1':
				this.tab='k1';
				this.getCandle(1,'',0);
				break;
			case 'k2':
				this.tab='k2';
				this.getCandle(1,'',1);
				break;
			case 'k3':
				this.tab='k3';
				this.getCandle(1,'',5);
				break;
			case 'k4':
				this.tab='k4';
				this.getCandle(2,'',15);
				break;
			case 'k5':
				this.tab='k5';
				this.getCandle(8,'',60);
				break;
		}
	}
	//双击转屏
	rotate(){
		if(!this.isMobile)return;
		this.clickCount++;
		setTimeout(()=>{
			this.clickCount=0;
		},500)
		if(this.clickCount>1){
			this.rotate_ctro();
		}
		
	}
	//icon控制转屏/转屏具体操作
	rotate_ctro(){
		// this.platform.ready().then(() => {
			if(!this.rotated){
				this.screenOrientation.lock('landscape-primary');
				this.rotated=true;
				setTimeout(()=>{
					this.myChart.dispose();
					this.myChart=echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));
					if(this.tab=='k1'){
						this.myChart.setOption(drawconfig._timeSharing(this.data));
					}else{
						if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
							let copyData=[...this.data];//复制数组
							while(copyData.length<40)
							{
								copyData.push('')
							}
							this.myChart.on('dataZoom', this.changePosition)
							this.start=0;
							this.end=100;
							this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
						}else{
							if(Number(localStorage.end)==100){
								// let _after=this.data.length;
								// console.log(localStorage.start+'****'+localStorage.end)
								this.myChart.on('dataZoom', this.changePosition)
								this.myChart.setOption(drawconfig._candle(this.data,Number(localStorage.start),100));
							}
						}
					}

				},300)
				// this.myChart_k1.setOption(drawconfig._timeSharing(this.data));
			}else{
				this.screenOrientation.lock('portrait-primary');
				this.rotated=false;
				setTimeout(()=>{
					this.myChart.dispose();
					this.myChart=echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));
					let navBar:any=document.querySelector('#spec_navbar .back-button');
					navBar.style.display="inline-block";
					if(this.tab=='k1'){
						this.myChart.setOption(drawconfig._timeSharing(this.data));
					}else{
						if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
							let copyData=[...this.data];//复制数组
							while(copyData.length<40)
							{
								copyData.push('')
							}
							this.myChart.on('dataZoom', this.changePosition)
							this.start=0;
							this.end=100;
							this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
						}else{
							if(Number(localStorage.end)==100){
								// let _after=this.data.length;
								// console.log(localStorage.start+'****'+localStorage.end)
								this.myChart.on('dataZoom', this.changePosition)
								this.myChart.setOption(drawconfig._candle(this.data,Number(localStorage.start),100));
							}
						}
					}
				},300)
			}
			
		// })
	}
	//离开页面前调整为竖屏
	ionViewCanLeave(){
		if(this.rotated){
			// this.platform.ready().then(() => {
				this.screenOrientation.lock('portrait-primary');
				this.rotated=false;
				setTimeout(()=>{
					this.myChart.dispose();
					this.myChart=echarts.init(<HTMLCanvasElement>document.getElementById('myChart'));
					let navBar:any=document.querySelector('#spec_navbar .back-button');
					navBar.style.display="inline-block";
					if(this.tab=='k1'){
						this.myChart.setOption(drawconfig._timeSharing(this.data));
					}else{
						if(this.data.length<40){//当小于40跟k线时，将数据增添至40跟；
							let copyData=[...this.data];//复制数组
							while(copyData.length<40)
							{
								copyData.push('')
							}
							this.myChart.on('dataZoom', this.changePosition)
							this.start=0;
							this.end=100;
							this.myChart.setOption(drawconfig._candle(copyData,this.start,this.end));
						}else{
							if(Number(localStorage.end)==100){
								// let _after=this.data.length;
								// console.log(localStorage.start+'****'+localStorage.end)
								this.myChart.on('dataZoom', this.changePosition)
								this.myChart.setOption(drawconfig._candle(this.data,Number(localStorage.start),100));
							}
						}
					}
				},300)
			// })
			return false;
		}else{
			return true;
		}
	}
	//滑动
	swipeEvent(){
		if(Number(localStorage.start)==0){
			this.globalData.showLoading=false;
			switch(this.tab){
				case 'k2':
					this.getCandle(1,this.data[0].updateTime,1);
					break;
				case 'k3':
					this.getCandle(1,this.data[0].updateTime,5);
					break;
				case 'k4':
					this.getCandle(2,this.data[0].updateTime,15);
					break;
				case 'k5':
					this.getCandle(8,this.data[0].updateTime,60);
					break;
			}
		}
	}
	//进入下一页
	goNextPage(val){
		if(!this.globalData.account){
			let modal=this.modalCtrl.create(LoginPage);
			modal.present();
			return;
		}
		switch(val){
			case '持仓':
				break;
			case '买涨':
				// this.navCtrl.push(PurchasePage,{
				// 	buyState:'buyup',
				// 	type:this.type,
				// 	code:this.code,
				// 	way:this.way,
				// 	contract:this.contract,
				// 	codeName:this.codeName,
				// 	nowPrice:this.socketdata.nowPrice,
				// 	tempSocketData:this.socketdata
				// });
				this.events.publish('goNextPage',{
					page:PurchasePage,
					buyState:'buyup',
					type:this.type,
					code:this.code,
					way:this.way,
					contract:this.contract,
					codeName:this.codeName,
					nowPrice:this.socketdata.nowPrice,
					tempSocketData:this.socketdata
				})
				break;
			case '买跌':
				// this.navCtrl.push(PurchasePage,{
				// 	buyState:'buydown',
				// 	type:this.type,
				// 	code:this.code,
				// 	way:this.way,
				// 	contract:this.contract,
				// 	codeName:this.codeName,
				// 	nowPrice:this.socketdata.nowPrice,
				// 	tempSocketData:this.socketdata
				// });
				this.events.publish('goNextPage',{
					page:PurchasePage,
					buyState:'buydown',
					type:this.type,
					code:this.code,
					way:this.way,
					contract:this.contract,
					codeName:this.codeName,
					nowPrice:this.socketdata.nowPrice,
					tempSocketData:this.socketdata
				})
				break;
			case '攻略':
				this.navCtrl.push(NoviceDetailPage,{
					title:'攻略',
					id:3
				})
				break;
		}
	}
}