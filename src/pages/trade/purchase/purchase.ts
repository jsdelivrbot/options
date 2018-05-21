import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,ModalController,Events} from 'ionic-angular';
import { RechargePage } from "../../my/recharge/recharge";
import { CouponModalComponent } from "./coupon-modal/coupon-modal";
import { modalMock } from "../../../animations/fly-in";
import { TradeService } from '../tradeService';
import {GlobalData} from "../../../providers/GlobalData";
import { load } from "protobufjs";
// import { WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { SocketService } from '../../../providers/SocketService';
import {NativeService} from "../../../providers/NativeService";
import {Coupon} from "../../../model/UserInfo";
import { WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

@Component({
	selector: 'page-purchase',
	templateUrl: 'purchase.html',
	animations:[modalMock]
})
export class PurchasePage {
	private recharge:any=RechargePage;
	private choose1:number;//第一个选择项交易手数
	private choose2:number=1;//第二个选择项--UI效果控制
	private choose2_step:number=1;//止损挡位倍数
	private choose2_val:number;//第二个选择项--金额数
	private type:string;//内盘外盘
	private buyState:string;//买涨买跌
	private but1_text:string="确定买涨";
	private but2_text:string="确定买跌";
	private but_state:boolean=false;//按钮状态
	private conponModal:any;//优惠券modal
	private modal_mock:boolean=false;//modal遮罩
	private codeName:any;//期货名字
	private code:any;//期货代码
	private contract:any;//期货合约

	private accountId :number;//用户id
	private funds :number;//可用资金 
	private fundPoolId :number;// 资金池id
	private endTime :string;//平仓时间 
	private tradeNumOptions =[];//交易数量选项
	private currencyId :number;//币种id
	private currencyName :string;//币种名称

	private deposit :number;//每手保证金 
	private stoplossPercent :number;//止损保证金百分比
	private stopprofitMutipleLoss :number;//止盈金额相对于止损金额的倍数
	private stoplossStepsTimes :number;// 止损档位差倍数
	private feeOpen :number;// 开仓手续费 
	private riskplanId :number;
	private buyPrice  :number;//基币买入价
	private coupon :any=null;//优惠券金额或折扣
	private nowPrice :number;//现价
	private assetunitId :number;//资产单元ID

	private way :number;//通道

	// private socketBuf:any;//序列化后的数据
	private socketDec1:any;//反序列化后的数据
	private socketDec2:any;//反序列化后的数据
	private socketDec3:any;//反序列化后的数据
	private socketDecDate:any;//反序列化后的数据
	private totalFee:number;//交易手续费
	private totalFeeBackUp:number;//交易手续费(用于备份)
	private isTradeTime:boolean=true;//是否是交易状态
	private totalPrice:number;//总结算价格
	
	private	tempSocketData:any;//临时存储上页推送的数据

	private OrderInfo:any;
	private SocketRequest:any;
	private SocketRespone:any;
	private Reply:any;
	private OMSMessage:any;

	private priceSet:number=55;//设置价格
	private priceState:boolean=true;//选择是否即时买入
	private quoteRate:number;//涨跌幅
	private priceUp:number;//期货合约
	private priceDown:number;//期货合约

	constructor(
		private navCtrl: NavController, 
		private navParams: NavParams,
		private events: Events,
		private tradeService: TradeService,
		private globalData: GlobalData,
		private ws: SocketService, 
		private modalCtrl: ModalController,
		private nativeService: NativeService,
		private alertCtrl: AlertController
	) {
		this.type=navParams.get('type');
		this.buyState=navParams.get('buyState');
		this.way=navParams.get('way');
		this.codeName=navParams.get('codeName');
		this.code=navParams.get('code');
		this.contract=navParams.get('contract');
		this.nowPrice=navParams.get('nowPrice');
		this.tempSocketData=navParams.get('tempSocketData');
		this.priceSet=this.tempSocketData.nowPrice;
		this.quoteRate=(Number(this.tempSocketData.nowPrice)-Number(this.tempSocketData.preClosePrice))/Number(this.tempSocketData.preClosePrice)*100;
	}
	//页面销毁
    ionViewWillUnload(){
		this.events.unsubscribe('buyUpOrDown');
		this.events.unsubscribe('closeCouponModal');
		this.events.unsubscribe('isTradeTime');
		this.events.unsubscribe('nowPrice');
		this.events.unsubscribe('goNextPage:OrderPage');
	}
	ionViewWillLeave(){
		this.events.unsubscribe('tradeSocketData:purchase');
	}
	ionViewWillEnter(){
		this.getInital();
		this.events.subscribe('tradeSocketData:purchase',(msg)=>{
			let responeDataView1 = new Uint8Array(msg.data);
			this.socketDec1 = this.SocketRespone.decode(responeDataView1);
			console.log('进入下单接收',this.socketDec1)
			switch(this.socketDec1.Type){
				case 0://报单即时消息
					this.nativeService.hideLoading();
					this.socketDec2 = this.Reply.decode(this.socketDec1.Data);
					switch(this.socketDec2.Code){
						case 0:
							this.coupon=null;
							let tempAlert=this.alertCtrl.create({
								title: '操作成功',
								subTitle: '',
								buttons: [ {
									text: '取消',
									role: 'cancel',
									handler: () => {
										this.getInital();
									}
								  },
								  {
									text: '查看',
									handler: () => {
										this.navCtrl.pop();
										console.log('todo://跳转')
									}
								  }]
							  })
							  tempAlert.present();
							break;
						default:
							console.log('进入错误'+this.socketDec2.Message)
							let tempAlert1=this.alertCtrl.create({
								title: '操作失败',
								subTitle: this.socketDec2.Message,
								buttons: [{text: '确定'}]
							});
							tempAlert1.present();
							break;
					}
					break;
			}
		})
	}
	ionViewDidLoad(){
		let tempWay:number=this.way;
		if(this.globalData.isSimulate){
			tempWay=0;
		} 
		let InstrumentID:string;
		if(this.way==1){//ctp  需要code+合约
			InstrumentID=this.code+this.contract;
		}else{
			InstrumentID=this.contract;
		}
		// let OrderPriceType:string;
		// if()
		//订阅买涨买跌操作  V买涨  X买跌  
		this.events.subscribe('buyUpOrDown',(val)=>{
			_that.nativeService.showLoading();
			let couponId='';
			if(this.coupon)couponId=this.coupon.id;
			let upDownPrice:string;
			if(val=='V'){//买涨
				upDownPrice=String(this.tempSocketData.upperLimitPrice);
			}else if(val=='X'){//买跌
				upDownPrice=String(this.tempSocketData.lowerLimitPrice);
			}
			let orderDate= this.OrderInfo.create({
				UnitID: this.globalData.childAccountNo,//子账号
				InstrumentID:InstrumentID,//合约代码(期货对应日期)
				OrderPriceType:'2',//报单价格条件(限价:1,市价:2,限价止损3,市价止损4)
				OrderDirection:val,//买卖方向X卖出开仓、Y买入平仓、V买入开仓、W卖出平仓
				CombOffsetFlag:'0',//组合开平标志(开仓0，平仓1，平今2，平昨3，强平4)
				LimitPrice:this.nowPrice,//价格
				VolumeTotalOriginal:this.choose1,//数量
				StopLossMoney:this.choose2_val,//止损金额 ,比如1400，就代表该笔交易亏1400元人民币就平仓， 0代表没有设置
				StopProfitMoney:this.deposit*this.stoplossPercent*this.stopprofitMutipleLoss*this.choose1,//止盈金额，比如2000，就代表该笔交易赚2000元人民币就平仓， 0代表没有设置
				UnitTeamID:this.assetunitId,//资产单元ID
				CombHedgeFlag:'1',//投资类型，投机:1,套保:2,套利:3
				CommodityNo:this.code,//商品代码,针对易盛接口(如:CL)
				secType:'',//安全类型(IB接口,有效值查看api)
				ExchangeID:upDownPrice,//市场
				Deposit:this.deposit,//每手保证金额
				RiskPlanID:this.riskplanId,//风控方案Id
				Fees:(this.totalFee/this.choose1).toFixed(2),//单笔交易手续费
				TimeCondition:'DAY',//有效期类型(DAY, GTD, GTC)
				GTDDate:'',//有效期日期
				Type:String(this.type),//品种类型 1:内盘，0：外盘 
				Way:tempWay,//报单接口类型  1：ctp, 2: 易盛，3：盈透, 0:模拟 
				PositionNO:'',//持仓编号，用于平仓时，如果该字段有值，则平该持仓编号对应的持仓，如果该值为""，则按照时间的先后顺序进行平仓。
				CouponID:couponId,//优惠券Id。
				FundPoolID:this.fundPoolId,//资金池ID
				OrderId:'',//委托ID
				channel:'',//通道
				APIType:this.way  //该品种所属API通道 1：ctp, 2: 易盛，3：盈透
			});
			// 报单请求Action
			// 201  Svc_TradeOrderReq
			// 撤单操作Action
			// 202 Svc_TradeOrderActionReq
			//一次序列化
			let buf_orderDate=  this.OrderInfo.encode(orderDate).finish();
			
			let SocketRequestDate =  this.SocketRequest.create({
				Action: 201,
				Token:this.globalData.token,
				TimeStamp:new Date().getTime(),
				Data:buf_orderDate
			});
			//二次序列化
			let buf_SocketRequestDate= this.SocketRequest.encode(SocketRequestDate).finish();
			this.ws.tradeSocket.send(buf_SocketRequestDate,WebSocketSendMode.Direct,true);//发送二进制数据
			console.log('进入发送')
		})
		
		let _that=this;
		load("assets/proto/TradeSer.proto", function(err, root) {
			if (err)
			  console.log('err',err)
			// example code
			_that.OrderInfo = root.lookupType("TradeSer.OrderInfo");
			_that.SocketRequest = root.lookupType("TradeSer.SocketRequest");
			_that.SocketRespone = root.lookupType("TradeSer.SocketRespone");
			_that.Reply = root.lookupType("TradeSer.Reply");
			_that.OMSMessage = root.lookupType("TradeSer.OMSMessage");

		});
		this.events.subscribe('closeCouponModal',(val)=>{
			this.modal_mock=false;
			this.conponModal.dismiss();
			console.log('选择',val)
			if(!val){//不使用优惠券
				this.coupon=null;
			}else{
				this.coupon=val;//优惠券赋值用于回传
				switch(val.couponType){
					case 1://现金券
						if(val.faceValue>=this.totalFeeBackUp){
							this.totalFee=0;
						}else{
							this.totalFee=this.totalFeeBackUp-val.faceValue;
						}
						break;
					case 2://折扣券
						this.totalFee=this.totalFeeBackUp*val.faceValue;
						break;
				}
			}
			this.butChange();
		})
		this.events.subscribe('isTradeTime',(val)=>{
			this.isTradeTime=val.isTradeTime;
			if(val.isTradeTime){
				//可交易时间
				this.but_state=false;
				this.butChange();
			}else{
				//非交易时间
				this.but_state=true;
				this.but1_text="非交易时间";
				this.but2_text="非交易时间";
			}
		})
		this.events.subscribe('nowPrice',(val)=>{
			this.tempSocketData=val;
			if(this.priceState){
				this.priceSet=val.nowPrice;
			}
			this.quoteRate=(Number(this.tempSocketData.nowPrice)-Number(this.tempSocketData.preClosePrice))/Number(this.tempSocketData.preClosePrice)*100;
			// console.log(this.tempSocketData)
			this.nowPrice=val.nowPrice;
			this.butChange();
		})
		
	}
	//下单初始化
	getInital(){
		//获取下单初始化
		this.tradeService.getPurchaseInfo(this.globalData.userId,this.code+this.contract)
		.subscribe(res => {
			console.log('下单初始化',res)
			if(res.success=="true"){
				if(res.data==null)return;
				this.accountId =res.data.accountId;
				this.funds  =res.data.funds ;
				this.fundPoolId  =res.data.fundPoolId ;
				this.endTime  =res.data.endTime ;
				this.tradeNumOptions  =res.data.tradeNumOptions.split(',');
				this.currencyId  =res.data.currencyId ;
				this.currencyName  =res.data.currencyName ;
				this.buyPrice  =res.data.buyPrice ;
				this.assetunitId   =res.data.assetunitId  ;
				this.stoplossPercent    =res.data.stoplossPercent   ;
				this.stopprofitMutipleLoss   =res.data.stopprofitMutipleLoss  ;
				this.stoplossStepsTimes   =res.data.stoplossStepsTimes  ;
				this.feeOpen   =res.data.feeOpen  ;
				this.buyPrice  =res.data.buyPrice ;
				this.deposit=res.data.riskPlanList[0].deposit;
				this.stoplossPercent =res.data.riskPlanList[0].stoplossPercent ;
				this.stopprofitMutipleLoss =res.data.riskPlanList[0].stopprofitMutipleLoss ;
				this.stoplossStepsTimes =res.data.riskPlanList[0].stoplossStepsTimes ;
				this.feeOpen  =res.data.riskPlanList[0].feeOpen ;
				this.riskplanId  =res.data.riskPlanList[0].riskplanId ;

				this.choose1=Number(this.tradeNumOptions[0]);
				this.choose2_val=this.deposit*this.stoplossPercent*this.choose1;
				this.totalFee=this.feeOpen*this.choose1*this.choose2_step;//总手续费计算操作
				this.totalFeeBackUp=this.totalFee;
				this.priceUp=this.deposit*this.stoplossPercent*this.stopprofitMutipleLoss*this.choose1;
				this.priceDown=this.deposit*this.stoplossPercent*this.choose1;
				//总价格
				this.totalPrice=this.deposit*this.choose1*this.choose2_step+this.totalFee;
				if(this.totalPrice>this.funds){
					this.but_state=true;
					this.but1_text="可用资金不足";
					this.but2_text="可用资金不足";
				}else{
					this.but_state=false;
					this.but1_text="确定买涨";
					this.but2_text="确定买跌";
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
	//选择手数
	firstChoose(val){
		this.choose1=val;
		this.choose2=1;
		this.choose2_step=1;
		this.choose2_val=this.deposit*this.stoplossPercent*this.choose1;
		this.butChange();
	}
	//设置价格
	setPrice(val){
		switch(val){
			case 'subtract':
				if(this.priceSet==0)return;
				this.priceSet=Number((this.priceSet-0.01).toFixed(2));
				break;
			case 'plus':
				this.priceSet=Number((this.priceSet+0.01).toFixed(2));
				break;
		}
	}
	//选择是否是即时买入
	setPriceState(){
		this.priceState=!this.priceState;
	}
	//blur
	blur(){
		this.priceSet=this.priceSet<=0?0:this.priceSet;
	}
	//选择挡位
	secChoose(val1,val2){
		this.choose2=val1;
		this.choose2_val=val2;
		switch(val1){
			case 1:
				this.choose2_step=1;
				break;
			case 2:
				this.choose2_step=this.stoplossStepsTimes;
				break;
			case 3:
				this.choose2_step=this.stoplossStepsTimes*this.stoplossStepsTimes;
				break;
		}
		this.butChange();
	}
	//当结算金额大于可用资金时置灰按钮
	//todo:减去优惠券金额以及手数*现价   优惠券只能用于手续费
	butChange(){
		this.priceUp=this.deposit*this.stoplossPercent*this.stopprofitMutipleLoss*this.choose1;
		this.priceDown=this.deposit*this.stoplossPercent*this.choose1;
		this.totalFee=this.feeOpen*this.choose1*this.choose2_step;//总手续费计算操作计算优惠券之前
		this.totalFeeBackUp=this.totalFee;//备份总手续费计算操作
		if(this.coupon){//有优惠券的情况下
			switch(this.coupon.couponType){
				case 1://现金券
					if(this.coupon.faceValue>=this.totalFeeBackUp){
						this.totalFee=0;
					}else{
						this.totalFee=this.totalFeeBackUp-this.coupon.faceValue;
					}
					break;
				case 2://折扣券
					this.totalFee=this.totalFeeBackUp*this.coupon.faceValue;
					break;
			}
		}
		//总价格
		this.totalPrice=this.deposit*this.choose1*this.choose2_step+this.totalFee;
		if(this.isTradeTime){
			if(this.totalPrice>this.funds){
				this.but_state=true;
				this.but1_text="可用资金不足";
				this.but2_text="可用资金不足";
			}else{
				this.but_state=false;
				this.but1_text="确定买涨";
				this.but2_text="确定买跌";
			}
		}else{
			this.but_state=true;
			this.but1_text="非交易时间";
			this.but2_text="非交易时间";
		}
		
	}
	//买涨/买跌
	buyIt(val){
		//V买涨  X买跌
		this.events.publish('buyUpOrDown',val)
	}
	//打开优惠券modal
	opModal(){
		this.modal_mock=true;
		this.conponModal=this.modalCtrl.create(CouponModalComponent, { lastCoupon: this.coupon});
		this.conponModal.present();
	}
}

