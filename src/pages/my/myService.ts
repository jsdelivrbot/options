import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../assets/config/config";
import { GlobalData } from "../../providers/GlobalData";
@Injectable()
export class myService {
  constructor(
	  public httpService: HttpService,
	  public globalData: GlobalData,
	) {
  }
	//获取用户信息
    getUserInfo(userId){
		return this.httpService.get(APP_SERVE_URL+'Accounts/'+this.globalData.userId).map((res: Response) =>  res.json());
    }
	//实名认证 
	nameVerify(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'Accounts/RealNameAuthentication/'+this.globalData.userId,{
			realName :val.name,
			identityCard :val.verify
		}).map((res: Response) =>  res.json());
	}
	//修改手机号
	modifyPhone(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'Accounts/PhoneMob?accountNo='+this.globalData.childAccountNo,{
			phoneMob :val.account,
			verifyCode :val.verify
		}).map((res: Response) =>  res.json());
	}
	//修改登录密码
	modifyLoginPassword(userId,val){
		return this.httpService.patch(APP_SERVE_URL+'Accounts/Password/'+this.globalData.userId,{
			oldPassword :val.oldpassword,
			newPassword :val.newpassword,
			confirmPassword :val.confirmpassword
		}).map((res: Response) =>  res.json());
	}
	//设置提现密码
	setDrawPassword(userId,val){
		return this.httpService.post(APP_SERVE_URL+'Accounts/MentionPassword/'+this.globalData.userId,{
			password :val.drawpassword,
			confirmPassword :val.confirmpassword
		}).map((res: Response) =>  res.json());
	}
	//修改提现密码
	modifyDrawPassword(userinfo,val){
		return this.httpService.patch(APP_SERVE_URL+'Accounts/MentionPassword/'+this.globalData.userId,{
			phoneMob:userinfo.account,
			newPassword :val.password,
			verifyCode :val.verify,
			confirmPassword:val.confirmpassword
		}).map((res: Response) =>  res.json());
	}
	//获取优惠券
	getCoupon(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/Coupon?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	
	//提现
	withDraw(amount,bankCardId,mentionPassword){
		return this.httpService.post(APP_SERVE_URL+'WithdrawRecords',{
			amount:amount,
			bankCardId:bankCardId,
			mentionPassword:mentionPassword
		}).map((res: Response) =>  res.json());
	}
	//获取全部资金明细
	getAllDetail(userId,pageIndex,pageSize,classId){
		return this.httpService.get(APP_SERVE_URL+'CapitalFlows?accountNo='+this.globalData.childAccountNo+'&pageIndex='+pageIndex+'&pageSize='+pageSize+'&classId='+classId).map((res: Response) =>  res.json());
	}
	//获取银行卡
	getBankCard(userId){
		return this.httpService.get(APP_SERVE_URL+'Accounts/BankCardList/'+this.globalData.userId).map((res: Response) =>  res.json());
	}
	//解绑银行卡
	delBankCard(userId,id){
		return this.httpService.delete(APP_SERVE_URL+'AccountBankCards/'+id).map((res: Response) =>  res.json());
	}
	//添加银行卡
	addBankCard(bankCode ,bankCardNumber,branch,province,city){
		return this.httpService.post(APP_SERVE_URL+'AccountBankCards',{
			bankCode:bankCode,
			bankCardNumber:bankCardNumber,
			branch:branch ,
			province:province,
			city:city ,
		}).map((res: Response) =>  res.json());
	}
	//获取省市区联动数据
	getCityData(){
		return this.httpService.get('assets/data/cityData.json').map((res: Response) =>  res.json());
	}
	//获取银行
	getBanks(){
		return this.httpService.get(APP_SERVE_URL+'Banks').map((res: Response) =>  res.json());
	}
	//获取推广详情数据
	getPromoteData(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/Promotion?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	//获取我的下线列表
	getMyUser(userId){
		return this.httpService.get(APP_SERVE_URL+'ChildAccounts/PromotionAccount?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
	}
	getLevelDetail(){
		return this.httpService.get(APP_SERVE_URL+'PromotionLevels').map((res: Response) =>  res.json());
	}
   // 更新用户头像Id
	updateUserAvatarId(avatarId: string) {
		return this.httpService.post(APP_SERVE_URL+'PromotionLevels',{
			avatarId:avatarId
		}).map((res: Response) => res.json());
	}
	//充值
	recharge(url,data){
		return this.httpService.post(url,data).map((res: Response) =>  res.json());
	}
	//提交反馈
	PostComment(content){
		return this.httpService.post(APP_SERVE_URL+'QuotesReptiles',{
			content:content
		}).map((res: Response) =>  res.json());
	}
	Payment(Amount,PayCode){
		return this.httpService.post(APP_SERVE_URL+'CapitalFlows/Payment?Amount='+Amount+'&PayCode='+PayCode).map((res: Response) =>  res.json());
	}
	//线下充值
	offLinePay(amount,way,realName,fundAccount){
		return this.httpService.post(APP_SERVE_URL+'OfflineRecharges',{
			amount:amount,
			way:way,
			realName:realName,
			fundAccount:fundAccount
		}).map((res: Response) =>  res.json());
	}
	//获取线下充值记录
	getPayRecord(pageIndex,pageSize){
		return this.httpService.get(APP_SERVE_URL+'OfflineRecharges?pageIndex='+pageIndex+'&pageSize='+pageSize).map((res: Response) =>  res.json());
	}
	//获取出金记录
	getInRecord(pageIndex,pageSize){
		return this.httpService.get(APP_SERVE_URL+'WithdrawRecords?pageIndex='+pageIndex+'&pageSize='+pageSize).map((res: Response) =>  res.json());
	}
	//标记订单状态
	signStatus(id){
		return this.httpService.patch(APP_SERVE_URL+'OfflineRecharges/UpdateStatus/'+id+'?status=1').map((res: Response) =>  res.json());
	}
	//获取支付宝
	getZhiFuBao(){
		return this.httpService.get(APP_SERVE_URL+'SysDatas/Alipay').map((res: Response) =>  res.json());
	}
	//获取银行卡信息
	getBank(){
		return this.httpService.get(APP_SERVE_URL+'SysDatas/BankCard').map((res: Response) =>  res.json());
	}
	//杉德支付通道
	newPay1(amount,payCode,bankCode){
		return this.httpService.post(APP_SERVE_URL+'CapitalFlows/FastPayment?bankCode='+bankCode+'&amount='+amount+'&payCode='+payCode).map((res: Response) =>  res.json());
	}
	//环迅支付通道
	newPay2(amount,payCode,bankCode){
		return this.httpService.post(APP_SERVE_URL+'CapitalFlows/IpsPayment?bankCode='+bankCode+'&amount='+amount+'&payCode='+payCode).map((res: Response) =>  res.json());
	}
	//获取支付通道显示
	getPayTypes(){
		return this.httpService.get(APP_SERVE_URL+'CapitalFlows/PaymentAisle').map((res: Response) =>  res.json());
	}
}
