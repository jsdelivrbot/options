import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../assets/config/config";
import { GlobalData } from "../../providers/GlobalData";
@Injectable()
export class TradeService {
    constructor(public globalData: GlobalData,public httpService: HttpService) {
    }
    //获取内外盘期货列表
	getFutures(type){
		return this.httpService.get(APP_SERVE_URL+'Futureses?type='+type).map((res: Response) =>  res.json());
    }
    //获取蜡烛图历史行情
    getCandle(futuresCode,endTime,days,minute,way){
        return this.httpService.get(APP_SERVE_URL+'Futureses/Market?futuresCode='+futuresCode+'&endTime='+endTime+'&days='+days+'&minute='+minute+'&way='+way).map((res: Response) =>  res.json());
    }
    //获取内外盘期货列表
	getTime(futuresCode){
		return this.httpService.get(APP_SERVE_URL+'Futureses/MarketTime?futuresCode='+futuresCode).map((res: Response) =>  res.json());
    }
    //获取下单初始化信息
    getPurchaseInfo(accountId,futuresCode){
        return this.httpService.get(APP_SERVE_URL+'Futureses/Position?accountNo='+this.globalData.childAccountNo+'&futuresCode='+futuresCode).map((res: Response) =>  res.json());
    }
     //获取持仓列表
     getPositions(accountId){
        return this.httpService.get(APP_SERVE_URL+'FuturesHolds?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
    //获取委托列表
    getDelegation(accountId){
        return this.httpService.get(APP_SERVE_URL+'StockOrders?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
    //获取持仓总量
    getAllPositions(accountId){
        return this.httpService.get(APP_SERVE_URL+'StockPositions?accountNo='+this.globalData.childAccountNo).map((res: Response) =>  res.json());
    }
    //询价
    inquiry(val){
        return this.httpService.get(APP_SERVE_URL+'PriceCalculations/PriceCalculation?stockCode='+val.stockCode+'&duration='+val.duration+'&principal='+val.principal+'&stockName='+val.stockName).map((res: Response) =>  res.json());
    }
    //申购
    subscription(val){
        return this.httpService.post(APP_SERVE_URL+'PurchaseSubscribes',{
            stockCode:val.stockCode,
            duration:val.duration,
            principal:val.principal,
            stockName:val.stockName,
            expense:val.expense,
            mentionPassword:val.mentionPassword
        }).map((res: Response) =>  res.json());
    }
     //获取交易记录
     tradeRecord(pageIndex,pageSize,orderStatus){
        return this.httpService.get(APP_SERVE_URL+'PurchaseSubscribes/TransactionRecord?pageIndex='+pageIndex+'&pageSize='+pageSize+'&orderStatus='+orderStatus).map((res: Response) =>  res.json());
    }
    //行权
    exercise (orderId){
        return this.httpService.post(APP_SERVE_URL+'PurchaseSubscribes/Buy?orderId='+orderId).map((res: Response) =>  res.json());
    }
    //获取行权周期构造
    getDurations(){
        return this.httpService.get(APP_SERVE_URL+'Durations').map((res: Response) =>  res.json());
    }
    //获取名利本金构造
    Principals(){
        return this.httpService.get(APP_SERVE_URL+'Principals').map((res: Response) =>  res.json());
    }
    //查询股票列表
    SearchList(searCode){
        return this.httpService.get(APP_SERVE_URL+'Stocks/SearchList?sea='+searCode).map((res: Response) =>  res.json());
    }
    //获取热门股票
    HotList(){
        return this.httpService.get(APP_SERVE_URL+'Stocks/HotList').map((res: Response) =>  res.json());
    }
    //获取询价表格
    getProfitInfos(){
        return this.httpService.get(APP_SERVE_URL+'ProfitInfos').map((res: Response) =>  res.json());
    }
    //获取行权价
    getPrice(stockCode){
        return this.httpService.get(APP_SERVE_URL+'PriceCalculations/ExercisePrice?stockCode='+stockCode).map((res: Response) =>  res.json());
    }
    //获取名义本金状态
    getSelfPrin(){
        return this.httpService.get(APP_SERVE_URL+'SysDatas/Principal').map((res: Response) =>  res.json());
    }
}